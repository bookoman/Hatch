/*
* 较色管理器
*/
class RoleManager{
    /**英雄角色 */
    public heroRoles:Array<BaseRole> = null;
    /**敌人角色 */
    public enemyRoles:Array<Enemy> = null;

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


    public initRoles():void
    {
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
        
    }
    public playAni(aniID:number):void
    {
        if(this.heroRoles)
        {
            this.heroRoles.forEach(hero => {
                hero.aniPlay(aniID);
            });
        }
        

        if(this.enemyRoles)
        {
            this.enemyRoles.forEach(enemy =>{
                enemy.aniPlay(aniID);
            });
        }
        
    }

    public heroRun():void
    {
        this.heroRoles.forEach(hero => {
            hero.run();
        });
    }

    public enemyRun():void
    {
        this.enemyRoles.forEach(enemy =>{
            enemy.run();
        });
    }
    public heroStand():void
    {
        this.heroRoles.forEach(hero => {
            hero.aniPlay(RoleAniIndex.STAND);
        });
    }

    
}