/*
* 得到英雄信息处理器
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
        // console.log(message.roleHeroInfo);
        
        var heroInfo = JSON.parse(message.roleHeroInfo);
        //保存服务器数据
        var selfPlayerData:PlayerData = GameDataManager.ins.selfPlayerData;
        selfPlayerData.heroVoDic = new Dictionary();
        var heroVo:HeroVo;
        for (var key in heroInfo.heroMap) {
            heroVo = new HeroVo();
            var info = heroInfo.heroMap[key];
            for (var key in info) {
                if(key == "heroAttr")
                {
                    heroVo.heroAttr = new HeroAttr();
                    var heroAttr = info[key];
                    for (var key in heroAttr) {
                        heroVo.heroAttr[key] = heroAttr[key];
                    }
                }
                else
                {
                    heroVo[key] = info[key];
                }
                    
            }
            selfPlayerData.heroVoDic.set(heroVo.heroId,heroVo);
        }
        
        //阵型数据
        selfPlayerData.heroLineupDic = new Dictionary();
        var heroId:string;
        for(var key in heroInfo.heroFormation)
        {
            heroId = heroInfo.heroFormation[key];
            selfPlayerData.heroLineupDic.set(key,heroId);
            selfPlayerData.addUpHeroVo(heroId);
        }
        selfPlayerData.heroSum = selfPlayerData.upHeroVos.length;
        super.success();
    }

}