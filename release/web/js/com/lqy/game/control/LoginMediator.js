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
* 登录
*/
var LoginMediator = /** @class */ (function (_super) {
    __extends(LoginMediator, _super);
    function LoginMediator(assetsUrl, view) {
        return _super.call(this, assetsUrl, view) || this;
    }
    LoginMediator.prototype.initView = function () {
        this.view = new ui.LoginViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.BG_LAYER, true, false, true);
        _super.prototype.initView.call(this);
        Laya.Tween.to(this.view.logoImg, { y: 110 }, 500, Laya.Ease.backOut);
        Laya.Tween.to(this.view.boxLogin, { y: 418 }, 500, Laya.Ease.backOut);
        SoundsManager.ins.playerMusicByEnum(MusicBGType.LOGIN_BG, 1000);
        // TankUtil.stageShake(this.view,10);
    };
    LoginMediator.prototype.addEvents = function () {
        this.view.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
    };
    LoginMediator.prototype.removeEvents = function () {
        this.view.btnLogin.off(Laya.Event.CLICK, this, this.onBtnLogin);
    };
    LoginMediator.prototype.onBtnLogin = function (e) {
        if (GameConfig.SINGLE_GAME) {
            //单机测试
            var resAry = [
                { url: "unpack/login/logo.png", type: Loader.IMAGE }
            ];
            var enterGameMediator = new EnterGameMediator(resAry);
        }
        else {
            //发送请求
            var account = this.view.inputAccount.text;
            var pwd = this.view.inputPwd.text;
            if (!account || account == "") {
                console.log("用户名不能为空");
                return;
            }
            if (!pwd || pwd == "") {
                console.log("密码不能为空");
                return;
            }
            ClientSender.httpLoginReq(account, pwd, this, this.loginSuccessHanlder);
        }
    };
    LoginMediator.prototype.loginSuccessHanlder = function (data) {
        var jsonObj = JSON.parse(data);
        if (jsonObj.code == 200) {
            GameDataManager.ins.saveSelfPlayerData(jsonObj);
            ClientSender.httpGameServerReq(this, this.onGameServersList);
        }
        else {
            console.log("登录异常！错误码:" + jsonObj.code);
        }
    };
    LoginMediator.prototype.onGameServersList = function (data) {
        var jsonObj = JSON.parse(data);
        if (jsonObj.code == 200) {
            GameDataManager.ins.saveServerInfoList(jsonObj.data, jsonObj.lastInGameServers);
            var resAry = [
                { url: "unpack/login/logo.png", type: Loader.IMAGE }
            ];
            var enterGameMediator = new EnterGameMediator(resAry);
            this.dispose();
        }
        else {
            console.log("获取服务器列表异常！错误码：" + jsonObj.code);
        }
    };
    LoginMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LoginMediator;
}(BaseMediator));
//# sourceMappingURL=LoginMediator.js.map