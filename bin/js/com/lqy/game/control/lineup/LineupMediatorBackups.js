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
* 阵型备份
*/
var LineupMediatorBackups = /** @class */ (function (_super) {
    __extends(LineupMediatorBackups, _super);
    function LineupMediatorBackups(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.dragTime = 0;
        _this.lastMoveY = 0;
        return _this;
    }
    LineupMediatorBackups.prototype.initView = function () {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        _super.prototype.initView.call(this);
        this.lineupGrids = new Array();
        var lineupGridMediator = null;
        for (var i = 0; i < 6; i++) {
            lineupGridMediator = new LineupGridMediator(null, this.view["grid" + i]);
            this.lineupGrids.push(lineupGridMediator);
        }
        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var ids = ["10000", "10001", "10002", "10003", "10004"];
        var ary = [];
        var qulityInd = 0;
        var iconInd = 0;
        var idInd = -1;
        for (i = 0; i < 20; i++) {
            qulityInd++;
            iconInd++;
            idInd++;
            if (qulityInd > 7)
                qulityInd = 1;
            if (iconInd > 9)
                iconInd = 1;
            if (idInd > ids.length) {
                idInd = 0;
            }
            ary.push({ quality: qulityInd, iconName: "icon-00" + iconInd, roleID: ids[idInd] });
        }
        this.view.listIcon.array = ary;
    };
    LineupMediatorBackups.prototype.addEvents = function () {
        this.view.listIcon.renderHandler = new Handler(this, this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this, this.onMouseHandler);
        this.view.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.view.on(Laya.Event.MOUSE_UP, this, this.onViewMouseUp);
    };
    LineupMediatorBackups.prototype.removeEvents = function () {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
        this.view.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.view.off(Laya.Event.MOUSE_UP, this, this.onViewMouseUp);
    };
    LineupMediatorBackups.prototype.listIconRender = function (cell, index) {
        if (cell && cell.dataSource) {
            cell.setData(cell.dataSource);
        }
    };
    LineupMediatorBackups.prototype.listIconSelect = function (index) {
    };
    LineupMediatorBackups.prototype.onMouseHandler = function (e, index) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.dragTime = 0;
            this.lastMoveY = this.view.mouseY;
            Laya.timer.loop(1000, this, this.calDragIconTime, [index]);
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
            this.dragTime = 0;
            Laya.timer.clear(this, this.calDragIconTime);
        }
    };
    LineupMediatorBackups.prototype.calDragIconTime = function (index) {
        // this.dragTime++;
        // if(this.dragTime >= 1)
        // {
        //     var cell:IconView = this.view.listIcon.getCell(index);
        //     if(cell)
        //     {
        //         if(this.dragIcon)
        //         {
        //             this.dragIcon.dispose();
        //             this.dragIcon = null;
        //         }
        //         this.dragIcon = new IconView();
        //         this.dragIcon.setData(cell.data);
        //         this.dragIcon.x = this.view.mouseX - this.dragIcon.width / 2;
        //         this.dragIcon.y = this.view.mouseY - this.dragIcon.height / 2;
        //         this.view.addChild(this.dragIcon);
        //     }
        //     Laya.timer.clear(this,this.calDragIconTime);
        //     //禁止滚动
        //     var scroll:any = (this.view.listIcon as Laya.List).scrollBar;
        //     Laya.timer.clear(scroll,scroll.loop);
        //     // scroll.off(/*laya.events.Event.CHANGE*/"change",this.view.listIcon,this.view.listIcon.onScrollBarChange);
        //     // scroll.slider.off(/*laya.events.Event.CHANGE*/"change",scroll,scroll.onSliderChange);
        // }
    };
    LineupMediatorBackups.prototype.onViewMouseUp = function (e) {
        if (this.dragIcon) {
            // this.dragUpLineup(this.dragIcon.data.roleID);
            // this.dragIcon.dispose();
            // this.dragIcon = null;
            // //启动滚动事件
            // var scroll:any = (this.view.listIcon as Laya.List).scrollBar;
            // Laya.timer.frameLoop(1,scroll,scroll.loop);
            // // scroll.on(/*laya.events.Event.CHANGE*/"change",this.view.listIcon,this.view.listIcon.onScrollBarChange);
            // // scroll.slider.on(/*laya.events.Event.CHANGE*/"change",scroll,scroll.onSliderChange);
        }
    };
    LineupMediatorBackups.prototype.onMouseMove = function (e) {
        if (this.dragIcon) {
            this.dragIcon.x = this.view.mouseX - this.dragIcon.width / 2;
            this.dragIcon.y = this.view.mouseY - this.dragIcon.height / 2;
        }
        //判断Y移动距离大于固定值才移除计时time
        if (this.lastMoveY != this.view.mouseY && Math.abs(this.view.mouseY - this.lastMoveY) > 20) {
            DebugViewUtil.log("移除：", this.lastMoveY + "," + this.view.mouseY);
            this.lastMoveY = this.view.mouseY;
            this.dragTime = 0;
            Laya.timer.clear(this, this.calDragIconTime);
        }
    };
    /**拖拽上阵型 */
    LineupMediatorBackups.prototype.dragUpLineup = function (roleId) {
        var lineupGridMediator = null;
        var gridView = null;
        for (var i = 0; i < this.lineupGrids.length; i++) {
            lineupGridMediator = this.lineupGrids[i];
            gridView = lineupGridMediator.getView();
            if (this.view.mouseX > gridView.x && this.view.mouseX < gridView.x + gridView.clipShadow.width
                && this.view.mouseY > gridView.y - 40 && this.view.mouseY < gridView.y + gridView.clipShadow.height) {
                lineupGridMediator.setUpHero(roleId);
                break;
            }
        }
    };
    LineupMediatorBackups.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LineupMediatorBackups;
}(BaseMediator));
//# sourceMappingURL=LineupMediatorBackups.js.map