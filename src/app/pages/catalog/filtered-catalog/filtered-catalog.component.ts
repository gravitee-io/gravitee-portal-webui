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
import { Api, ApiMetrics, ApiService, Category, FilterApiQuery } from '../../../../../projects/portal-webclient-sdk/src/lib';
import '@gravitee/ui-components/wc/gv-promote';
import '@gravitee/ui-components/wc/gv-card-list';
import '@gravitee/ui-components/wc/gv-card-full';
import '@gravitee/ui-components/wc/gv-card';
import '@gravitee/ui-components/wc/gv-select';
import '@gravitee/ui-components/wc/gv-option';
import { marker as i18n } from '@biesbjerg/ngx-translate-extract-marker';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchQueryParam } from '../../../utils/search-query-param.enum';
import { TranslateService } from '@ngx-translate/core';
import { ApiStatesPipe } from '../../../pipes/api-states.pipe';
import { ApiLabelsPipe } from '../../../pipes/api-labels.pipe';
import { ConfigurationService } from '../../../services/configuration.service';
import { FeatureEnum } from '../../../model/feature.enum';
import { createPromiseList } from 'src/app/utils/utils';

@Component({
  selector: 'app-all',
  templateUrl: './filtered-catalog.component.html',
  styleUrls: ['./filtered-catalog.component.css'],
})
export class FilteredCatalogComponent implements OnInit {
  static readonly RANDOM_MAX_SIZE = 4;
  static readonly DEFAULT_DISPLAY = 'cards';

  private page: number;
  private size: number;

