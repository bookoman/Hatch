/*
* 角色Vo [10000,20000)英雄，[20000,30000)怪物
*/
var RoleVo = /** @class */ (function () {
    function RoleVo() {
    }
    /**初始化阵型数据 */
    RoleVo.prototype.initRowColPosPoint = function () {
        this.isEnemy = Number(this.id) >= 20000;
        var px, py;
        if (this.isEnemy) {
            this.gridX = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid)[0];
            this.gridY = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid)[1];
        }
        else {
            this.gridX = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid)[0];
            this.gridY = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid)[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX, this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y += GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
    };
    return RoleVo;
}());
//# sourceMappingURL=RoleVo.js.map