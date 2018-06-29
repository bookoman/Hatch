/*
* 循环假战斗引擎
*/
class LoopBattleEngine{
    private timeCount:number = 0;
    private battleTimeInterval = 0;
    private battleTurnVoSum:number = 0;
    private heroRoles:Array<BaseRole> = null;
    private enemyRoles:Array<BaseRole> = null;
    private loopBattleData:LoopBattleData = null;
    private roleMgr:RoleManager;
    /**雨显示计数 */
    private rainShowCount:number = 20;
    constructor(){
        this.init();
    }
    public init():void
    {
        this.roleMgr = RoleManager.ins;
        
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.loopBattleData = new LoopBattleData();
    }

    public runUpdate():void
    {
        // console.log("................"+this.timeCount);
        //场景战斗开关
        this.timeCount++;
        if(this.timeCount == this.battleTimeInterval)
        {
            this.enemyRuntoBallte();
        }
        //假战斗无技能
        // this.loopBattleData.runRoleSkillCD();
        //战场下雨特效
        if(GameDataManager.showModuleViewInd == GameButtomTabIndex.BATTLE)
        {
            this.rainShowCount++;
            if(this.rainShowCount > GameConfig.RAIN_SHOW_LIMIT_TIME)
            {
                var time:number = Math.random() > 0.5 ? GameConfig.RAIN_SHOW_LIMIT_TIME / 2 : 0;
                var time:number =  GameConfig.RAIN_SHOW_LIMIT_TIME;
                AnimationManager.ins.addBattleRainEffect(time);
                this.rainShowCount = 0;
            }
        }
        else
        {
            AnimationManager.ins.removeBattleRainEffect();
        }
    }
    
