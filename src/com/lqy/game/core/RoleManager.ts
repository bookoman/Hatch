/*
* 较色管理器
*/
class RoleManager{
    private heroRoles:Array<BaseRole> = null;
    private enemyRoles:Array<Enemy> = null;

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
            hero.initRole("res/outside/anim/hero/swordsman/SwordsMan.sk",0.3,roleVo);
            this.heroRoles.push(hero);
        }
        this.enemyRoles = new Array();
        var enemyData:EnemyData = GameDataManager.ins.enemyData;
        var enemy:Enemy;
        for(i = 0;i < enemyData.roleVoAry.length;i++)
        {
            roleVo = enemyData.roleVoAry[i];
            enemy = new Enemy();
            enemy.initRole("res/outside/anim/hero/demon/Demon.sk",0.3,roleVo);
            this.enemyRoles.push(enemy);
        }
        

    }
    public playAni(aniID:number):void
    {
        this.heroRoles.forEach(hero => {
            hero.play(aniID);
        });

        this.enemyRoles.forEach(enemy =>{
            enemy.play(aniID);
        });
    }
}