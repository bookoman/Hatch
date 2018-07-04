/*
* 战斗数据管理
*/
var BattleReportVo = /** @class */ (function () {
    function BattleReportVo() {
    }
    /**
     * 战报字符串
     */
    BattleReportVo.prototype.getReportDataHtml = function () {
        var html = "";
        switch (this.type) {
            case BattleReportDataType.HURT:
                html = "<span style='fontSize:24;color:#009900'>[" + this.atkName + "]</span>"
                    + "<span style='fontSize:24;color:#000000'> 攻击 </span>"
                    + "<span style='fontSize:24;color:#009900'>[" + this.defName + "]</span>"
                    + "<span style='fontSize:24;color:#000000'> 造成了 </span>"
                    + "<span style='fontSize:24;color:#ff0000'>" + this.hurt + "</span>"
                    + "<span style='fontSize:24;color:#000000'> 点伤害 </span>";
                return html;
            case BattleReportDataType.BATTLE_DIE:
                html = "<span style='fontSize:24;color:#009900'>[" + this.atkName + "]</span>"
                    + "<span style='fontSize:24;color:#000000'> 最后一击打出 </span>"
                    + "<span style='fontSize:24;color:#ff0000'>" + this.hurt + "</span>"
                    + "<span style='fontSize:24;color:#000000'> 点伤害，成功击杀了</span>"
                    + "<span style='fontSize:24;color:#009900'>[" + this.defName + "]</span>";
                return html;
            case BattleReportDataType.REWARD:
                html = "<span style='fontSize:24;color:#000000'> 战斗结束，获得奖励 </span>";
                var itemKey;
                var itemNum;
                var ind = Math.ceil(Math.random() * GameConfig.QUALITY_COLORS.length) - 1;
                ind = 2;
                var qualityColor = GameConfig.QUALITY_COLORS[ind];
                for (var i = 0; i < this.rewardDatas.length; i++) {
                    itemKey = this.rewardDatas[i][0];
                    itemNum = Number(this.rewardDatas[i][1]);
                    var itemConfig = ConfigManager.ins.getItemSampleConfig(itemKey);
                    if (!itemConfig)
                        continue;
                    html += "<span style='fontSize:24;color:" + qualityColor + "'>[" + itemConfig.itemName + "]</span>" + "<span style='fontSize:24;color:#ff0000'>X" + itemNum;
                    if (i < this.rewardDatas.length - 1)
                        html += ";</span>";
                    else
                        html += "</span>";
                }
                return html;
        }
        return html;
    };
    return BattleReportVo;
}());
//# sourceMappingURL=BattleReportVo.js.map