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
        return _super.call(this, assetsUrl, view) || this;
    }
    SignMediator.prototype.initView = function () {
        this.view = new ui.SignViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, true, false);
        _super.prototype.initView.call(this);
    };
    SignMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onBtnClose);
        this.view.btnRecharge.on(Laya.Event.CLICK, this, this.onBtnRecharge);
        this.view.btnRechargeExit.on(Laya.Event.CLICK, this, this.onBtnRechargeExit);
    };
    SignMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnClose);
        this.view.btnRecharge.off(Laya.Event.CLICK, this, this.onBtnRecharge);
        this.view.btnRechargeExit.off(Laya.Event.CLICK, this, this.onBtnRechargeExit);
    };
    SignMediator.prototype.onBtnClose = function (e) {
        LayerManager.ins.removeToLayer(this.view, LayerManager.UI_LAYER, true, false);
    };
    SignMediator.prototype.onBtnRecharge = function (e) {
        console.log("功能暂时关闭" + this.view.inputName.text);
    };
    SignMediator.prototype.onBtnRechargeExit = function (e) {
        LayerManager.ins.removeToLayer(this.view, LayerManager.UI_LAYER, true, false);
    };
    return SignMediator;
}(BaseMediator));
//# sourceMappingURL=SignMediator.js.map