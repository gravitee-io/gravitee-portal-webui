/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * The version of the OpenAPI document: 3.12.0-SNAPSHOT
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CategoryLinks } from './categoryLinks';


export interface Category { 
    /**
     * Unique identifier of a category.
     */
    id?: string;
    name?: string;
    description?: string;
    order?: number;
    /**
     * id of the page used for category documentation.
     */
    page?: string;
    total_apis?: number;
    _links?: CategoryLinks;
}

