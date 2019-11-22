import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, SkipSelf, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
var CustomHttpParameterCodec = /** @class */ (function () {
    function CustomHttpParameterCodec() {
    }
    CustomHttpParameterCodec.prototype.encodeKey = function (k) {
        return encodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.encodeValue = function (v) {
        return encodeURIComponent(v);
    };
    CustomHttpParameterCodec.prototype.decodeKey = function (k) {
        return decodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.decodeValue = function (v) {
        return decodeURIComponent(v);
    };
    return CustomHttpParameterCodec;
}());

var BASE_PATH = new InjectionToken('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

var Configuration = /** @class */ (function () {
    function Configuration(configurationParameters) {
        if (configurationParameters === void 0) { configurationParameters = {}; }
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
    Configuration.prototype.selectHeaderContentType = function (contentTypes) {
        var _this = this;
        if (contentTypes.length === 0) {
            return undefined;
        }
        var type = contentTypes.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderAccept = function (accepts) {
        var _this = this;
        if (accepts.length === 0) {
            return undefined;
        }
        var type = accepts.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
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
    Configuration.prototype.isJsonMime = function (mime) {
        var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    return Configuration;
}());

var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(httpClient, basePath, configuration) {
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
    AnalyticsService.prototype.exportApplicationLogsByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/_export", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationAnalytics = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var interval = requestParameters.interval;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var type = requestParameters.type;
        var range = requestParameters.range;
        var aggs = requestParameters.aggs;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/analytics", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationLogByApplicationIdAndLogId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var logId = requestParameters.logId;
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var timestamp = requestParameters.timestamp;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/" + encodeURIComponent(String(logId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.prototype.getApplicationLogs = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AnalyticsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    AnalyticsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AnalyticsService, providedIn: "root" });
    AnalyticsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], AnalyticsService);
    return AnalyticsService;
}());

var ApiService = /** @class */ (function () {
    function ApiService(httpClient, basePath, configuration) {
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
    ApiService.prototype.createApiRatingForApi = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling createApiRatingForApi.');
        }
        var RatingInput = requestParameters.RatingInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/ratings", RatingInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getApiByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiByApiId.');
        }
        var include = requestParameters.include;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach(function (element) {
                queryParameters = queryParameters.append('include', element);
            });
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getApiPlansByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiPlansByApiId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/plans", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getApiRatingsByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getApiRatingsByApiId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/ratings", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getApis = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var context_path = requestParameters.context_path;
        var label = requestParameters.label;
        var version = requestParameters.version;
        var name = requestParameters.name;
        var view = requestParameters.view;
        var cat = requestParameters.cat;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getPageByApiIdAndPageId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        var pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getPagesByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var homepage = requestParameters.homepage;
        var parent = requestParameters.parent;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.prototype.getPictureByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPictureByApiId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    ApiService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ApiService_Factory() { return new ApiService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ApiService, providedIn: "root" });
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], ApiService);
    return ApiService;
}());

var ApplicationsService = /** @class */ (function () {
    function ApplicationsService(httpClient, basePath, configuration) {
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
    ApplicationsService.prototype.createApplication = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var ApplicationInput = requestParameters.ApplicationInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications", ApplicationInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.createApplicationMember = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationMember.');
        }
        var MemberInput = requestParameters.MemberInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members", MemberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.createApplicationNotification = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling createApplicationNotification.');
        }
        var GenericNotificationConfig = requestParameters.GenericNotificationConfig;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", GenericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationByApplicationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationMember = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationMember.');
        }
        var memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling deleteApplicationMember.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.deleteApplicationNotificationByNotificationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
        var notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteApplicationNotificationByNotificationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications/" + encodeURIComponent(String(notificationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.exportApplicationLogsByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling exportApplicationLogsByApplicationId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'text/plain',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/_export", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationAnalytics = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationAnalytics.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var interval = requestParameters.interval;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var type = requestParameters.type;
        var range = requestParameters.range;
        var aggs = requestParameters.aggs;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/analytics", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationByApplicationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationLogByApplicationIdAndLogId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var logId = requestParameters.logId;
        if (logId === null || logId === undefined) {
            throw new Error('Required parameter logId was null or undefined when calling getApplicationLogByApplicationIdAndLogId.');
        }
        var timestamp = requestParameters.timestamp;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (timestamp !== undefined && timestamp !== null) {
            queryParameters = queryParameters.set('timestamp', timestamp);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs/" + encodeURIComponent(String(logId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationLogs = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationLogs.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var from = requestParameters.from;
        var to = requestParameters.to;
        var query = requestParameters.query;
        var field = requestParameters.field;
        var order = requestParameters.order;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/logs", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationMemberByApplicationIdAndMemberId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
        var memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling getApplicationMemberByApplicationIdAndMemberId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplicationPictureByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getApplicationPictureByApplicationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getApplications = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getMembersByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getMembersByApplicationId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.getNotificationsByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling getNotificationsByApplicationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.renewApplicationSecret = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling renewApplicationSecret.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/_renew_secret", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.transferMemberOwnership = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling transferMemberOwnership.');
        }
        var TransferOwnershipInput = requestParameters.TransferOwnershipInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/_transfer_ownership", TransferOwnershipInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateApplicationByApplicationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationByApplicationId.');
        }
        var Application = requestParameters.Application;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)), Application, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateApplicationMemberByApplicationIdAndMemberId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
        var memberId = requestParameters.memberId;
        if (memberId === null || memberId === undefined) {
            throw new Error('Required parameter memberId was null or undefined when calling updateApplicationMemberByApplicationIdAndMemberId.');
        }
        var MemberInput = requestParameters.MemberInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/members/" + encodeURIComponent(String(memberId)), MemberInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updateGenericApplicationNotification = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updateGenericApplicationNotification.');
        }
        var notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling updateGenericApplicationNotification.');
        }
        var GenericNotificationConfig = requestParameters.GenericNotificationConfig;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications/" + encodeURIComponent(String(notificationId)), GenericNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.prototype.updatePortalApplicationNotification = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var applicationId = requestParameters.applicationId;
        if (applicationId === null || applicationId === undefined) {
            throw new Error('Required parameter applicationId was null or undefined when calling updatePortalApplicationNotification.');
        }
        var PortalNotificationConfig = requestParameters.PortalNotificationConfig;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/applications/" + encodeURIComponent(String(applicationId)) + "/notifications", PortalNotificationConfig, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ApplicationsService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    ApplicationsService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ApplicationsService_Factory() { return new ApplicationsService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ApplicationsService, providedIn: "root" });
    ApplicationsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], ApplicationsService);
    return ApplicationsService;
}());

