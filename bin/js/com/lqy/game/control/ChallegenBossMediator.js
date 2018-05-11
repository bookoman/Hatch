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
* 挑战boss界面
*/
var ChallegenBossMediator = /** @class */ (function (_super) {
    __extends(ChallegenBossMediator, _super);
    function ChallegenBossMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    ChallegenBossMediator.prototype.initView = function () {
        this.view = new ui.ChallengeBossViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
    };
    ChallegenBossMediator.prototype.addEvents = function () {
        this.view.btnFast.on(Laya.Event.CLICK, this, this.onBtnFast);
    };
    ChallegenBossMediator.prototype.removeEvents = function () {
        this.view.btnFast.off(Laya.Event.CLICK, this, this.onBtnFast);
    };
    ChallegenBossMediator.prototype.onBtnFast = function (e) {
        this.dispose();
    };
    ChallegenBossMediator.prototype.dispose = function () {
        BattleEngine.ins.endBattle();
        BattleDataManager.ins.initData();
        LayerManager.ins.removeToLyaer(this.view, LayerManager.UI_LAYER, true, false);
    };
    return ChallegenBossMediator;
}(BaseMediator));
//# sourceMappingURL=ChallegenBossMediator.js.map