/*
* 用户登录
*/
class UserLoginHandler extends SocketHanlder{
    constructor(cmd:number,caller:any,callback:Function = null){
        super(cmd,caller,callback);
    }
    public explain(errorCode:number,data):void
    {
        super.explain(errorCode,data);
    }
    /**处理数据 */
    protected success(data):void
    {
        var LoginRequest:any = WebSocketManager.ins.defineProtoClass("LoginResponse");
        var message:any = LoginRequest.decode(data);
        
    }

}