/*
* 角色基础Vo
*/
class BaseRoleVo{
    /**角色id */
    public roleId:string;
    /**缩放比例 */
    public scale:number;
    /**配置表key */
    public key:string;
    /**模型资源id */
    public modelId:string;
    /**名字 */
    public name:string;
    /**攻击死亡次数 */
    public dieAttTimes:number;
    /**攻击 */
    public atk:number;
    /**攻击速度 */
    public atkSpeed:number;
    
    public skillVos:Array<SkillVo>;

    public attFar:number = 0;

    public hp:number = 0;
    
    /**计算属性 */
    /**阵型格子 */
    public lineupGrid:number;
    public gridX:number;
    public gridY:number;
    /**角色坐标，现实对象底下中心点 */
    public posPoint:Point;
    /**是否是敌人 */
    public isEnemy:boolean;

    
    //战斗数据
    
    public battleHP:number;
    public battleDieAttTimes;
    /**是否死亡 */
    public isDeath:boolean = true;
    public isAtted:boolean;
    /**玩家可以攻击的敌人 */
    public attEnemyVos:Array<BaseRoleVo>;
    /**技能攻击多个敌人 */
    public skillAttEnemyVos:Array<BaseRoleVo>;
    constructor(isEnemy:boolean){
        this.isEnemy = isEnemy;
    }
   
    public initBaseData():void
    {

    }

    /**初始化阵型数据 */
    public initRowColPosPoint():void
    {
        var px,py;
        var gridPointAry;
        if(this.isEnemy)
        {
            gridPointAry = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        else
        {
            gridPointAry = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX,this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y += GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
    }
    /**重置技能CD */
    public resetSkillCD():void
    {
        this.skillVos.forEach(skillVo => {
            skillVo.calCD = skillVo.cd;
        });
    }
    /**cd计时跑起来 */
    public runCD():void
    {
        this.skillVos.forEach(skillVo => {
            skillVo.runCD();
        });
    }
    /**得到可用技能 ，自动释放技能*/
    public getCanUserSkill():number
    {   
        var skillID:number = 0;
        // this.skillVos.forEach(skillVo => {
        //     if(skillVo.isCanUse)
        //     {
        //         // console.log(this.name + "】使用了"+skillVo.name+"技能，伤害爆表"+skillVo.id);
        //         skillVo.isCanUse = false;
        //         skillID =  Number(skillVo.id);
        //     }
        // });
        return skillID;
    }   
}