  allApis: any[];
  randomList: any[];
  promotedApi: Promise<any>;
  promotedApiPath: string;
  promotedMetrics: ApiMetrics;
  filterApiQuery: FilterApiQuery;
  categories: Array<string>;
  currentCategory: string;
  paginationData: any;
  options: any[];
  currentDisplay: string;
  empty: boolean;
  category: Category;
  fragments: any = {
    pagination: 'pagination',
    filter: 'filter',
  };
  private defaultCategory: { value; label };
  emptyIcon: string;
  emptyMessage: any;

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiStates: ApiStatesPipe,
    private apiLabels: ApiLabelsPipe,
    private config: ConfigurationService,
  ) {
    this.allApis = [];
  }

  ngOnInit() {
    this.emptyIcon = this.activatedRoute.snapshot.data.icon || 'general:sad';
    this.translateService
      .get(i18n('catalog.defaultCategory'))
      .toPromise()
      .then(
        (label) =>
          (this.defaultCategory = {
            value: '',
            label,
          }),
      );
    this.currentDisplay =
      this.activatedRoute.snapshot.queryParamMap.get('display') ||
      localStorage.getItem('user-display-mode') ||
      FilteredCatalogComponent.DEFAULT_DISPLAY;
    this._initDisplayOptions();

    this.filterApiQuery = this.activatedRoute.snapshot.data.filterApiQuery;

    this.activatedRoute.queryParamMap.subscribe((params) => {
      const page = parseInt(params.get(SearchQueryParam.PAGE), 10) || 1;
      const size = parseInt(params.get(SearchQueryParam.SIZE), 10) || 6;
      const categoryPath = this._getCategoryPath();

      if (categoryPath) {
        this.currentCategory = categoryPath;
        if (this.page !== page || this.size !== size) {
          this.page = page;
          this.size = size;
          this._loadCategory();
        }
      } else {
        const category = params.get('category');
        if (this.currentCategory !== category || this.page !== page || this.size !== size) {
          this.currentCategory = category;
          this.page = page;
          this.size = size;
          this._load();
        }
      }
    });
  }

  private _initDisplayOptions() {
    this.options = [
      {
        id: FilteredCatalogComponent.DEFAULT_DISPLAY,
        icon: 'layout:layout-4-blocks',
        title: i18n('catalog.display.cards'),
      },
      { id: 'list', icon: 'layout:layout-horizontal', title: i18n('catalog.display.list') },
    ].map((option) => {
      this.translateService.get(option.title).subscribe((title) => (option.title = title));
      // @ts-ignore
      option.title = '';
      return option;
    });
  }

  _load() {
    if (this.page === 1) {
      this.promotedApi = this._loadPromotedApi({ size: 1, filter: this.filterApiQuery, promoted: true });
    }
    return Promise.all([this._loadRandomList(), this._loadCards()]);
  }

  _loadRandomList() {
    const { list, deferredList } = createPromiseList(FilteredCatalogComponent.RANDOM_MAX_SIZE);
    this.randomList = list;

    return this.apiService
      .getApis({ size: FilteredCatalogComponent.RANDOM_MAX_SIZE, _filter: this.filterApiQuery })
      .toPromise()
      .then((apiResponse) => {
        apiResponse.data.forEach((a, index) => {
          // @ts-ignore
          a.states = this.apiStates.transform(a);
          deferredList.shift().resolve(a);
        });
        deferredList.forEach((d) => d.resolve(undefined));
      })
      .catch((err) => {
        deferredList.forEach((d) => d.reject(err));
      });
  }

  async _loadPromotedApi(requestParams) {
    this.empty = false;
    return this.apiService
      .getApis(requestParams)
      .toPromise()
      .then(async (response) => {
        const promoted = response.data[0];
        if (promoted) {
          this.promotedMetrics = await this.apiService.getApiMetricsByApiId({ apiId: promoted.id }).toPromise();
          this.promotedApiPath = `/catalog/api/${promoted.id}`;
        } else {
          const key = this.inCategory() ? i18n('catalog.categories.emptyMessage') : `catalog.${this.filterApiQuery}.emptyMessage`;
          this.translateService
            .get(key)
            .toPromise()
            .then((translation) => {
              this.emptyMessage = translation;
              this.empty = true;
            });
        }
        return promoted;
      });
  }

  _loadCategory() {
    this.category = this.activatedRoute.snapshot.data.category;
    this.promotedApi = this._loadPromotedApi({ size: 1, category: this.currentCategory, promoted: true });
    return this._loadCards();
  }

  async _loadCards() {
    return this.apiService
      .getApis({
        page: this.page,
        size: this.size,
        filter: this.filterApiQuery,
        category: this.currentCategory,
        promoted: false,
      })
      .toPromise()
      .then(async ({ data, metadata }) => {
        this.paginationData = metadata.pagination;

        this.allApis = data.map((api) => {
          const metrics = this.apiService.getApiMetricsByApiId({ apiId: api.id }).toPromise();

          const item = metrics.then(() => {
            // @ts-ignore
            api.states = this.apiStates.transform(api);
            api.labels = this.apiLabels.transform(api);
            return api;
          });

          return { item, metrics };
        });

        if (this.hasCategoryMode() && this.categories == null) {
          this.apiService.getApis({ size: -1, filter: this.filterApiQuery }).subscribe((apisResponse) => {
            // @ts-ignore
            const categories = this._getCategories(apisResponse.data.slice(1));
            if (categories.length > 0) {
              // @ts-ignore
              this.categories = [this.defaultCategory].concat(categories);
            } else {
              this.categories = [];
            }
          });
        }
        return this.allApis;
      })
      .catch(() => {
        this.allApis = [];
      });
  }

  private _getCategories(allPage) {
    return []
      .concat(
        ...new Set(
          [].concat(
            ...allPage.map((api) => {
              return api.categories;
            }),
          ),
        ).values(),
      )
      .sort((a: string, b: string) => a.localeCompare(b));
  }

  @HostListener(':gv-pagination:paginate', ['$event.detail'])
  _onPaginate({ page }) {
    if (this.paginationData.current_page !== page) {
      const queryParams = {};
      queryParams[SearchQueryParam.PAGE] = page;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
        fragment: this.fragments.pagination,
      });
    }
  }

  @HostListener(':gv-option:select', ['$event.detail'])
  _onChangeDisplay({ id }) {
    this.router
      .navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { display: id },
        queryParamsHandling: 'merge',
        fragment: this.fragments.filter,
      })
      .then(() => {
        this.currentDisplay = id;
        localStorage.setItem('user-display-mode', id);
      });
  }

  onSelectCategory({ target }) {
    if (target.value !== '') {
      const queryParams = { category: target.value };
      queryParams[SearchQueryParam.PAGE] = 1;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
        fragment: this.fragments.filter,
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        fragment: this.fragments.filter,
      });
    }
  }

  get showCards() {
    return this.currentDisplay === FilteredCatalogComponent.DEFAULT_DISPLAY;
  }

  hasCategoryMode() {
    return this.config.hasFeature(FeatureEnum.categoryMode);
  }

  _getCategoryPath() {
    return this.activatedRoute.snapshot.params.categoryId;
  }

  inCategory() {
    return this._getCategoryPath() != null;
  }

  inCategoryAll() {
    return this.filterApiQuery === FilterApiQuery.ALL;
  }

  get canFilter() {
    return !this.inCategory() && this.hasCategoryMode() && this.categories && this.categories.length > 0;
  }

  @HostListener(':gv-card-full:click', ['$event.detail'])
  goToApi(api: Promise<Api>) {
    Promise.resolve(api).then((_api) => {
      this.router.navigate(['/catalog/api/' + _api.id]);
    });
  }

  getRouteTitle() {
    return this.activatedRoute.snapshot.data.title;
  }

  goToSearch(tag: string) {
    this.router.navigate(['catalog/search'], { queryParams: { q: tag } });
  }
}
