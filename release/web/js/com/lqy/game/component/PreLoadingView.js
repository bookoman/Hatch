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
        var _this = _super.call(this) || this;
        _this.initSkin();
        return _this;
    }
    Object.defineProperty(PreLoadingView, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new PreLoadingView();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    PreLoadingView.prototype.initSkin = function () {
        this.imgBg = new LayaImage("res/outside/preload/bg.jpg");
        this.x = 0;
        this.y = 0;
        this.addChild(this.imgBg);
        Laya.loader.load(["res/outside/preload/progress.png", "res/outside/preload/progressBg.png"], Laya.Handler.create(this, this.resLoaded));
    };
    /**
     * 加载资源
     * @param e
     */
    PreLoadingView.prototype.resLoaded = function (e) {
        this.imgProBg = new LayaImage();
        this.imgProBg.texture = Laya.loader.getRes("res/outside/preload/progressBg.png");
        this.imgProBg.x = GameConfig.STAGE_WIDTH - this.imgProBg.texture.width >> 1;
        this.imgProBg.y = GameConfig.STAGE_HEIGHT - this.imgProBg.texture.height >> 1;
        this.addChild(this.imgProBg);
        this.imgPro = new LayaImage();
        this.imgPro.texture = Laya.loader.getRes("res/outside/preload/progress.png");
        this.imgPro.x = this.imgProBg.x;
        this.imgPro.y = this.imgProBg.y + 1;
        this.addChild(this.imgPro);
        this.lblPro = new LayaLabel();
        this.lblPro.x = this.imgProBg.x;
        this.lblPro.y = this.imgProBg.y;
        this.lblPro.width = this.imgPro.texture.width;
        this.lblPro.height = this.imgPro.texture.height;
        this.lblPro.fontSize = 16;
        this.lblPro.align = "center";
        this.lblPro.text = "";
        this.addChild(this.lblPro);
        this.setProgress(0);
    };
    PreLoadingView.prototype.setProgress = function (value) {
        if (this.imgPro && this.lblPro) {
            if (this.maskRect == null) {
                this.maskRect = new Rectangle(0, 0, this.imgPro.texture.width, this.imgPro.texture.height);
            }
            this.maskRect.x = (1 - value) * this.imgPro.texture.width;
            this.imgPro.scrollRect = this.maskRect;
            this.lblPro.text = "资源加载进度（" + Math.floor(value * 100) + "%）";
        }
        if (value == 1) {
            Laya.timer.once(200, this, this.hide);
        }
    };
    PreLoadingView.prototype.show = function () {
        LayerManager.ins.addToLayer(this, LayerManager.UI_LAYER, false, false, false);
    };
    PreLoadingView.prototype.hide = function () {
        this.imgBg.removeSelf();
        this.imgBg = null;
        this.imgPro.removeSelf();
        this.imgPro = null;
        this.imgProBg.removeSelf();
        this.imgProBg = null;
        this.lblPro.removeSelf();
        this.lblPro = null;
        this.removeSelf();
    };
    PreLoadingView._ins = null;
    return PreLoadingView;
}(Laya.Sprite));
//# sourceMappingURL=PreLoadingView.js.map