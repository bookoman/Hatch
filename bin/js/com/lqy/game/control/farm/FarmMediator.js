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
* 农场
*/
var FarmMediator = /** @class */ (function (_super) {
    __extends(FarmMediator, _super);
    function FarmMediator(assetsUrl, view, caller) {
        return _super.call(this, assetsUrl, view) || this;
    }
    FarmMediator.prototype.initView = function () {
        this.view = new ui.farm.FarmViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        console.log(this.view.mouseThrough, this.view.mouseEnabled);
        _super.prototype.initView.call(this);
        //var spr:Sprite;
        //spr.mouseEnabled
        //入场动画
    };
    FarmMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtnClick);
    };
    FarmMediator.prototype.removeEvents = function () {
        this.view.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtnClick);
    };
    FarmMediator.prototype.onCloseBtnClick = function (e) {
        this.dispose();
        // console.log(e.target);
    };
    FarmMediator.prototype.dispose = function () {
        if (this.view) {
        }
        _super.prototype.dispose.call(this);
    };
    return FarmMediator;
}(BaseMediator));
//# sourceMappingURL=FarmMediator.js.map