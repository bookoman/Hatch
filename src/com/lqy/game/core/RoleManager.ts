/*
* 较色管理器
*/
class RoleManager{
    /**英雄角色 */
    public heroRoles:Array<BaseRole> = null;
    /**敌人角色 */
    public enemyRoles:Array<BaseRole> = null;

    /**敌人 */
    public enemyRunCount:number = 0;

    constructor(){

    }
    private static _ins = null;
    public static get ins():RoleManager
    {
        if(this._ins == null)
        {
            this._ins = new RoleManager();
        }
        return this._ins;
    }


    public initHeros():void
    {
        // this.clearRole();
        if(this.heroRoles == null)
        {
            this.heroRoles = new Array();
        }
        var playerData:PlayerData = GameDataManager.ins.selfPlayerData;
        var roleVo:RoleVo;
        var hero:Hero;
        for(var i = 0;i < playerData.roleVoAry.length;i++)
        {
            roleVo = playerData.roleVoAry[i];
            hero = null;
            this.heroRoles.forEach(heroView =>{
                if(heroView.roleVo.id == roleVo.id)
                {
                    hero = heroView;
                    hero.setBlood(0);
                }
            });
            if(hero == null)
            {
                hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
                hero.initRole(roleVo,i,1);
                this.heroRoles.push(hero);
            }
            hero.aniPlay(RoleAniIndex.MOVE);
           
        }

        this.heroRoles.forEach(heroView =>{
            heroView.setShowIndex(heroView.roleVo.lineupGrid-1);
        });
        
    }
    /**
     * 重置角色坐标
     */
    public resetRolePoint():void
    {
        this.heroRoles.forEach(heroView =>{
            Laya.Tween.to(heroView,{x:heroView.roleVo.posPoint.x,y:heroView.roleVo.posPoint.y},200);
        });
    }

    /**生产敌人 */
    public produceEnemy():void
    {
        //怪物数据
        var enemyData:EnemyData = GameDataManager.ins.enemyData;    
        this.enemyRoles = new Array();
        //怪物显示对象
        var enemy:Enemy;
        var roleVo:RoleVo;
        for(var i = 0;i < enemyData.roleVoAry.length;i++)
        {
            roleVo = enemyData.roleVoAry[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(roleVo,i,1);
            this.enemyRoles.push(enemy);
        }
        this.enemyRoles.forEach(enemyView =>{
            enemyView.setShowIndex(enemyView.roleVo.lineupGrid-1);
        });
    }
    
    /**
     * 英雄移动
     */
    public heroRun():void
    {
        this.heroRoles.forEach(hero => {
            hero.run();
        });
    }
    
    /**
     * 英雄站立
     */
    public heroStand():void
    {
        this.heroRoles.forEach(hero => {
            hero.aniPlay(RoleAniIndex.STAND);
        });
    }
    /**
     * 敌人移动
     */
    public enemyRun():void
    {
        this.enemyRoles.forEach(enemy =>{
            enemy.run();
        });
    }
    private attRole:BaseRole;
    private defRole:BaseRole;
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
                Laya.Tween.to(this.attRole,{x:defRoleVo.posPoint.x - tempX,y:defRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000,null,new Handler(this,this.playAttackAni,[attRoleVo,defRoleVo],true),0,true);
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
            this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineup);
            var skill:Skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillID,defRoleVo.posPoint);
        }
        else
        {
            //远攻，近攻击
            if(attRoleVo.attFar == 1)
            {
                this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineupComplete);
            }
            else
            {
                this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineup);
            }
        }
        BattleDataManager.ins.calculationAttribute();
        if(defRoleVo.isDeath)
        {
            this.defRole.aniPlay(RoleAniIndex.DEATH,false);
            this.defRole.setVisible(false);
        }
        else
        {
            this.defRole.aniPlay(RoleAniIndex.INJURED);
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
        Laya.Tween.to(this.attRole,{x:attRoleVo.posPoint.x,y:attRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000/2,null,new Handler(this,this.moveBackLineupComplete,null,true),0,true);
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
        EventManager.ins.dispatchEvent(EventManager.ENEMY_ATT_COMPLETE);
    }
    /**清除舞台显示对象 */
    public clearRole():void
    {
        if(this.heroRoles)
        {
            var lastHeros:Array<Hero> = [];
            this.heroRoles.forEach(role => {
                Laya.Tween.clearAll(role);
                //只移除死掉英雄
                if(role.roleVo.isDeath)
                {
                    ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE,role);
                    role.dispose();
                }
                else
                {
                    lastHeros.push(role);
                }
                role.roleVo.isDeath = false;
            });
            this.heroRoles = lastHeros;
        }
        
        if(this.enemyRoles)
        {
            this.enemyRoles.forEach(role => {
                Laya.Tween.clearAll(role);
                ObjectPoolUtil.stillObject(ObjectPoolUtil.ENEMY_ROLE,role);
                role.dispose();
            });
            this.enemyRoles = null;
        }

    }
    
}