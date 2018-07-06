/*
* name;
*/
var BaseMediator = /** @class */ (function () {
    function BaseMediator(assetsUrl, view) {
        this.view = null;
        this.assetsUrl = assetsUrl;
        this.view = view;
        if (this.assetsUrl) {
            ModuleLoadingView.ins.show();
            Laya.loader.load(this.assetsUrl, new Laya.Handler(this, this.onLoaded), new Laya.Handler(this, this.onLoadProgress));
        }
        else {
            this.initView();
        }
    }
    /**资源加载完成 */
    BaseMediator.prototype.onLoaded = function (data) {
        this.initView();
        ModuleLoadingView.ins.setProgress(1);
    };
    /**资源加载进度 */
    BaseMediator.prototype.onLoadProgress = function (data) {
        ModuleLoadingView.ins.setProgress(data);
    };
    BaseMediator.prototype.initView = function () {
        this.addEvents();
    };
    BaseMediator.prototype.addEvents = function () {
    };
    BaseMediator.prototype.removeEvents = function () {
    };
    BaseMediator.prototype.dispose = function () {
        if (this.assetsUrl) {
            if (this.assetsUrl) {
                this.assetsUrl.forEach(function (element) {
                    Laya.loader.clearRes(element.url);
                });
            }
            else {
                Laya.loader.clearRes(this.assetsUrl);
            }
            this.assetsUrl = null;
        }
        if (this.view) {
            this.removeEvents();
            this.view.removeSelf();
        }
        this.view = null;
    };
    return BaseMediator;
}());
//# sourceMappingURL=BaseMediator.js.map