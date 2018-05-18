/*
*阵容管理器
*/
var LineupManager = /** @class */ (function () {
    function LineupManager() {
        this.lineupConfig = {
            "1": "0,1,0_1,1,1_0,1,0",
            "2": "1,0,1_1,0,0_1,0,1",
            "3": "1,0,1_0,0,1_1,0,1"
        };
    }
    Object.defineProperty(LineupManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new LineupManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 根据配置表得到整容二维数组
     * @param id
     */
    LineupManager.prototype.getCofingByID = function (id) {
        var config = this.lineupConfig[id];
        var lineupPosVoAry = [];
        var rowAry = config.split("_");
        var colAry;
        var lineupPosVo;
        for (var i = 0; i < rowAry.length; i++) {
            colAry = rowAry[i].split(",");
            for (var j = 0; j < colAry.length; j++) {
                if (colAry[j] == "0") {
                    continue;
                }
                lineupPosVo = new LineupPosVo();
                lineupPosVo.row = i + 1;
                lineupPosVo.col = j + 1;
                lineupPosVo.mark = Number(colAry[j]);
                lineupPosVoAry.push(lineupPosVo);
            }
        }
        return lineupPosVoAry;
    };
    LineupManager._ins = null;
    return LineupManager;
}());
//# sourceMappingURL=LineupManager.js.map