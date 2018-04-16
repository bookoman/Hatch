/*
* 战斗数据管理
*/
class BattleData{
    private attHeroVos:Array<RoleVo>;
    private attEnemyVos:Array<RoleVo>;
    private attedHeroVos:Array<RoleVo>;
    private attedEnemyVos:Array<RoleVo>;
    private curAttCamp:number = 0;
    
    constructor(){
        this.attHeroVos = [];
        this.attEnemyVos = [];
        this.attedHeroVos = [];
        this.attedEnemyVos = [];
        GameDataManager.ins.selfPlayerData.roleVoAry.forEach(roleVo => {
            this.attHeroVos.push(roleVo);
        });
        GameDataManager.ins.enemyData.roleVoAry.forEach(roleVo => {
            this.attedEnemyVos.push(roleVo);
        });

        this.attHeroVos.sort(
            function(a:RoleVo,b:RoleVo):number{
                return a.atts > b.atts ? -1 : 1
            }
        );

        this.attEnemyVos.sort(
            function(a:RoleVo,b:RoleVo):number{
                return a.atts > b.atts ? -1 : 1
            }
        );

        console.log(this.attHeroVos);
        console.log(this.attEnemyVos);
    }

    public startAtt():void
    {
        var turnAttckSum:number = GameConfig.BATTLE_TURN_ATTACK_SUM;
        var attTarget:Array<RoleVo>;
        var defTarget:Array<RoleVo>;
        var attToDefObject:Object = {};
        if(this.curAttCamp == 0)
        {
            
        }
        else if(this.curAttCamp == BattleAttCampType.HERO)
        {
            attTarget = this.attHeroVos.splice(0,turnAttckSum);
            
        }
        else if(this.curAttCamp == BattleAttCampType.ENEMY)
        {

        }
    }

    private seekAttTarget(attAry:Array<RoleVo>,defAry:Array<RoleVo>):void
    {
        var attToDefObject:Object = {};
        var attRoleVo:RoleVo;
        var defRoleVo:RoleVo;
        for(var i = 0; i < attAry.length;i++)
        {
            attRoleVo = attAry[i];
            for(var j = 0;j < defAry.length;j++)
            {
                defRoleVo = defAry[j];
                if(attRoleVo.gridY == defRoleVo.gridY)
                {
                    
                }
                
                
            }
        }
        
    }

    






    
    
    
    
}