/*
* 用户登录
*/
class UserLoginHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }
    public explain(data):void
    {
        var ResUserCode:any = WebSocketManager.ins.defineProtoClass("ResUserCode");
        var message:any = ResUserCode.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        




        super.success(message);

        
    }

    

}