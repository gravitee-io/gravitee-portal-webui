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
import { Response } from './response';
import { Request } from './request';
import { HttpMethod } from './httpMethod';


export interface Log { 
    /**
     * Unique identifier of a log.
     */
    id?: string;
    /**
     * Instant of the log.
     */
    timestamp?: number;
    /**
     * Request identifier.
     */
    transactionId?: string;
    /**
     * Path of the request.
     */
    path?: string;
    method?: HttpMethod;
    /**
     * HTTP status code of the request.
     */
    status?: number;
    /**
     * Request duration.
     */
    responseTime?: number;
    /**
     * Request content length.
     */
    requestContentLength?: number;
    /**
     * Response content length.
     */
    responseContentLength?: number;
    /**
     * Plan used by the request.
     */
    plan?: string;
    /**
     * API called by the request.
     */
    api?: string;
    request?: Request;
    response?: Response;
    /**
     * Map of Map of Object
     */
    metadata?: { [key: string]: { [key: string]: object; }; };
    /**
     * API Gateway host.
     */
    host?: string;
    /**
     * User identifier.
     */
    user?: string;
    /**
     * Security type of the request.
     */
    securityType?: string;
    /**
     * Token used by the request.
     */
    securityToken?: string;
}

