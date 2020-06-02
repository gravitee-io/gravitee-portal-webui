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
import { ChangeDetectorRef, Component, OnInit, NgZone } from '@angular/core';
import '@gravitee/ui-components/wc/gv-list';
import '@gravitee/ui-components/wc/gv-rating-list';
import '@gravitee/ui-components/wc/gv-confirm';
import {
  ApiService,
  SubscriptionService,
  Subscription, GetSubscriptionsRequestParams, ApplicationService, PermissionsService
} from '@gravitee/ng-portal-webclient';
import { ActivatedRoute, Router } from '@angular/router';
import { marker as i18n } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import StatusEnum = Subscription.StatusEnum;
import { NotificationService } from '../../../services/notification.service';
import { getPictureDisplayName } from '@gravitee/ui-components/src/lib/item';

@Component({
  selector: 'app-application-subscriptions',
  templateUrl: './application-subscriptions.component.html',
  styleUrls: ['./application-subscriptions.component.css']
})
export class ApplicationSubscriptionsComponent implements OnInit {

  subscriptions: Array<Subscription>;
  options: any;
  format: any;
  form: FormGroup = this.formBuilder.group({
    api: '',
    status: [],
    apiKey: '',
  });
  apisOptions: any;
  statusOptions: any;
  metadata: any;
  selectedSubscriptions: Array<string>;
  selectedSubscription: Subscription;
  displayExpiredApiKeys: boolean;
  canDelete: boolean;
  canUpdate: boolean;
  isSearching: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private subscriptionService: SubscriptionService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private permissionsService: PermissionsService,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
  }

  ngOnInit() {
    const application = this.route.snapshot.data.application;
    const permissions = this.route.snapshot.data.permissions;
    if (application) {
      this.canDelete = permissions.SUBSCRIPTION && permissions.SUBSCRIPTION.includes('D');
      this.canUpdate = permissions.SUBSCRIPTION && permissions.SUBSCRIPTION.includes('U');
      this.format = (key) => this.translateService.get(key).toPromise();
      this.apisOptions = [];
      this.options = {
        selectable: true,
        data: [
          {
            field: 'api', type: 'image',
            alt: (item) => this.metadata[item.api] && getPictureDisplayName(this.metadata[item.api]),
            format: (item) => this.metadata[item] && this.metadata[item].pictureUrl
          },
          {
            field: 'api', label: i18n('application.subscriptions.api'),
            tag: (item) => this.metadata[item.api] && this.metadata[item.api].version,
            format: (item) => this.metadata[item] && this.metadata[item].name
          },
          {
            field: 'plan', label: i18n('application.subscriptions.plan'),
            format: (item) => this.metadata[item] && this.metadata[item].name
          },
          { field: 'created_at', type: 'date', label: i18n('application.subscriptions.created_at'), width: '160px' },
          {
            field: 'subscribed_by', label: i18n('application.subscriptions.subscribed_by'),
            format: (item) => this.metadata[item] && this.metadata[item].name, width: '190px'
          },
          {
            field: 'status', label: i18n('application.subscriptions.status'), width: '80px',
            format: (key) => {
              const statusKey = 'common.status.' + key.toUpperCase();
              return this.translateService.get(statusKey).toPromise();
            },
            style: (item) => {
              switch (item.status.toUpperCase()) {
                case StatusEnum.ACCEPTED:
                  return 'color: #009B5B';
                case StatusEnum.PAUSED:
                case StatusEnum.PENDING:
                  return 'color: #FA8C16';
                case StatusEnum.REJECTED:
                  return 'color: #F5222D';
              }
            },
          },
          {
            type: 'gv-button',
            width: '25px',
            attributes: {
              link: true,
              href: (item) => `/catalog/api/${item.api}`,
              title: i18n('application.subscriptions.navigateToApi'),
              icon: 'communication:share',
              onClick: (item, e) => this.goToApi(item.api),
            }
          },
        ]
      };

      this.applicationService.getSubscriberApisByApplicationId({ applicationId: application.id, size: -1 }).toPromise().then(apis => {
        this.apisOptions = [];
        apis.data.forEach(api => {
          this.apisOptions.push({ label: api.name + ' (' + api.version + ')', value: api.id });
        });
      });

      const statusKeys = Object.keys(StatusEnum).map(s => 'common.status.' + s);
      this.translateService.get(statusKeys).toPromise().then(translatedKeys => {
        this.statusOptions = Object.keys(StatusEnum).map((s, i) => {
          return { label: Object.values(translatedKeys)[i], value: s };
        });
        this.form.patchValue({ status: [StatusEnum.ACCEPTED, StatusEnum.PAUSED, StatusEnum.PENDING] });
        this.search(true);
      });

    }
  }

  canRenew(subscription: Subscription) {
    return subscription && this.canUpdate
      && [`${StatusEnum.ACCEPTED}`, `${StatusEnum.PAUSED}`].includes(subscription.status.toUpperCase());
  }

  canRevoke(subscription: Subscription) {
    return subscription && this.canDelete
      && [`${StatusEnum.ACCEPTED}`, `${StatusEnum.PAUSED}`, `${StatusEnum.PENDING}`].includes(subscription.status.toUpperCase());
  }

  goToApi(apiId: string) {
    this.ngZone.run(() => this.router.navigate(['/catalog/api/', apiId ]));
  }

  search(displaySubscription?) {
    const applicationId = this.route.snapshot.params.applicationId;
    const requestParameters: GetSubscriptionsRequestParams = { applicationId };
    if (this.form.value.api) {
      requestParameters.apiId = this.form.value.api;
    }
    if (this.form.value.status) {
      requestParameters.statuses = this.form.value.status;
    }
    this.isSearching = true;
    this.subscriptionService.getSubscriptions(requestParameters).toPromise().then(response => {
      this.subscriptions = response.data;
      this.metadata = response.metadata;
      if (displaySubscription && this.route.snapshot.queryParams.subscription) {
        const subscription = this.subscriptions.find(s => s.id === this.route.snapshot.queryParams.subscription);
        this.selectedSubscriptions = [subscription.id];
        this.onSelectSubscription(subscription);
      } else {
        this.selectedSubscriptions = [];
        this.onSelectSubscription(null);
      }
    }).finally(() => this.isSearching = false);
  }

  reset() {
    this.form.reset({
      status: [StatusEnum.ACCEPTED, StatusEnum.PAUSED, StatusEnum.PENDING]
    });
  }

  closeSubscription(subscriptionId) {
    this.subscriptionService.closeSubscription({ subscriptionId }).toPromise().then(() => {
      this.notificationService.success(i18n('application.subscriptions.success.close'));
      this.search(false);
    });
  }

  renewSubscription(subscriptionId) {
    this.subscriptionService.renewKeySubscription({ subscriptionId }).toPromise().then(() => {
      this.notificationService.success(i18n('application.subscriptions.success.renew'));
      this.search(true);
    });
  }

  revokeApiKey(subscriptionId, keyId) {
    this.subscriptionService.revokeKeySubscription({ subscriptionId, keyId }).toPromise().then(() => {
      this.notificationService.success(i18n('application.subscriptions.apiKey.success.revoke'));
      this.search(true);
    });
  }

  onSelectSubscription(subscription: Subscription) {
    this.router.navigate([], { queryParams: { subscription: subscription ? subscription.id : null }, fragment: 's' });
    if (subscription) {
      this.selectedSubscription = subscription;
      if (!this.selectedSubscription.keys || !this.selectedSubscription.keys[0]) {
        this.subscriptionService.getSubscriptionById({ subscriptionId: subscription.id, include: ['keys'] })
          .toPromise()
          .then(sub => {
            this.subscriptions.find(s => s.id === subscription.id).keys = sub.keys;
            this.ref.detectChanges();
          });
      }
    } else {
      delete this.selectedSubscription;
    }
  }

  getValidApiKeys(sub: Subscription) {
    if (sub && sub.keys) {
      const validApiKeys = sub.keys.filter(apiKey => this.isApiKeyValid(apiKey));
      if (validApiKeys && validApiKeys.length > 0) {
        return validApiKeys;
      }
    }
  }

  getExpiredApiKeys(sub: Subscription) {
    if (sub && sub.keys) {
      const expiredApiKeys = sub.keys.filter(apiKey => !this.isApiKeyValid(apiKey));
      if (expiredApiKeys && expiredApiKeys.length > 0) {
        return expiredApiKeys;
      }
    }
  }

  endAt(apiKey) {
    return apiKey.revoked_at || apiKey.expire_at;
  }

  apiKeyEnded(apiKey) {
    const endAt = this.endAt(apiKey);
    return endAt && (new Date(endAt) < new Date());
  }

  isApiKeyValid(apiKey) {
    return !this.endAt(apiKey) || !this.apiKeyEnded(apiKey);
  }

  toggleDisplayExpired() {
    this.displayExpiredApiKeys = !this.displayExpiredApiKeys;
    this.ref.detectChanges();
  }
}
