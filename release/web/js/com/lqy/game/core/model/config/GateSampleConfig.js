/*
* 关卡地图配置表
*/
var GateSampleConfig = /** @class */ (function () {
    function GateSampleConfig() {
        /**关卡随机配置 */
        this.hangUpMasters = "Master_10001,600;Master_10033,900;Master_10041,900;Master_10049,400;Master_10057,900;Master_10065,1000;Master_10073,1100";
        this.masterCount = 3;
    }
    /**得到挂机地图随机怪物权重 */
    GateSampleConfig.prototype.getHangUpMastersAry = function () {
        return this.hangUpMasters.split(";");
    };
    /**随机怪物key */
    GateSampleConfig.prototype.getRandowHandUpMasters = function (masterCount) {
        var tempAry = this.getHangUpMastersAry();
        var masterKeys = [];
        var percents = [];
        for (var i = 0; i < tempAry.length; i++) {
            var ary = tempAry[i].split(",");
            masterKeys[i] = ary[0];
            percents[i] = Number(ary[1]);
        }
        var sumCount = masterCount === undefined ? this.masterCount : masterCount;
        var randomMasterKeys = [];
        for (var count = 0; count < sumCount; count++) {
            var len = percents.length;
            var sum = 0;
            percents.forEach(function (percent) {
                sum += percent;
            });
            var n = Math.random() * sum;
            var m = 0;
            var randomKey;
            for (i = 0; i < percents.length; i++) {
                if (m <= n && n < m + percents[i]) {
                    randomKey = masterKeys[i];
                    randomMasterKeys.push(randomKey);
                    masterKeys.splice(i, 1);
                    percents.splice(i, 1);
                    break;
                }
                m += percents[i];
            }
        }
        // console.log("......"+ randomMasterKeys);
        return randomMasterKeys;
    };
    /**得到奖励 */
    GateSampleConfig.prototype.getRandowRewards = function () {
        var tempAry = this.randomRewards.split(";");
        var masterKeys = [];
        var percents = [];
        var numAry = [];
        for (var i = 0; i < tempAry.length; i++) {
            var ary = tempAry[i].split(",");
            masterKeys[i] = ary[0];
            if (ary.length == 4) {
                percents[i] = Number(ary[3]);
                numAry[i] = Number(ary[2]);
            }
            else {
                percents[i] = Number(ary[2]);
                numAry[i] = Number(ary[1]);
            }
        }
        var rewardCount = Math.ceil(Math.random() * 4);
        var randomMasterKeys = [];
        for (var count = 0; count < rewardCount; count++) {
            var len = percents.length;
            var sum = 0;
            percents.forEach(function (percent) {
                sum += percent;
            });
            var n = Math.random() * sum;
            var m = 0;
            var randomKey;
            var num;
            for (i = 0; i < percents.length; i++) {
                if (m <= n && n < m + percents[i]) {
                    randomKey = masterKeys[i];
                    num = Math.ceil(numAry[i] * Math.random());
                    randomMasterKeys.push([randomKey, num]);
                    masterKeys.splice(i, 1);
                    percents.splice(i, 1);
                    break;
                }
                m += percents[i];
            }
        }
        // console.log("......"+ randomMasterKeys);
        return randomMasterKeys;
    };
    return GateSampleConfig;
}());
//# sourceMappingURL=GateSampleConfig.js.map