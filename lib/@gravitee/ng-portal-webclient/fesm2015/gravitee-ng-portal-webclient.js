import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, SkipSelf, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
class CustomHttpParameterCodec {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}

const BASE_PATH = new InjectionToken('basePath');
const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

class Configuration {
    constructor(configurationParameters = {}) {
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        const type = contentTypes.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        const type = accepts.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}

let AnalyticsService = class AnalyticsService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    exportApplicationLogsByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/_export`, null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationAnalytics(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const interval = requestParameters.interval;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const type = requestParameters.type;
        const range = requestParameters.range;
        const aggs = requestParameters.aggs;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', interval);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', type);
        }
        if (range !== undefined && range !== null) {
            queryParameters = queryParameters.set('range', range);
        }
        if (aggs !== undefined && aggs !== null) {
            queryParameters = queryParameters.set('aggs', aggs);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/analytics`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationLogByApplicationIdAndLogId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const logId = requestParameters.logId;
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const timestamp = requestParameters.timestamp;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/${encodeURIComponent(String(logId))}`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationLogs(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
AnalyticsService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
AnalyticsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AnalyticsService, providedIn: "root" });
AnalyticsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], AnalyticsService);

let ApiService = class ApiService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    createApiRatingForApi(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling createApiRatingForApi.');
        }
        const RatingInput = requestParameters.RatingInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/ratings`, RatingInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApiByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiByApiId.');
        }
        const include = requestParameters.include;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach((element) => {
                queryParameters = queryParameters.append('include', element);
            });
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApiPlansByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiPlansByApiId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/plans`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApiRatingsByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiRatingsByApiId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/ratings`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApis(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        const context_path = requestParameters.context_path;
        const label = requestParameters.label;
        const version = requestParameters.version;
        const name = requestParameters.name;
        const view = requestParameters.view;
        const cat = requestParameters.cat;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (context_path !== undefined && context_path !== null) {
            queryParameters = queryParameters.set('context-path', context_path);
        }
        if (label !== undefined && label !== null) {
            queryParameters = queryParameters.set('label', label);
        }
        if (version !== undefined && version !== null) {
            queryParameters = queryParameters.set('version', version);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', name);
        }
        if (view !== undefined && view !== null) {
            queryParameters = queryParameters.set('view', view);
        }
        if (cat !== undefined && cat !== null) {
            queryParameters = queryParameters.set('cat', cat);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPageByApiIdAndPageId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        const pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/pages/${encodeURIComponent(String(pageId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPagesByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const homepage = requestParameters.homepage;
        const parent = requestParameters.parent;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/pages`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPictureByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPictureByApiId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/picture`, {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
ApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
ApiService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ApiService_Factory() { return new ApiService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ApiService, providedIn: "root" });
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], ApiService);

let ApplicationsService = class ApplicationsService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    createApplication(requestParameters, observe = 'body', reportProgress = false) {
        const ApplicationInput = requestParameters.ApplicationInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications`, ApplicationInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    createApplicationMember(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationMember.');
        }
        const MemberInput = requestParameters.MemberInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members`, MemberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    createApplicationNotification(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationNotification.');
        }
        const GenericNotificationConfig = requestParameters.GenericNotificationConfig;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/notifications`, GenericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteApplicationByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationByApplicationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteApplicationMember(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationMember.');
        }
        const memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling deleteApplicationMember.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members/${encodeURIComponent(String(memberId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteApplicationNotificationByNotificationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
        const notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/notifications/${encodeURIComponent(String(notificationId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    exportApplicationLogsByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/_export`, null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationAnalytics(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const interval = requestParameters.interval;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const type = requestParameters.type;
        const range = requestParameters.range;
        const aggs = requestParameters.aggs;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', interval);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', type);
        }
        if (range !== undefined && range !== null) {
            queryParameters = queryParameters.set('range', range);
        }
        if (aggs !== undefined && aggs !== null) {
            queryParameters = queryParameters.set('aggs', aggs);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/analytics`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationByApplicationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationLogByApplicationIdAndLogId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const logId = requestParameters.logId;
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        const timestamp = requestParameters.timestamp;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs/${encodeURIComponent(String(logId))}`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationLogs(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const from = requestParameters.from;
        const to = requestParameters.to;
        const query = requestParameters.query;
        const field = requestParameters.field;
        const order = requestParameters.order;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (from !== undefined && from !== null) {
            queryParameters = queryParameters.set('from', from);
        }
        if (to !== undefined && to !== null) {
            queryParameters = queryParameters.set('to', to);
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', query);
        }
        if (field !== undefined && field !== null) {
            queryParameters = queryParameters.set('field', field);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', order);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/logs`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationMemberByApplicationIdAndMemberId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
        const memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members/${encodeURIComponent(String(memberId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplicationPictureByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationPictureByApplicationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/picture`, {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getApplications(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getMembersByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getMembersByApplicationId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getNotificationsByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getNotificationsByApplicationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/notifications`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    renewApplicationSecret(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling renewApplicationSecret.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/_renew_secret`, null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    transferMemberOwnership(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling transferMemberOwnership.');
        }
        const TransferOwnershipInput = requestParameters.TransferOwnershipInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members/_transfer_ownership`, TransferOwnershipInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateApplicationByApplicationId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationByApplicationId.');
        }
        const Application = requestParameters.Application;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}`, Application, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateApplicationMemberByApplicationIdAndMemberId(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
        const memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
        const MemberInput = requestParameters.MemberInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/members/${encodeURIComponent(String(memberId))}`, MemberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateGenericApplicationNotification(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateGenericApplicationNotification.');
        }
        const notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling updateGenericApplicationNotification.');
        }
        const GenericNotificationConfig = requestParameters.GenericNotificationConfig;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/notifications/${encodeURIComponent(String(notificationId))}`, GenericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updatePortalApplicationNotification(requestParameters, observe = 'body', reportProgress = false) {
        const applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updatePortalApplicationNotification.');
        }
        const PortalNotificationConfig = requestParameters.PortalNotificationConfig;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(`${this.configuration.basePath}/applications/${encodeURIComponent(String(applicationId))}/notifications`, PortalNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
ApplicationsService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
ApplicationsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ApplicationsService_Factory() { return new ApplicationsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ApplicationsService, providedIn: "root" });
ApplicationsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], ApplicationsService);

let AuthenticationService = class AuthenticationService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    exchangeAuthorizationCode(requestParameters, observe = 'body', reportProgress = false) {
        const identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling exchangeAuthorizationCode.');
        }
        const PayloadInput = requestParameters.PayloadInput;
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/auth/oauth2/${encodeURIComponent(String(identity))}`, PayloadInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    login(requestParameters, observe = 'body', reportProgress = false) {
        const Authorization = requestParameters.Authorization;
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling login.');
        }
        let headers = this.defaultHeaders;
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/auth/login`, null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    logout(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/auth/logout`, null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    tokenExchange(requestParameters, observe = 'body', reportProgress = false) {
        const identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling tokenExchange.');
        }
        const token = requestParameters.token;
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling tokenExchange.');
        }
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', token);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/auth/oauth2/${encodeURIComponent(String(identity))}/_exchange`, null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
AuthenticationService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
AuthenticationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AuthenticationService, providedIn: "root" });
AuthenticationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], AuthenticationService);

let DocumentationService = class DocumentationService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    getPageByApiIdAndPageId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        const pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/pages/${encodeURIComponent(String(pageId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPageByPageId(requestParameters, observe = 'body', reportProgress = false) {
        const pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByPageId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/pages/${encodeURIComponent(String(pageId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPages(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        const homepage = requestParameters.homepage;
        const parent = requestParameters.parent;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/pages`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPagesByApiId(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        const page = requestParameters.page;
        const size = requestParameters.size;
        const homepage = requestParameters.homepage;
        const parent = requestParameters.parent;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        if (homepage !== undefined && homepage !== null) {
            queryParameters = queryParameters.set('homepage', homepage);
        }
        if (parent !== undefined && parent !== null) {
            queryParameters = queryParameters.set('parent', parent);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/apis/${encodeURIComponent(String(apiId))}/pages`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
DocumentationService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
DocumentationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DocumentationService_Factory() { return new DocumentationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: DocumentationService, providedIn: "root" });
DocumentationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], DocumentationService);

let PortalService = class PortalService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    createTicket(requestParameters, observe = 'body', reportProgress = false) {
        const TicketInput = requestParameters.TicketInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/tickets`, TicketInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPictureByViewId(requestParameters, observe = 'body', reportProgress = false) {
        const viewId = requestParameters.viewId;
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getPictureByViewId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/views/${encodeURIComponent(String(viewId))}/picture`, {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPortalConfiguration(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/configuration`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPortalIdentityProviders(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/configuration/identities`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getPortalInformation(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/info`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getViewByViewId(requestParameters, observe = 'body', reportProgress = false) {
        const viewId = requestParameters.viewId;
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getViewByViewId.');
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/views/${encodeURIComponent(String(viewId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getViews(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/views`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
PortalService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
PortalService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: PortalService, providedIn: "root" });
PortalService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], PortalService);

let SubscriptionService = class SubscriptionService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    closeSubscription(requestParameters, observe = 'body', reportProgress = false) {
        const subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling closeSubscription.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/subscriptions/${encodeURIComponent(String(subscriptionId))}/_close`, null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    createSubscription(requestParameters, observe = 'body', reportProgress = false) {
        const SubscriptionInput = requestParameters.SubscriptionInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/subscriptions`, SubscriptionInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getSubscriptionBuySubscriptionId(requestParameters, observe = 'body', reportProgress = false) {
        const subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling getSubscriptionBuySubscriptionId.');
        }
        const include = requestParameters.include;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach((element) => {
                queryParameters = queryParameters.append('include', element);
            });
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/subscriptions/${encodeURIComponent(String(subscriptionId))}`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getSubscriptions(requestParameters, observe = 'body', reportProgress = false) {
        const apiId = requestParameters.apiId;
        const applicationId = requestParameters.applicationId;
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (apiId !== undefined && apiId !== null) {
            queryParameters = queryParameters.set('apiId', apiId);
        }
        if (applicationId !== undefined && applicationId !== null) {
            queryParameters = queryParameters.set('applicationId', applicationId);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/subscriptions`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    renewKeySubscription(requestParameters, observe = 'body', reportProgress = false) {
        const subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling renewKeySubscription.');
        }
        const request_body = requestParameters.request_body;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/subscriptions/${encodeURIComponent(String(subscriptionId))}/keys/_renew`, request_body, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    revokeKeySubscription(requestParameters, observe = 'body', reportProgress = false) {
        const subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling revokeKeySubscription.');
        }
        const keyId = requestParameters.keyId;
        if (keyId === null || keyId === undefined) {
            throw new Error('Required parameter keyId was null or undefined when calling revokeKeySubscription.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/subscriptions/${encodeURIComponent(String(subscriptionId))}/keys/${encodeURIComponent(String(keyId))}/_revoke`, null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
SubscriptionService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
SubscriptionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SubscriptionService_Factory() { return new SubscriptionService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: SubscriptionService, providedIn: "root" });
SubscriptionService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], SubscriptionService);

let UserService = class UserService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    deleteAllCurrentUserNotifications(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(`${this.configuration.basePath}/user/notifications`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteCurrentUserNotificationByNotificationId(requestParameters, observe = 'body', reportProgress = false) {
        const notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteCurrentUserNotificationByNotificationId.');
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(`${this.configuration.basePath}/user/notifications/${encodeURIComponent(String(notificationId))}`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getCurrentUser(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/user`, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getCurrentUserAvatar(observe = 'body', reportProgress = false) {
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/user/avatar`, {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getCurrentUserNotifications(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/user/notifications`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateCurrentUser(requestParameters, observe = 'body', reportProgress = false) {
        const User = requestParameters.User;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(`${this.configuration.basePath}/user`, User, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
UserService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
UserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UserService_Factory() { return new UserService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UserService, providedIn: "root" });
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], UserService);

let UsersService = class UsersService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
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
    finalizeUserRegistration(requestParameters, observe = 'body', reportProgress = false) {
        const FinalizeRegistrationInput = requestParameters.FinalizeRegistrationInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/users/registration/_finalize`, FinalizeRegistrationInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getUsers(requestParameters, observe = 'body', reportProgress = false) {
        const page = requestParameters.page;
        const size = requestParameters.size;
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(`${this.configuration.basePath}/users`, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    registerNewUser(requestParameters, observe = 'body', reportProgress = false) {
        const RegisterUserInput = requestParameters.RegisterUserInput;
        let headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        const httpHeaderAccepts = [
            'application/json'
        ];
        const httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/users/registration`, RegisterUserInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
UsersService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
UsersService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UsersService_Factory() { return new UsersService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UsersService, providedIn: "root" });
UsersService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], UsersService);

const APIS = [AnalyticsService, ApiService, ApplicationsService, AuthenticationService, DocumentationService, PortalService, SubscriptionService, UserService, UsersService];

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
const CategoryApiQuery = {
    FEATURED: 'FEATURED',
    MINE: 'MINE',
    STARRED: 'STARRED',
    TRENDINGS: 'TRENDINGS'
};

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
const HttpMethod = {
    CONNECT: 'CONNECT',
    DELETE: 'DELETE',
    GET: 'GET',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
    TRACE: 'TRACE',
    OTHER: 'OTHER'
};

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
const IdentityProviderType = {
    GOOGLE: 'GOOGLE',
    GITHUB: 'GITHUB',
    GRAVITEEIOAM: 'GRAVITEEIO_AM',
    OIDC: 'OIDC'
};

var Page;
(function (Page) {
    Page.TypeEnum = {
        SWAGGER: 'SWAGGER',
        MARKDOWN: 'MARKDOWN',
        FOLDER: 'FOLDER',
        ROOT: 'ROOT'
    };
})(Page || (Page = {}));

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
var Plan;
(function (Plan) {
    Plan.SecurityEnum = {
        APIKEY: 'API_KEY',
        KEYLESS: 'KEY_LESS',
        JWT: 'JWT',
        OAUTH2: 'OAUTH2'
    };
    Plan.ValidationEnum = {
        AUTO: 'AUTO',
        MANUAL: 'MANUAL'
    };
})(Plan || (Plan = {}));

var Subscription;
(function (Subscription) {
    Subscription.StatusEnum = {
        PENDING: 'PENDING',
        ACCEPTED: 'ACCEPTED',
        REJECTED: 'REJECTED'
    };
})(Subscription || (Subscription = {}));

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
var Token;
(function (Token) {
    Token.TokenTypeEnum = {
        BEARER: 'BEARER'
    };
})(Token || (Token = {}));

var ApiModule_1;
let ApiModule = ApiModule_1 = class ApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
};
ApiModule.ctorParameters = () => [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: HttpClient, decorators: [{ type: Optional }] }
];
ApiModule = ApiModule_1 = __decorate([
    NgModule({
        imports: [],
        declarations: [],
        exports: [],
        providers: [
            AnalyticsService,
            ApiService,
            ApplicationsService,
            AuthenticationService,
            DocumentationService,
            PortalService,
            SubscriptionService,
            UserService,
            UsersService
        ]
    }),
    __param(0, Optional()), __param(0, SkipSelf()),
    __param(1, Optional())
], ApiModule);

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, AnalyticsService, ApiModule, ApiService, AuthenticationService, BASE_PATH, COLLECTION_FORMATS, CategoryApiQuery, Configuration, HttpMethod, IdentityProviderType, Page, Plan, PortalService, Subscription, SubscriptionService, Token, UserService, UsersService, ApplicationsService as ɵa, DocumentationService as ɵb };
//# sourceMappingURL=gravitee-ng-portal-webclient.js.map
