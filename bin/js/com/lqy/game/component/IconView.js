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
* 图标
*/
var IconView = /** @class */ (function (_super) {
    __extends(IconView, _super);
    function IconView() {
        return _super.call(this) || this;
    }
    IconView.prototype.setData = function (data) {
        this.data = data;
        this.clipBG.skin = "comp/clip_qulity" + data.quality + ".png";
        this.imgIcon.skin = "res/outside/icons/heros/" + data.iconName + ".png";
    };
    IconView.prototype.dispose = function () {
        this.removeEvents();
        this.removeSelf();
    };
    IconView.prototype.addEvents = function () {
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUP);
    };
    IconView.prototype.removeEvents = function () {
        this.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUP);
    };
    IconView.prototype.onMouseDown = function (e) {
        this.clipBG.index = 1;
        this.scale(1.2, 1.2);
    };
    IconView.prototype.onMouseUP = function (e) {
        this.clipBG.index = 0;
        this.scale(1, 1);
    };
    return IconView;
}(ui.comp.IconViewUI));
//# sourceMappingURL=IconView.js.map