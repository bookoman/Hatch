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
* name;
*/
var GameMediator = /** @class */ (function (_super) {
    __extends(GameMediator, _super);
    function GameMediator(assetsUrl, view) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.aniID = 0;
        return _this;
    }
    GameMediator.prototype.initView = function () {
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, false, false, true);
        _super.prototype.initView.call(this);
    };
    GameMediator.prototype.addEvents = function () {
        this.view.btnOpen.on(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnAni.on(Laya.Event.CLICK, this, this.onPlayAni);
    };
    GameMediator.prototype.removeEvents = function () {
        this.view.btnOpen.off(Laya.Event.CLICK, this, this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK, this, this.onPlayAni);
    };
    GameMediator.prototype.onPlayAni = function (e) {
        RoleManager.ins.playAni(this.aniID);
        this.aniID++;
    };
    GameMediator.prototype.onBtnOpen = function (e) {
        // var testMediator:TestMediator = new TestMediator();
        // var signMediator:SignMediator = new SignMediator();
        MapManager.ins.enterMap("res/map", 1, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
        RoleManager.ins.initRoles();
    };
    GameMediator.prototype.dispose = function () {
    };
    return GameMediator;
}(BaseMediator));
//# sourceMappingURL=GameMediator.js.map