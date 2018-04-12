/*
* 角色Vo [10000,20000)英雄，[20000,30000)怪物
*/
class RoleVo{
    /**配置属性 */
    public id:string;
    public name:string;
    public skillId:number;
    public runWidth:number;
    public runHeight:number;
    /**攻击范围，矩形范围根据四个定点来确定玩家附近范围 */
    public attackRange:Rectangle;

    public hp:number;
    public att:number;
    
    /**计算属性 */
    /**阵型格子 */
    public lineupGrid:number;
    public lineupRow:number;
    public lineupCol:number;
    /**角色坐标，现实对象底下中心点 */
    public posPoint:Point;

    public isEnemy:boolean;
    constructor(){
        
    }
    /**初始化阵型数据 */
    public initRowColPosPoint():void
    {
        this.isEnemy = Number(this.id) >= 20000;

        this.lineupRow = Math.ceil(this.lineupGrid / GameConfig.LINEUP_ROWGRID_NUM);
        this.lineupCol = this.lineupGrid % GameConfig.LINEUP_COLGRID_NUM;
        if(this.lineupCol == 0)
        {
            this.lineupCol = GameConfig.LINEUP_ROWGRID_NUM;
        }
        var px,py;
        if(this.isEnemy)
        {
            px = GameConfig.ENEMY_POINT.x + (this.lineupCol - 1) * GameConfig.LINEUP_GRID_WIDTH;
            py = GameConfig.ENEMY_POINT.y + (this.lineupRow - 1) * GameConfig.LINEUP_GRID_HEIGHT;
        }
        else
        {
            px = GameConfig.HERO_POINT.x + (this.lineupCol - 1) * GameConfig.LINEUP_GRID_WIDTH;
            py = GameConfig.HERO_POINT.y + (this.lineupRow - 1) * GameConfig.LINEUP_GRID_HEIGHT;
            // var point:Point = MapManager.ins.squintAngleGrid.gridToViewPoint(this.lineupCol,this.lineupRow);
            // px = point.x;
            // py = point.y;
        }
        // console.log(this.id,this.lineupRow,this.lineupCol,px,py);
        this.posPoint = new Point(px,py);
    }
}