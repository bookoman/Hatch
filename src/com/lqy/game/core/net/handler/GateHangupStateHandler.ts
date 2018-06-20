/*
* 关卡挂机状态
*/
class GateHangupStateHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }

    public explain(data):void
    {
        var HangupStateResponse:any = WebSocketManager.ins.defineProtoClass("HangupStateResponse");
        var message:any = HangupStateResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        
        GameDataManager.ins.hangGateKey = message.gateKey;
        super.success();
        // GameDataManager.ins.saveGateHandupInfo(message);
    }
}