/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { marker as i18n } from '@biesbjerg/ngx-translate-extract-marker';
import {
  Api,
  ApiInformation,
  ApiService,
  GetApiRatingsByApiIdRequestParams,
  Link,
  Page,
  PermissionsResponse,
  PermissionsService,
  Rating,
  Subscription,
  User
} from '../../../../../projects/portal-webclient-sdk/src/lib';
import { ApiMetrics } from '../../../../../projects/portal-webclient-sdk/src/lib/model/apiMetrics';
import '@gravitee/ui-components/wc/gv-confirm';
import '@gravitee/ui-components/wc/gv-list';
import '@gravitee/ui-components/wc/gv-rating';
import '@gravitee/ui-components/wc/gv-rating-list';
import { TranslateService } from '@ngx-translate/core';
import { ItemResourceTypeEnum } from 'src/app/model/itemResourceType.enum';
import { INavRoute } from 'src/app/services/nav-route.service';
import { FeatureEnum } from '../../../model/feature.enum';
import { ConfigurationService } from '../../../services/configuration.service';
import { CurrentUserService } from '../../../services/current-user.service';
import { NotificationService } from '../../../services/notification.service';
import { ScrollService } from '../../../services/scroll.service';
import StatusEnum = Subscription.StatusEnum;

@Component({
  selector: 'app-api-general',
  templateUrl: './api-general.component.html',
  styleUrls: ['./api-general.component.css']
})
export class ApiGeneralComponent implements OnInit {

  private apiId: any;
  private ratingPageSize: any;
  private ratingsMetadata: any;

