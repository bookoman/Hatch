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
* 战报视图
*/
var BattleReportMediator = /** @class */ (function (_super) {
    __extends(BattleReportMediator, _super);
    function BattleReportMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    BattleReportMediator.prototype.initView = function () {
        this.view = new ui.BattleReportViewUI();
        this.view.x = 0;
        this.view.y = 960;
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, false);
        _super.prototype.initView.call(this);
    };
    BattleReportMediator.prototype.addEvents = function () {
    };
    BattleReportMediator.prototype.removeEvents = function () {
    };
    return BattleReportMediator;
}(BaseMediator));
//# sourceMappingURL=BattleReportMediator.js.map