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
        _this.curMediator = null;
        _this.showViewIndex = -1;
        return _this;
    }
    GameMediator.prototype.initView = function () {
        ObjectPoolUtil.init();
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.TOP_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.onBtnMap();
    };
    GameMediator.prototype.addEvents = function () {
        this.view.btnOpen.on(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnMap.on(Laya.Event.CLICK, this, this.onBtnMap);
        this.view.btnLineup.on(Laya.Event.CLICK, this, this.onBtnLineup);
        this.view.btnHero.on(Laya.Event.CLICK, this, this.onBtnHero);
        this.view.btnEquip.on(Laya.Event.CLICK, this, this.onBtnEquip);
        this.view.btnHome.on(Laya.Event.CLICK, this, this.onBtnHome);
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnMap.off(Laya.Event.CLICK, this, this.onBtnMap);
        this.view.btnLineup.off(Laya.Event.CLICK, this, this.onBtnLineup);
        this.view.btnHero.off(Laya.Event.CLICK, this, this.onBtnHero);
        this.view.btnEquip.off(Laya.Event.CLICK, this, this.onBtnEquip);
        this.view.btnHome.off(Laya.Event.CLICK, this, this.onBtnHome);
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    };
    /**地图系统 */
    GameMediator.prototype.onBtnMap = function (e) {
        if (this.showViewIndex == GameButtomTabIndex.MAP_BATTLE) {
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        this.curMediator = new MapBattleMediator();
        this.showViewIndex = GameButtomTabIndex.MAP_BATTLE;
    };
    /**阵型系统 */
    GameMediator.prototype.onBtnLineup = function (e) {
        if (this.showViewIndex == GameButtomTabIndex.LINEUP) {
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        var resAry = [
            { url: "res/atlas/lineup.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new LineupMediator(resAry);
        this.showViewIndex = GameButtomTabIndex.LINEUP;
    };
    GameMediator.prototype.onBtnHero = function (e) {
        var floatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        floatFontTips.setAttribute(24, null, "#000000");
        floatFontTips.show("此功能暂未开放，敬请期待！", e.target.parent, e.target.x, e.target.y, 1.0, 80);
    };
    GameMediator.prototype.onBtnEquip = function (e) {
        var floatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        floatFontTips.setAttribute(24, null, "#000000");
        floatFontTips.show("此功能暂未开放，敬请期待！", e.target.parent, e.target.x, e.target.y, 1.0, 80);
    };
    GameMediator.prototype.onBtnHome = function (e) {
        var floatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        floatFontTips.setAttribute(24, null, "#000000");
        floatFontTips.show("此功能暂未开放，敬请期待！", e.target.parent, e.target.x, e.target.y, 1.0, 80);
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map