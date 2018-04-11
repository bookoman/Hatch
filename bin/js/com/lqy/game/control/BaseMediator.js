/*
* name;
*/
var BaseMediator = /** @class */ (function () {
    function BaseMediator(assetsUrl, view) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        this.view = null;
        this.assetsUrl = assetsUrl;
        this.view = view;
        if (this.assetsUrl) {
            Laya.loader.load(this.assetsUrl, new Laya.Handler(this, this.onLoaded), new Laya.Handler(this, this.onLoadProgress));
        }
        else {
            this.initView();
        }
    }
    /**资源加载完成 */
    BaseMediator.prototype.onLoaded = function (data) {
        this.initView();
    };
    /**资源加载进度 */
    BaseMediator.prototype.onLoadProgress = function (data) {
    };
    BaseMediator.prototype.initView = function () {
        this.addEvents();
    };
    BaseMediator.prototype.addEvents = function () {
    };
    BaseMediator.prototype.removeEvents = function () {
    };
    return BaseMediator;
}());
//# sourceMappingURL=BaseMediator.js.map