/*
* 玩家数据
*/
var PlayerData = /** @class */ (function () {
    function PlayerData() {
        /**英雄总数 */
        this.heroSum = 0;
    }
    /**添加上阵宠物 */
    PlayerData.prototype.addUpHeroVo = function (heroId, lineId) {
        if (!this.upHeroVos) {
            this.upHeroVos = [];
        }
        var heroVo = GameDataManager.ins.getHeroVoByHeroId(heroId);
        heroVo.lineupGrid = lineId;
        var ind = this.upHeroVos.indexOf(heroVo);
        if (ind > -1) {
            this.upHeroVos[ind] = heroVo;
        }
        else {
            this.upHeroVos.push(heroVo);
        }
    };
    /**删除上阵宠物 */
    PlayerData.prototype.removeUpHeroVo = function (heroId) {
        if (!this.upHeroVos) {
            return;
        }
        for (var i = 0; i < this.upHeroVos.length; i++) {
            if (this.upHeroVos[i].heroId == heroId) {
                this.upHeroVos[i].lineupGrid = null;
                this.upHeroVos.splice(i, 1);
                break;
            }
        }
    };
    return PlayerData;
}());
//# sourceMappingURL=PlayerData.js.map