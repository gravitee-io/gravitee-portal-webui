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
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideMock } from './test/mock.helper.spec';
import { CurrentUserService } from './services/current-user.service';
import { UserService } from '@gravitee/ng-portal-webclient';
import { NotificationService } from './services/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from './test/translate-testing-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        AppComponent,
        provideMock(Title),
        provideMock(NotificationService),
      ]
    }).compileComponents();
  }));


  let fixture;
  let app;
  let titleMock: jasmine.SpyObj<Title>;
  beforeEach(() => {
    titleMock = TestBed.get(Title);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app).toBeTruthy();
      done();
    });
  });

});
