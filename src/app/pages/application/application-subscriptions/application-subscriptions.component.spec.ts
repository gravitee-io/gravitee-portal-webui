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
import { TranslateTestingModule } from '../../../test/translate-testing-module';

import { ApplicationSubscriptionsComponent } from './application-subscriptions.component';
import { GvPageComponent } from '../../../components/gv-page/gv-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeysService, Subscription } from '@gravitee/ng-portal-webclient';
import { EMPTY } from 'rxjs';
import StatusEnum = Subscription.StatusEnum;

describe('ApplicationSubscriptionsComponent', () => {
  let component: ApplicationSubscriptionsComponent;
  let fixture: ComponentFixture<ApplicationSubscriptionsComponent>;
  const shouldNotVerifyApiKeyTestCases = [
    { valid: false, input: '' },
    { valid: true, input: '' },
    { valid: false, input: 'mock' },
  ];

  const canUseCustomApiKeyTestCases = [
    { securityDefinition: '{"useCustomApiKey":true}', expected: true },
    { securityDefinition: '{"useCustomApiKey":false}', expected: false },
    { securityDefinition: '{"badKey":true}', expected: false },
    { securityDefinition: null, expected: false },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSubscriptionsComponent, GvPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, TranslateTestingModule, FormsModule, ReactiveFormsModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  shouldNotVerifyApiKeyTestCases.forEach((test) => {
    it(`should verify API key availability when validity is ${test.valid} and value is ${test.input}`, () => {
      const spyKeyService = spyOn(KeysService.prototype, 'verifyApiKeyAvailability')
        .and.returnValue(EMPTY);

      const apiKeyInput = {
        target: {
          value: test.input,
          valid: test.valid
        }
      }

      component.verifyApiKeyAvailability(apiKeyInput);

      expect(spyKeyService).not.toHaveBeenCalled();
    });
  });

  canUseCustomApiKeyTestCases.forEach((test) => {
    it(`canUseCustomApiKey should return ${test.expected} for security definition ${test.securityDefinition}`, () => {
      component.selectedSubscription = {
        id: '',
        api: '',
        application: '',
        status: StatusEnum.ACCEPTED,
        plan: 'idPlan'
      };
      component.metadata = {
        idPlan: {
          securityDefinition: test.securityDefinition
        }
      };

      expect(component.canUseCustomApiKey()).toEqual(test.expected);
    });
  })

});
