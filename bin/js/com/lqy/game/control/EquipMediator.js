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
var EquipMediator = /** @class */ (function (_super) {
    __extends(EquipMediator, _super);
    function EquipMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    EquipMediator.prototype.initView = function () {
        this.view = new ui.EquipViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
    };
    EquipMediator.prototype.addEvents = function () {
    };
    EquipMediator.prototype.removeEvents = function () {
    };
    EquipMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return EquipMediator;
}(BaseMediator));
//# sourceMappingURL=EquipMediator.js.map