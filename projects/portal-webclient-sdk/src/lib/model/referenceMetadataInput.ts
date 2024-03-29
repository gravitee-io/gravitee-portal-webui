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
import { ReferenceMetadataFormatType } from './referenceMetadataFormatType';


export interface ReferenceMetadataInput { 
    /**
     * Name of the metadata.
     */
    name?: string;
    format?: ReferenceMetadataFormatType;
    /**
     * value of the metadata. Supports freemarker syntax.
     */
    value?: string;
    /**
     * default value of the metadata.
     */
    defaultValue?: string;
}

