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
        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var ary = [];
        for (var i = 0; i < 20; i++) {
            ary.push("comp/blank.png");
        }
        this.view.listIcon.array = ary;
    };
    LineupMediator.prototype.addEvents = function () {
        this.view.listIcon.renderHandler = new Handler(this, this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
    };
    LineupMediator.prototype.removeEvents = function () {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
    };
    LineupMediator.prototype.listIconRender = function (cell, index) {
        if (cell && cell.dataSource) {
            cell.getChildByName("lblNum").text = (index + 1) + "";
        }
    };
    LineupMediator.prototype.listIconSelect = function (index) {
        console.log(index);
    };
    LineupMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LineupMediator;
}(BaseMediator));
//# sourceMappingURL=LineupMediator.js.map