    /**
     * 敌人跑去战斗
     */
    private enemyRuntoBallte():void
    {
        MapManager.ins.enemyMoveSwitch = true;
        GameDataManager.ins.produceEnemyData();
        this.roleMgr.produceEnemy();
        this.loopBattleData.initData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE,this,this.onEnemyRunComplete);
    }
    private onEnemyRunComplete():void
    {
        EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE,this.onEnemyRunComplete);
        MapManager.ins.enemyMoveSwitch = false;
        this.startBattle();
    }
    /**得到参战英雄 */
    private getJoinBattleHeroVo():Array<BaseRole>
    {
        var tempAry:Array<BaseRole> = new Array();
        this.roleMgr.heroRoles.forEach(hero => {
            tempAry.push(hero);
        });
        tempAry.sort(function(vo1:BaseRole,vo2:BaseRole):number{
            return vo1.baseRoleVo.gridX > vo2.baseRoleVo.gridX ? -1 : 1;
        })
        tempAry = tempAry.slice(0,GameConfig.BATTLE_LOOP_HERO_SUM);
        return tempAry;
    }
    /**开始战斗 */
    private startBattle():void
    {
        this.heroRoles = this.getJoinBattleHeroVo();
        this.enemyRoles = this.roleMgr.enemyRoles;

        MapManager.ins.mapScrollSwitch = false;
        this.roleMgr.heroStand();
        this.attack();
    }
    
    private attack():void
    {
        this.loopBattleData.startAtt();
        this.battleTurnVoSum = this.loopBattleData.curBattleTurnVos.length;
        this.loopBattleData.curBattleTurnVos.forEach(battleTurnVo => {
            //根据攻击速度攻击延迟
            Laya.timer.once(1 * battleTurnVo.attRoleVo.speed / GameConfig.BATTLE_ADDSPEED_TIMES,this,this.battleAtt,[battleTurnVo.attRoleVo,battleTurnVo.defRoleVo],false);
        });
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    }
    

    /**结束战斗 */
    public endBattle():void
    {
        Laya.timer.clearAll(this);
        this.heroRoles = null;
        this.enemyRoles = null;
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        this.loopBattleData.isEnd = false;
        this.roleMgr.clearRole();
        this.roleMgr.initHeros();
        
    }

    
    /**
     * 战斗
     * @param attRoleVo 
     * @param defRoleVo 
     */
    public battleAtt(attRoleVo:BaseRoleVo,defRoleVo:BaseRoleVo):void
    {
        if(!attRoleVo || !defRoleVo)
        {
            return;
        }
        var attRole:BaseRole;
        var defRole:BaseRole;
        var tempAry:Array<BaseRole> = this.heroRoles.concat(this.enemyRoles);
        tempAry.forEach(roleView => {
            if(roleView)
            {
                if(roleView.baseRoleVo.roleId == attRoleVo.roleId)
                {
                    attRole = roleView;
                }
                else if(roleView.baseRoleVo.roleId == defRoleVo.roleId)
                {
                    defRole = roleView;
                }
            }
        });
        if(attRole && defRole)
        {
            // //远攻
            // if(this.attRole.roleVo.attFar == 1)
            // {
            //     this.playAttackAni();
            // }
            // else
            // {//近攻
            //     this.attRole.aniPlay(RoleAniIndex.MOVE);
            //     var tempX:number = defRoleVo.isEnemy ? 200 : -200;
            //     Laya.Tween.to(this.attRole,{x:defRoleVo.posPoint.x - tempX,y:defRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000,null,new Handler(this,this.playAttackAni,[attRoleVo,defRoleVo],true),0,true);
            // }
            this.playAttackAni(attRole,defRole);
        }
    }
    /**
     * 移动到敌方攻击
     * @param data 
     */
    private playAttackAni(attRole:BaseRole,defRole:BaseRole):void
    {
        var attRoleVo:BaseRoleVo = attRole.baseRoleVo;
        var defRoleVo:BaseRoleVo = defRole.baseRoleVo;
        var skillVo:SkillVo = attRoleVo.getCanUserSkill();
        if(skillVo)
        {
            
            //技能释放               
            // var skill:Skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            // skill.playSkill(skillVo.modelId,defRole,0,0,0.3);
        }
        else
        {
            //远攻，近攻击
            // if(attRoleVo.attFar == 1)
            // {
            //     this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineupComplete);
            // }
            // else
            // {
            //     this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineup);
            // }
        }
        attRole.aniPlay(RoleAniIndex.ATTACK,true,this,this.moveBackLineupComplete,defRole);
        this.loopBattleData.calculationAttribute(attRoleVo,defRoleVo);
        if(defRoleVo.isDeath)
        {
            defRole.aniPlay(RoleAniIndex.DEATH,false);
            defRole.setVisible(false);
        }
        else
        {
            defRole.aniPlay(RoleAniIndex.INJURED,false);
        }
        defRole.showFloatFont(attRoleVo.atk);
        defRole.setBlood(1 - defRoleVo.battleDieAttTimes / defRoleVo.dieAttTimes);
    }
    // /**
    //  * 攻击完移动回阵型
    //  */
    // private moveBackLineup():void
    // {
    //     var attRoleVo:RoleVo = this.attRole.roleVo;
    //     Laya.Tween.to(this.attRole,{x:attRoleVo.posPoint.x,y:attRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000/2,null,new Handler(this,this.moveBackLineupComplete));
    // }
    /**
     * 移动回阵型完成
     */
    private moveBackLineupComplete(roleAry):void
    {
        var attRole:BaseRole = roleAry[0];
        var defRole:BaseRole = roleAry[1];
        // console.log("攻击返回",this.attRole.roleVo.name);
        attRole.aniPlay(RoleAniIndex.STAND);
        if(!attRole.baseRoleVo.isDeath)
        {
            defRole.aniPlay(RoleAniIndex.STAND);
        }
        this.battleTurnVoSum--;
        if(this.battleTurnVoSum <= 0)
        {
            this.attCompleted();
        }
    }
    private attCompleted():void
    {
        
        if(this.loopBattleData.isEnd)
        {
            this.endBattle();
        }
        else
        {
            this.attack();
        }
    }

    /****************技能相关 */
    private playSkill():void
    {

    }
}