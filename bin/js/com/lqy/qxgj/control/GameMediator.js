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
var GameMediator = /** @class */ (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator() {
        return _super.call(this) || this;
    }
    GameMediator.prototype.initView = function () {
        this.view = new ui.GameViewUI();
        _super.prototype.initView.call(this);
    };
    GameMediator.prototype.addEvents = function () {
        this.view.btnOpen.on(Laya.Event.CLICK, this, this.onBtnOpen);
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        // var testMediator:TestMediator = new TestMediator();
        // testMediator.show();
        var signMediator = new SignMediator();
        signMediator.show();
    };
    GameMediator.prototype.show = function () {
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, false, false, true);
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map