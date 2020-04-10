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
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, Dashboard } from '@gravitee/ng-portal-webclient';
import '@gravitee/ui-components/wc/gv-chart-line';
import '@gravitee/ui-components/wc/gv-chart-pie';
import '@gravitee/ui-components/wc/gv-chart-map';
import '@gravitee/ui-components/wc/gv-stats';
import { GvAnalyticsDashboardComponent } from '../../../components/gv-analytics-dashboard/gv-analytics-dashboard.component';
import { GvAnalyticsFiltersComponent } from '../../../components/gv-analytics-filters/gv-analytics-filters.component';

@Component({
  selector: 'app-application-analytics',
  templateUrl: './application-analytics.component.html',
  styleUrls: ['./application-analytics.component.css']
})
export class ApplicationAnalyticsComponent implements OnInit {

  application: Application;
  dashboard: Dashboard;

  @ViewChild(GvAnalyticsFiltersComponent)
  filtersComponent: GvAnalyticsFiltersComponent;
  @ViewChild(GvAnalyticsDashboardComponent)
  dashboardComponent: GvAnalyticsDashboardComponent;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.application = this.route.snapshot.data.application;
    const dashboards = this.route.snapshot.data.dashboards;
    const dashboardParam = this.route.snapshot.queryParams.dashboard;
    if (dashboards) {
      if (dashboardParam) {
        this.dashboard = dashboards.find((dashboard) => dashboard.id === dashboardParam);
      } else {
        this.dashboard = dashboards[0];
      }
      this.route.queryParams.subscribe(param => {
        if (param.dashboard && this.filtersComponent && this.dashboardComponent && param.dashboard !== this.dashboard.id) {
          this.dashboardComponent.dashboard = this.dashboard = dashboards.find((dashboard) => dashboard.id === param.dashboard);
          this.filtersComponent.reset();
          this.dashboardComponent.refresh();
        }
      });
    }
  }
}
