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
* 背包
*/
var BagMediator = /** @class */ (function (_super) {
    __extends(BagMediator, _super);
    function BagMediator(assetsUrl, view, caller) {
        return _super.call(this, assetsUrl, view) || this;
    }
    BagMediator.prototype.initView = function () {
        this.view = new ui.bag.BagViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        //入场动画
        Tween.to(this.view.bagTitleImage, { x: 0 }, 500, Ease.backInOut);
        Tween.to(this.view.bagPanel, { x: 9 }, 500, Ease.backInOut);
    };
    BagMediator.prototype.addEvents = function () {
        // this.view.closeBth.on(Laya.Event.CLICK, this,this.onCloseBtnClick);
    };
    BagMediator.prototype.removeEvents = function () {
    };
    BagMediator.prototype.onCloseBtnClick = function (e) {
        Tween.to(this.view.bagTitleImage, { x: -227 }, 100);
        Tween.to(this.view.bagPanel, { x: 755 }, 100, null, Handler.create(this, this.dispose));
    };
    BagMediator.prototype.dispose = function () {
        Laya.Tween.clearAll(this.view.bagTitleImage);
        Laya.Tween.clearAll(this.view.bagPanel);
        _super.prototype.dispose.call(this);
    };
    return BagMediator;
}(BaseMediator));
//# sourceMappingURL=BagMediator.js.map