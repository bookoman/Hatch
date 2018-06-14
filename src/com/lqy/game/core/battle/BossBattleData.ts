/*
* name;
*/
class BossBattleData{
    /**动画加载准备完毕 */
    public static curLoadNum:number = 0;
    public static loadSum:number = 0;
    private attHeroVos:Array<RoleVo>;
    private attEnemyVos:Array<RoleVo>;
    public curAttCamp:number = 0;
    public curAttRoleVo:RoleVo;
    public curDefRoleVo:RoleVo;
    public isWin:boolean;
    public isEnd:boolean;
    
    constructor(){

    }
    public initData():void
    {
        this.attHeroVos = this.getJoinBattleHeroVo();
        // this.attEnemyVos = GameDataManager.ins.bossData.roleVoAry;
        this.attHeroVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });

        this.seekAttTarget2(this.attHeroVos,this.attEnemyVos);
        this.seekAttTarget2(this.attEnemyVos,this.attHeroVos);
        this.curAttCamp = BattleAttCampType.HERO;
    }
    /**得到参战英雄RoleVo */
    private getJoinBattleHeroVo():Array<RoleVo>
    {
        var tempAry:Array<RoleVo> = new Array();
        // GameDataManager.ins.selfPlayerData.roleVoAry.forEach(roleVo => {
        //     tempAry.push(roleVo);
        // });
        // tempAry.sort(function(vo1:RoleVo,vo2:RoleVo):number{
        //     return vo1.gridX > vo2.gridX ? -1 : 1;
        // })
        // tempAry = tempAry.slice(0,GameConfig.BATTLE_BOSS_HERO_SUM);
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
            this.curAttRoleVo = this.getAttRoleVo(this.attHeroVos);
        }
        else if(this.curAttCamp == BattleAttCampType.ENEMY)
        {
            this.curAttRoleVo = this.getAttRoleVo(this.attEnemyVos);
        }
        //寻找攻击具体对象
        for(var i = 0;i < this.curAttRoleVo.attEnemyVos.length;i++)
        {
            this.curDefRoleVo = this.curAttRoleVo.attEnemyVos[i];
            if(!this.curDefRoleVo.isDeath)
            {
                break;
            }
        }
    }
    /**计算属性 */
    public calculationAttribute():void
    {
        this.curDefRoleVo.battleHP -= this.curAttRoleVo.att;
        this.curDefRoleVo.isDeath = this.curDefRoleVo.battleHP <= 0;
        this.curAttRoleVo.isAtted = true;
        this.checkBattleEnd();
        if(this.curAttCamp == BattleAttCampType.ENEMY)
        {
            //DebugViewUtil.log("战斗日记：","....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVo.name + "("+ this.curDefRoleVo.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVo.battleHP);
            // console.log("....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVo.name + "("+ this.curDefRoleVo.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVo.battleHP);
        }
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
            console.log("战斗结束"+this.isWin);
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
            console.log("战斗结束"+this.isWin);
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
     * 得到当前攻击角色
     * @param roleVos 
     */
    public getAttRoleVo(roleVos:Array<RoleVo>):RoleVo
    {
        var roleVo:RoleVo;
        for(var i = 0;i < roleVos.length;i++)
        {
            roleVo = roleVos[i];
            if(!roleVo.isDeath && !roleVo.isAtted)
            {
                break;
            }
        }
        return roleVo;
    }
    /**
     * 寻找攻击目标
     * 普通攻击:
     *  1,找同gy，再又上至下找gy
     * 技能攻击:
     *  1,一个目标：找同gy，再又上至下找gy
     *  2,攻击一行gx,攻击一列gy
     * @param attAry 
     * @param defAry 
     */
    private seekAttTarget(attAry:Array<RoleVo>,defAry:Array<RoleVo>):void
    {
        var attRoleVo:RoleVo;
        var defRoleVo:RoleVo;
        for(var i = 0; i < attAry.length;i++)
        {
            attRoleVo = attAry[i];
            for(var j = 0;j < defAry.length;j++)
            {
                defRoleVo = defAry[j];
                var attInd:number = Math.abs(attRoleVo.gridY  - defRoleVo.gridY);
                if(attInd < defAry.length)
                {
                    attRoleVo.attEnemyVos[attInd] = defRoleVo;
                }
                else
                {
                    attRoleVo.attEnemyVos.push(defRoleVo);
                }
            }
        }
    }
    /**
     * 寻找攻击目标2
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