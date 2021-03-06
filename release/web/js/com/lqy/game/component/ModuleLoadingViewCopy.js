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
* name;
*/
var ModuleLoadingViewCopy = /** @class */ (function (_super) {
    __extends(ModuleLoadingViewCopy, _super);
    function ModuleLoadingViewCopy() {
        var _this = _super.call(this) || this;
        _this.radius = 100;
        _this.progressLine = 10;
        _this.lblProgress = null;
        _this.maskSpr = null;
        _this.initSkin();
        return _this;
    }
    Object.defineProperty(ModuleLoadingViewCopy, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new ModuleLoadingView();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    ModuleLoadingViewCopy.prototype.initSkin = function () {
        this.graphics.drawCircle(0, 0, this.radius, "#ffffff");
        if (this.maskSpr == null) {
            this.maskSpr = new Laya.Sprite();
            this.maskSpr.graphics.drawCircle(0, 0, this.radius - this.progressLine, "#ffffff");
            this.addChild(this.maskSpr);
        }
        if (this.lblProgress == null) {
            this.lblProgress = new Laya.Label();
            this.lblProgress.width = 60;
            this.lblProgress.height = 30;
            this.lblProgress.x = -this.lblProgress.width / 2;
            this.lblProgress.y = -this.lblProgress.height / 2;
            this.lblProgress.fontSize = 24;
            this.lblProgress.align = "center";
            this.addChild(this.lblProgress);
        }
    };
    ModuleLoadingViewCopy.prototype.setProgress = function (value) {
        this.graphics.drawPie(0, 0, this.radius, 0, value * 360, "#ff0000");
        if (this.lblProgress) {
            this.lblProgress.text = value * 100 + "%";
        }
        if (value == 1) {
            Laya.timer.once(200, this, this.hide, null, false);
        }
    };
    ModuleLoadingViewCopy.prototype.show = function () {
        LayerManager.ins.addToLayer(this, LayerManager.TIP_LAYER, true, false, true);
    };
    ModuleLoadingViewCopy.prototype.hide = function () {
        LayerManager.ins.removeToLayer(this, LayerManager.TIP_LAYER, true, false);
    };
    ModuleLoadingViewCopy._ins = null;
    return ModuleLoadingViewCopy;
}(Laya.Sprite));
//# sourceMappingURL=ModuleLoadingViewCopy.js.map