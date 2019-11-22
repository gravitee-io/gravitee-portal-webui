/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ConfigurationOAuth2Authentication } from './configurationOAuth2Authentication';
import { Enabled } from './enabled';
import { ConfigurationGoogleAuthentication } from './configurationGoogleAuthentication';
import { ConfigurationGithubAuthentication } from './configurationGithubAuthentication';
export interface ConfigurationAuthentication {
    forceLogin?: Enabled;
    localLogin?: Enabled;
    google?: ConfigurationGoogleAuthentication;
    github?: ConfigurationGithubAuthentication;
    oauth2?: ConfigurationOAuth2Authentication;
}
