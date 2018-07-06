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
var LayaHTMLDivElement = Laya.HTMLDivElement;
/*
* 战报视图
*/
var BattleReportMediator = /** @class */ (function (_super) {
    __extends(BattleReportMediator, _super);
    function BattleReportMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.linePadding = 5;
        return _this;
    }
    BattleReportMediator.prototype.initView = function () {
        this.view = new ui.battle.BattleReportViewUI();
        this.view.panelMask.vScrollBar.visible = false;
        this.view.x = 0;
        this.view.y = 960;
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, false);
        _super.prototype.initView.call(this);
        this.items = [];
        this.maskHeight = this.view.panelMask.height;
    };
    BattleReportMediator.prototype.addEvents = function () {
        EventManager.ins.addEvent(EventManager.REPORT_DATA_UPDATE, this, this.reportDataUpdate);
    };
    BattleReportMediator.prototype.removeEvents = function () {
        EventManager.ins.removeEvent(EventManager.REPORT_DATA_UPDATE, this);
    };
    /**更新视图 */
    BattleReportMediator.prototype.reportDataUpdate = function (vo) {
        var item;
        if (this.items.length > BattleReportData.REPORT_SUM_LIMIT) {
            item = this.items.shift();
            item.removeSelf();
            for (var i = 0; i < this.items.length; i++) {
                item = this.items[i];
                if (i > 0)
                    item.y = this.items[i - 1].y + this.items[i - 1].contextHeight + 5;
                else
                    item.y = 0;
            }
        }
        var preItemHeight = 0;
        var ty = 0;
        if (this.items.length > 0) {
            var preItem = this.items[this.items.length - 1];
            preItemHeight = preItem.contextHeight + this.linePadding;
            ty = preItem.y + preItemHeight + this.linePadding;
        }
        item = new LayaHTMLDivElement();
        item.innerHTML = vo.getReportDataHtml();
        item.width = this.view.panelMask.width;
        item.y = ty;
        this.view.panelMask.addChild(item);
        this.items.push(item);
        //自动滚动视图
        if (item.y > this.maskHeight) {
            this.view.panelMask.scrollTo(0, item.y + item.contextHeight - this.maskHeight);
        }
    };
    BattleReportMediator.prototype.setVisible = function (bool) {
        this.view.visible = bool;
    };
    BattleReportMediator.prototype.dispose = function () {
        this.view.vboxReport.removeChildren();
        this.items.splice(0, this.items.length);
        this.items = null;
        _super.prototype.dispose.call(this);
    };
    return BattleReportMediator;
}(BaseMediator));
//# sourceMappingURL=BattleReportMediator.js.map