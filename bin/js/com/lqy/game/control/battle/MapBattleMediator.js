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
* 地图战斗
*/
var MapBattleMediator = /** @class */ (function (_super) {
    __extends(MapBattleMediator, _super);
    function MapBattleMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.battleReportMediator = null;
        _this.challegenBossMediator = null;
        /**世界地图 */
        _this.mapWorldMediator = null;
        return _this;
    }
    MapBattleMediator.prototype.initView = function () {
        this.view = new ui.map.MapBattleViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
    };
    MapBattleMediator.prototype.addEvents = function () {
        this.view.btnChalleangeBoss.on(Laya.Event.CLICK, this, this.onChalleangeBoss);
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS, this, this.challegenBossHandler);
    };
    MapBattleMediator.prototype.removeEvents = function () {
        this.view.btnChalleangeBoss.off(Laya.Event.CLICK, this, this.onChalleangeBoss);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS, this.challegenBossHandler);
    };
    /**进入地图假战斗 */
    MapBattleMediator.prototype.enterMapBattle = function () {
        this.battleReportMediator = new BattleReportMediator();
        //初始化游戏场景
        MapManager.ins.enterMap("res/map", 1, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
        RoleManager.ins.initHeros();
        BattleEngine.ins.run();
    };
    MapBattleMediator.prototype.challegenBossHandler = function (data) {
        var isEnd = data[0];
        if (isEnd == false) {
        }
        else {
            if (this.challegenBossMediator)
                this.challegenBossMediator.dispose();
        }
        // RoleManager.ins.resetRolePoint();
    };
    /**
     * 挑战boss
     * @param e
     */
    MapBattleMediator.prototype.onChalleangeBoss = function (e) {
        MapManager.ins.enterMap("res/map", 10000, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
        GameDataManager.ins.productBossData();
        var resAry = [{ url: "unpack/challengeboss/bg.png", type: Loader.IMAGE }];
        var bossData;
        var roleVos = GameDataManager.ins.bossData.masterVos;
        roleVos = roleVos.concat(GameDataManager.ins.selfPlayerData.upHeroVos);
        roleVos.forEach(function (baseRoleVo) {
            //角色资源
            resAry.push({ url: "res/outside/spine/role/" + baseRoleVo.modelId + "/" + baseRoleVo.modelId + ".sk", type: /*laya.net.Loader.BUFFER*/ "arraybuffer" });
        });
        this.challegenBossMediator = new ChallegenBossMediator(resAry);
    };
    MapBattleMediator.prototype.dispose = function () {
    };
    return MapBattleMediator;
}(BaseMediator));
//# sourceMappingURL=MapBattleMediator.js.map