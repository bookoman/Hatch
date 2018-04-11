/*
* 较色管理器
*/
class RoleManager{
    private heroRoles:Array<BaseRole> = null;
    private monsterRoles:Array<Monster> = null;
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
        this.monsterRoles = new Array();
        var lineupVoAry:Array<LineupVo> = LineupManager.ins.getCofingByID("1");
        var hero:BaseRole;
        var lineupVo:LineupVo;
        for(var i = 0;i < lineupVoAry.length;i++)
        {
            lineupVo = lineupVoAry[i];
            hero = new Hero();
            hero.initRole("res/outside/anim/hero/swordsman/SwordsMan.sk",0.3,lineupVo);
            this.heroRoles.push(hero);
        }
        lineupVoAry = LineupManager.ins.getCofingByID("2");
        var monster:Monster;
        for(i = 0;i < lineupVoAry.length;i++)
        {
            lineupVo = lineupVoAry[i];
            monster = new Monster();
            monster.initRole("res/outside/anim/hero/demon/Demon.sk",0.3,lineupVo);
            this.monsterRoles.push(monster);
        }

    }
    public playAni(aniID:number):void
    {
        this.heroRoles.forEach(hero => {
            hero.play(aniID);
        });

        this.monsterRoles.forEach(monster =>{
            monster.play(aniID);
        });
    }
}