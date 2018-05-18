/*
* 循环假战斗数据
*/
class LoopBattleData{
    private attHeroVos:Array<RoleVo>;
    private attEnemyVos:Array<RoleVo>;
    public curAttCamp:number = 0;
    public curBattleTurnVos:Array<BattleTurnVo>;
    public isWin:boolean;
    public isEnd:boolean;
    constructor(){

    }
    public initData():void
    {
        this.attHeroVos = this.getJoinBattleHeroVo();
        this.attEnemyVos = GameDataManager.ins.enemyData.roleVoAry;
        this.attHeroVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.battleDieAttTimes = roleVo.dieAttTimes;
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.battleDieAttTimes = roleVo.dieAttTimes;
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });

        this.seekAttTarget(this.attHeroVos,this.attEnemyVos);
        this.seekAttTarget(this.attEnemyVos,this.attHeroVos);
        this.curAttCamp = BattleAttCampType.HERO;
    }
    /**得到参战英雄RoleVo */
    private getJoinBattleHeroVo():Array<RoleVo>
    {
        var tempAry:Array<RoleVo> = new Array();
        GameDataManager.ins.selfPlayerData.roleVoAry.forEach(roleVo => {
            tempAry.push(roleVo);
        });
        tempAry.sort(function(vo1:RoleVo,vo2:RoleVo):number{
            return vo1.gridX > vo2.gridX ? -1 : 1;
        })
        tempAry = tempAry.slice(0,GameConfig.BATTLE_LOOP_HERO_SUM);
        return tempAry;
    }
    /**
     * 开始战斗
     */
    public startAtt():void
    {
        var turnAttckSum:number = GameConfig.BATTLE_TURN_ATTACK_SUM;
        if(this.curAttCamp == 0)
        {
            
        }
        else if(this.curAttCamp == BattleAttCampType.HERO)
        {
            this.curBattleTurnVos = this.getBattleTurnVos(this.attHeroVos,this.attEnemyVos);
        }
        else if(this.curAttCamp == BattleAttCampType.ENEMY)
        {
            this.curBattleTurnVos = this.getBattleTurnVos(this.attEnemyVos,this.attHeroVos);
        }
        
    }
     /**
     * 得到当前攻击角色
     * @param roleVos 
     */
    public getBattleTurnVos(attRoleVos:Array<RoleVo>,defRoleVos:Array<RoleVo>):Array<BattleTurnVo>
    {
        var ary:Array<BattleTurnVo> = [];
        var battleTurnVo:BattleTurnVo;
        var attRoleVo:RoleVo;
        
        for(var i = 0;i < attRoleVos.length;i++)
        {
            attRoleVo = attRoleVos[i];
            battleTurnVo = new BattleTurnVo();
            var defRoleVo:RoleVo;
            if(!attRoleVo.isDeath && !attRoleVo.isAtted)
            {
                //寻找攻击具体对象
                for(var j = 0;j < attRoleVo.attEnemyVos.length;j++)
                {
                    defRoleVo = attRoleVo.attEnemyVos[j];
                    if(defRoleVo && !defRoleVo.isDeath)
                    {
                        break;
                    }
                }
            }
            battleTurnVo.attRoleVo = attRoleVo;
            battleTurnVo.defRoleVo = defRoleVo;
            ary.push(battleTurnVo);
        }
        return ary;
    }
    /**计算属性 */
    public calculationAttribute(attRoleVo:RoleVo,defRoleVo:RoleVo):void
    {
        //血量检测
        // this.curDefRoleVo.battleHP -= this.curAttRoleVo.att;
        // this.curDefRoleVo.isDeath = this.curDefRoleVo.battleHP <= 0;
        // this.curAttRoleVo.isAtted = true;
        // this.checkBattleEnd();
        //攻击次数检测
        this.curBattleTurnVos.forEach(battleTurnVo => {
            if(attRoleVo.id == battleTurnVo.attRoleVo.id && defRoleVo.id == battleTurnVo.defRoleVo.id)
            {
                battleTurnVo.calculationAttribute();
            }
        });
        this.checkBattleEnd();
    }
    
    /**
     * 检测战斗结束
     */
    public checkBattleEnd():void
    {
        //检测战斗结束，玩家英雄阵营没有活的对象战斗失败，反之战斗胜利
        //英雄检测
        this.isEnd = true;
        var isChangeAttStatus:boolean = true;
        this.attHeroVos.forEach(roleVo => {
            if(!roleVo.isDeath)
            {
                this.isEnd = false;
                if(!roleVo.isAtted)
                {
                    isChangeAttStatus = false;
                }
            }
            
        });
        if(this.isEnd)
        {
            this.isWin = false;
            // console.log("战斗结束"+this.isWin);
            return;
        }
        if(isChangeAttStatus)
        {
            this.attHeroVos.forEach(roleVo =>{
                roleVo.isAtted = false;
            });
        }
        //敌人检测
        isChangeAttStatus = true;
        this.isEnd = true;
        this.attEnemyVos.forEach(roleVo => {
            if(!roleVo.isDeath)
            {
                this.isEnd = false;
                if(!roleVo.isAtted)
                {
                    isChangeAttStatus = false;
                }
            }
        });
        if(this.isEnd)
        {
            this.isWin = true;
            // console.log("战斗结束"+this.isWin);
            return;
        }
        if(isChangeAttStatus)
        {
            this.attEnemyVos.forEach(roleVo =>{
                roleVo.isAtted = false;
            });
        }
        
        //改变阵营
        if(this.curAttCamp == BattleAttCampType.HERO)
        {
            this.curAttCamp = BattleAttCampType.ENEMY;
        }
        else if(this.curAttCamp == BattleAttCampType.ENEMY)
        {
            this.curAttCamp = BattleAttCampType.HERO;
        }
    }
   
    /**
     * 寻找攻击目标
     * 普通攻击:
     *  1,找同gy，再向上向下找攻击对象
     * 技能攻击:
     *  1,一个目标：找同gy，再又上至下找gy
     *  2,攻击一行gx,攻击一列gy
     * @param attAry 
     * @param defAry 
     */
    private seekAttTarget(attAry:Array<RoleVo>,defAry:Array<RoleVo>):void
    {
        var reduceAry:Array<RoleVo> = [];
        var plusAry:Array<RoleVo> = [];
        var attRoleVo:RoleVo;
        var defRoleVo:RoleVo;
        for(var i = 0; i < attAry.length;i++)
        {
            attRoleVo = attAry[i];
            for(var j = 0;j < defAry.length;j++)
            {
                defRoleVo = defAry[j];
                
                var attInd:number = attRoleVo.gridY  - defRoleVo.gridY;
                if(attInd < 0)
                {
                    reduceAry[Math.abs(attInd)] = defRoleVo;
                }
                else
                {
                    plusAry[attInd] = defRoleVo;   
                }
            }
            attRoleVo.attEnemyVos = plusAry.concat(reduceAry);
        }
    }
    /**
     * 寻找攻击目标2----格子坐标规律
     * 先攻击前排，前排击败后再攻击后排
     * @param attAry 
     * @param defAry 
     */
    private seekAttTarget2(attAry:Array<RoleVo>,defAry:Array<RoleVo>):void
    {
        var attRoleVo:RoleVo;
        for(var i = 0;i < attAry.length;i++)
        {
            attRoleVo = attAry[i];
            for(var j = 0;j < defAry.length;j++)
            {
                attRoleVo.attEnemyVos.push(defAry[j]);
            }
            if(attRoleVo.isEnemy)
            {
                attRoleVo.attEnemyVos.sort(function(a:RoleVo,b:RoleVo):number{
                    //格子坐标规律
                    return a.gridY % 2 == 0 ? 1 : -1;
                });
            }
            else
            {
                attRoleVo.attEnemyVos.sort(function(a:RoleVo,b:RoleVo):number{
                    return a.gridX > b.gridX ? 1 : -1;
                });
            }
            
        }
    }
    /**
     * 跑角色技能cd
     */
    public runRoleSkillCD():void
    {
        if(this.attHeroVos)
        {
            this.attHeroVos.forEach(roleVo => {
                roleVo.runCD();
            });
        }
        if(this.attEnemyVos)
        {
            this.attEnemyVos.forEach(roleVo => {
                roleVo.runCD();
            });
        }
    }
}

class BattleTurnVo{
    public attRoleVo:RoleVo;
    public defRoleVo:RoleVo;
    constructor(){

    }
    public calculationAttribute():void
    {
        this.defRoleVo.battleDieAttTimes--;
        this.defRoleVo.isDeath = this.defRoleVo.battleDieAttTimes <= 0;
        this.defRoleVo.isAtted = true;
    }
}