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
        message.nickname = "xielong";
        var buffer = LoginRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN, Protocol.USER_LOGIN_CMD, buffer);
    };
    /**********************************Http */
    /**测试登录 */
    ClientSender.httpTestLoginReq = function (account, pwd, caller, callBack) {
        var params = {};
        params.account = account;
        params.password = pwd;
        HttpManager.ins.send(HTTPRequestUrl.testLoginURL, HTTPReqType.GET, params, caller, callBack);
    };
    /**测试登录 */
    ClientSender.httpGameServerReq = function (caller, callBack) {
        HttpManager.ins.send(HTTPRequestUrl.gameServerURL, HTTPReqType.GET, null, caller, callBack);
    };
    /**进入游戏 */
    ClientSender.httpEnterGameReq = function (sid, pwd, caller, callBack) {
        var params = {};
        params.sid = sid;
        HttpManager.ins.send(HTTPRequestUrl.enterGameURL, HTTPReqType.GET, params, caller, callBack);
    };
    return ClientSender;
}());
//# sourceMappingURL=ClientSender.js.map