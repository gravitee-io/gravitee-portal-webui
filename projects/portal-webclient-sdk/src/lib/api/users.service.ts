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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { ChangeUserPasswordInput } from '../model/models';
import { CustomUserFields } from '../model/models';
import { ErrorResponse } from '../model/models';
import { FinalizeRegistrationInput } from '../model/models';
import { RegisterUserInput } from '../model/models';
import { ResetUserPasswordInput } from '../model/models';
import { User } from '../model/models';
import { UsersResponse } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface ChangeUserPasswordRequestParams {
    /** Use to change a user\&#39;s password. */
    changeUserPasswordInput?: ChangeUserPasswordInput;
}

export interface FinalizeUserRegistrationRequestParams {
    /** Used to finalize a user registration. */
    finalizeRegistrationInput?: FinalizeRegistrationInput;
}

export interface GetUserAvatarRequestParams {
    /** Id of a user */
    userId: string;
}

export interface GetUsersRequestParams {
    /** The page number for pagination. */
    page?: number;
    /** The number of items per page for pagination. If the size is 0, the response contains only metadata and returns the values as for a non-paged resource. If the size is -1, the response contains all datas.  */
    size?: number;
    /** query string to be used in the search engine */
    q?: string;
}

export interface RegisterNewUserRequestParams {
    /** Used to register a new User. */
    registerUserInput?: RegisterUserInput;
}

export interface ResetUserPasswordRequestParams {
    /** Use to reset a user\&#39;s password. */
    resetUserPasswordInput?: ResetUserPasswordInput;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

    protected basePath = 'http://localhost:8083/portal/environments/DEFAULT';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Change a user\&#39;s password after a reset requests
     * Perform the password update for a user 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public changeUserPassword(requestParameters: ChangeUserPasswordRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<User>;
    public changeUserPassword(requestParameters: ChangeUserPasswordRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<User>>;
    public changeUserPassword(requestParameters: ChangeUserPasswordRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<User>>;
    public changeUserPassword(requestParameters: ChangeUserPasswordRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const changeUserPasswordInput = requestParameters.changeUserPasswordInput;

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<User>(`${this.configuration.basePath}/users/_change_password`,
            changeUserPasswordInput,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Finalize user registration.
     * Create a new user for the portal.  User registration must be enabled. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public finalizeUserRegistration(requestParameters: FinalizeUserRegistrationRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<User>;
    public finalizeUserRegistration(requestParameters: FinalizeUserRegistrationRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<User>>;
    public finalizeUserRegistration(requestParameters: FinalizeUserRegistrationRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<User>>;
    public finalizeUserRegistration(requestParameters: FinalizeUserRegistrationRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const finalizeRegistrationInput = requestParameters.finalizeRegistrationInput;

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<User>(`${this.configuration.basePath}/users/registration/_finalize`,
            finalizeRegistrationInput,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve a user\&#39;s avatar
     * Retrieve a user\&#39;s avatar. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserAvatar(requestParameters: GetUserAvatarRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'image/_*' | 'application/json'}): Observable<Blob>;
    public getUserAvatar(requestParameters: GetUserAvatarRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'image/_*' | 'application/json'}): Observable<HttpResponse<Blob>>;
    public getUserAvatar(requestParameters: GetUserAvatarRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'image/_*' | 'application/json'}): Observable<HttpEvent<Blob>>;
    public getUserAvatar(requestParameters: GetUserAvatarRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'image/_*' | 'application/json'}): Observable<any> {
        const userId = requestParameters.userId;
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getUserAvatar.');
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'image/_*',
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get(`${this.configuration.basePath}/users/${encodeURIComponent(String(userId))}/avatar`,
            {
                responseType: "blob",
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List platform users.
     * List platform users from identity providers.  User must have the MANAGEMENT_USERS[READ] permission. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUsers(requestParameters: GetUsersRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<UsersResponse>;
    public getUsers(requestParameters: GetUsersRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<UsersResponse>>;
    public getUsers(requestParameters: GetUsersRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<UsersResponse>>;
    public getUsers(requestParameters: GetUsersRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const page = requestParameters.page;
        const size = requestParameters.size;
        const q = requestParameters.q;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page !== undefined && page !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>page, 'page');
        }
        if (size !== undefined && size !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>size, 'size');
        }
        if (q !== undefined && q !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>q, 'q');
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<UsersResponse>(`${this.configuration.basePath}/users/_search`,
            null,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List all the Custom User Fields.
     * Provide the list of custom user fields asked to the new users. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listCustomUserFields(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<CustomUserFields>>;
    public listCustomUserFields(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<CustomUserFields>>>;
    public listCustomUserFields(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<CustomUserFields>>>;
    public listCustomUserFields(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<CustomUserFields>>(`${this.configuration.basePath}/configuration/users/custom-fields`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register a new user.
     * Register a new user for the portal. As a result, an email is sent with an activation link.  User registration must be enabled.\\ A SMTP server must have been configured. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerNewUser(requestParameters: RegisterNewUserRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<User>;
    public registerNewUser(requestParameters: RegisterNewUserRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<User>>;
    public registerNewUser(requestParameters: RegisterNewUserRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<User>>;
    public registerNewUser(requestParameters: RegisterNewUserRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const registerUserInput = requestParameters.registerUserInput;

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<User>(`${this.configuration.basePath}/users/registration`,
            registerUserInput,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Reset a user\&#39;s password
     * Send an email with a link so the user with this email can provide a new password. The user must be internally managed and active. 
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public resetUserPassword(requestParameters: ResetUserPasswordRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public resetUserPassword(requestParameters: ResetUserPasswordRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public resetUserPassword(requestParameters: ResetUserPasswordRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public resetUserPassword(requestParameters: ResetUserPasswordRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const resetUserPasswordInput = requestParameters.resetUserPasswordInput;

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        if (this.configuration.apiKeys) {
            const key: string | undefined = this.configuration.apiKeys["CookieAuth"] || this.configuration.apiKeys["Auth-Graviteeio-APIM"];
            if (key) {
            }
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/users/_reset_password`,
            resetUserPasswordInput,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
