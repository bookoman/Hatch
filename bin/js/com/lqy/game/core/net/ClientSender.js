/*
* 客户端发送器
*/
var ClientSender = /** @class */ (function () {
    function ClientSender() {
    }
    /**********************************webSocket */
    ClientSender.loginReq = function (account) {
        var LoginRequest = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var message = {};
        message.name = account;
        message.token = GameDataManager.ins.loginToken;
        message.nickname = "xielong";
        var buffer = LoginRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN, Protocol.USER_LOGIN_CMD, buffer);
    };
    /**********************************Http */
    /**测试登录 */
    ClientSender.httpLoginReq = function (account, pwd, caller, callBack) {
        var params = {};
        params.account = account;
        params.password = pwd;
        HttpManager.ins.send(HTTPRequestUrl.testLoginURL, HTTPReqType.GET, params, caller, callBack);
    };
    /**获取服务器列表 */
    ClientSender.httpGameServerReq = function (caller, callBack) {
        HttpManager.ins.send(HTTPRequestUrl.gameServerURL, HTTPReqType.GET, null, caller, callBack);
    };
    /**进入游戏 */
    ClientSender.httpEnterGameReq = function (sid, caller, callBack) {
        var params = {};
        params.sid = sid;
        HttpManager.ins.send(HTTPRequestUrl.enterGameURL, HTTPReqType.GET, params, caller, callBack);
    };
    return ClientSender;
}());
//# sourceMappingURL=ClientSender.js.map