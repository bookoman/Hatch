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
* 战斗失败界面
*/
var BattleFailMediator = /** @class */ (function (_super) {
    __extends(BattleFailMediator, _super);
    function BattleFailMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.angle = 0;
        return _this;
    }
    BattleFailMediator.prototype.initView = function () {
        this.view = new ui.battle.BattleFailViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.TIP_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        SoundsManager.ins.setMusicVolume(0.1);
        SoundsManager.ins.playerSoundByEnum(SoundEffectType.FAIL, 1, Laya.Handler.create(this, this.soundPlayComplete));
    };
    BattleFailMediator.prototype.soundPlayComplete = function () {
        SoundsManager.ins.setMusicVolume(1);
    };
    BattleFailMediator.prototype.addEvents = function () {
        this.view.bg.on(Laya.Event.CLICK, this, this.onMaskClick);
        this.view.btnGiveup.on(Laya.Event.CLICK, this, this.onBtnGiveupClick);
        this.view.btnBattleAgain.on(Laya.Event.CLICK, this, this.onBtnBattleAgain);
        Laya.timer.loop(20, this, this.rotateGray);
    };
    BattleFailMediator.prototype.removeEvents = function () {
        this.view.bg.off(Laya.Event.CLICK, this, this.onMaskClick);
        this.view.btnGiveup.off(Laya.Event.CLICK, this, this.onBtnGiveupClick);
        this.view.btnBattleAgain.off(Laya.Event.CLICK, this, this.onBtnBattleAgain);
        Laya.timer.clear(this, this.rotateGray);
    };
    BattleFailMediator.prototype.onMaskClick = function (e) {
        this.dispose();
    };
    BattleFailMediator.prototype.onBtnGiveupClick = function (e) {
        this.dispose();
    };
    BattleFailMediator.prototype.onBtnBattleAgain = function (e) {
    };
    BattleFailMediator.prototype.rotateGray = function () {
        this.angle++;
        if (this.angle > 360)
            this.angle = 0;
        if (this.view)
            this.view.imgGray.rotation = this.angle;
    };
    BattleFailMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BattleFailMediator;
}(BaseMediator));
//# sourceMappingURL=BattleFailMediator.js.map