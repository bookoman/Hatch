/*
* 角色Vo [10000,20000)英雄，[20000,30000)怪物
*/
class RoleVo{
    /**配置属性 */
    public id:string;
    public name:string;
    public runWidth:number;
    public runHeight:number;
    public skillVos:Array<SkillVo>;
    /**攻击范围，矩形范围根据四个定点来确定玩家附近范围 */
    public attackRange:Rectangle;

    public hp:number;
    public att:number;
    public atts:number;
    /**1 远攻，0 近攻 */
    public attFar:number;

    public scaleX:number;
    
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
    /**是否死亡 */
    public isDeath:boolean = true;
    public isAtted:boolean;
    /**玩家可以攻击的敌人 */
    public attEnemyVos:Array<RoleVo>;
    /**技能攻击多个敌人 */
    public skillAttEnemyVos:Array<RoleVo>;
    

    constructor(){
        
    }
    /**初始化阵型数据 */
    public initRowColPosPoint():void
    {
        this.isEnemy = Number(this.id) >= 20000;
        var px,py;
        if(this.isEnemy)
        {
            this.gridX = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid)[0];
            this.gridY = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid)[1];
        }
        else
        {
            this.gridX = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid)[0];
            this.gridY = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid)[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX,this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y +=  GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
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
        this.skillVos.forEach(skillVo => {
            if(skillVo.isCanUse)
            {
                // console.log(this.name + "】使用了"+skillVo.name+"技能，伤害爆表"+skillVo.id);
                skillVo.isCanUse = false;
                skillID =  Number(skillVo.id);
            }
        });
        return skillID;
    }   
}