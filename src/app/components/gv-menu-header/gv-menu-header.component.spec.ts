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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GvMenuHeaderComponent } from './gv-menu-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMock } from '../../test/mock.helper.spec';
import { CurrentUserService } from '../../services/current-user.service';
import { TranslateTestingModule } from '../../test/helper.spec';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@gravitee/ng-portal-webclient';

describe('GvMenuHeaderComponent', () => {
  let component: GvMenuHeaderComponent;
  let fixture: ComponentFixture<GvMenuHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        GvMenuHeaderComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        GvMenuHeaderComponent,
        provideMock(TranslateService),
        provideMock(CurrentUserService),
        provideMock(ApiService)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
