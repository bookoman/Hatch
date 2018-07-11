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
* 关卡列表
*/
var GateListMediator = /** @class */ (function (_super) {
    __extends(GateListMediator, _super);
    function GateListMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.grayFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ]);
        return _this;
    }
    GateListMediator.prototype.initView = function () {
        this.view = new ui.map.GateListViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, true, true, true);
        _super.prototype.initView.call(this);
    };
    GateListMediator.prototype.addEvents = function () {
        this.view.listGate.renderHandler = new Handler(this, this.listGateRender);
        this.view.listGate.mouseHandler = new Handler(this, this.listMouseHandler);
        var layer = LayerManager.ins.getLayer(LayerManager.UI_LAYER);
        if (layer) {
            layer.maskSprite.on("click", this, this.onMaskSpriteClick);
        }
        WebSocketManager.ins.registerHandler(Protocol.GATE, Protocol.GATE_BATTLE, new BattleGateHandler(this, this.battleGateResponse));
        WebSocketManager.ins.registerHandler(Protocol.GATE, Protocol.GATE_SCAN, new ScanGateHandler(this, this.scanGateResponse));
        WebSocketManager.ins.registerHandler(Protocol.GATE, Protocol.GATE_SWITCH_HANG_GATE, new GateSwitchHangupHandler(this, this.switchHangupGateResponse));
    };
    GateListMediator.prototype.removeEvents = function () {
        this.view.listGate.renderHandler = null;
        this.view.listGate.mouseHandler = null;
        var layer = LayerManager.ins.getLayer(LayerManager.UI_LAYER);
        if (layer) {
            layer.maskSprite.off("click", this, this.onMaskSpriteClick);
        }
        WebSocketManager.ins.unregisterHandler(Protocol.GATE, Protocol.GATE_BATTLE, this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE, Protocol.GATE_SCAN, this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE, Protocol.GATE_SWITCH_HANG_GATE, this);
    };
    GateListMediator.prototype.listMouseHandler = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            var cell = this.view.listGate.getCell(index);
            if (e.target == cell.getChildByName("btnChanllege")) {
                if (GameConfig.SINGLE_GAME) {
                    var gateKey = cell.dataSource.key;
                    GameDataManager.ins.hangGateKey = gateKey;
                    this.battleGateResponse(gateKey);
                }
                else {
                    ClientSender.ballteGateReq(cell.dataSource.key);
                }
            }
            else if (e.target == cell.getChildByName("btnSweep")) {
                var btnSp = cell.getChildByName("btnSweep");
                if (btnSp.filters) {
                    TipsManager.ins.showFloatMsg("2秒之后才能扫荡", 30, "#ff0000", this.view, this.view.width / 2, this.view.height / 2, 1, 0, 100);
                    return;
                }
                Laya.timer.once(2000, this, this.timeEndCanScan, [btnSp], false);
                btnSp.filters = [this.grayFilter];
                if (GameConfig.SINGLE_GAME)
                    this.scanGateResponse(cell.dataSource.key);
                else
                    ClientSender.scanGateReq(cell.dataSource.key);
            }
            else if (e.target == cell.getChildByName("imgReward")) {
                console.log("点击宝箱");
            }
            else {
                if (GameConfig.SINGLE_GAME) {
                    var gateKey = cell.dataSource.key;
                    GameDataManager.ins.hangGateKey = gateKey;
                    this.switchHangupGateResponse(gateKey);
                }
                else {
                    ClientSender.gateSwitchHangReq(cell.dataSource.key);
                }
            }
        }
    };
    GateListMediator.prototype.timeEndCanScan = function (btnSweep) {
        btnSweep.filters = null;
    };
    GateListMediator.prototype.battleGateResponse = function (gateKey) {
        // GameDataManager.ins.hangGateKey = gateKey;
        EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
    };
    /**扫荡返回 */
    GateListMediator.prototype.scanGateResponse = function (gateKey) {
        var sampleConfig = ConfigManager.ins.getGateSampleConfig(gateKey);
        var ary = sampleConfig.getRandowRewards();
        var itemKey;
        var itemNum;
        for (var i = 0; i < ary.length; i++) {
            itemKey = ary[i][0];
            itemNum = Number(ary[i][1]);
            var itemConfig = ConfigManager.ins.getItemSampleConfig(itemKey);
            if (!itemConfig)
                continue;
            Laya.timer.once(300 * i, this, this.showFloat, [itemConfig.itemName, itemNum], false);
        }
    };
    /**扫荡飘字 */
    GateListMediator.prototype.showFloat = function (itemName, itemNum) {
        var html = "<span style='fontSize:30' color='#00ff00'>" + itemName + "X</span>";
        html += "<span style='color:#ff0000;font-weight:bold;fontSize:30'>" + itemNum + "</span>";
        TipsManager.ins.showFloatHtmlMsg(html, this.view, this.view.width / 2, this.view.height / 2, 1.0, 200);
    };
    GateListMediator.prototype.switchHangupGateResponse = function (gateKey) {
        // GameDataManager.ins.hangGateKey = gateKey;
        EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
    };
    GateListMediator.prototype.listGateRender = function (cell, index) {
        if (cell && cell.dataSource) {
            var gameDataMgr = GameDataManager.ins;
            var gateConfig = cell.dataSource;
            var gateInfoVo = gameDataMgr.getGateInfoVo(gateConfig.key);
            var isPass = gateInfoVo !== undefined && gateInfoVo !== null;
            cell.getChildByName("lblName").text = gateConfig.gateName;
            cell.getChildByName("lblLevel").text = "推荐等级：" + gateConfig.level;
            cell.getChildByName("img_notice").visible = !isPass;
            cell.getChildByName("btnSweep").visible = isPass && gateInfoVo.passGate;
            cell.getChildByName("btnChanllege").visible = isPass && !gateInfoVo.passGate;
            cell.getChildByName("img_hand").visible = gameDataMgr.hangGateKey == gateConfig.key;
            cell.disabled = !isPass;
            // (cell.getChildByName("imgIcon") as Laya.Image).skin = "res/outside/icons/heros/"+gateConfig +".png";
            var icon = cell.getChildByName("imgIcon");
            var heroKey;
            if (index == 0) {
                heroKey = "Hero_10017";
            }
            else if (index == 1)
                heroKey = "Hero_10049";
            else if (index == 2)
                heroKey = "Hero_10073";
            else if (index == 3)
                heroKey = "Hero_10065";
            else if (index == 4)
                heroKey = "Hero_10009";
            if (icon.numChildren == 0) {
                var uiRole = new UIRole(heroKey);
                uiRole.addParent(icon, icon.width / 2, icon.height - 10, 0.3, 0.3, true);
            }
        }
    };
    /**设置管卡数据 */
    GateListMediator.prototype.setData = function (mapKey) {
        var gateConfigs = ConfigManager.ins.getGateConfigsByMapKey(mapKey);
        this.view.listGate.array = gateConfigs;
        this.view.listGate.scrollBar.hide = true;
    };
    GateListMediator.prototype.onMaskSpriteClick = function () {
        this.dispose();
    };
    GateListMediator.prototype.dispose = function () {
        // super.dispose();
        LayerManager.ins.removeToLayer(this.view, LayerManager.UI_LAYER, true, true);
    };
    return GateListMediator;
}(BaseMediator));
//# sourceMappingURL=GateListMediator.js.map