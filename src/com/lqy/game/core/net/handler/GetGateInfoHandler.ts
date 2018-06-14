/*
* name;
*/
class GetGateInfoHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }
    public explain(data):void
    {
        var GateInfoResponse:any = WebSocketManager.ins.defineProtoClass("GateInfoResponse");
        var message:any = GateInfoResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        var jsonObj = JSON.parse(message.roleGateInfo);
        GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        console.log(message.roleGateInfo);
        
        super.success();
    }
}