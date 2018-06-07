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
     /**英雄 */
    public heroRunCount:number = 0;
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
                if(roleVo.id == "10006")
                {
                    hero.initRole(roleVo,i,0.5);
                }
                else
                {
                    hero.initRole(roleVo,i,1);
                }
                this.heroRoles.push(hero);
            }
            hero.aniPlay(RoleAniIndex.MOVE);
           
        }
        //显示层级排序
        this.heroRoles.sort(function(hero1,hero2):number{
            return hero1.roleVo.gridY > hero2.roleVo.gridY ? 1 : -1;
        })
        
        for(i = 0;i < this.heroRoles.length;i++)
        {
            this.heroRoles[i].setShowIndex(i);
        }
        
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
            enemy.aniPlay(RoleAniIndex.STAND);
        }
        //显示层级排序
        this.enemyRoles.sort(function(enemy1,enemy2):number{
            return enemy1.roleVo.gridY > enemy2.roleVo.gridY ? 1 : -1;
        })
        
        for(i = 0;i < this.enemyRoles.length;i++)
        {
            this.enemyRoles[i].setShowIndex(this.heroRoles.length + i); 
        }
       
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
    /**
     * 敌人跟随地图移动
     * @param speed 
     */
    public enemyMoveByMap(speed:number):void
    {
        if(this.enemyRoles)
        {
            this.enemyRoles.forEach(enemy =>{
                enemy.moveByMap(speed);
            });
        }
    }
    
    /**清除舞台显示对象 */
    public clearRole():void
    {
        if(this.heroRoles)
        {
            var lastHeros:Array<Hero> = [];
            this.heroRoles.forEach(role => {
                role.roleVo.isDeath = false;
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