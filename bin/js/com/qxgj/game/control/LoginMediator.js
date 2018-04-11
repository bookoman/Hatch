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
var LoginMediator = /** @class */ (function (_super) {
    __extends(LoginMediator, _super);
    function LoginMediator() {
        return _super.call(this) || this;
    }
    LoginMediator.prototype.initView = function () {
        this.view = new ui.LoginViewUI();
        _super.prototype.initView.call(this);
    };
    LoginMediator.prototype.addEvents = function () {
        this.view.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
    };
    LoginMediator.prototype.removeEvents = function () {
        this.view.btnLogin.off(Laya.Event.CLICK, this, this.onBtnLogin);
    };
    LoginMediator.prototype.show = function () {
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, true, false, true);
    };
    LoginMediator.prototype.dispose = function () {
    };
    LoginMediator.prototype.onBtnLogin = function (e) {
        SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
    };
    return LoginMediator;
}(BaseMediator));
//# sourceMappingURL=LoginMediator.js.map