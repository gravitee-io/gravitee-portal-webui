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
import '@gravitee/ui-components/wc/gv-header';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Api, ApiService, Application, ApplicationService, User, PortalService } from '@gravitee/ng-portal-webclient';
import { Component, HostListener, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { NavRouteService } from '../../services/nav-route.service';

@Component({
  selector: 'app-gv-header-item',
  templateUrl: './gv-header-item.component.html',
})
export class GvHeaderItemComponent implements OnInit {
  public item: Promise<Api | Application>;
  public currentUser: User;
  private itemId: string;
  private currentRoute: ActivatedRoute;
  private _subscribeUrl: string;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public navRouteService: NavRouteService,
              public currentUserService: CurrentUserService,
              public apiService: ApiService,
              public applicationService: ApplicationService,
              public portalService: PortalService,
  ) {
  }

  ngOnInit() {
    this.loadData();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  private loadData() {
    this.currentRoute = this.navRouteService.findCurrentRoute(this.activatedRoute);
    if (this.currentRoute) {
      const params = this.currentRoute.snapshot.params;
      if (params.apiId && this.itemId !== params.apiId) {
        this.itemId = params.apiId;
        this._subscribeUrl = `catalog/api/${this.itemId}/subscribe`;
        this.item = this.apiService
          .getApiByApiId({ apiId: this.itemId })
          .toPromise()
          .catch((err) => Promise.reject(err));
      } else if (params.applicationId && params.applicationId !== this.itemId) {
        this.itemId = params.applicationId;
        this.item = this.applicationService
          .getApplicationByApplicationId({ applicationId: this.itemId })
          .toPromise()
          .catch((err) => Promise.reject(err));
      } else if (params.categoryId && params.categoryId !== this.itemId) {
        this.itemId = params.categoryId;
        this.item = this.portalService.getViewByViewId({ viewId: this.itemId })
          .toPromise()
          .catch((err) => Promise.reject(err));
      }
    }

    this.currentUserService.get().subscribe(newCurrentUser => {
      this.currentUser = newCurrentUser;
    });
  }

  @HostListener('document:gv-header-item:refresh')
  onRefresh() {
    this.loadData();
  }

  canSubscribe() {
    return this._subscribeUrl && !this.router.isActive(this._subscribeUrl, true);
  }

  onSubscribe() {
    this.router.navigate([this._subscribeUrl]);
  }
}
