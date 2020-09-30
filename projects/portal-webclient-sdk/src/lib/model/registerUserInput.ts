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


export interface RegisterUserInput { 
    /**
     * Valid email of the new user.
     */
    email: string;
    /**
     * First name of the new user.
     */
    firstname?: string;
    /**
     * Last name of the new user.
     */
    lastname?: string;
    /**
     * URL of the confirmation page to be used in the \'User Registration\' email.
     */
    confirmation_page_url?: string;
}

