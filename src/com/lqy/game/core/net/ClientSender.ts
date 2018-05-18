/*
* 客户端发送器
*/
class ClientSender{
    constructor(){

    }

    /**********************************webSocket */
    public static loginReq(account:string):void
    {
        var LoginRequest:any = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var message:any = {};
        message.name = account;
        message.nickname = "xielong";
        var buffer = LoginRequest.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN,Protocol.USER_LOGIN_CMD,buffer);
    }

    /**********************************Http */
    /**测试登录 */
    public static httpTestLoginReq(account:string,pwd:string,caller?:any,callBack?:Function):void
    {
        var params:any = {};
        params.account = account;
        params.password = pwd;
        HttpManager.ins.send(HTTPRequestUrl.testLoginURL,HTTPReqType.GET,params,caller,callBack);
    }
    /**测试登录 */
    public static httpGameServerReq(caller?:any,callBack?:Function):void
    {
        HttpManager.ins.send(HTTPRequestUrl.gameServerURL,HTTPReqType.GET,null,caller,callBack);
    }
    /**进入游戏 */
    public static httpEnterGameReq(sid:number,pwd:string,caller?:any,callBack?:Function):void
    {
        var params:any = {};
        params.sid = sid;
        HttpManager.ins.send(HTTPRequestUrl.enterGameURL,HTTPReqType.GET,params,caller,callBack);
    }
}