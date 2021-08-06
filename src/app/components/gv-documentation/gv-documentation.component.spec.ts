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
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { GvDocumentationComponent } from './gv-documentation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Page } from '../../../../projects/portal-webclient-sdk/src/lib';

describe('GvDocumentationComponent', () => {
  const createComponent = createComponentFactory({
    component: GvDocumentationComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [RouterTestingModule],
  });

  let spectator: Spectator<GvDocumentationComponent>;
  let component;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call onPageChange if link have data-pageId ', () => {
    const page = { id: 'my-page' };
    component._pages = [page];
    component.onPageChange = jest.fn();
    const linkToPage = document.createElement('gv-button');
    linkToPage.dataset.pageId = page.id;
    spectator.element.appendChild(linkToPage);

    linkToPage.click();

    expect(component.onPageChange).toBeCalledTimes(1);
    expect(component.onPageChange).toBeCalledWith(page);
  });

  it('should not call onPageChange if link not have data-pageId ', () => {
    const pageId = 'my-page';
    component._pages = [{ id: pageId }];
    component.onPageChange = jest.fn();
    const linkToPage = document.createElement('gv-button');
    spectator.element.appendChild(linkToPage);

    linkToPage.click();

    expect(component.onPageChange).toBeCalledTimes(0);
  });

  describe('when page type is asyncApi', () => {
    const page: Page = { type: 'ASYNCAPI' } as Page;

    it('should return false on isAsciiDoc', () => {
      expect(component.isAsciiDoc(page)).toBeFalsy();
    });
    it('should return false on isMarkdown', () => {
      expect(component.isMarkdown(page)).toBeFalsy();
    });
    it('should return false on isSwagger', () => {
      expect(component.isSwagger(page)).toBeFalsy();
    });
    it('should return true on isAsyncApi', () => {
      expect(component.isAsyncApi(page)).toBeTruthy();
    });
    it('should be returned by getFirstPage', () => {
      expect(component.getFirstPage([page])).toBe(page);
    });
  });
});
