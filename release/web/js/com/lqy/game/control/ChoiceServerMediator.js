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
var Label = Laya.Label;
var Box = Laya.Box;
/**
* 服务器选择列表
*/
var ChoiceServerMediator = /** @class */ (function (_super) {
    __extends(ChoiceServerMediator, _super);
    function ChoiceServerMediator(assetsUrl, view, caller, choiceCallBack) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.caller = caller;
        _this.choiceCallBack = choiceCallBack;
        return _this;
    }
    ChoiceServerMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.view.listServer.array = GameDataManager.ins.serverList;
    };
    ChoiceServerMediator.prototype.addEvents = function () {
        this.view.listServer.selectEnable = true;
        this.view.listServer.selectHandler = new Handler(this, this.onSelect);
        this.view.listServer.renderHandler = new Handler(this, this.updateItem);
        this.view.bg.on(Laya.Event.CLICK, this, this.onMouseClick);
    };
    ChoiceServerMediator.prototype.removeEvents = function () {
        this.view.listServer.selectHandler = null;
        this.view.listServer.renderHandler = null;
        this.view.bg.off(Laya.Event.CLICK, this, this.onMouseClick);
    };
    ChoiceServerMediator.prototype.onMouseClick = function (e) {
        this.hide();
    };
    ChoiceServerMediator.prototype.updateItem = function (cell, index) {
        var tempLbl = cell.getChildByName("lblServName");
        if (tempLbl) {
            tempLbl.text = cell.dataSource.name;
        }
        tempLbl = cell.getChildByName("lblServState");
        if (tempLbl) {
            tempLbl.text = LG.getTXT("server.state" + cell.dataSource.state);
        }
    };
    ChoiceServerMediator.prototype.onSelect = function (index) {
        console.log("当前选择的索引：" + index);
        var cell = this.view.listServer.getCell(index);
        if (cell) {
            cell.getChildByName("clip").index = 1;
        }
        GameDataManager.ins.choiceServerInfo(index);
        if (this.caller && this.choiceCallBack) {
            this.choiceCallBack.call(this.caller);
        }
        this.hide();
    };
    ChoiceServerMediator.prototype.show = function () {
        this.view.visible = true;
    };
    ChoiceServerMediator.prototype.hide = function () {
        this.view.visible = false;
    };
    ChoiceServerMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ChoiceServerMediator.prototype.onBtnChoiceOK = function () {
        LayerManager.ins.removeToLayer(this.view, LayerManager.UI_LAYER, true, false);
    };
    return ChoiceServerMediator;
}(BaseMediator));
//# sourceMappingURL=ChoiceServerMediator.js.map