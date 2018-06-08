/*
* 角色基础Vo
*/
var BaseRoleVo = /** @class */ (function () {
    function BaseRoleVo(isEnemy) {
        /**是否死亡 */
        this.isDeath = true;
        this.isEnemy = isEnemy;
    }
    /**初始化阵型数据 */
    BaseRoleVo.prototype.initRowColPosPoint = function () {
        var px, py;
        var gridPointAry;
        if (this.isEnemy) {
            gridPointAry = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        else {
            gridPointAry = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX, this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y += GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
    };
    /**重置技能CD */
    BaseRoleVo.prototype.resetSkillCD = function () {
        this.skillVos.forEach(function (skillVo) {
            skillVo.calCD = skillVo.cd;
        });
    };
    /**cd计时跑起来 */
    BaseRoleVo.prototype.runCD = function () {
        this.skillVos.forEach(function (skillVo) {
            skillVo.runCD();
        });
    };
    /**得到可用技能 ，自动释放技能*/
    BaseRoleVo.prototype.getCanUserSkill = function () {
        var skillID = 0;
        this.skillVos.forEach(function (skillVo) {
            if (skillVo.isCanUse) {
                // console.log(this.name + "】使用了"+skillVo.name+"技能，伤害爆表"+skillVo.id);
                skillVo.isCanUse = false;
                skillID = Number(skillVo.id);
            }
        });
        return skillID;
    };
    return BaseRoleVo;
}());
//# sourceMappingURL=BaseRoleVo.js.map