/*
* 关卡切换挂机
*/
class GateSwitchHangupHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }

    public explain(data):void
    {
        var SwitchHangGateResponse:any = WebSocketManager.ins.defineProtoClass("SwitchHangGateResponse");
        var message:any = SwitchHangGateResponse.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        GameDataManager.ins.hangGateKey = message.gateKey;
        super.success(message.gateKey);
    }
}