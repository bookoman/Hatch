/*
* 客户端发送器
*/
class ClientSender{
    constructor(){

    }

    /**********************************webSocket */
    public static userInfoReq():void
    {
        var LoginRequest:any = WebSocketManager.ins.defineProtoClass("LoginRequest");
        var buffer:any = LoginRequest.encode( 
        {
            name:"bookoman",
            nickname:"xielong"
        }).finish();
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