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
var SignMediator = /** @class */ (function (_super) {
    __extends(SignMediator, _super);
    function SignMediator(assetsUrl, view) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        return _super.call(this, assetsUrl, view) || this;
    }
    SignMediator.prototype.initView = function () {
        this.view = new ui.SignViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, true, false);
        _super.prototype.initView.call(this);
    };
    SignMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onBtnClose);
    };
    SignMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnClose);
    };
    SignMediator.prototype.onBtnClose = function (e) {
        console.log("输入框：" + this.view.inputName.text);
    };
    return SignMediator;
}(BaseMediator));
//# sourceMappingURL=SignMediator.js.map