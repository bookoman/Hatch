/*
* 战斗引擎
* 一，阵型，站定九宫格，分三排、三列，每排3个位置，格子定位坐标
* 二，寻找攻击对象，普攻攻击同一排最前一个敌人，技能可以攻击后排或者一列一个或者多个敌人
* 三，发动攻击，近战攻击移到敌人身边攻击，远战攻击原地攻击
* 四，血量计算(测试) hp -= att
* 五，结束战斗，玩家胜利，玩家失败，清理战场，移除角色显示对象
*/
class BattleEngine{
    private timeCount:number;
    private battleTimeInterval:number;
    private HeroAI:HeroAI;
    private EnemyAI:EnemyAI;
    constructor(){
        
    }
    private static _ins:BattleEngine = null;
    public static get ins():BattleEngine
    {
        if(this._ins == null)
        {
            this._ins = new BattleEngine();
        }
        return this._ins;
    }

    public run():void
    {
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.HeroAI = new HeroAI();
        this.EnemyAI = new EnemyAI();
        Laya.timer.loop(1000,this,this.runUpdate);

        this.EnemyAI.produceEnemy();
        this.EnemyAI.runToLineup();
    }

    private runUpdate():void
    {
        this.timeCount++;
        if(this.timeCount >= this.battleTimeInterval)
        {
            //开始战斗
            
            
        }

    } 

    /**清除战斗 */
    private clearBattle():void
    {
        this.timeCount = 0;

    }


}