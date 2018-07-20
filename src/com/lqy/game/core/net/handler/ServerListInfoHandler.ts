/*
* name;
*/
class ServerListInfoHandler extends SocketHanlder{
    constructor(caller:any,callback:Function = null){
        super(caller,callback);
    }
    public explain(data):void
    {
        var ResServerList:any = WebSocketManager.ins.defineProtoClass("ResServerList");
        var message:any = ResServerList.decode(data);
        super.explain(message);
    }
    /**处理数据 */
    protected success(message):void
    {
        var gameDataMgr:GameDataManager = GameDataManager.ins;
        gameDataMgr.serverList = new Array();
        var serInfoVo:ServerInfoVo;
        var info:any;
        for(var i = 0;i < message.serverInfoList.length;i++)
        {
            info = message.serverInfoList[i];
            if(info){
                serInfoVo = new ServerInfoVo();
                serInfoVo.ip = info.ip;
                serInfoVo.port = info.port;
                serInfoVo.serverId = info.serverId;
                serInfoVo.serverName = info.serverName;
                serInfoVo.state = info.state;
                gameDataMgr.serverList.push(serInfoVo);
            }
        }
        if(!gameDataMgr.curServerInfo)
        {
            gameDataMgr.curServerInfo = gameDataMgr.serverList[0];
        }

        super.success();
        
    }
}