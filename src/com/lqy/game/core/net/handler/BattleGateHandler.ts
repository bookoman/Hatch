/*
* 挑战关卡
*/
class BattleGateHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }

    public explain(data):void
    {
        var BattleGateResponse:any = WebSocketManager.ins.defineProtoClass("BattleGateResponse");
        var message:any = BattleGateResponse.decode(data);
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