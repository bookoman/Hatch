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
* 图鉴
*/
var GraphtagMediator = /** @class */ (function (_super) {
    __extends(GraphtagMediator, _super);
    function GraphtagMediator(assetsUrl, view, caller) {
        return _super.call(this, assetsUrl, view) || this;
    }
    GraphtagMediator.prototype.initView = function () {
        this.view = new ui.graphtag.GraphtagViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        //入场动画
        Tween.to(this.view.graptitleImage, { x: 0 }, 500, Ease.backInOut);
        Tween.to(this.view.graphtagPanel, { x: 9 }, 500, Ease.backInOut);
    };
    GraphtagMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtnClick);
    };
    GraphtagMediator.prototype.removeEvents = function () {
        this.view.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtnClick);
    };
    GraphtagMediator.prototype.onCloseBtnClick = function (e) {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP);
        Tween.to(this.view.graptitleImage, { x: -227 }, 100);
        Tween.to(this.view.graphtagPanel, { x: 755 }, 100, null, Handler.create(this, this.dispose));
    };
    GraphtagMediator.prototype.dispose = function () {
        if (this.view) {
            Laya.Tween.clearAll(this.view.graptitleImage);
            Laya.Tween.clearAll(this.view.graphtagPanel);
        }
        _super.prototype.dispose.call(this);
    };
    return GraphtagMediator;
}(BaseMediator));
//# sourceMappingURL=GraphtagMediator.js.map