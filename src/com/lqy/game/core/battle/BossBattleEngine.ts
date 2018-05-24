/*
* name;
*/
class BossBattleEngine{
    private timeCount:number = 0;
    private battleTimeInterval = 0;
    private heroRoles:Array<BaseRole> = null;
    private enemyRoles:Array<BaseRole> = null;
    private bossBattleData:BossBattleData = null;
    // private roleMgr:RoleManager;
    private attRole:BaseRole;
    private defRole:BaseRole;
    constructor(){

    }

    /**开始战斗 */
    public startBattle(herosAry:Array<BaseRole>,enemyAry:Array<BaseRole>):void
    {
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.bossBattleData = new BossBattleData();
        this.bossBattleData.initData();

        this.heroRoles = herosAry;
        this.enemyRoles = enemyAry;
        this.attack();
    }
    private attack():void
    {
        this.bossBattleData.startAtt();
        this.battleAtt(this.bossBattleData.curAttRoleVo,this.bossBattleData.curDefRoleVo);
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    }
    private attCompleted():void
    {
        
        // this.battleDataMgr.calculationAttribute();
        if(this.bossBattleData.isEnd)
        {
            this.endBattle();
        }
        else
        {
            this.attack();
        }
    }

    /**结束战斗 */
    public endBattle():void
    {
        Laya.timer.clearAll(this);
        this.heroRoles = null;
        this.enemyRoles = null;
        this.timeCount = 0;
        this.bossBattleData.isEnd = false;
        GameDataManager.ins.isChallengeBoss = false;
        MapManager.ins.backLoopMap();
        EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS,[true]);
        //回到假战斗
        BattleEngine.ins.loopBattleRun();
    }
    
    /**
     * 战斗
     * @param attRoleVo 
     * @param defRoleVo 
     */
    public battleAtt(attRoleVo:RoleVo,defRoleVo:RoleVo):void
    {
        var tempAry:Array<BaseRole> = this.heroRoles.concat(this.enemyRoles);
        tempAry.forEach(roleView => {
            if(roleView)
            {
                if(roleView.roleVo.id == attRoleVo.id)
                {
                    this.attRole = roleView;
                }
                else if(roleView.roleVo.id == defRoleVo.id)
                {
                    this.defRole = roleView;
                }
            }
        });
        if(this.attRole && this.defRole)
        {
            //远攻
            if(this.attRole.roleVo.attFar == 1)
            {
                this.playAttackAni();
            }
            else
            {//近攻
                this.attRole.aniPlay(RoleAniIndex.MOVE);
                var tempX:number = defRoleVo.isEnemy ? 200 : -200;
                Laya.Tween.to(this.attRole,{x:defRoleVo.posPoint.x - tempX,y:defRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000 / GameConfig.BATTLE_ADDSPEED_TIMES,null,new Handler(this,this.playAttackAni,[attRoleVo,defRoleVo],true),0,true);
            }
        }
    }
    /**
     * 移动到敌方攻击
     * @param data 
     */
    private playAttackAni():void
    {
        var attRoleVo:RoleVo = this.attRole.roleVo;
        var defRoleVo:RoleVo = this.defRole.roleVo;
        var skillID:number = attRoleVo.getCanUserSkill();
        if(skillID > 0)
        {
            //技能释放
            this.attRole.aniPlay(RoleAniIndex.ATTACK,true,this,this.moveBackLineup);
            var skill:Skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillID,defRoleVo.posPoint);
        }
        else
        {
            //远攻，近攻击
            if(attRoleVo.attFar == 1)
            {
                this.attRole.aniPlay(RoleAniIndex.ATTACK,true,this,this.moveBackLineupComplete);
            }
            else
            {
                this.attRole.aniPlay(RoleAniIndex.ATTACK,true,this,this.moveBackLineup);
            }
        }
        this.bossBattleData.calculationAttribute();
        if(defRoleVo.isDeath)
        {
            this.defRole.aniPlay(RoleAniIndex.DEATH,false);
            this.defRole.setVisible(false);
        }
        else
        {
            this.defRole.aniPlay(RoleAniIndex.INJURED,false);
            this.defRole.showFloatFont(attRoleVo.att);
        }
        this.defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
    }
    /**
     * 攻击完移动回阵型
     */
    private moveBackLineup():void
    {
        var attRoleVo:RoleVo = this.attRole.roleVo;
        Laya.Tween.to(this.attRole,{x:attRoleVo.posPoint.x,y:attRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000 / 2 / GameConfig.BATTLE_ADDSPEED_TIMES,null,new Handler(this,this.moveBackLineupComplete,null,true),0,true);
    }
    /**
     * 移动回阵型完成
     */
    private moveBackLineupComplete():void
    {
        DebugViewUtil.log("攻击返回",this.attRole.roleVo.name);
        this.attRole.aniPlay(RoleAniIndex.STAND);
        if(!this.defRole.roleVo.isDeath)
        {
            this.defRole.aniPlay(RoleAniIndex.STAND);
        }
        this.attCompleted();
    }
}