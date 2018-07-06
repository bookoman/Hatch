/*
* 玩家数据
*/
class PlayerData{
    public id:number;
    public name:string;
    // public lineupId:string;
    /**宠物数据 */
    // public roleVoAry:Array<RoleVo>;
    /**宠物数据 */
    public heroVoDic:Dictionary;
    /**上阵英雄 */
    public upHeroVos:Array<HeroVo>
    /**玩家阵型 阵型索引：玩家ID */
    public heroLineupDic:Dictionary;
    /**英雄总数 */
    public heroSum:number = 0;
    constructor(){
        
    }
    /**添加上阵宠物 */
    public addUpHeroVo(heroId:string,lineId:number):BaseRoleVo
    {
        if(!this.upHeroVos)
        {
            this.upHeroVos = [];
        }
        var heroVo = GameDataManager.ins.getHeroVoByHeroId(heroId);
        heroVo.lineupGrid = lineId;
        var ind:number = this.upHeroVos.indexOf(heroVo);
        if(ind > -1)
        {
            this.upHeroVos[ind] = heroVo;
        }
        else
        {
            heroVo.initRowColPosPoint();
            this.upHeroVos.push(heroVo);
        }
        return heroVo;
    }
    /**删除上阵宠物 */
    public removeUpHeroVo(heroId:string):BaseRoleVo
    {
        if(!this.upHeroVos)
        {
            return;
        }
        var heroVo:BaseRoleVo;
        for(var i = 0;i < this.upHeroVos.length;i++)
        {
            heroVo = this.upHeroVos[i];
            if(heroVo.roleId == heroId)
            {
                heroVo.lineupGrid = null;
                this.upHeroVos.splice(i,1);
                return heroVo;
            }
        }
        return null;
    }
}