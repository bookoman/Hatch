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
    function LoginMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    LoginMediator.prototype.initView = function () {
        this.view = new ui.LoginViewUI();
        AnimationManager.ins.popCenterLittleToBig(this.view, 300);
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, true, false, true);
        _super.prototype.initView.call(this);
    };
    LoginMediator.prototype.addEvents = function () {
        this.view.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
        this.view.btnChoice.on(Laya.Event.CLICK, this, this.onBtnChoice);
        WebSocketManager.ins.registerHandler(Protocol.USER_LOGIN, new UserLoginHandler(Protocol.USER_LOGIN, this, this.onLogined));
    };
    LoginMediator.prototype.removeEvents = function () {
        this.view.btnLogin.off(Laya.Event.CLICK, this, this.onBtnLogin);
        this.view.btnChoice.off(Laya.Event.CLICK, this, this.onBtnChoice);
    };
    LoginMediator.prototype.onLogined = function (data) {
        if (data.statusCode == 0) {
            console.log("登录成功。。。" + data);
            PreLoadingView.ins.show();
            SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        }
    };
    LoginMediator.prototype.dispose = function () {
    };
    LoginMediator.prototype.onBtnLogin = function (e) {
        //测试
        // PreLoadingView.ins.show();
        // SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        //连接服务器
        EventManager.ins.addEvent(EventManager.SERVER_CONNECTED, this, this.onServerConnected);
        var serverID = this.view.inputSIP.text;
        var port = Number(this.view.inputPort.text);
        WebSocketManager.ins.connect(serverID, port);
    };
    LoginMediator.prototype.onServerConnected = function () {
        EventManager.ins.removeEvent(EventManager.SERVER_CONNECTED, this.onServerConnected);
        ClientSender.loginReq(this.view.inputAccount.text);
    };
    LoginMediator.prototype.onBtnChoice = function () {
        new ChoiceMediator();
    };
    return LoginMediator;
}(BaseMediator));
//# sourceMappingURL=LoginMediator.js.map