var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(httpClient, basePath, configuration) {
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
    AuthenticationService.prototype.exchangeAuthorizationCode = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling exchangeAuthorizationCode.');
        }
        var PayloadInput = requestParameters.PayloadInput;
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/oauth2/" + encodeURIComponent(String(identity)), PayloadInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.login = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var Authorization = requestParameters.Authorization;
        if (Authorization === null || Authorization === undefined) {
            throw new Error('Required parameter Authorization was null or undefined when calling login.');
        }
        var headers = this.defaultHeaders;
        if (Authorization !== undefined && Authorization !== null) {
            headers = headers.set('Authorization', String(Authorization));
        }
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/login", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.logout = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/logout", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.prototype.tokenExchange = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var identity = requestParameters.identity;
        if (identity === null || identity === undefined) {
            throw new Error('Required parameter identity was null or undefined when calling tokenExchange.');
        }
        var token = requestParameters.token;
        if (token === null || token === undefined) {
            throw new Error('Required parameter token was null or undefined when calling tokenExchange.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (token !== undefined && token !== null) {
            queryParameters = queryParameters.set('token', token);
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/auth/oauth2/" + encodeURIComponent(String(identity)) + "/_exchange", null, {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    AuthenticationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    AuthenticationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: AuthenticationService, providedIn: "root" });
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], AuthenticationService);
    return AuthenticationService;
}());

var DocumentationService = /** @class */ (function () {
    function DocumentationService(httpClient, basePath, configuration) {
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
    DocumentationService.prototype.getPageByApiIdAndPageId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        var pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByApiIdAndPageId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPageByPageId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var pageId = requestParameters.pageId;
        if (pageId === null || pageId === undefined) {
            throw new Error('Required parameter pageId was null or undefined when calling getPageByPageId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/pages/" + encodeURIComponent(String(pageId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPages = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var homepage = requestParameters.homepage;
        var parent = requestParameters.parent;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.prototype.getPagesByApiId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        if (apiId === null || apiId === undefined) {
            throw new Error('Required parameter apiId was null or undefined when calling getPagesByApiId.');
        }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var homepage = requestParameters.homepage;
        var parent = requestParameters.parent;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/apis/" + encodeURIComponent(String(apiId)) + "/pages", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    DocumentationService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    DocumentationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DocumentationService_Factory() { return new DocumentationService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: DocumentationService, providedIn: "root" });
    DocumentationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], DocumentationService);
    return DocumentationService;
}());

var PortalService = /** @class */ (function () {
    function PortalService(httpClient, basePath, configuration) {
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
    PortalService.prototype.createTicket = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var TicketInput = requestParameters.TicketInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/tickets", TicketInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getPictureByViewId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var viewId = requestParameters.viewId;
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getPictureByViewId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/views/" + encodeURIComponent(String(viewId)) + "/picture", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getPortalConfiguration = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/configuration", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getPortalIdentityProviders = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/configuration/identities", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getPortalInformation = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/info", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getViewByViewId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var viewId = requestParameters.viewId;
        if (viewId === null || viewId === undefined) {
            throw new Error('Required parameter viewId was null or undefined when calling getViewByViewId.');
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/views/" + encodeURIComponent(String(viewId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.prototype.getViews = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/views", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    PortalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    PortalService.ngInjectableDef = ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: PortalService, providedIn: "root" });
    PortalService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], PortalService);
    return PortalService;
}());

