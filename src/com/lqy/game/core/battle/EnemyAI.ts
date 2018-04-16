/*
* 怪物AI
*/
class EnemyAI{
    /**敌人 */
    public enemyRunCount:number = 0;
    constructor(){
        
    }

    /**生产敌人 */
    public produceEnemy():void
    {
        //怪物数据
        var enemyData:EnemyData = new EnemyData();
        enemyData.roleVoAry = [];
        var ids:Array<string> = ["20001","20000","20002","20003","20004"];
        var roleVo:RoleVo;
        for(var i = 0;i < ids.length;i++)
        {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if(roleVo)
            {
                if(i == 0) roleVo.lineupGrid = 1;
                else if(i == 1) roleVo.lineupGrid = 3;
                else if(i == 2) roleVo.lineupGrid = 4;
                else if(i == 3) roleVo.lineupGrid = 7;
                else if(i == 4) roleVo.lineupGrid = 9;
                roleVo.initRowColPosPoint();
                enemyData.roleVoAry.push(roleVo);
            }
        }
        enemyData.enemySum = enemyData.roleVoAry.length;
        GameDataManager.ins.enemyData = enemyData;
        //怪物显示对象
        var enemyRoles:Array<Enemy> = new Array();
        var enemy:Enemy;
        for(i = 0;i < enemyData.roleVoAry.length;i++)
        {
            roleVo = enemyData.roleVoAry[i];
            enemy = new Enemy();
            enemy.initRole(roleVo,1);
            enemyRoles.push(enemy);
        }
        RoleManager.ins.enemyRoles = enemyRoles;
    }
    /**跑到阵上 */
    public runToLineup():void
    {
        RoleManager.ins.enemyRun();
    }
}