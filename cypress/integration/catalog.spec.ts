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
describe('Catalog', () => {

  const catalogUrl = 'http://localhost:4200/catalog/featured';

  beforeEach(() => {
    cy.server();
    // Create fixture with alias configuration
    cy.fixture('configuration').as('configuration');
    // Create mock of route with fixture @configuration
    cy.route('GET', '/portal/environments/DEFAULT/configuration', '@configuration').as('configuration');
  });

  it('Should hide categories filter', () => {
    // Create fixture with alias apisFeatured
    cy.fixture('apis-featured').as('apisFeatured');
    // Create mock of route with fixture @apisFeatured
    cy.route('GET', '/portal/environments/DEFAULT/apis?size=-1&cat=FEATURED', '@apisFeatured').as('apisFeatured');

    cy.visit(catalogUrl);


    // Check elements
    cy.get('.catalog__section__content__title gv-option').should('exist');
    cy.get('.catalog__section__content gv-select').should('not.exist');
  });

  it('Should show categories filter', () => {

    // Create fixture with alias apisFeatured
    cy.fixture('apis-featured').then((apisResponse) => {
      // Transform data
      const data = apisResponse.data.map((api) => {
        api.views = [{ value: 'foo', label: 'foo' }, { value: 'bar', label: 'bar' }];
        return api;
      });
      // Create mock of route with transformed data
      cy.route('GET', '/portal/environments/DEFAULT/apis?size=-1&cat=FEATURED', { data }).as('apisFeatured');
    });

    cy.visit(catalogUrl);

    cy.get('.catalog__section__content__title gv-option').should('exist');
    cy.get('.catalog__section__content gv-select').should('exist');
  });

});
