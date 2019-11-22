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
export { Configuration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BncmF2aXRlZS9uZy1wb3J0YWwtd2ViY2xpZW50LyIsInNvdXJjZXMiOlsiY29uZmlndXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQTtJQVNJLHVCQUFZLHVCQUFxRDtRQUFyRCx3Q0FBQSxFQUFBLDRCQUFxRDtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksK0NBQXVCLEdBQTlCLFVBQWdDLFlBQXNCO1FBQXRELGlCQVVDO1FBVEcsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUVELElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFDbEUsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLDBDQUFrQixHQUF6QixVQUEwQixPQUFpQjtRQUEzQyxpQkFVQztRQVRHLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQzdELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxrQ0FBVSxHQUFqQixVQUFrQixJQUFZO1FBQzFCLElBQU0sUUFBUSxHQUFXLElBQUksTUFBTSxDQUFDLCtEQUErRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFHLE9BQU8sSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLDZCQUE2QixDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXZFRCxJQXVFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uUGFyYW1ldGVycyB7XG4gICAgYXBpS2V5cz86IHtbIGtleTogc3RyaW5nIF06IHN0cmluZ307XG4gICAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gICAgYWNjZXNzVG9rZW4/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgICBiYXNlUGF0aD86IHN0cmluZztcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGVuY29kZXI/OiBIdHRwUGFyYW1ldGVyQ29kZWM7XG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICBhY2Nlc3NUb2tlbj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICAgIGJhc2VQYXRoPzogc3RyaW5nO1xuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gICAgZW5jb2Rlcj86IEh0dHBQYXJhbWV0ZXJDb2RlYztcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBDb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBpS2V5cyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFwaUtleXM7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy51c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLnBhc3N3b3JkO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYWNjZXNzVG9rZW47XG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5iYXNlUGF0aDtcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmVuY29kZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBjb3JyZWN0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZXMgLSB0aGUgYXJyYXkgb2YgY29udGVudCB0eXBlcyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlczogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY29udGVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSBjb250ZW50VHlwZXMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFR5cGVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlIHRvIHVzZSBmb3IgYSByZXF1ZXN0LlxuICAgICAqIFVzZXMge0BsaW5rIENvbmZpZ3VyYXRpb24jaXNKc29uTWltZX0gdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGFjY2VwdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBhY2NlcHRzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb24uXG4gICAgICogQHJldHVybnMgdGhlIHNlbGVjdGVkIGNvbnRlbnQtdHlwZSBvciA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlmIG5vIHNlbGVjdGlvbiBjb3VsZCBiZSBtYWRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RIZWFkZXJBY2NlcHQoYWNjZXB0czogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoYWNjZXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gYWNjZXB0cy5maW5kKCh4OiBzdHJpbmcpID0+IHRoaXMuaXNKc29uTWltZSh4KSk7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2NlcHRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBNSU1FIGlzIGEgSlNPTiBNSU1FLlxuICAgICAqIEpTT04gTUlNRSBleGFtcGxlczpcbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGOFxuICAgICAqICAgQVBQTElDQVRJT04vSlNPTlxuICAgICAqICAgYXBwbGljYXRpb24vdm5kLmNvbXBhbnkranNvblxuICAgICAqIEBwYXJhbSBtaW1lIC0gTUlNRSAoTXVsdGlwdXJwb3NlIEludGVybmV0IE1haWwgRXh0ZW5zaW9ucylcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIGdpdmVuIE1JTUUgaXMgSlNPTiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBpc0pzb25NaW1lKG1pbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBqc29uTWltZTogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXihhcHBsaWNhdGlvblxcL2pzb258W147LyBcXHRdK1xcL1teOy8gXFx0XStbK11qc29uKVsgXFx0XSooOy4qKT8kJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIG1pbWUgIT09IG51bGwgJiYgKGpzb25NaW1lLnRlc3QobWltZSkgfHwgbWltZS50b0xvd2VyQ2FzZSgpID09PSAnYXBwbGljYXRpb24vanNvbi1wYXRjaCtqc29uJyk7XG4gICAgfVxufVxuIl19