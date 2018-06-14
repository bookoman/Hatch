/*
* 客户端发送器
*/
var ClientSender = /** @class */ (function () {
    function ClientSender() {
    }
    /**********************************webSocket */
    /**登录请求 */
    ClientSender.loginReq = function (account) {
        var LoginRequest = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var message = {};
        message.name = account;
        message.token = GameDataManager.ins.loginToken;
        message.nickname = "xielong";
        var buffer = LoginRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN, Protocol.USER_LOGIN_CMD, buffer);
    };
    /**获取英雄信息 */
    ClientSender.getHeroInfoReq = function (statusCode) {
        var HeroInfoRequest = WebSocketManager.ins.defineProtoClass("HeroInfoRequest");
        var message = {};
        message.statusCode = statusCode;
        var buffer = HeroInfoRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.HERO, Protocol.HERO_GET_INFOS, buffer);
    };
    /**英雄上、下、更新阵型 */
    ClientSender.heroLinuepUpdateReq = function (lineupId, heroId, isUp) {
        var UpdateFormationRequest = WebSocketManager.ins.defineProtoClass("UpdateFormationRequest");
        var message = {};
        message.siteIdx = lineupId;
        message.heroId = heroId;
        message.flag = isUp;
        var buffer = UpdateFormationRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.HERO, Protocol.HERO_UPDATE_FORMATION, buffer);
    };
    /**请求关卡信息 */
    ClientSender.gateGateInfoReq = function () {
        var GateInfoRequest = WebSocketManager.ins.defineProtoClass("GateInfoRequest");
        var message = {};
        message.statusCode = 1;
        var buffer = GateInfoRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.GATE, Protocol.GATE_INFO, buffer);
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