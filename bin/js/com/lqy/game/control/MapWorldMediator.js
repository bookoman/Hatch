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
* 世界地图
*/
var MapWorldMediator = /** @class */ (function (_super) {
    __extends(MapWorldMediator, _super);
    function MapWorldMediator(assetsUrl, view, caller) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.mapBattleMediator = caller;
        return _this;
    }
    MapWorldMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    MapWorldMediator.prototype.addEvents = function () {
        this.view.btnEnter.on(Laya.Event.CLICK, this, this.onBtnEnter);
    };
    MapWorldMediator.prototype.removeEvents = function () {
        this.view.btnEnter.off(Laya.Event.CLICK, this, this.onBtnEnter);
    };
    MapWorldMediator.prototype.onBtnEnter = function (e) {
        GameDataManager.ins.hundUpChapterData = 1;
        if (this.mapBattleMediator) {
            this.mapBattleMediator.enterMapBattle();
        }
        this.dispose();
    };
    MapWorldMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.mapBattleMediator = null;
    };
    return MapWorldMediator;
}(BaseMediator));
//# sourceMappingURL=MapWorldMediator.js.map