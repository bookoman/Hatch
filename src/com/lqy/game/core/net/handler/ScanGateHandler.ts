/*
* name;
*/
class ScanGateHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }

    public explain(data):void
    {
        var ScanGateResponse:any = WebSocketManager.ins.defineProtoClass("ScanGateResponse");
        var message:any = ScanGateResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        
        super.success(message.gateKey);
    }
}