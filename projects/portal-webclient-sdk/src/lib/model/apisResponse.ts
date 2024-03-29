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
import { Links } from './links';
import { Api } from './api';


export interface ApisResponse { 
    /**
     * List of API.
     */
    data?: Array<Api>;
    /**
     * Map of Map of Object
     */
    metadata?: { [key: string]: { [key: string]: object; }; };
    links?: Links;
}

