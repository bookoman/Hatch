/*
* 用户登录
*/
class UserLoginHandler extends SocketHanlder{
    constructor(module:number,caller:any,callback:Function = null){
        super(module,caller,callback);
    }
    public explain(data):void
    {
        var LoginResponse:any = WebSocketManager.ins.defineProtoClass("LoginResponse");
        var message:any = LoginResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        super.success(message);
        
    }

    

}