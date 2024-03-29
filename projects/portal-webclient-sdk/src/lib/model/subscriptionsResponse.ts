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
import { Subscription } from './subscription';


export interface SubscriptionsResponse { 
    /**
     * List of subscriptions.
     */
    data?: Array<Subscription>;
    /**
     * Map of Map of Object
     */
    metadata?: { [key: string]: { [key: string]: object; }; };
    links?: Links;
}

