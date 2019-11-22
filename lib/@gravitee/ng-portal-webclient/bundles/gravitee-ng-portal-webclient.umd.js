(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@gravitee/ng-portal-webclient', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = global || self, factory((global.gravitee = global.gravitee || {}, global.gravitee['ng-portal-webclient'] = {}), global.ng.core, global.ng.common.http));
}(this, function (exports, core, http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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

    var BASE_PATH = new core.InjectionToken('basePath');
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
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        AnalyticsService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AnalyticsService_Factory() { return new AnalyticsService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: AnalyticsService, providedIn: "root" });
        AnalyticsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], AnalyticsService);
        return AnalyticsService;
    }());

    var ApiService = /** @class */ (function () {
        function ApiService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        ApiService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ApiService_Factory() { return new ApiService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ApiService, providedIn: "root" });
        ApiService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], ApiService);
        return ApiService;
    }());

    var ApplicationsService = /** @class */ (function () {
        function ApplicationsService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        ApplicationsService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function ApplicationsService_Factory() { return new ApplicationsService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ApplicationsService, providedIn: "root" });
        ApplicationsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], ApplicationsService);
        return ApplicationsService;
    }());

    var AuthenticationService = /** @class */ (function () {
        function AuthenticationService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        AuthenticationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AuthenticationService_Factory() { return new AuthenticationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: AuthenticationService, providedIn: "root" });
        AuthenticationService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], AuthenticationService);
        return AuthenticationService;
    }());

    var DocumentationService = /** @class */ (function () {
        function DocumentationService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        DocumentationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function DocumentationService_Factory() { return new DocumentationService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: DocumentationService, providedIn: "root" });
        DocumentationService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], DocumentationService);
        return DocumentationService;
    }());

    var PortalService = /** @class */ (function () {
        function PortalService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        PortalService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PortalService_Factory() { return new PortalService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: PortalService, providedIn: "root" });
        PortalService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], PortalService);
        return PortalService;
    }());

    var SubscriptionService = /** @class */ (function () {
        function SubscriptionService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        SubscriptionService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function SubscriptionService_Factory() { return new SubscriptionService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SubscriptionService, providedIn: "root" });
        SubscriptionService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], SubscriptionService);
        return SubscriptionService;
    }());

    var UserService = /** @class */ (function () {
        function UserService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        UserService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function UserService_Factory() { return new UserService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: UserService, providedIn: "root" });
        UserService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], UserService);
        return UserService;
    }());

    var UsersService = /** @class */ (function () {
        function UsersService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://demo.gravitee.io/portal/DEFAULT';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        UsersService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function UsersService_Factory() { return new UsersService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: UsersService, providedIn: "root" });
        UsersService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
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


    (function (Page) {
        Page.TypeEnum = {
            SWAGGER: 'SWAGGER',
            MARKDOWN: 'MARKDOWN',
            FOLDER: 'FOLDER',
            ROOT: 'ROOT'
        };
    })(exports.Page || (exports.Page = {}));

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
    })(exports.Plan || (exports.Plan = {}));


    (function (Subscription) {
        Subscription.StatusEnum = {
            PENDING: 'PENDING',
            ACCEPTED: 'ACCEPTED',
            REJECTED: 'REJECTED'
        };
    })(exports.Subscription || (exports.Subscription = {}));

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

    (function (Token) {
        Token.TokenTypeEnum = {
            BEARER: 'BEARER'
        };
    })(exports.Token || (exports.Token = {}));

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
            { type: ApiModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: http.HttpClient, decorators: [{ type: core.Optional }] }
        ]; };
        ApiModule = ApiModule_1 = __decorate([
            core.NgModule({
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
            __param(0, core.Optional()), __param(0, core.SkipSelf()),
            __param(1, core.Optional())
        ], ApiModule);
        return ApiModule;
    }());

    exports.APIS = APIS;
    exports.AnalyticsService = AnalyticsService;
    exports.ApiModule = ApiModule;
    exports.ApiService = ApiService;
    exports.AuthenticationService = AuthenticationService;
    exports.BASE_PATH = BASE_PATH;
    exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
    exports.CategoryApiQuery = CategoryApiQuery;
    exports.Configuration = Configuration;
    exports.HttpMethod = HttpMethod;
    exports.IdentityProviderType = IdentityProviderType;
    exports.PortalService = PortalService;
    exports.SubscriptionService = SubscriptionService;
    exports.UserService = UserService;
    exports.UsersService = UsersService;
    exports.ɵa = ApplicationsService;
    exports.ɵb = DocumentationService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gravitee-ng-portal-webclient.umd.js.map
