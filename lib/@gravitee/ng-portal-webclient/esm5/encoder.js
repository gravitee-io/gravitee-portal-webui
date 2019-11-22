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
export { CustomHttpParameterCodec };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2Rlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BncmF2aXRlZS9uZy1wb3J0YWwtd2ViY2xpZW50LyIsInNvdXJjZXMiOlsiZW5jb2Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7O0dBR0c7QUFDSDtJQUFBO0lBYUEsQ0FBQztJQVpHLDRDQUFTLEdBQVQsVUFBVSxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsOENBQVcsR0FBWCxVQUFZLENBQVM7UUFDakIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsNENBQVMsR0FBVCxVQUFVLENBQVM7UUFDZixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCw4Q0FBVyxHQUFYLFVBQVksQ0FBUztRQUNqQixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCwrQkFBQztBQUFELENBQUMsQUFiRCxJQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFBhcmFtZXRlckNvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vKipcbiAqIEN1c3RvbSBIdHRwUGFyYW1ldGVyQ29kZWNcbiAqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MjYxXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMgaW1wbGVtZW50cyBIdHRwUGFyYW1ldGVyQ29kZWMge1xuICAgIGVuY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspO1xuICAgIH1cbiAgICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH1cbiAgICBkZWNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChrKTtcbiAgICB9XG4gICAgZGVjb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9XG59XG5cbiJdfQ==