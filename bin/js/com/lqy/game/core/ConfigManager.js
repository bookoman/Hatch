/*
* 配置表管理器
*/
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        /*********测试配置数据 */
        this.roleConfigAry = [
            { "id": "10000", "name": "石头怪", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10006", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 10, "attFar": 1 },
            { "id": "10001", "name": "黄狼", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10001", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 3, "attFar": 0 },
            { "id": "10002", "name": "巨石人", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10002", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 6, "attFar": 0 },
            { "id": "10003", "name": "蓝狼", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10003", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 8, "attFar": 0 },
            { "id": "10004", "name": "骷髅头", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 3, "attFar": 1 },
            { "id": "10005", "name": "萌仙仙", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 10, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "20000", "name": "幽灵", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10005", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 3, "atts": 1, "attFar": 0 },
            { "id": "20001", "name": "鳄鱼龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10000", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 3, "atts": 6, "attFar": 0 },
            { "id": "20002", "name": "骨龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10002", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 4, "atts": 4, "attFar": 1 },
            { "id": "20003", "name": "骷髅射手", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10003", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 4, "atts": 5, "attFar": 1 },
            { "id": "20004", "name": "斧头怪", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "20005", "name": "迅猛龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 5, "atts": 10, "attFar": 0 }
        ];
        this.skillConfigAry = [
            { "id": "10000", "name": "蛇皮技能", "cd": 10, "attFar": 1 },
            { "id": "10001", "name": "湖怪", "cd": 8, "attFar": 0 },
            { "id": "10002", "name": "暴雨针", "cd": 12, "attFar": 1 },
            { "id": "10003", "name": "啸如虎", "cd": 10, "attFar": 0 },
            { "id": "10004", "name": "徐如林", "cd": 6, "attFar": 0 },
            { "id": "10005", "name": "破风", "cd": 16, "attFar": 0 },
            { "id": "10006", "name": "绿色", "cd": 2, "attFar": 0 }
        ];
        this.roleConfigDic = null;
        this.skillConfigDic = null;
        this.testSampleDic = null;
        this.roleConfigDic = new Dictionary();
        this.skillConfigDic = new Dictionary();
        this.parseSkillConfig();
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
            roleVo.skillVos = [];
            var skillAry = roleConfig.skillIDs == "" ? [] : roleConfig.skillIDs.split(",");
            skillAry.forEach(function (skillId) {
                roleVo.skillVos.push(_this.getSkillVoByID(skillId));
            });
            roleVo.scaleX = roleConfig.scaleX;
            roleVo.runWidth = roleConfig.runWidth;
            roleVo.runHeight = roleConfig.runHeight;
            var rectAry = roleConfig.attackRect.split(",");
            ax = rectAry[0];
            ay = rectAry[1];
            bx = rectAry[2];
            by = rectAry[3];
            roleVo.attackRange = new Rectangle(ax, ay, bx - ax, by - ay);
            roleVo.hp = roleConfig.hp;
            roleVo.dieAttTimes = roleConfig.dieAttTimes;
            roleVo.att = roleConfig.att;
            roleVo.atts = roleConfig.atts;
            roleVo.attFar = roleConfig.attFar;
            _this.roleConfigDic.set(roleVo.id, roleVo);
        });
    };
    /**
     *解析技能配置
     */
    ConfigManager.prototype.parseSkillConfig = function () {
        var _this = this;
        var skillVo;
        var skillConfig;
        this.skillConfigAry.forEach(function (skillConfig) {
            skillVo = new SkillVo();
            skillVo.id = skillConfig.id;
            skillVo.name = skillConfig.name;
            skillVo.cd = skillConfig.cd;
            _this.skillConfigDic.set(skillVo.id, skillVo);
        });
    };
    ConfigManager.prototype.parseTestSample = function () {
        if (this.testSampleDic == null) {
            this.testSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/TestSample.xml");
        this.xmlToObjcet(configStr, TestSample, "key", this.testSampleDic);
        Laya.loader.clearRes("res/config/TestSample.xml");
    };
    /**
     *得到角色配置
     * @param id
     */
    ConfigManager.prototype.getRoleVoByID = function (id) {
        return this.roleConfigDic.get(id);
    };
    ConfigManager.prototype.getSkillVoByID = function (id) {
        return this.skillConfigDic.get(id);
    };
    /**
     * xml转为对象
     * @param str
     * @param DineClass
     * @param keyPro
     * @param dic
     */
    ConfigManager.prototype.xmlToObjcet = function (str, DineClass, keyPro, dic) {
        var content = str.split("<?xml version='1.0' encoding='utf-8'?>")[1];
        var datas = content.split("\r\n");
        var element;
        var tempAry;
        var value;
        var objs = [];
        var obj;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].indexOf("<element") != -1) {
                element = datas[i];
                tempAry = element.split(" ");
                obj = new DineClass();
                for (var j = 0; j < tempAry.length; j++) {
                    value = tempAry[j];
                    if (value.indexOf("<element") == -1 && value.indexOf("=") == -1 && value.indexOf("/>") == -1) {
                        j = j + 2;
                        obj[value] = tempAry[j].split("\"")[1];
                    }
                }
                // console.log(obj);
                dic.set(obj[keyPro], obj);
            }
        }
    };
    ConfigManager._ins = null;
    return ConfigManager;
}());
//# sourceMappingURL=ConfigManager.js.map