/*
* 怪物数据
*/
class EnemyData{
    /**现在用不到，不是固定阵型 */
    // public lineupId:string;
    /**测试数据 */
    // public roleVoAry:Array<RoleVo>;
    /**假打敌人数据 */
    public masterNPCVos:Array<MasterNPCVo>;
    /**真打敌人数据 */
    public masterVos:Array<MasterVo>;
    /**宠物数据 */
    public heroVoDic:Dictionary;
    /**敌人总数 */
    public enemySum:number = 0;
    constructor(){

    }
}