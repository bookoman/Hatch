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
* 进入游戏
*/
var EnterGameMediator = /** @class */ (function (_super) {
    __extends(EnterGameMediator, _super);
    function EnterGameMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    EnterGameMediator.prototype.initView = function () {
        this.view = new ui.EnterGameViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, true, false, true);
        _super.prototype.initView.call(this);
        //选择服务器列表
        this.choiceServerMediator = new ChoiceServerMediator(null, this.view.serverListView, this, this.updateServerInfo);
        AnimationManager.ins.popCenterLittleToBig(this.view, 300);
        this.updateServerInfo();
    };
    EnterGameMediator.prototype.addEvents = function () {
        this.view.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
        this.view.btnChoice.on(Laya.Event.CLICK, this, this.onBtnChoice);
        WebSocketManager.ins.registerHandler(Protocol.USER_LOGIN, new UserLoginHandler(Protocol.USER_LOGIN, this, this.onWebSocketLogined));
    };
    EnterGameMediator.prototype.removeEvents = function () {
        this.view.btnLogin.off(Laya.Event.CLICK, this, this.onBtnLogin);
        this.view.btnChoice.off(Laya.Event.CLICK, this, this.onBtnChoice);
    };
    EnterGameMediator.prototype.onWebSocketLogined = function (data) {
        if (data.statusCode == 0) {
            console.log("登录成功。。。" + data);
            PreLoadingView.ins.show();
            SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        }
        else {
            console.log("登录错误码", data.statusCode);
        }
    };
    EnterGameMediator.prototype.updateServerInfo = function () {
        this.view.lblServName.text = GameDataManager.ins.curServerInfo.name;
    };
    EnterGameMediator.prototype.onBtnLogin = function (e) {
        //测试
        // PreLoadingView.ins.show();
        // SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        //登录web服
        var curServerInfo = GameDataManager.ins.curServerInfo;
        ClientSender.httpEnterGameReq(curServerInfo.guid, this, this.webEnterGameHanlder);
    };
    EnterGameMediator.prototype.webEnterGameHanlder = function (data) {
        var jsonObj = JSON.parse(data);
        if (jsonObj.code == 200) {
            GameDataManager.ins.loginToken = jsonObj.token;
            EventManager.ins.addEvent(EventManager.SERVER_CONNECTED, this, this.onServerConnected);
            WebSocketManager.ins.connect(GameDataManager.ins.curServerInfo.ip, GameDataManager.ins.curServerInfo.port);
        }
        else {
            console.log("进入服务器异常！错误码：" + jsonObj.code);
        }
    };
    EnterGameMediator.prototype.onServerConnected = function () {
        EventManager.ins.removeEvent(EventManager.SERVER_CONNECTED, this.onServerConnected);
        ClientSender.loginReq(GameDataManager.ins.selfPlayerData.name);
    };
    EnterGameMediator.prototype.onBtnChoice = function () {
        this.choiceServerMediator.show();
    };
    EnterGameMediator.prototype.dispose = function () {
        this.choiceServerMediator.dispose();
        _super.prototype.dispose.call(this);
    };
    return EnterGameMediator;
}(BaseMediator));
//# sourceMappingURL=EnterGameMediator.js.map