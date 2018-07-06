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
        this.heroRoles = [];
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
    /**更新阵型 */
    public updateLineupHeros(heroVo:BaseRoleVo,isUp:boolean):void
    {
        var hero:Hero = null;
        if(isUp)
        {
            hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
            hero.initRole(heroVo,5,-1);
            this.heroRoles.push(hero);
        }
        else
        {   
            for(var i = 0;i < this.heroRoles.length;i++)
            {
                hero = this.heroRoles[i];
                if(hero.baseRoleVo.roleId == heroVo.roleId)
                {
                    ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE,hero);
                    hero.dispose();
                    this.heroRoles.splice(i,1);
                    break;
                }
            }
        }
        BattleEngine.ins.resetLoopBattle();
    }
    /**初始化角色 */
    public initHeros():void
    {
        if(this.heroRoles == null)
        {
            this.heroRoles = new Array();
        }
        var playerData:PlayerData = GameDataManager.ins.selfPlayerData;
        var heroVo:BaseRoleVo;
        var hero:Hero;
        if(!playerData.upHeroVos)
        {
            console.log("请上阵英雄");
            return;
        }

        for(var i = 0;i < playerData.upHeroVos.length;i++)
        {
            heroVo = playerData.upHeroVos[i];
            hero = null;
            this.heroRoles.forEach(heroView =>{
                if(heroView.baseRoleVo.roleId == heroVo.roleId)
                {
                    hero = heroView;
                    hero.setBlood(0);
                }
            });
            if(hero == null)
            {
                hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
                hero.initRole(heroVo,i,-1);
                this.heroRoles.push(hero);
            }
            hero.aniPlay(RoleAniIndex.MOVE);
           
        }
        //显示层级排序
        this.heroRoles.sort(function(hero1,hero2):number{
            return hero1.baseRoleVo.gridY > hero2.baseRoleVo.gridY ? 1 : -1;
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
            Laya.Tween.to(heroView,{x:heroView.baseRoleVo.posPoint.x,y:heroView.baseRoleVo.posPoint.y},200);
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
        var masterNPCVo:BaseRoleVo;
        for(var i = 0;i < enemyData.masterNPCVos.length;i++)
        {
            masterNPCVo = enemyData.masterNPCVos[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(masterNPCVo,i,1);
            this.enemyRoles.push(enemy);
            enemy.aniPlay(RoleAniIndex.STAND);
        }
        //显示层级排序
        this.enemyRoles.sort(function(enemy1,enemy2):number{
            return enemy1.baseRoleVo.gridY > enemy2.baseRoleVo.gridY ? 1 : -1;
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
                role.baseRoleVo.isDeath = false;
                Laya.Tween.clearAll(role);
                //只移除死掉英雄
                if(role.baseRoleVo.isDeath)
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