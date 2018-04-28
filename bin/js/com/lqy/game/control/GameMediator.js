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
    function GameMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.battleReportMediator = null;
        return _this;
    }
    GameMediator.prototype.initView = function () {
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.battleReportMediator = new BattleReportMediator("main/img_reportsbg.png");
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
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK, this, this.onPlayAni);
    };
    GameMediator.prototype.onPlayAni = function (e) {
        var testMediator = new TestMediator();
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map