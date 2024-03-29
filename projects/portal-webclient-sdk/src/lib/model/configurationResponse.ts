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
import { ConfigurationPortal } from './configurationPortal';
import { ConfigurationPlan } from './configurationPlan';
import { ConfigurationAnalytics } from './configurationAnalytics';
import { ConfigurationAuthentication } from './configurationAuthentication';
import { ConfigurationReCaptcha } from './configurationReCaptcha';
import { ConfigurationApplication } from './configurationApplication';
import { Enabled } from './enabled';
import { ConfigurationScheduler } from './configurationScheduler';
import { ConfigurationDocumentation } from './configurationDocumentation';


export interface ConfigurationResponse { 
    portal?: ConfigurationPortal;
    authentication?: ConfigurationAuthentication;
    scheduler?: ConfigurationScheduler;
    documentation?: ConfigurationDocumentation;
    plan?: ConfigurationPlan;
    apiReview?: Enabled;
    analytics?: ConfigurationAnalytics;
    application?: ConfigurationApplication;
    recaptcha?: ConfigurationReCaptcha;
    alert?: Enabled;
}

