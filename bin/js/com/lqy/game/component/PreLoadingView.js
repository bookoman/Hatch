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
        _this.timeRunValue = 0;
        _this.progressValue = 0;
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
    PreLoadingView.prototype.setCallBack = function (caller, callBack) {
        this.caller = caller;
        this.callBack = callBack;
    };
    PreLoadingView.prototype.initSkin = function () {
        this.imgBg = new LayaImage("unpack/preload/bg.png");
        this.width = GameConfig.STAGE_WIDTH;
        this.height = 180;
        this.x = 0;
        this.y = 0;
        this.boxLoading.addChild(this.imgBg);
        var resAry = ["unpack/preload/progress.png", "unpack/preload/progressBg.png",
            "unpack/preload/progressLight.png", "unpack/preload/preBg.png", "unpack/preload/light.png", "unpack/preload/loading.png"];
        Laya.loader.load(resAry, Laya.Handler.create(this, this.resLoaded));
    };
    /**
     * 加载资源
     * @param e
     */
    PreLoadingView.prototype.resLoaded = function (e) {
        this.imgProBg = new LayaImage();
        this.imgProBg.texture = Laya.loader.getRes("unpack/preload/progressBg.png");
        this.imgProBg.x = this.width - this.imgProBg.texture.width >> 1;
        this.imgProBg.y = this.height - this.imgProBg.texture.height;
        this.boxLoading.addChild(this.imgProBg);
        this.imgPreBg = new LayaImage();
        this.imgPreBg.texture = Laya.loader.getRes("unpack/preload/preBg.png");
        this.imgPreBg.x = this.width - this.imgPreBg.texture.width >> 1;
        this.imgPreBg.y = this.height - this.imgPreBg.texture.height;
        this.boxLoading.addChild(this.imgPreBg);
        this.imgPro = new LayaImage();
        this.imgPro.texture = Laya.loader.getRes("unpack/preload/progress.png");
        this.imgPro.x = this.imgProBg.x;
        this.imgPro.y = this.imgProBg.y + 1;
        this.boxLoading.addChild(this.imgPro);
        this.imgProLight = new LayaImage("unpack/preload/progressLight.png");
        this.imgProLight.x = this.imgPro.x;
        this.imgProLight.y = this.imgPro.y;
        this.imgProLight.width = 1;
        this.boxLoading.addChild(this.imgProLight);
        // this.lblPro = new LayaLabel();
        // this.lblPro.x = this.imgProBg.x
        // this.lblPro.y = this.imgProBg.y;
        // this.lblPro.width = this.imgPro.texture.width;
        // this.lblPro.height = this.imgPro.texture.height;
        // this.lblPro.fontSize = 16;
        // this.lblPro.align = "center";
        // this.lblPro.text = "";
        // this.addChild(this.lblPro);
        this.loading = new LayaImage();
        this.loading.texture = Laya.loader.getRes("unpack/preload/loading.png");
        this.loading.x = this.width - this.loading.texture.width >> 1;
        this.loading.y = this.height + 4;
        this.boxLoading.addChild(this.loading);
        this.lightIcon = new LayaImage();
        this.lightIcon.texture = Laya.loader.getRes("unpack/preload/light.png");
        this.lightIcon.x = this.imgProBg.x;
        this.lightIcon.y = this.imgProBg.y + this.imgProBg.texture.height / 2 - this.lightIcon.texture.height / 2;
        this.boxLoading.addChild(this.lightIcon);
        this.setProgress(0);
        Laya.timer.loop(10, this, this.timeRunProgress);
    };
    PreLoadingView.prototype.timeRunProgress = function () {
        if (this.imgPro) {
            if (this.maskRect == null) {
                this.maskRect = new Rectangle(0, 0, this.imgPro.texture.width, this.imgPro.texture.height);
            }
            this.maskRect.x = this.imgProBg.texture.width - this.timeRunValue;
            this.imgPro.scrollRect = this.maskRect;
            //高亮图标
            // var proW:number = value * this.imgPro.texture.width;
            this.lightIcon.x = this.timeRunValue - this.lightIcon.texture.width / 2;
            this.imgProLight.width = this.timeRunValue / 3;
            this.imgProLight.x = this.timeRunValue - this.imgProLight.width;
            // this.lblPro.text = "资源加载进度（"+ Math.floor(value * 100)+"%）";
            // console.log("..........."+value);
        }
        //如果加载值
        if (this.timeRunValue / this.imgProBg.texture.width > 0.95 && this.progressValue < 1) {
            return;
        }
        this.timeRunValue += Math.max(4, Math.random() * 20);
        if (this.timeRunValue >= this.imgProBg.texture.width) {
            Laya.timer.clear(this, this.timeRunProgress);
            if (this.caller && this.callBack) {
                this.callBack.call(this.caller);
            }
            Laya.timer.once(200, this, this.hide);
        }
    };
    PreLoadingView.prototype.setProgress = function (value) {
        this.progressValue = value;
        // if(this.imgPro && this.lblPro)
        // if(this.imgPro)
        // {
        //     if(this.maskRect == null)
        //     {
        //         this.maskRect = new Rectangle(0,0,this.imgPro.texture.width,this.imgPro.texture.height);
        //     }
        //     this.maskRect.x = (1 - value) * this.imgPro.texture.width;
        //     this.imgPro.scrollRect = this.maskRect;
        //     //高亮图标
        //     var proW:number = value * this.imgPro.texture.width;
        //     this.lightIcon.x = proW - this.lightIcon.texture.width / 2;
        //     this.imgProLight.width = proW / 3;
        //     this.imgProLight.x = proW - this.imgProLight.width;
        //     // this.lblPro.text = "资源加载进度（"+ Math.floor(value * 100)+"%）";
        // }
        // if(value == 1)
        // {
        //     Laya.timer.once(200,this,this.hide);
        // }
    };
    PreLoadingView.prototype.show = function () {
        LayerManager.ins.addToLayer(this, LayerManager.UI_LAYER, false, false, true);
        var aniObj = this.getChildByName("yezhi");
        aniObj.x = this.x + this.width / 2;
        aniObj.y = this.imgBg.y;
    };
    PreLoadingView.prototype.hide = function () {
        this.imgBg.removeSelf();
        this.imgBg = null;
        this.imgPro.removeSelf();
        this.imgPro = null;
        this.imgProBg.removeSelf();
        this.imgProBg = null;
        this.imgProLight.removeSelf();
        this.imgProLight = null;
        this.imgPreBg.removeSelf();
        this.imgPreBg = null;
        this.lightIcon.removeSelf();
        this.lightIcon = null;
        this.loading.removeSelf();
        this.loading = null;
        // this.lblPro.removeSelf();
        // this.lblPro = null;
        this.caller = null;
        this.callBack = null;
        this.removeSelf();
    };
    PreLoadingView._ins = null;
    return PreLoadingView;
}(ui.PreLoadViewUI));
//# sourceMappingURL=PreLoadingView.js.map