var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LayaImage = Laya.Image;
var LayaLabel = Laya.Label;
/*
* 进入游戏资源加载条
*/
var PreLoadingView = /** @class */ (function (_super) {
    __extends(PreLoadingView, _super);
    function PreLoadingView() {
        return _super.call(this) || this;
    }
    PreLoadingView.prototype.initSkin = function () {
        this.imgBg = new LayaImage("res/outside/preload/bg.jpg");
        this.addChild(this.imgBg);
        Laya.loader.load(["res/outside/preload/progress.png", "res/outside/preload/progressBg.png"], Laya.Handler.create(this, this.resLoaded));
    };
    PreLoadingView.prototype.resLoaded = function (e) {
        this.imgProBg = new LayaImage();
        this.imgProBg.texture = Laya.loader.getRes("res/outside/preload/progressBg.png");
        this.addChild(this.imgProBg);
        this.imgPro = new LayaImage();
        this.imgPro.texture = Laya.loader.getRes("res/outside/preload/progress.png");
        this.setProgress(0);
        this.addChild(this.imgPro);
        this.lblPro = new LayaLabel();
        this.addChild(this.lblPro);
    };
    PreLoadingView.prototype.setProgress = function (value) {
        var rect = this.imgPro.scrollRect;
        rect.x = value * this.imgPro.texture.width;
    };
    return PreLoadingView;
}(Laya.Sprite));
//# sourceMappingURL=PreLoadingView.js.map