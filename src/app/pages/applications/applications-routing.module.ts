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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GvButtonCreateApplicationComponent } from '../../components/gv-button-create-application/gv-button-create-application.component';
import { GvHeaderItemComponent } from '../../components/gv-header-item/gv-header-item.component';
import { GvSelectDashboardComponent } from '../../components/gv-select-dashboard/gv-select-dashboard.component';
import { FeatureEnum } from '../../model/feature.enum';
import { ApplicationTypeResolver } from '../../resolvers/application-type.resolver';
import { ApplicationResolver } from '../../resolvers/application.resolver';
import { DashboardsResolver } from '../../resolvers/dashboards.resolver';
import { EnabledApplicationTypesResolver } from '../../resolvers/enabled-application-types.resolver';
import { FeatureGuardService } from '../../services/feature-guard.service';
import { ApplicationAnalyticsComponent } from '../application/application-analytics/application-analytics.component';
import { ApplicationCreationComponent } from '../application/application-creation/application-creation.component';
import { ApplicationGeneralComponent } from '../application/application-general/application-general.component';
import { ApplicationLogsComponent } from '../application/application-logs/application-logs.component';
import { ApplicationMembersComponent } from '../application/application-members/application-members.component';
import { ApplicationMetadataComponent } from '../application/application-metadata/application-metadata.component';
import { ApplicationNotificationsComponent } from '../application/application-notifications/application-notifications.component';
import { ApplicationSubscriptionsComponent } from '../application/application-subscriptions/application-subscriptions.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { ApplicationsComponent } from './applications.component';
import { marker as i18n } from '@biesbjerg/ngx-translate-extract-marker';
import { PermissionsResolver } from '../../resolvers/permissions-resolver.service';
import { PermissionGuardService } from '../../services/permission-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'mine', pathMatch: 'full' },
  {
    path: 'mine',
    component: ApplicationsComponent,
    data: {
      title: i18n('route.myApplications'),
      icon: 'devices:server',
      animation: { type: 'slide', group: 'apps', index: 1 },
      menu: { slots: { right: GvButtonCreateApplicationComponent, expectedFeature: FeatureEnum.applicationCreation } }
    }
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    data: {
      title: i18n('route.mySubscriptions'),
      icon: 'finance:share',
      animation: { type: 'slide', group: 'apps', index: 2 },
      menu: { slots: { right: GvButtonCreateApplicationComponent, expectedFeature: FeatureEnum.applicationCreation } }
    }
  },
  {
    path: 'creation',
    component: ApplicationCreationComponent,
    canActivate: [FeatureGuardService],
    data: {
      title: i18n('route.applicationCreation'),
      expectedFeature: FeatureEnum.applicationCreation,
      animation: { type: 'fade' },
    },
    resolve: {
      enabledApplicationTypes: EnabledApplicationTypesResolver,
    }
  },
  {
    path: ':applicationId',
    data: {
      menu: { slots: { top: GvHeaderItemComponent }, animation: { type: 'fade' } },
    },
    resolve: {
      application: ApplicationResolver,
      permissions: PermissionsResolver,
    },
    children: [
      {
        path: '',
        component: ApplicationGeneralComponent,
        data: {
          icon: 'general:clipboard',
          title: i18n('route.catalogApi'),
          animation: { type: 'slide', group: 'app', index: 1 }
        },
        resolve: {
          applicationType: ApplicationTypeResolver,
        }
      },
      {
        path: 'metadata',
        component: ApplicationMetadataComponent,
        data: {
          icon: 'home:book-open',
          title: i18n('route.metadata'),
          animation: { type: 'slide', group: 'app', index: 2 },
        }
      },
      {
        path: 'subscriptions',
        component: ApplicationSubscriptionsComponent,
        data: {
          icon: 'home:key',
          title: i18n('route.subscriptions'),
          animation: { type: 'slide', group: 'app', index: 3 }
        }
      },
      {
        path: 'members',
        component: ApplicationMembersComponent,
        data: {
          icon: 'communication:group',
          title: i18n('route.members'),
          animation: { type: 'slide', group: 'app', index: 4 }
        }
      },
      {
        path: 'analytics',
        component: ApplicationAnalyticsComponent,
        data: {
          icon: 'shopping:chart-line#1',
          menu: { slots: { right: GvSelectDashboardComponent } },
          title: i18n('route.analyticsApplication'),
          animation: { type: 'slide', group: 'app', index: 5 }
        },
        resolve: {
          dashboards: DashboardsResolver
        }
      },
      {
        path: 'logs',
        component: ApplicationLogsComponent,
        data: {
          icon: 'communication:clipboard-list',
          title: i18n('route.logsApplication'),
          animation: { type: 'slide', group: 'app', index: 6 }
        }
      },
      {
        path: 'notifications',
        component: ApplicationNotificationsComponent,
        canActivate: [PermissionGuardService],
        data: {
          icon: 'general:notifications#2',
          title: i18n('route.notifications'),
          animation: { type: 'slide', group: 'app', index: 7 },
          expectedPermissions: ['NOTIFICATION-R'],
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule {
}
