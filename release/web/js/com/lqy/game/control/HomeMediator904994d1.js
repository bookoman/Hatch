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
var HomeMediator = /** @class */ (function (_super) {
    __extends(HomeMediator, _super);
    function HomeMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    HomeMediator.prototype.initView = function () {
        this.view = new ui.HomeViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
    };
    HomeMediator.prototype.addEvents = function () {
    };
    HomeMediator.prototype.removeEvents = function () {
    };
    HomeMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return HomeMediator;
}(BaseMediator));
//# sourceMappingURL=HomeMediator.js.map