/*
* 配置表管理器
*/
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        /*********测试配置数据 */
        this.roleConfigAry = [
            { "id": "10000", "name": "高达1", "skillID": "1", "attackRect": "0,50,50,0", "hp": 100, "att": 5 },
            { "id": "10001", "name": "高达2", "skillID": "1", "attackRect": "0,50,50,0", "hp": 100, "att": 5 },
            { "id": "10002", "name": "高达3", "skillID": "1", "attackRect": "0,50,50,0", "hp": 100, "att": 5 },
            { "id": "10003", "name": "高达4", "skillID": "1", "attackRect": "0,50,50,0", "hp": 100, "att": 5 },
            { "id": "10004", "name": "高达5", "skillID": "1", "attackRect": "0,50,50,0", "hp": 100, "att": 5 },
            { "id": "20000", "name": "火焰兽1", "skillID": "1", "attackRect": "0,50,50,0", "hp": 50, "att": 3 },
            { "id": "20001", "name": "火焰兽2", "skillID": "1", "attackRect": "0,50,50,0", "hp": 50, "att": 3 },
            { "id": "20002", "name": "火焰兽3", "skillID": "1", "attackRect": "0,50,50,0", "hp": 50, "att": 4 },
            { "id": "20003", "name": "火焰兽4", "skillID": "1", "attackRect": "0,50,50,0", "hp": 80, "att": 4 },
            { "id": "20004", "name": "火焰兽5", "skillID": "1", "attackRect": "0,50,50,0", "hp": 60, "att": 5 }
        ];
        this.roleConfigDic = null;
        this.languageMap = {};
        this.roleConfigDic = new Dictionary();
        this.parseRoleConfig();
    }
    Object.defineProperty(ConfigManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new ConfigManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 解析角色配资
     */
    ConfigManager.prototype.parseRoleConfig = function () {
        var _this = this;
        var rectAry;
        var roleVo;
        var ax, ay, bx, by;
        this.roleConfigAry.forEach(function (roleConfig) {
            roleVo = new RoleVo();
            roleVo.id = roleConfig.id;
            roleVo.name = roleConfig.name;
            roleVo.skillId = roleConfig.skillID;
            var rectAry = roleConfig.attackRect.split(",");
            ax = rectAry[0];
            ay = rectAry[1];
            bx = rectAry[2];
            by = rectAry[3];
            roleVo.attackRange = new Rectangle(ax, ay, bx - ax, by - ay);
            roleVo.hp = roleConfig.hp;
            roleVo.att = roleConfig.att;
            _this.roleConfigDic.set(roleVo.id, roleVo);
        });
    };
    ConfigManager.prototype.getRoleVoByID = function (id) {
        return this.roleConfigDic.get(id);
    };
    ConfigManager._ins = null;
    return ConfigManager;
}());
//# sourceMappingURL=ConfigManager.js.map