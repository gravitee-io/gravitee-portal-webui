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
import { mockProvider } from '@ngneat/spectator';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TranslateTestingModule } from '../../../test/translate-testing-module';

import { CatalogSearchComponent } from './catalog-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../services/notification.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { ApiStatesPipe } from '../../../pipes/api-states.pipe';
import { ApiLabelsPipe } from '../../../pipes/api-labels.pipe';

describe('CatalogSearchComponent', () => {
  const createComponent = createComponentFactory({
    component: CatalogSearchComponent,
    imports: [RouterTestingModule, TranslateTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ApiStatesPipe, ApiLabelsPipe],
    providers: [mockProvider(NotificationService), mockProvider(ConfigurationService)],
  });

  let spectator: Spectator<CatalogSearchComponent>;
  let component;

  beforeEach(() => {
    spectator = createComponent();
    const configService = spectator.inject(ConfigurationService);
    configService.get.andReturn([5, 10, 15]);
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
