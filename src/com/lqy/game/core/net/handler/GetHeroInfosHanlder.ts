/*
* name;
*/
class GetHeroInfosHanlder extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }
    public explain(data):void
    {
        var HeroInfoResponse:any = WebSocketManager.ins.defineProtoClass("HeroInfoResponse");
        var message:any = HeroInfoResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        console.log(message.roleHeroInfo);
        var heroInfo:Object = JSON.parse(message.roleHeroInfo);
        super.success(message);
        
    }
}