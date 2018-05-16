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
* 游戏主界面代理器
*/
var GameMediator = /** @class */ (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.battleReportMediator = null;
        return _this;
    }
    GameMediator.prototype.initView = function () {
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.battleReportMediator = new BattleReportMediator();
        //初始化游戏场景
        ObjectPoolUtil.init();
        MapManager.ins.enterMap("res/map", 1, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
        GameDataManager.ins.initData();
        RoleManager.ins.initHeros();
        BattleEngine.ins.run();
    };
    GameMediator.prototype.addEvents = function () {
        this.view.btnOpen.on(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnAni.on(Laya.Event.CLICK, this, this.onPlayAni);
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS, this, this.challegenBossHandler);
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK, this, this.onPlayAni);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS, this.challegenBossHandler);
    };
    GameMediator.prototype.challegenBossHandler = function (data) {
        var isEnd = data[0];
        if (isEnd == false) {
            BattleEngine.ins.challegenBoss();
        }
        else {
            this.challegenBossMediator.dispose();
        }
        this.battleReportMediator.setVisible(isEnd);
        GameDataManager.ins.resetRolePoint();
        RoleManager.ins.resetRolePoint();
    };
    GameMediator.prototype.onPlayAni = function (e) {
        // var testMediator:TestMediator = new TestMediator();
        this.challegenBossMediator = new ChallegenBossMediator();
        //挑战boss
        MapManager.ins.enterMap("res/map", 10000, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map