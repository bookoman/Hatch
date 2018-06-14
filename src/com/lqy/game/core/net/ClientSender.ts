/*
* 客户端发送器
*/
class ClientSender{

    constructor(){

    }

    /**********************************webSocket */
    /**登录请求 */
    public static loginReq(account:string):void
    {
        var LoginRequest:any = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var message:any = {};
        message.name = account;
        message.token = GameDataManager.ins.loginToken;
        message.nickname = "xielong";
        var buffer = LoginRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN,Protocol.USER_LOGIN_CMD,buffer);
    }
    /**获取英雄信息 */
    public static getHeroInfoReq(statusCode:number):void
    {
        var HeroInfoRequest:any = WebSocketManager.ins.defineProtoClass("HeroInfoRequest");
        var message:any = {};
        message.statusCode = statusCode;
        var buffer = HeroInfoRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.HERO,Protocol.HERO_GET_INFOS,buffer);
    }
    /**英雄上、下、更新阵型 */
    public static heroLinuepUpdateReq(lineupId:number,heroId:string,isUp:boolean):void
    {
        var UpdateFormationRequest:any = WebSocketManager.ins.defineProtoClass("UpdateFormationRequest");
        var message:any = {};
        message.siteIdx = lineupId;
        message.heroId = heroId;
        message.flag = isUp;
        var buffer = UpdateFormationRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.HERO,Protocol.HERO_UPDATE_FORMATION,buffer);
    }
    /**请求关卡信息 */
    public static gateGateInfoReq():void
    {
        var GateInfoRequest = WebSocketManager.ins.defineProtoClass("GateInfoRequest");
        var message:any = {};
        message.statusCode = 1;
        var buffer = GateInfoRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_INFO,buffer);
    }


    /**********************************Http */
    /**测试登录 */
    public static httpLoginReq(account:string,pwd:string,caller?:any,callBack?:Function):void
    {
        var params:any = {};
        params.account = account;
        params.password = pwd;
        HttpManager.ins.send(HTTPRequestUrl.testLoginURL,HTTPReqType.GET,params,caller,callBack);
    }
    /**获取服务器列表 */
    public static httpGameServerReq(caller?:any,callBack?:Function):void
    {
        HttpManager.ins.send(HTTPRequestUrl.gameServerURL,HTTPReqType.GET,null,caller,callBack);
    }
    /**进入游戏 */
    public static httpEnterGameReq(sid:number,caller?:any,callBack?:Function):void
    {
        var params:any = {};
        params.sid = sid;
        HttpManager.ins.send(HTTPRequestUrl.enterGameURL,HTTPReqType.GET,params,caller,callBack);
    }
}