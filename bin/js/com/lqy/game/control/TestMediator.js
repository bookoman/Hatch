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
var TestMediator = /** @class */ (function (_super) {
    __extends(TestMediator, _super);
    function TestMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    TestMediator.prototype.initView = function () {
        this.view = new ui.test.TestPageUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, true, true);
        _super.prototype.initView.call(this);
    };
    TestMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onClose);
    };
    TestMediator.prototype.removeEvents = function () {
    };
    TestMediator.prototype.onClose = function (e) {
        LayerManager.ins.removeToLyaer(this.view, LayerManager.UI_LAYER, true, true);
    };
    return TestMediator;
}(BaseMediator));
//# sourceMappingURL=TestMediator.js.map