var SubscriptionService = /** @class */ (function () {
    function SubscriptionService(httpClient, basePath, configuration) {
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
    SubscriptionService.prototype.closeSubscription = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling closeSubscription.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/_close", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.createSubscription = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var SubscriptionInput = requestParameters.SubscriptionInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions", SubscriptionInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.getSubscriptionBuySubscriptionId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling getSubscriptionBuySubscriptionId.');
        }
        var include = requestParameters.include;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (include) {
            include.forEach(function (element) {
                queryParameters = queryParameters.append('include', element);
            });
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.getSubscriptions = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var apiId = requestParameters.apiId;
        var applicationId = requestParameters.applicationId;
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
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
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/subscriptions", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.renewKeySubscription = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling renewKeySubscription.');
        }
        var request_body = requestParameters.request_body;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/keys/_renew", request_body, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.prototype.revokeKeySubscription = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var subscriptionId = requestParameters.subscriptionId;
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling revokeKeySubscription.');
        }
        var keyId = requestParameters.keyId;
        if (keyId === null || keyId === undefined) {
            throw new Error('Required parameter keyId was null or undefined when calling revokeKeySubscription.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/subscriptions/" + encodeURIComponent(String(subscriptionId)) + "/keys/" + encodeURIComponent(String(keyId)) + "/_revoke", null, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SubscriptionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    SubscriptionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SubscriptionService_Factory() { return new SubscriptionService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: SubscriptionService, providedIn: "root" });
    SubscriptionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], SubscriptionService);
    return SubscriptionService;
}());

var UserService = /** @class */ (function () {
    function UserService(httpClient, basePath, configuration) {
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
    UserService.prototype.deleteAllCurrentUserNotifications = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.configuration.basePath + "/user/notifications", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.deleteCurrentUserNotificationByNotificationId = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var notificationId = requestParameters.notificationId;
        if (notificationId === null || notificationId === undefined) {
            throw new Error('Required parameter notificationId was null or undefined when calling deleteCurrentUserNotificationByNotificationId.');
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.configuration.basePath + "/user/notifications/" + encodeURIComponent(String(notificationId)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUser = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/user", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUserAvatar = function (observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'image/_*',
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/user/avatar", {
            responseType: "blob",
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.getCurrentUserNotifications = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/user/notifications", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.prototype.updateCurrentUser = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var User = requestParameters.User;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.configuration.basePath + "/user", User, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UserService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    UserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UserService_Factory() { return new UserService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UserService, providedIn: "root" });
    UserService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], UserService);
    return UserService;
}());

var UsersService = /** @class */ (function () {
    function UsersService(httpClient, basePath, configuration) {
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
    UsersService.prototype.finalizeUserRegistration = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var FinalizeRegistrationInput = requestParameters.FinalizeRegistrationInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/users/registration/_finalize", FinalizeRegistrationInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UsersService.prototype.getUsers = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var page = requestParameters.page;
        var size = requestParameters.size;
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', size);
        }
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.configuration.basePath + "/users", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UsersService.prototype.registerNewUser = function (requestParameters, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var RegisterUserInput = requestParameters.RegisterUserInput;
        var headers = this.defaultHeaders;
        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (CookieAuth) required
        // to determine the Accept header
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.configuration.basePath + "/users/registration", RegisterUserInput, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    UsersService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    UsersService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UsersService_Factory() { return new UsersService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: UsersService, providedIn: "root" });
    UsersService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], UsersService);
    return UsersService;
}());

var APIS = [AnalyticsService, ApiService, ApplicationsService, AuthenticationService, DocumentationService, PortalService, SubscriptionService, UserService, UsersService];

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
var CategoryApiQuery = {
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
var HttpMethod = {
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
var IdentityProviderType = {
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

var ApiModule = /** @class */ (function () {
    function ApiModule(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    ApiModule_1 = ApiModule;
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    var ApiModule_1;
    ApiModule.ctorParameters = function () { return [
        { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: HttpClient, decorators: [{ type: Optional }] }
    ]; };
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
    return ApiModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, AnalyticsService, ApiModule, ApiService, AuthenticationService, BASE_PATH, COLLECTION_FORMATS, CategoryApiQuery, Configuration, HttpMethod, IdentityProviderType, Page, Plan, PortalService, Subscription, SubscriptionService, Token, UserService, UsersService, ApplicationsService as ɵa, DocumentationService as ɵb };
//# sourceMappingURL=gravitee-ng-portal-webclient.js.map
