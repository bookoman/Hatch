/*
* name;
*/
var BaseLoader = /** @class */ (function () {
    function BaseLoader() {
    }
    /**加载 */
    BaseLoader.prototype.load = function (url, complete, progress, type, priority, cache, group, ignoreCache) {
        Laya.loader.load(url, complete, progress, type, priority, cache, group, ignoreCache);
    };
    return BaseLoader;
}());
//# sourceMappingURL=BaseLoader.js.map