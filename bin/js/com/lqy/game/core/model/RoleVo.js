/*
* 角色Vo [10000,20000)英雄，[20000,30000)怪物
*/
var RoleVo = /** @class */ (function () {
    function RoleVo() {
    }
    /**初始化阵型数据 */
    RoleVo.prototype.initRowColPosPoint = function () {
        this.isEnemy = Number(this.id) >= 20000;
        this.lineupRow = Math.ceil(this.lineupGrid / GameConfig.LINEUP_ROWGRID_NUM);
        this.lineupCol = this.lineupGrid % GameConfig.LINEUP_COLGRID_NUM;
        if (this.lineupCol == 0) {
            this.lineupCol = GameConfig.LINEUP_ROWGRID_NUM;
        }
        var px, py;
        if (this.isEnemy) {
            px = GameConfig.ENEMY_POINT.x + (this.lineupCol - 1) * GameConfig.LINEUP_GRID_WIDTH;
            py = GameConfig.ENEMY_POINT.y + (this.lineupRow - 1) * GameConfig.LINEUP_GRID_HEIGHT;
        }
        else {
            px = GameConfig.HERO_POINT.x + (this.lineupCol - 1) * GameConfig.LINEUP_GRID_WIDTH;
            py = GameConfig.HERO_POINT.y + (this.lineupRow - 1) * GameConfig.LINEUP_GRID_HEIGHT;
        }
        // console.log(this.id,this.lineupRow,this.lineupCol,px,py);
        this.posPoint = new Point(px, py);
    };
    return RoleVo;
}());
//# sourceMappingURL=RoleVo.js.map