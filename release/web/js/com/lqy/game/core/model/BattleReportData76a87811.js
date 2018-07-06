/*
* name;
*/
var BattleReportData = /** @class */ (function () {
    function BattleReportData() {
        this.reportVos = [];
    }
    Object.defineProperty(BattleReportData, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new BattleReportData();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**添加战报数据 */
    BattleReportData.prototype.addBattleReportVo = function (type, atkName, defName, hurt, rewardDatas) {
        if (this.reportVos.length > BattleReportData.REPORT_SUM_LIMIT) {
            this.reportVos.shift();
        }
        var vo = new BattleReportVo();
        vo.type = type;
        if (type == BattleReportDataType.HURT) {
            vo.atkName = atkName;
            vo.defName = defName;
            vo.hurt = hurt;
        }
        else if (type == BattleReportDataType.BATTLE_DIE) {
            vo.atkName = atkName;
            vo.defName = defName;
            vo.hurt = hurt;
        }
        else if (type == BattleReportDataType.REWARD) {
            // vo.rewardName = rewardName;
            // vo.rewardNum = rewardNum;
            vo.rewardDatas = rewardDatas;
        }
        EventManager.ins.dispatchEvent(EventManager.REPORT_DATA_UPDATE, vo);
    };
    BattleReportData.REPORT_SUM_LIMIT = 100;
    BattleReportData._ins = null;
    return BattleReportData;
}());
//# sourceMappingURL=BattleReportData.js.map