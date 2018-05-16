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

    public static httpGetUserInfo(userId:number,caller?:any,callBack?:Function):void
    {
        var params:any = {};
        params.userId = 1000;
        params.name = "bookoman";
        HttpManager.ins.send("http://getUserInfo",HTTPReqType.POST,params,caller,callBack);
    }
}