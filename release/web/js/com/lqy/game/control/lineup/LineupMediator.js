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
* 阵型
*/
var LineupMediator = /** @class */ (function (_super) {
    __extends(LineupMediator, _super);
    function LineupMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    LineupMediator.prototype.initView = function () {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.lineupGrids = [];
        var lineupGridMediator = null;
        for (var i = 0; i < 5; i++) {
            lineupGridMediator = new LineupGridMediator(null, this.view["grid" + i], this, this.onLineupGridClick);
            lineupGridMediator.lineupId = i;
            this.lineupGrids.push(lineupGridMediator);
        }
        this.initLineup();
    };
    LineupMediator.prototype.addEvents = function () {
        this.view.listIcon.renderHandler = new Handler(this, this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this, this.onMouseHandler);
        WebSocketManager.ins.registerHandler(Protocol.HERO, Protocol.HERO_UPDATE_FORMATION, new HeroUpdateLineupHanlder(this, this.heroUpdateLineupHandler));
    };
    LineupMediator.prototype.removeEvents = function () {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
        WebSocketManager.ins.unregisterHandler(Protocol.HERO, Protocol.HERO_UPDATE_FORMATION, this);
    };
    /**更新阵型服务器返回 */
    LineupMediator.prototype.heroUpdateLineupHandler = function (isUp) {
        var _this = this;
        if (isUp) {
            this.selectIconView.setSelect(true);
            this.curSelectGrid.setUpHero(this.selectIconView.heroId, this.selectIconView);
        }
        else {
            this.lineupGrids.forEach(function (lineupGrid) {
                if (lineupGrid.heroId == _this.selectIconView.heroId) {
                    _this.selectIconView.setSelect(false);
                    lineupGrid.revokeUpHero();
                }
            });
        }
    };
    LineupMediator.prototype.listIconRender = function (cell, index) {
        if (cell && cell.dataSource) {
            cell.setData(cell.dataSource);
        }
    };
    LineupMediator.prototype.onLineupGridClick = function (lineupGrid) {
        this.curSelectGrid = lineupGrid;
        this.lineupGrids.forEach(function (lineupGrid) {
            lineupGrid.setClipShadowIndex(0);
        });
        this.curSelectGrid.setClipShadowIndex(1);
    };
    LineupMediator.prototype.listIconSelect = function (index) {
    };
    LineupMediator.prototype.onMouseHandler = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            this.selectIconView = this.view.listIcon.getCell(index);
            if (this.selectIconView) {
                var lineupId;
                var isUp;
                if (this.curSelectGrid) {
                    if (this.selectIconView.selectTick) {
                        lineupId = this.selectIconView.lineupId;
                        isUp = false;
                    }
                    else {
                        lineupId = this.curSelectGrid.lineupId;
                        isUp = true;
                    }
                    if (GameConfig.SINGLE_GAME) //单机测试
                        this.singleGameUpdateLineup(isUp, this.selectIconView.heroId, lineupId);
                    else
                        ClientSender.heroLinuepUpdateReq(lineupId, this.selectIconView.heroId, isUp);
                }
                else {
                    if (this.selectIconView.selectTick) {
                        lineupId = this.selectIconView.lineupId;
                        isUp = false;
                        if (GameConfig.SINGLE_GAME) //单机测试
                            this.singleGameUpdateLineup(isUp, this.selectIconView.heroId, lineupId);
                        else
                            ClientSender.heroLinuepUpdateReq(lineupId, this.selectIconView.heroId, isUp);
                    }
                }
            }
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
        }
    };
    /**单机游戏模拟上阵 */
    LineupMediator.prototype.singleGameUpdateLineup = function (isUp, heroId, lineupId) {
        var selfPlayerData = GameDataManager.ins.selfPlayerData;
        var heroVo;
        if (isUp) {
            selfPlayerData.heroLineupDic.set(lineupId, heroId);
            heroVo = selfPlayerData.addUpHeroVo(heroId, lineupId);
        }
        else {
            selfPlayerData.heroLineupDic.remove(lineupId);
            heroVo = selfPlayerData.removeUpHeroVo(heroId);
        }
        if (BattleEngine.ins.isLoopBattle && heroVo)
            RoleManager.ins.updateLineupHeros(heroVo, isUp);
        this.heroUpdateLineupHandler(isUp);
    };
    LineupMediator.prototype.initLineup = function () {
        var _this = this;
        var lineupDic = GameDataManager.ins.selfPlayerData.heroLineupDic;
        var lineupGridMediator = null;
        var heroId;
        lineupDic.keys.forEach(function (lineupId) {
            heroId = lineupDic.get(lineupId);
            if (heroId && heroId != "") {
                lineupGridMediator = _this.lineupGrids[lineupId];
                lineupGridMediator.lineupId = Number(lineupId);
                lineupGridMediator.setUpHero(heroId);
            }
        });
        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var backpackHeroVos = GameDataManager.ins.selfPlayerData.heroVoDic.values;
        var heroVo;
        var ary = [];
        var qulityInd;
        var icon;
        var isSelect;
        for (var i = 0; i < backpackHeroVos.length; i++) {
            isSelect = false;
            heroVo = backpackHeroVos[i];
            qulityInd = ConfigManager.ins.getHeroQualityInd(heroVo.qualityKey);
            icon = ConfigManager.ins.getHeroSampleConfig(heroVo.heroKey).icon;
            var lId;
            for (var j = 0; j < lineupDic.values.length; j++) {
                if (heroVo.heroId == lineupDic.values[j]) {
                    isSelect = true;
                    lId = lineupDic.keys[j];
                    break;
                }
            }
            ary.push({ quality: qulityInd, iconName: icon, heroId: heroVo.heroId, lineupId: lId, select: isSelect });
        }
        this.view.listIcon.array = ary;
    };
    LineupMediator.prototype.dispose = function () {
        this.lineupGrids.forEach(function (element) {
            element.dispose();
            element = null;
        });
        this.lineupGrids = null;
        _super.prototype.dispose.call(this);
    };
    return LineupMediator;
}(BaseMediator));
//# sourceMappingURL=LineupMediator.js.map