/*
* 角色Vo [10000,20000)英雄，[20000,30000)怪物
*/
var RoleVo = /** @class */ (function () {
    function RoleVo() {
        /**是否死亡 */
        this.isDeath = true;
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
    /**重置技能CD */
    RoleVo.prototype.resetSkillCD = function () {
        this.skillVos.forEach(function (skillVo) {
            skillVo.calCD = skillVo.cd;
        });
    };
    /**cd计时跑起来 */
    RoleVo.prototype.runCD = function () {
        this.skillVos.forEach(function (skillVo) {
            skillVo.runCD();
        });
    };
    /**得到可用技能 ，自动释放技能*/
    RoleVo.prototype.getCanUserSkill = function () {
        var _this = this;
        var skillID = 0;
        this.skillVos.forEach(function (skillVo) {
            if (skillVo.isCanUse) {
                console.log(_this.name + "】使用了" + skillVo.name + "技能，伤害爆表" + skillVo.id);
                skillVo.isCanUse = false;
                skillID = Number(skillVo.id);
            }
        });
        return skillID;
    };
    return RoleVo;
}());
//# sourceMappingURL=RoleVo.js.map