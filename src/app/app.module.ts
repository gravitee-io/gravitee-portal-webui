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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateCompiler } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { ApiModule, BASE_PATH } from '@gravitee/ng-portal-webclient';
import { environment } from '../environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppsComponent } from './pages/apps/apps.component';
import { UserComponent } from './pages/user/user.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationConfirmationComponent } from './pages/registration/registration-confirmation/registration-confirmation.component';
import { ApiRequestInterceptor } from './interceptors/api-request.interceptor';
import { CategoriesComponent } from './pages/catalog/categories/categories.component';
import { FilteredCatalogComponent } from './pages/catalog/filtered-catalog/filtered-catalog.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SafePipe } from './pipes/safe.pipe';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CatalogSearchComponent } from './pages/catalog/search/catalog-search.component';
import { ApiStatesPipe } from './pipes/api-states.pipe';
import { ApiLabelsPipe } from './pipes/api-labels.pipe';
import { ConfigurationService } from './services/configuration.service';
import { ApiComponent } from './pages/api/api.component';
import { ApiDocumentationComponent } from './pages/api-documentation/api-documentation.component';
import { MarkdownModule } from 'ngx-markdown';
import { DocumentationComponent } from './pages/documentation/documentation.component';

@NgModule({
  declarations: [
    ApiComponent,
    ApiDocumentationComponent,
    ApiLabelsPipe,
    ApiStatesPipe,
    AppComponent,
    AppsComponent,
    CatalogSearchComponent,
    CategoriesComponent,
    ContactComponent,
    DashboardComponent,
    FilteredCatalogComponent,
    LayoutComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    RegistrationConfirmationComponent,
    SafePipe,
    UserAvatarComponent,
    UserComponent,
    ContactComponent,
    CatalogSearchComponent,
    DocumentationComponent,
    ApiStatesPipe,
    ApiLabelsPipe,
  ],
  imports: [
    ApiModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigurationService) => () => config.load(),
      deps: [ConfigurationService],
      multi: true
    },
    { provide: BASE_PATH, useFactory: (config: ConfigurationService) => config.get('baseUrl'), deps: [ConfigurationService] },
    { provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: environment.locales } },
    { provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true },
    ApiStatesPipe,
    ApiLabelsPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
