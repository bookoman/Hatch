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
* 战斗胜利界面
*/
var BattleSuccessMediator = /** @class */ (function (_super) {
    __extends(BattleSuccessMediator, _super);
    function BattleSuccessMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.angle = 0;
        return _this;
    }
    BattleSuccessMediator.prototype.initView = function () {
        this.view = new ui.battle.BattleSuccessViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.TIP_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        SoundsManager.ins.setMusicVolume(0.1);
        SoundsManager.ins.playerSoundByEnum(SoundEffectType.SUCCESS, 1, Laya.Handler.create(this, this.soundPlayComplete));
    };
    BattleSuccessMediator.prototype.soundPlayComplete = function () {
        SoundsManager.ins.setMusicVolume(1);
    };
    BattleSuccessMediator.prototype.addEvents = function () {
        this.view.bg.on(Laya.Event.CLICK, this, this.onMaskClick);
        Laya.timer.loop(20, this, this.rotateGray);
    };
    BattleSuccessMediator.prototype.removeEvents = function () {
        this.view.bg.off(Laya.Event.CLICK, this, this.onMaskClick);
        Laya.timer.loop(20, this, this.rotateGray);
    };
    BattleSuccessMediator.prototype.onMaskClick = function (e) {
        BattleEngine.ins.challegenBossFastEnd();
        this.dispose();
    };
    BattleSuccessMediator.prototype.rotateGray = function () {
        this.angle++;
        if (this.angle > 360)
            this.angle = 0;
        if (this.view)
            this.view.imgGray.rotation = this.angle;
    };
    BattleSuccessMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BattleSuccessMediator;
}(BaseMediator));
//# sourceMappingURL=BattleSuccessMediator.js.map