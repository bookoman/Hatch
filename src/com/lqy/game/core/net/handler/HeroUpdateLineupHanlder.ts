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
        var heroVo;
        if(message.flag)
        {
            selfPlayerData.heroLineupDic.set(message.siteIdx,message.heroId);
            heroVo = selfPlayerData.addUpHeroVo(message.heroId,message.siteIdx);
        }
        else
        {
            selfPlayerData.heroLineupDic.remove(message.siteIdx);
            heroVo = selfPlayerData.removeUpHeroVo(message.heroId);
        }
        if(BattleEngine.ins.isLoopBattle)
            RoleManager.ins.updateLineupHeros(heroVo,message.flag);
        console.log("上阵状态："+message.flag);
        super.success(message);
    }
}