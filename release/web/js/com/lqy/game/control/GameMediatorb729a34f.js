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
        _this.mapBattleMediator = null;
        return _this;
    }
    GameMediator.prototype.initView = function () {
        ClientSender.getHeroInfoReq(1);
        ObjectPoolUtil.init();
        // GameDataManager.ins.initData();
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.TOP_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.onBtnMap();
    };
    GameMediator.prototype.addEvents = function () {
        this.view.btnOpen.on(LayaEvent.CLICK, this, this.onBtnOpen);
        this.view.btnMap.on(LayaEvent.CLICK, this, this.onBtnMap);
        this.view.btnLineup.on(LayaEvent.CLICK, this, this.onBtnLineup);
        this.view.btnBattle.on(LayaEvent.CLICK, this, this.onBtnBattle);
        this.view.btnHero.on(LayaEvent.CLICK, this, this.onBtnHero);
        this.view.btnBag.on(LayaEvent.CLICK, this, this.onBtnBag);
        this.view.btnMap.on(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnMap.on(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnLineup.on(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnLineup.on(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnBattle.on(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnBattle.on(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnHero.on(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnHero.on(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnBag.on(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnBag.on(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        EventManager.ins.addEvent(EventManager.CHOICE_CHALLEGEN_GATE, this, this.choiceChanllegeGate);
        WebSocketManager.ins.registerHandler(Protocol.HERO, Protocol.HERO_GET_INFOS, new GetHeroInfosHanlder(this, this.getHeroInfosHandler));
        WebSocketManager.ins.registerHandler(Protocol.GATE, Protocol.GATE_INFO, new GetGateInfoHandler(this, this.gateInfoHanlder));
        WebSocketManager.ins.registerHandler(Protocol.GATE, Protocol.GATE_HANDUP_STATE, new GateHangupStateHandler(this, this.gateInfoHanlder));
        // (this.view.viewAniScale.listAniScale as Laya.List).renderHandler = new Handler(this,this.onListAniScaleRender);
        // (this.view.viewAniScale.listAniScale as Laya.List).mouseHandler = new Handler(this,this.onListMouseHandler);
        // EventManager.ins.addEvent(EventManager.TEST_LIST_SCRALE_RENDER,this,this.listScraleInit);
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnMap.off(Laya.Event.CLICK, this, this.onBtnMap);
        this.view.btnLineup.off(Laya.Event.CLICK, this, this.onBtnLineup);
        this.view.btnBattle.off(Laya.Event.CLICK, this, this.onBtnBattle);
        this.view.btnHero.off(Laya.Event.CLICK, this, this.onBtnHero);
        this.view.btnBag.off(Laya.Event.CLICK, this, this.onBtnBag);
        this.view.btnMap.off(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnMap.off(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnLineup.off(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnLineup.off(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnBattle.off(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnBattle.off(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnHero.off(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnHero.off(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        this.view.btnBag.off(LayaEvent.MOUSE_DOWN, this, this.onBtnDownUp);
        this.view.btnBag.off(LayaEvent.MOUSE_UP, this, this.onBtnDownUp);
        EventManager.ins.removeEvent(EventManager.CHOICE_CHALLEGEN_GATE, this.choiceChanllegeGate);
        WebSocketManager.ins.unregisterHandler(Protocol.HERO, Protocol.HERO_GET_INFOS, this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE, Protocol.GATE_INFO, this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE, Protocol.GATE_HANDUP_STATE, this);
        // (this.view.viewAniScale.listAniScale as Laya.List).renderHandler = null;
        // (this.view.viewAniScale.listAniScale as Laya.List).mouseHandler = null;
    };
    // private listScraleInit():void
    // {
    //     this.view.viewAniScale.visible = true;
    //     this.view.viewAniScale.alpha = 0.5;
    //     var ary = GameDataManager.ins.selfPlayerData.roleVoAry.concat(GameDataManager.ins.bossData.roleVoAry);
    //     (this.view.viewAniScale.listAniScale as Laya.List).array = ary;
    // }
    /**得到宠物信息 */
    GameMediator.prototype.getHeroInfosHandler = function () {
    };
    GameMediator.prototype.onListAniScaleRender = function (cell, index) {
        if (cell && cell.dataSource) {
            cell.getChildByName("lblRoleName").text = cell.dataSource.name;
            cell.scaleX = 1;
            // console.log(cell.scaleX,cell.scaleY,cell.rotation);
        }
    };
    GameMediator.prototype.onListMouseHandler = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            var cell = this.view.viewAniScale.listAniScale.getCell(index);
            var btn = cell.getChildByName("btnTest");
            switch (e.target) {
                case btn:
                    var roleID = cell.dataSource.id;
                    var s = Number(cell.getChildByName("inputScale").text);
                    EventManager.ins.dispatchEvent(EventManager.TEST_CHANGE_ROLE_SCALE, [roleID, s]);
                    break;
            }
        }
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    };
    /**地图系统 */
    GameMediator.prototype.onBtnMap = function (e) {
        if (GameDataManager.showModuleViewInd == GameButtomTabIndex.MAP_BATTLE) {
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        ClientSender.gateGateInfoReq();
    };
    GameMediator.prototype.gateInfoHanlder = function () {
        //显示地图界面
        var resAry = [
            { url: "unpack/worldmap/p1.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p2.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p3.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p4.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p5.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p6.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p7.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/bg.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_gatebg.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_listbg.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_listgraybg.png", type: Loader.IMAGE },
            { url: "res/atlas/worldmap.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new MapWorldMediator(resAry);
        GameDataManager.showModuleViewInd = GameButtomTabIndex.MAP_BATTLE;
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP, 1000);
    };
    /**选择挑战关卡 */
    GameMediator.prototype.choiceChanllegeGate = function () {
        this.onBtnBattle(null);
    };
    /**阵型系统 */
    GameMediator.prototype.onBtnLineup = function (e) {
        if (GameDataManager.showModuleViewInd == GameButtomTabIndex.LINEUP) {
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
        GameDataManager.showModuleViewInd = GameButtomTabIndex.LINEUP;
        SoundsManager.ins.playerMusicByEnum(MusicBGType.UI_BG, 1000);
    };
    /**英雄系统*/
    GameMediator.prototype.onBtnHero = function (e) {
        if (GameDataManager.showModuleViewInd == GameButtomTabIndex.HERO) {
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        var resAry = [
            { url: "res/atlas/hero.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new HeroMediator(resAry);
        GameDataManager.showModuleViewInd = GameButtomTabIndex.HERO;
        SoundsManager.ins.playerMusicByEnum(MusicBGType.UI_BG, 1000);
    };
    /**战斗系统*/
    GameMediator.prototype.onBtnBag = function (e) {
        if (GameDataManager.showModuleViewInd == GameButtomTabIndex.EQUIP) {
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        var resAry = [
            { url: "unpack/bag/itemjiatu.png", type: Loader.IMAGE },
            { url: "res/atlas/bag.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new BagMediator(resAry);
        GameDataManager.showModuleViewInd = GameButtomTabIndex.EQUIP;
        SoundsManager.ins.playerMusicByEnum(MusicBGType.UI_BG, 1000);
    };
    /**挂机战斗*/
    GameMediator.prototype.onBtnBattle = function (e) {
        if (GameDataManager.showModuleViewInd == GameButtomTabIndex.BATTLE) {
            return;
        }
        if (GameDataManager.ins.hangGateKey == null) {
            console.log("请先选择关卡信息");
            return;
        }
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        if (this.mapBattleMediator == null) {
            this.mapBattleMediator = new MapBattleMediator();
            this.mapBattleMediator.enterMapBattle();
        }
        GameDataManager.showModuleViewInd = GameButtomTabIndex.BATTLE;
        SoundsManager.ins.playerMusicByEnum(MusicBGType.SHAM_BATTLE, 1000);
    };
    /**按钮选中效果 */
    GameMediator.prototype.onBtnDownUp = function (e) {
        var btn = e.target;
        if (btn === this.view.btnBattle) {
            if (e.type == LayaEvent.MOUSE_DOWN)
                btn.scale(1.1, 1.1);
            else if (e.type == LayaEvent.MOUSE_UP)
                btn.scale(1, 1);
        }
        else {
            if (e.type == LayaEvent.MOUSE_DOWN)
                btn.scale(1, 1);
            else if (e.type == LayaEvent.MOUSE_UP)
                btn.scale(0.9, 0.9);
        }
        if (btn) {
        }
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map