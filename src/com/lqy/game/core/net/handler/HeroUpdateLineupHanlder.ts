/*
* 英雄更新整型处理
*/
class HeroUpdateLineupHanlder extends SocketHanlder{
    constructor(caller:any,callback?:Function){
        super(caller,callback);
    }

    public explain(data):void
    {
        var UpdateFormationResponse:any = WebSocketManager.ins.defineProtoClass("UpdateFormationResponse");
        var message = UpdateFormationResponse.decode(data);
        super.explain(message);
    }

    public success(message):void
    {
        var selfPlayerData:PlayerData = GameDataManager.ins.selfPlayerData;
        selfPlayerData.heroLineupDic.set(message.siteIdx,message.heroId);
        if(message.flag)
        {
            selfPlayerData.addUpHeroVo(message.heroId);
        }
        else
        {
            selfPlayerData.removeUpHeroVo(message.heroId);
        }
        console.log("上阵状态："+message.flag);
        super.success(message);
    }
}