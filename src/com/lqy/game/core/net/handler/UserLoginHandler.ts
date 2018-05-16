/*
* 用户登录
*/
class UserLoginHandler extends SocketHanlder{
    constructor(module:number,caller:any,callback:Function = null){
        super(module,caller,callback);
    }
    public explain(errorCode:number,data):void
    {
        super.explain(errorCode,data);
    }
    /**处理数据 */
    protected success(data):void
    {
        var LoginResponse:any = WebSocketManager.ins.defineProtoClass("LoginResponse");
        var message:any = LoginResponse.decode(data);
        console.log("服务器返回："+message.statusCode);
        super.success(message);
        
    }

    

}