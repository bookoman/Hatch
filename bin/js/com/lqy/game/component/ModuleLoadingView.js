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
/*
* 模块加载条视图
*/
var ModuleLoadingView = /** @class */ (function (_super) {
    __extends(ModuleLoadingView, _super);
    function ModuleLoadingView() {
        var _this = _super.call(this) || this;
        _this.mapLoopEngin = null;
        _this.maskSpr = null;
        _this.bg = null;
        _this.skeletonAni = null;
        // private preBgSprite:Laya.Sprite;
        //地图纹理
        _this.preBgTexture = null;
        /**加载点索引 */
        _this.loadInd = 0;
        _this.loadCount = 0;
        _this.initSkin();
        return _this;
    }
    Object.defineProperty(ModuleLoadingView, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new ModuleLoadingView();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    ModuleLoadingView.prototype.initSkin = function () {
        this.mapLoopEngin = new MapLoopEngine();
        var resAry = ["unpack/moduleload/prebg.png", "unpack/moduleload/bg.png",
            "unpack/moduleload/clip_bug.png", "unpack/moduleload/load.png"];
        Laya.loader.load(resAry, Laya.Handler.create(this, this.resLoaded));
        this.skeletonAni = new Skeleton();
        this.skeletonAni.load("res/outside/spine/role/xunmenglong001/xunmenglong001.sk", Laya.Handler.create(this, this.loadCompleted));
        this.clipLoads = new Array();
        var clipLoad;
        for (var i = 0; i < 3; i++) {
            clipLoad = new Laya.Clip("unpack/moduleload/clip_load.png");
            clipLoad.index = 0;
            clipLoad.clipY = 3;
            if (i == 0)
                clipLoad.centerX = -20;
            else if (i == 1)
                clipLoad.centerX = 0;
            else
                clipLoad.centerX = 20;
            clipLoad.bottom = 25;
            this.panelLoad.addChild(clipLoad);
            this.clipLoads.push(clipLoad);
        }
    };
    ModuleLoadingView.prototype.resLoaded = function () {
        this.bg = new LayaImage("unpack/moduleload/bg.png");
        this.bg.x = this.panelLoad.width - this.bg.width >> 1;
        this.bg.y = this.panelLoad.height - this.bg.height - 50;
        this.panelLoad.addChild(this.bg);
        this.skeletonAni.pos(this.panelLoad.width / 2, this.bg.y + this.bg.height / 2 + 10);
        this.skeletonAni.scaleX = -1;
        this.panelLoad.addChild(this.skeletonAni);
        // this.preBgTexture = Laya.loader.getRes("unpack/moduleload/prebg.png");
        // this.preBgSprite = new Laya.Sprite();
        // this.preBgSprite.x = this.bg.x;
        // this.preBgSprite.visible = false;
        // this.preBgSprite.y = this.bg.y + this.bg.height - this.preBgTexture.height;
        // //前景地图移动
        // this.preBgSprite.scrollRect = new Rectangle(0,0,this.preBgTexture.width,this.preBgTexture.height);  
        // this.preBgSprite.graphics.drawTexture(this.preBgTexture);
        // this.panelLoad.addChild(this.preBgSprite);
        // // //补位纹理
        // var repairTexture:Texture = Laya.Texture.createFromTexture(this.preBgTexture,0,0,this.panelLoad.width,this.panelLoad.height);
        // this.preBgSprite.graphics.drawTexture(repairTexture,this.preBgTexture.width,0);
        this.clipBug = new Laya.Clip("unpack/moduleload/clip_bug.png");
        this.clipBug.clipX = 3;
        this.clipBug.centerX = 0;
        this.clipBug.centerY = 0;
        this.panelLoad.addChild(this.clipBug);
    };
    ModuleLoadingView.prototype.onPreBgScroll = function () {
        if (this.bg == null) { //未加载成功
            return;
        }
        // var fx:number = this.fx + 4;
        // if(this.fx != fx){  
        //     this.cacheAsBitmap = false;  
        //     this.fx = fx;  
        //     if(this.fx > this.preBgTexture.width)
        //     {
        //         this.fx = 0;
        //     }
        //     //滚动视图
        //     var rect:Rectangle = this.preBgSprite.scrollRect;
        //     rect.x = this.fx;  
        //     this.preBgSprite.scrollRect = rect;
        // }
        //加载点
        this.loadCount++;
        if (this.loadCount % 20 == 0) {
            //显示加载动画
            this.setLoadProgress();
        }
        this.clipBug.index = this.loadInd;
    };
    /**设置加载点 */
    ModuleLoadingView.prototype.setLoadProgress = function () {
        if (this.loadInd > 2)
            this.loadInd = 0;
        var tempInd = this.loadInd;
        this.clipLoads[tempInd].index = 0;
        //后一点
        tempInd = this.loadInd + 1;
        if (tempInd > 2)
            tempInd = 0;
        this.clipLoads[tempInd].index = 1;
        //前一点
        tempInd = this.loadInd - 1;
        if (tempInd < 0)
            tempInd = 2;
        this.clipLoads[tempInd].index = 2;
        this.loadInd++;
        // console.log(".............");
    };
    ModuleLoadingView.prototype.loadCompleted = function () {
        this.skeletonAni.play(RoleAniIndex.MOVE, true);
    };
    ModuleLoadingView.prototype.setProgress = function (value) {
        if (value == 1) {
            Laya.timer.once(200, this, this.hide, null, false);
        }
    };
    ModuleLoadingView.prototype.show = function () {
        this.fx = 0;
        this.loadInd = 0;
        this.loadCount = 0;
        this.setLoadProgress();
        Laya.timer.frameLoop(1, this, this.onPreBgScroll);
        LayerManager.ins.addToLayer(this, LayerManager.TIP_LAYER, true, false, true);
    };
    ModuleLoadingView.prototype.hide = function () {
        LayerManager.ins.removeToLayer(this, LayerManager.TIP_LAYER, true, false);
        Laya.timer.clear(this, this.onPreBgScroll);
    };
    ModuleLoadingView._ins = null;
    return ModuleLoadingView;
}(ui.main.ModuleLoadViewUI));
//# sourceMappingURL=ModuleLoadingView.js.map