  canRate: boolean;
  currentApi: Api;
  currentApiMetrics: ApiMetrics;
  currentOrder: any;
  currentUser: User;
  description: string;
  apiHomepage: Page;
  connectedApps: Promise<any[]>;
  permissions: PermissionsResponse = {};
  ratingListPermissions: { update, delete, addAnswer, deleteAnswer };
  ratingForm: FormGroup;
  ratings: Array<Rating>;
  ratingsSortOptions: any;
  resources: any[];
  userRating: Rating;
  apiHomepageLoaded: boolean;
  hasRatingFeature: boolean;
  apiInformations: Array<ApiInformation>;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
    private currentUserService: CurrentUserService,
    private permissionsService: PermissionsService,
    private notificationService: NotificationService,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder,
    private scrollService: ScrollService,
  ) {
    this.ratingListPermissions = {
      update: [], delete: false, addAnswer: false, deleteAnswer: false
    };
  }

  ngOnInit() {
    const apiId = this.route.snapshot.params.apiId;
    this.permissions = this.route.snapshot.data.permissions;
    this.apiHomepage = this.route.snapshot.data.apiHomepage;
    this.apiInformations = this.route.snapshot.data.apiInformations;
    if (this.apiHomepage == null) {
      this.apiHomepageLoaded = true;
    }

    this.hasRatingFeature = this.configService.hasFeature(FeatureEnum.rating);

    this.route.params.subscribe(() => {
      if (apiId) {
        if (this.hasRatingFeature) {
          this.translateService.get([
            i18n('apiGeneral.ratingsSortOptions.newest'),
            i18n('apiGeneral.ratingsSortOptions.oldest'),
            i18n('apiGeneral.ratingsSortOptions.best'),
            i18n('apiGeneral.ratingsSortOptions.worst'),
            i18n('apiGeneral.ratingsSortOptions.answers'),
          ]
          ).toPromise().then(translations => {
            const options = Object.values(translations).map(label => ({ label, value: 'date' }));
            options[1].value = '-date';
            options[2].value = 'value';
            options[3].value = '-value';
            options[4].value = 'answers';
            this.ratingsSortOptions = options;
          });
          this.ratingPageSize = 3;
          this.currentOrder = 'date';
        }

        this.apiId = apiId;

        this.apiService.getApiMetricsByApiId({ apiId }).toPromise()
          .then(metrics => this.currentApiMetrics = metrics);
        this.currentApi = this.route.snapshot.data.api;
        this.apiService.getApiLinks({ apiId }).subscribe(apiLinks => {
          if (apiLinks.slots && apiLinks.slots.aside) {
            apiLinks.slots.aside.forEach((catLinks) => {
              if (catLinks.root) {
                this.resources = this._buildLinks(apiId, catLinks.links);
              }
            });
          }
        });

        this.currentUser = this.currentUserService.getUser();
        if (this.currentUser) {
          this._updateRatings();
          this.connectedApps = this.apiService.getSubscriberApplicationsByApiId({
            apiId,
            statuses: [StatusEnum.ACCEPTED],
          })
            .toPromise()
            .then((response) => response.data.map((app) => ({ item: app, type: ItemResourceTypeEnum.APPLICATION })))
            .catch(() => []);
        }

        this.description = this.currentApi.description;

        return this.currentApi;
      }
    });
  }

  _updateRatings() {
    if (this.hasRatingFeature) {
      this.ratingForm = this.formBuilder.group({
        title: new FormControl(''),
        comment: new FormControl(''),
        value: new FormControl(null, [Validators.required]),
      });

      if (this.configService.hasFeature(FeatureEnum.ratingCommentMandatory)) {
        this.ratingForm.get('title').setValidators([Validators.required]);
        this.ratingForm.get('comment').setValidators([Validators.required]);
      }

      const apiId = this.apiId;

      if (this.currentUser) {
        const requestParameters: GetApiRatingsByApiIdRequestParams = { apiId, mine: true };
        this.apiService.getApiRatingsByApiId(requestParameters).toPromise()
          .then((mineRatingsResponse) => {
            this.userRating = mineRatingsResponse.data.find((rating) => {
              return rating.author.id === this.currentUser.id;
            });
            this.canRate = this.permissions.RATING && this.permissions.RATING.includes('C') && this.userRating == null;
            this._updateRatingForm();
          });
      }

      this.apiService.getApiRatingsByApiId({
        apiId,
        page: 1,
        size: this.ratingPageSize,
        order: this.currentOrder
      }).toPromise()
        .then((ratingsResponse) => {
          this.ratings = ratingsResponse.data;
          if (this.currentUser) {
            this.ratingListPermissions.update = this.ratings
              .filter((rating) => {
                return rating.author.id === this.currentUser.id;
              })
              .map((rating) => rating.id);
            this.ratingListPermissions.delete = this.permissions.RATING && this.permissions.RATING.includes('D');
            this.ratingListPermissions.addAnswer = this.permissions.RATING_ANSWER && this.permissions.RATING_ANSWER.includes('C');
            this.ratingListPermissions.deleteAnswer = this.permissions.RATING_ANSWER && this.permissions.RATING_ANSWER.includes('D');
          }
          this.ratingsMetadata = ratingsResponse.metadata;
        });
    }
  }

  _buildLinks(apiId: string, links: Link[]) {
    return links.map(element => {
      let path: string;
      let target: string;
      switch (element.resourceType) {
        case Link.ResourceTypeEnum.External:
          path = element.resourceRef;
          if (path.toLowerCase().startsWith('http')) {
            target = '_blank';
          }
          break;
        case Link.ResourceTypeEnum.Page:
          path = '/catalog/api/' + apiId + '/doc';
          if (element.folder && element.resourceRef !== 'root') {
            path += '?folder=' + element.resourceRef;
          } else if (!element.folder) {
            path += '?page=' + element.resourceRef;
          }
          target = '_self';
          break;
        case Link.ResourceTypeEnum.Category:
          path = '/catalog/categories/' + element.resourceRef;
          target = '_self';
          break;
      }
      return { title: element.name, path, target };
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/catalog/categories', category]);
  }

  goToSearch(tag: string) {
    this.router.navigate(['catalog/search'], { queryParams: { q: tag } });
  }

  goToExtern(url: string) {
    this.onNavChange({
      path: url,
      title: null,
      target: '_blank',
    });
  }

  onNavChange(route: INavRoute) {
    if (route.target && route.target === '_blank') {
      window.open(route.path, route.target);
    } else {
      const urlTree = this.router.parseUrl(route.path);
      const path = urlTree.root.children[PRIMARY_OUTLET].segments.join('/');
      this.router.navigate([path], { queryParams: urlTree.queryParams });
    }
  }

  @HostListener(':gv-rating-list:update', ['$event.detail'])
  onUpdate({ rating }) {
    const apiId = this.apiId;
    const RatingInput = { title: rating.title, value: rating.value, comment: rating.comment };
    this.apiService.updateApiRating({ apiId, ratingId: rating.id, RatingInput })
      .toPromise()
      .then((res) => {
        this.ratingForm = null;
        this._updateRatings();
        this.apiService.getApiByApiId({ apiId })
          .toPromise()
          .then((api) => this.currentApi = api);
      })
      .then(() =>
        this.notificationService.info(i18n('apiGeneral.ratingUpdated'))
      );
  }

  @HostListener(':gv-rating-list:delete', ['$event.detail'])
  onDeleteRating({ rating }) {
    const apiId = this.apiId;
    this.apiService.deleteApiRating({ apiId, ratingId: rating.id })
      .toPromise()
      .then(() => {
        this.notificationService.info(i18n('apiGeneral.ratingDeleted'));
      })
      .finally(() => {
        this._updateRatings();
        this.apiService.getApiByApiId({ apiId })
          .toPromise()
          .then((api) => this.currentApi = api);
      });
  }

  @HostListener(':gv-rating-list:delete-answer', ['$event.detail'])
  onDeleteRatingAnswer({ rating, answer }) {
    this.apiService.deleteApiRatingAnswer({ apiId: this.apiId, ratingId: rating.id, answerId: answer.id })
      .toPromise()
      .then(() => {
        this.notificationService.info(i18n('apiGeneral.ratingAnswerDeleted'));
      })
      .finally(() => {
        this._updateRatings();
      });
  }

  @HostListener(':gv-rating-list:add-answer', ['$event.detail'])
  onAnswer({ rating, answer }) {
    const RatingAnswerInput = { comment: answer };
    this.apiService.createApiRatingAnswer({ apiId: this.apiId, ratingId: rating.id, RatingAnswerInput })
      .toPromise()
      .then(() => {
        this.notificationService.info(i18n('apiGeneral.ratingAnswerCreated'));
      })
      .finally(() => {
        this._updateRatings();
      });
  }

  hasRatings() {
    return this.ratings && this.ratings.length > 0;
  }

  hasRatingForm() {
    return this.ratingForm != null;
  }


  getDocNameByFullURL(url) {
    const array = url.split('/');
    if (url === '/') {
      return url;
    } else if (array[array.length - 1] === "") {
      return array[array.length - 2]
    } else { return array[array.length - 1] }
  }

  hasValidRatingForm() {
    return this.hasRatingForm() && this.ratingForm.valid;
  }

  rate() {
    const apiId = this.apiId;
    const RatingInput = this.ratingForm.getRawValue();
    this.apiService.createApiRating({ apiId, RatingInput }).toPromise().then((res) => {
      this.ratingForm = null;
      this.notificationService.info(i18n('apiGeneral.ratingCreated'));
      this._updateRatings();
      this.apiService.getApiByApiId({ apiId })
        .toPromise()
        .then((api) => this.currentApi = api);
    });
  }

  private _updateRatingForm() {
    if (this.userRating) {
      this.ratingForm.controls.comment.setValue(this.userRating.comment);
      this.ratingForm.controls.title.setValue(this.userRating.title);
      this.ratingForm.controls.value.setValue(this.userRating.value);
    }
  }

  onInfoRating() {
    this.scrollService.scrollToAnchor('apiRatingForm')
      .catch(() => {
        this.scrollService.scrollToAnchor('apiRatings');
      });
  }

  hasMoreRatings() {
    return this.ratingsMetadata && this.ratingsMetadata.pagination.total > this.ratingPageSize;
  }

  getRatingsLength() {
    return this.ratingsMetadata && this.ratingsMetadata.pagination.total ? this.ratingsMetadata.pagination.total : 0;
  }

  getShowMoreLength() {
    return this.getRatingsLength() - this.ratingPageSize;
  }

  onShowMoreRatings() {
    this.ratingPageSize = this.getRatingsLength();
    this._updateRatings();
  }

  onSortRatings({ target }) {
    this.currentOrder = target.value;
    this._updateRatings();
  }

  @HostListener(':gv-button:click', ['$event.srcElement.dataset.pageId'])
  onInternalLinkClick(pageId: string) {
    this.router.navigate(['/catalog/api/' + this.currentApi.id + '/doc'], { queryParams: { page: pageId } });
  }
}
