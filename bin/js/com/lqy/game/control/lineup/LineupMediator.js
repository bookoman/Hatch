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
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.mapGridPoints = [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 4 }, { x: 0, y: 1 }, { x: 0, y: 3 }];
        return _this;
    }
    LineupMediator.prototype.initView = function () {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.initLineup();
    };
    LineupMediator.prototype.addEvents = function () {
        this.view.listIcon.renderHandler = new Handler(this, this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this, this.onMouseHandler);
    };
    LineupMediator.prototype.removeEvents = function () {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
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
            var iconView = this.view.listIcon.getCell(index);
            if (iconView) {
                if (this.curSelectGrid) {
                    // this.view.listIcon.cells.forEach(element => {
                    //     console.log(element.data.roleID,element.select);
                    // });
                    if (iconView.selectTick) {
                        this.lineupGrids.forEach(function (lineupGrid) {
                            if (lineupGrid.roleID == iconView.data.roleID) {
                                iconView.setSelect(false);
                                lineupGrid.revokeUpHero();
                            }
                        });
                    }
                    else {
                        iconView.setSelect(true);
                        this.curSelectGrid.setUpHero(iconView.data.roleID, iconView);
                    }
                }
                else {
                    this.lineupGrids.forEach(function (lineupGrid) {
                        if (lineupGrid.roleID == iconView.data.roleID) {
                            lineupGrid.revokeUpHero();
                            iconView.setSelect(false);
                        }
                    });
                }
            }
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
        }
    };
    LineupMediator.prototype.initLineup = function () {
        var upRoleVos = GameDataManager.ins.selfPlayerData.roleVoAry;
        this.lineupGrids = new Array();
        var lineupGridMediator = null;
        var mapGridPoint;
        var lineupID;
        for (var i = 0; i < 5; i++) {
            lineupID = i + 1;
            lineupGridMediator = new LineupGridMediator(null, this.view["grid" + i], this, this.onLineupGridClick, this.mapGridPoints[i]);
            lineupGridMediator.setLineupIDLable(lineupID);
            for (var j = 0; j < upRoleVos.length; j++) {
                if (upRoleVos[j].lineupGrid == lineupID) {
                    lineupGridMediator.setUpHero(upRoleVos[j].id);
                    break;
                }
            }
            this.lineupGrids.push(lineupGridMediator);
        }
        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var ids = ["10000", "10001", "10002", "10007", "10006"];
        var ary = [];
        var qulityInd = 0;
        var iconInd = 0;
        var isSelect = false;
        for (i = 0; i < ids.length; i++) {
            qulityInd++;
            iconInd++;
            if (qulityInd > 7)
                qulityInd = 1;
            if (iconInd > 9)
                iconInd = 1;
            for (j = 0; j < upRoleVos.length; j++) {
                if (upRoleVos[j].id == ids[i]) {
                    isSelect = true;
                    break;
                }
            }
            ary.push({ quality: qulityInd, iconName: "icon-00" + iconInd, roleID: ids[i], select: isSelect });
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