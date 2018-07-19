/*
* 客户端发送器
*/
var ClientSender = /** @class */ (function () {
    function ClientSender() {
    }
    /**********************************webSocket */
    /**
     * 用户注册
     */
    ClientSender.registerReq = function (userName, userPass) {
        var ReqRegisterUser = WebSocketManager.ins.defineProtoClass("ReqRegisterUser");
        var message = {};
        message.userName = userName;
        message.userPass = userPass;
        var buffer = ReqRegisterUser.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_REGISTER_REQ, buffer);
    };
    /**
     * 用户登录
     * @param userName
     * @param userPass
     */
    ClientSender.loginReq = function (userName, userPass) {
        var ReqUserLogin = WebSocketManager.ins.defineProtoClass("ReqUserLogin");
        var message = {};
        message.userName = userName;
        message.userPass = userPass;
        message.clientId = 0;
        var buffer = ReqUserLogin.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN_REQ, buffer);
    };
    return ClientSender;
}());
//# sourceMappingURL=ClientSender.js.map