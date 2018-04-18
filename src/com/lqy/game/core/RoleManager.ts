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


    public initHeors():void
    {
        this.clearRole();
        
        this.heroRoles = new Array();
        var playerData:PlayerData = GameDataManager.ins.selfPlayerData;
        var roleVo:RoleVo;
        var hero:BaseRole;
        for(var i = 0;i < playerData.roleVoAry.length;i++)
        {
            roleVo = playerData.roleVoAry[i];
            hero = new Hero();
            hero.initRole(roleVo,1);
            hero.aniPlay(RoleAniIndex.MOVE);
            this.heroRoles.push(hero);
        }

        this.heroRoles.forEach(heroView =>{
            heroView.setShowIndex(heroView.roleVo.lineupGrid-1);
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
            enemy = new Enemy();
            enemy.initRole(roleVo,1);
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
            if(roleView.roleVo.id == attRoleVo.id)
            {
                this.attRole = roleView;
            }
            else if(roleView.roleVo.id == defRoleVo.id)
            {
                this.defRole = roleView;
            }
        });
        if(this.attRole && this.defRole)
        {
            this.attRole.aniPlay(RoleAniIndex.MOVE);
            var tempX:number = defRoleVo.isEnemy ? 200 : -200;
            Laya.Tween.to(this.attRole,{x:defRoleVo.posPoint.x - tempX,y:defRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000,null,new Handler(this,this.moveCompleteAtt,[attRoleVo,defRoleVo]));
        }
    }

    private moveCompleteAtt(data):void
    {
        var attRoleVo:RoleVo = this.attRole.roleVo;
        var defRoleVo:RoleVo = this.defRole.roleVo;
        BattleDataManager.ins.calculationAttribute();
        if(defRoleVo.isDeath)
        {
            this.defRole.aniPlay(RoleAniIndex.DEATH);
            this.defRole.setVisible(false);
        }
        else
        {
            this.defRole.aniPlay(RoleAniIndex.INJURED);
        }
        if(this.attRole && this.defRole)
        {
            this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBack);
        }
    }
    private moveBack():void
    {
        var attRoleVo:RoleVo = this.attRole.roleVo;
        var defRoleVo:RoleVo = this.defRole.roleVo;
        Laya.Tween.to(this.attRole,{x:attRoleVo.posPoint.x,y:attRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000/2,null,new Handler(this,this.moveBackComplete));
    }

    private moveBackComplete():void
    {
        
        this.attRole.aniPlay(RoleAniIndex.STAND);
        this.defRole.aniPlay(RoleAniIndex.STAND);
        EventManager.ins.dispatchEvent(EventManager.ENEMY_ATT_COMPLETE);
    }

    public clearRole():void
    {
        if(this.heroRoles)
        {
            this.heroRoles.forEach(role => {
                role.dispose();
            });
            this.heroRoles = null;
        }
        
        if(this.enemyRoles)
        {
            this.enemyRoles.forEach(role => {
                role.dispose();
            });
            this.enemyRoles = null;
        }
       
    }
}