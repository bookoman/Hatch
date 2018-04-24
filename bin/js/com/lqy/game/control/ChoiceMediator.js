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
/**
 * name
 */
var ChoiceMediator = /** @class */ (function (_super) {
    __extends(ChoiceMediator, _super);
    function ChoiceMediator(assetsUrl, view) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        return _super.call(this, assetsUrl, view) || this;
    }
    ChoiceMediator.prototype.initView = function () {
        this.view = new ui.ChoiceQuFuUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, true, false, true);
        _super.prototype.initView.call(this);
    };
    ChoiceMediator.prototype.addEvents = function () {
        this.view.btnChoiceOK.on(Laya.Event.CLICK, this, this.onBtnChoiceOK);
    };
    ChoiceMediator.prototype.removeEvents = function () {
        this.view.btnChoiceOK.off(Laya.Event.CLICK, this, this.onBtnChoiceOK);
    };
    ChoiceMediator.prototype.dispose = function () {
    };
    ChoiceMediator.prototype.onBtnChoiceOK = function () {
        LayerManager.ins.removeToLyaer(this.view, LayerManager.UI_LAYER, true, false);
    };
    return ChoiceMediator;
}(BaseMediator));
//# sourceMappingURL=ChoiceMediator.js.map