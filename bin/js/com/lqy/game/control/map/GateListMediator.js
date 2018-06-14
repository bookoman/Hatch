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
        return _super.call(this, assetsUrl, view) || this;
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
    };
    GateListMediator.prototype.removeEvents = function () {
        this.view.listGate.renderHandler = null;
        this.view.listGate.mouseHandler = null;
        var layer = LayerManager.ins.getLayer(LayerManager.UI_LAYER);
        if (layer) {
            layer.maskSprite.off("click", this, this.onMaskSpriteClick);
        }
    };
    GateListMediator.prototype.listMouseHandler = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            var cell = this.view.listGate.getCell(index);
            if (e.target == cell.getChildByName("btnChanllege")) {
                GameDataManager.ins.hangGateKey = cell.dataSource.key;
                EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
            }
        }
    };
    GateListMediator.prototype.listGateRender = function (cell, index) {
        if (cell && cell.dataSource) {
            var gateConfig = cell.dataSource;
            var gateInfoVo = GameDataManager.ins.getGateInfoVo(gateConfig.key);
            var isPass = gateInfoVo !== undefined && gateInfoVo !== null;
            cell.getChildByName("lblName").text = gateConfig.gateName;
            cell.getChildByName("lblLevel").text = "推荐等级：" + gateConfig.level;
            cell.getChildByName("img_notice").visible = !isPass;
            cell.getChildByName("btnSweep").visible = isPass && gateInfoVo.passGate;
            cell.getChildByName("btnChanllege").visible = isPass;
            cell.getChildByName("img_hand").visible = false;
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