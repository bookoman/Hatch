/*
* 客户端发送器
*/
var ClientSender = /** @class */ (function () {
    function ClientSender() {
    }
    /**********************************webSocket */
    ClientSender.userInfoReq = function () {
        var LoginRequest = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var buffer = LoginRequest.encode({
            name: "bookoman",
            nickname: "xielong"
        }).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN, Protocol.USER_LOGIN_CMD, buffer);
    };
    /**********************************Http */
    ClientSender.httpGetUserInfo = function (userId, caller, callBack) {
        var params = {};
        params.userId = 1000;
        params.name = "bookoman";
        HttpManager.ins.send("http://getUserInfo", HTTPReqType.POST, params, caller, callBack);
    };
    return ClientSender;
}());
//# sourceMappingURL=ClientSender.js.map