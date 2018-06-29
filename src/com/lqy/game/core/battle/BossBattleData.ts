/*
* name;
*/
class BossBattleData{
    /**动画加载准备完毕 */
    public static curLoadNum:number = 0;
    public static loadSum:number = 0;
    private attHeroVos:Array<BaseRoleVo>;
    private attEnemyVos:Array<BaseRoleVo>;
    public curAttCamp:number = 0;
    public curAttRoleVo:BaseRoleVo;
    public curDefRoleVos:Array<BaseRoleVo>;
    public isWin:boolean;
    public isEnd:boolean;

    public turnCount:number = 0;
    
    constructor(){
        
    }
    public initData():void
    {
        this.turnCount = 0;
        this.attHeroVos = this.getJoinBattleHeroVo();
        this.attEnemyVos = GameDataManager.ins.bossData.masterVos;
        this.attHeroVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.initBattleData();
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(roleVo => {
            roleVo.battleHP = roleVo.hp;
            roleVo.initBattleData();
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
    private getJoinBattleHeroVo():Array<BaseRoleVo>
    {
        var tempAry:Array<BaseRoleVo> = new Array();
        GameDataManager.ins.selfPlayerData.upHeroVos.forEach(baseRoleVo => {
            tempAry.push(baseRoleVo);
        });
        tempAry.sort(function(vo1:BaseRoleVo,vo2:BaseRoleVo):number{
            return vo1.gridX > vo2.gridX ? -1 : 1;
        })
        tempAry = tempAry.slice(0,GameConfig.BATTLE_BOSS_HERO_SUM);
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

        this.curDefRoleVos = [];
        /**得到技能 */
        var skillVo:SkillVo = this.curAttRoleVo.getCanUserSkill();
        if(skillVo && skillVo.isCanUse)
        {
            skillVo.resetCD();
            //技能攻击对象
            this.seekSkillAtkTarget(skillVo);
        }
        else
        {
            //嘲讽
            var tempVo:BaseRoleVo = this.enemySkillSeekTarget(this.curAttRoleVo.attEnemyVos);
            if(tempVo)
            {
                this.curDefRoleVos.push(tempVo);
                return;
            }
            //寻找攻击具体对象
            for(var i = 0;i < this.curAttRoleVo.attEnemyVos.length;i++)
            {
                tempVo = this.curAttRoleVo.attEnemyVos[i];
                if(!tempVo.isDeath)
                {
                    this.curDefRoleVos.push(tempVo);
                    break;
                }
            }
        }
    }
    /**计算属性 */
    // public calculationAttribute():number
    // {
    //     var readHurt:number = 0;
    //     var curRoleVo:BaseRoleVo;
    //     for(var i = 0;i < this.curDefRoleVos.length;i++)
    //     {
    //         curRoleVo = this.curDefRoleVos[i];
    //         curRoleVo.calculationAttribute(this.curAttRoleVo);
    //         //自身加成
    //         if(this.curAttCamp == BattleAttCampType.HERO && !curRoleVo.isEnemy || this.curAttCamp == BattleAttCampType.ENEMY && curRoleVo.isEnemy)
    //         {
                
    //         }
    //         else
    //         {
    //             readHurt = FormulaUtil.realDamageValue(this.curAttRoleVo,curRoleVo);
    //             curRoleVo.battleHP -= readHurt;
    //             curRoleVo.isDeath = curRoleVo.battleHP <= 0;
    //         }
    //     }
    //     this.curAttRoleVo.isAtted = true;

    //     this.checkBattleEnd();
    //     if(this.curAttCamp == BattleAttCampType.ENEMY)
    //     {
    //         //DebugViewUtil.log("战斗日记：","....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVos.name + "("+ this.curDefRoleVos.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVos.battleHP);
    //         // console.log("....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVos.name + "("+ this.curDefRoleVos.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVos.battleHP);
    //     }
    //     return readHurt;
    // }
    /**
     * 检测战斗结束
     */
    public checkBattleEnd():void
    {
        this.curAttRoleVo.isAtted = true;
        //检测战斗结束，玩家英雄阵营没有活的对象战斗失败，反之战斗胜利
        //英雄检测
        this.isEnd = true;
        var isChangeAttStatus:boolean = true;
        var liveRoleCount = 0;
        this.attHeroVos.forEach(roleVo => {
            if(!roleVo.isDeath)
            {
                liveRoleCount++;
                this.isEnd = false;
                if(!roleVo.isAtted)
                {
                    isChangeAttStatus = false;
                }
                
            }
            else
                console.log("我方：" ,roleVo.name,roleVo.battleHP);
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
        console.log("............" );
        //敌人检测
        isChangeAttStatus = true;
        this.isEnd = true;
        this.attEnemyVos.forEach(roleVo => {
            if(!roleVo.isDeath)
            {
                liveRoleCount++;
                this.isEnd = false;
                if(!roleVo.isAtted)
                {
                    isChangeAttStatus = false;
                }
                
            }
            else
                console.log("敌方：" ,roleVo.name,roleVo.battleHP);
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
        this.turnCount++;
        //轮数跑技能CD
        if(this.turnCount > liveRoleCount)
        {
            this.turnCount = 0;
            this.runRoleSkillCD();
            console.log(this.turnCount,liveRoleCount);
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
    public getAttRoleVo(baseRoleVos:Array<BaseRoleVo>):BaseRoleVo
    {
        var baseRoleVo:BaseRoleVo;
        for(var i = 0;i < baseRoleVos.length;i++)
        {
            baseRoleVo = baseRoleVos[i];
            if(!baseRoleVo.isDeath && !baseRoleVo.isAtted)
            {
                break;
            }
        }
        return baseRoleVo;
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
    private seekAttTarget2(attAry:Array<BaseRoleVo>,defAry:Array<BaseRoleVo>):void
    {
        var attRoleVo:BaseRoleVo;
        for(var i = 0;i < attAry.length;i++)
        {
            attRoleVo = attAry[i];
            for(var j = 0;j < defAry.length;j++)
            {
                attRoleVo.attEnemyVos.push(defAry[j]);
            }
            if(attRoleVo.isEnemy)
            {
                attRoleVo.attEnemyVos.sort(function(a:BaseRoleVo,b:BaseRoleVo):number{
                    return a.gridY % 2 == 0 ? 1 : -1;
                });
            }
            else
            {
                attRoleVo.attEnemyVos.sort(function(a:BaseRoleVo,b:BaseRoleVo):number{
                    return a.gridX > b.gridX ? 1 : -1;
                });
            }
            
        }
    }

    /*******************技能相关 */
    /**
     * 跑角色技能cd
     */
    public runRoleSkillCD():void
    {
        if(this.attHeroVos)
        {
            this.attHeroVos.forEach(baseRoleVo => {
                baseRoleVo.runCD();
                baseRoleVo.runSkillEffectCD();
            });
        }
        if(this.attEnemyVos)
        {
            this.attEnemyVos.forEach(baseRoleVo => {
                baseRoleVo.runCD();
                baseRoleVo.runSkillEffectCD();
            });
        }
       
    }

    /**技能攻击目标 */
    public seekSkillAtkTarget(skillVo:SkillVo):void
    {
        var i:number;
        var attVos:Array<BaseRoleVo> = this.curAttRoleVo.isEnemy ? this.attEnemyVos : this.attHeroVos;
        var defVos:Array<BaseRoleVo> = this.curAttRoleVo.isEnemy ? this.attHeroVos : this.attEnemyVos;
        var tempVo:BaseRoleVo;
        var tempAry:Array<BaseRoleVo> = [];
        var skillTargetType:number = Number(skillVo.skillConfig.skillTargetType);
        switch(skillTargetType)
        {
            case SkillTarget.SELF:
                this.curAttRoleVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(this.curAttRoleVo);
                break;
            case SkillTarget.WE_ONE:
                for(i = 0;i < attVos.length;i++)
                {
                    tempVo = attVos[i];
                    if(tempVo.roleId != this.curAttRoleVo.roleId && !tempVo.isDeath)
                    {
                        tempAry.push(tempVo);
                    }
                }
                var ind:number = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.WE_ALL:
                this.curDefRoleVos = attVos;
                this.curDefRoleVos.forEach(baseRoleVo => {
                    baseRoleVo.addSkillEffectCDs(skillVo);
                });
                break;
            case SkillTarget.ENEMY_ONE:
                for(i = 0;i < defVos.length;i++)
                {
                    tempVo = defVos[i];
                    if(!tempVo.isDeath)
                    {
                        tempAry.push(tempVo);
                    }
                }
                //嘲讽
                var tempVo:BaseRoleVo = this.enemySkillSeekTarget(tempAry);
                if(tempVo)
                {
                    this.curDefRoleVos.push(tempVo);
                    return;
                }

                var ind:number = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.ENEMY_ALL:
                this.curDefRoleVos = defVos;
                this.curDefRoleVos.forEach(baseRoleVo => {
                    baseRoleVo.addSkillEffectCDs(skillVo);
                });
                break;
            case SkillTarget.WE_ONE_SELF:
                for(i = 0;i < attVos.length;i++)
                {
                    tempVo = attVos[i];
                    if(!tempVo.isDeath)
                    {
                        tempAry.push(tempVo);
                    }
                }
                var ind:number = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.WE_LEAST_PERCENT_BLOOD:
                for(i = 0;i < attVos.length;i++)
                {
                    tempVo = attVos[i];
                    if(!tempVo.isDeath)
                    {
                        tempAry.push(tempVo);
                    }
                }
                tempAry.sort(function(vo1:BaseRoleVo,vo2:BaseRoleVo):number{
                    var per1:number = vo1.battleHP / vo1.hp;
                    var per2:number = vo2.battleHP / vo2.hp;
                    return per1 < per2 ? 1 : - 1;
                });
                tempVo = tempAry[0];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.ENEMY_LEAST_PERCENT_BLOOD:
                for(i = 0;i < defVos.length;i++)
                {
                    tempVo = defVos[i];
                    if(!tempVo.isDeath)
                    {
                        tempAry.push(tempVo);
                    }
                }
                tempAry.sort(function(vo1:BaseRoleVo,vo2:BaseRoleVo):number{
                    var per1:number = vo1.battleHP / vo1.hp;
                    var per2:number = vo2.battleHP / vo2.hp;
                    return per1 < per2 ? 1 : - 1;
                });
                tempVo = tempAry[0];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
        }
    }

    /**
     * 敌方技能选取优先攻击
     * @param baseRoleVos 
     */
    public enemySkillSeekTarget(baseRoleVos:Array<BaseRoleVo>):BaseRoleVo
    {
        var tempVo:BaseRoleVo;
        var curSkillVo:SkillVo;
        for(var i = 0;i < baseRoleVos.length;i++)
        {
            tempVo = baseRoleVos[i];
            if(!tempVo.isDeath)
            {
                if(tempVo.mainSkillContinuedVo.anger > 0 || tempVo.assiSkillContinuedVo.anger > 0)
                {//嘲讽技能
                    return tempVo;
                }
            }
        }
        return null;
    }
    /**得到队伍攻击力 */
    public getRankAtk(isEnemy:boolean):number
    {
        var ary:Array<BaseRoleVo> = isEnemy ? this.attEnemyVos : this.attHeroVos;
        var ranksAtk:number = 0;
        ary.forEach(roleVo => {
            if(!roleVo.isDeath){
                ranksAtk += roleVo.realAtk;
            }
        });
        return ranksAtk;
    }
    
    
}