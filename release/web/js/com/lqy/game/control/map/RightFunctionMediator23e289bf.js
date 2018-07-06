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
* 地图右边功能视图
*/
var RightFunctionMediator = /** @class */ (function (_super) {
    __extends(RightFunctionMediator, _super);
    function RightFunctionMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.curMediator = null;
        return _this;
    }
    RightFunctionMediator.prototype.initView = function () {
        Laya.Tween.to(this.view, { x: this.view.x - this.view.width }, 500);
        _super.prototype.initView.call(this);
    };
    RightFunctionMediator.prototype.addEvents = function () {
        this.view.btnGraphtag.on(Laya.Event.CLICK, this, this.onBtnGraptag);
        this.view.btnFarm.on(Laya.Event.CLICK, this, this.onBtnFarm);
    };
    RightFunctionMediator.prototype.removeEvents = function () {
        this.view.btnGraphtag.off(Laya.Event.CLICK, this, this.onBtnGraptag);
        this.view.btnFarm.off(Laya.Event.CLICK, this, this.onBtnFarm);
    };
    RightFunctionMediator.prototype.onBtnGraptag = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry = [
            { url: "unpack/graphtag/grahtagjiatu.png", type: Loader.IMAGE },
            { url: "res/atlas/graphtag.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new GraphtagMediator(resAry);
    };
    RightFunctionMediator.prototype.onBtnFarm = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry = [
            { url: "unpack/farm/bg.png", type: Loader.IMAGE },
            { url: "unpack/farm/bgzhongzhi.png", type: Loader.IMAGE },
            { url: "unpack/farm/caijimap.png", type: Loader.IMAGE },
            { url: "unpack/farm/huawen.png", type: Loader.IMAGE },
            { url: "res/atlas/farm.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new FarmMediator(resAry);
    };
    RightFunctionMediator.prototype.dispose = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        _super.prototype.dispose.call(this);
    };
    return RightFunctionMediator;
}(BaseMediator));
//# sourceMappingURL=RightFunctionMediator.js.map