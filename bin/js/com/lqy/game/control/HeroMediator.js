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
* 阵型
*/
var HeroMediator = /** @class */ (function (_super) {
    __extends(HeroMediator, _super);
    function HeroMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    HeroMediator.prototype.initView = function () {
        this.view = new ui.HeroViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.uiRole = new UIRole("10006");
        var rx = this.view.clipShadow.x + this.view.clipShadow.width / 2;
        var ry = this.view.clipShadow.y + this.view.clipShadow.height / 2;
        this.uiRole.addParent(this.view, rx, ry, -0.8, 0.8);
    };
    HeroMediator.prototype.addEvents = function () {
    };
    HeroMediator.prototype.removeEvents = function () {
    };
    HeroMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.uiRole) {
            this.uiRole.dispose();
        }
    };
    return HeroMediator;
}(BaseMediator));
//# sourceMappingURL=HeroMediator.js.map