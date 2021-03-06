/*
* 配置表管理器
*/
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        //测试数据
        // this.roleConfigDic = new Dictionary();
        // this.skillConfigDic = new Dictionary();
        /*********测试配置数据 */
        this.roleConfigAry = [
            { "id": "10000", modelId: "role10000", name: "石头怪", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10006", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 10, "attFar": 1 },
            { "id": "10001", modelId: "role10001", "name": "黄狼", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10001", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 3, "attFar": 0 },
            { "id": "10002", modelId: "role10002", "name": "巨石人", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10002", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 6, "attFar": 0 },
            { "id": "10003", modelId: "role10003", "name": "蓝狼", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10003", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 8, "attFar": 0 },
            { "id": "10004", modelId: "role10004", "name": "骷髅头", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 40, "dieAttTimes": 10, "att": 10, "atts": 3, "attFar": 1 },
            { "id": "10005", modelId: "role10005", "name": "萌仙仙", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 10, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "10006", modelId: "baolong001", "name": "暴龙", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 10, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "10007", modelId: "leilong001", "name": "雷龙", "scaleX": -1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 10, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "20000", modelId: "role20000", "name": "幽灵", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10005", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 3, "atts": 1, "attFar": 0 },
            { "id": "20001", modelId: "role20001", "name": "鳄鱼龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10000", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 3, "atts": 6, "attFar": 0 },
            { "id": "20002", modelId: "role20002", "name": "骨龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10002", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 4, "atts": 4, "attFar": 1 },
            { "id": "20003", modelId: "role20003", "name": "骷髅射手", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10003", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 4, "atts": 5, "attFar": 1 },
            { "id": "20004", modelId: "role20004", "name": "斧头怪", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 5, "atts": 10, "attFar": 0 },
            { "id": "20005", modelId: "xunmenglong001", "name": "迅猛龙", "scaleX": 1, "runWidth": 60, "runHeight": 100, "skillIDs": "10004", "attackRect": "0,50,50,0", "hp": 30, "dieAttTimes": 3, "att": 5, "atts": 10, "attFar": 0 }
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
        /**宠物所有品质名字数组 */
        this.heroQulityNames = ["D", "C", "B", "A", "S", "SS", "SSS", "EX"];
        /**宠物品质配置 */
        this.qualitySampleVoDic = null;
        /**宠物经验配制表 */
        this.heroLevelSampleDic = null;
        /**宠物配制表 */
        this.heroSampleDic = null;
        /**宠物物种配制表 */
        this.heroTypeSampleDic = null;
        /**宠物品质评分配制表 */
        this.qualityScoreSampleDic = null;
        /**地图配置 */
        this.gateMapSampleDic = null;
        /**关卡配置 */
        this.gateSampleDic = null;
        /**英雄技能配置 */
        this.heroSkillSampleDic = null;
        /**怪物配置 */
        this.masterHeroSampleDic = null;
        /**道具 */
        this.itemSampleDic = null;
        // this.parseSkillConfig();
        // this.parseRoleConfig();
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
    // public parseRoleConfig():void
    // {
    //     var rectAry:Array<number>;
    //     var roleVo:RoleVo;
    //     var ax:number,ay:number,bx:number,by:number;
    //     this.roleConfigAry.forEach(roleConfig => {
    //         roleVo = new RoleVo();
    //         roleVo.id = roleConfig.id;
    //         roleVo.modelId = roleConfig.modelId;
    //         roleVo.name = roleConfig.name;
    //         roleVo.skillVos = [];
    //         var skillAry:Array<string> = roleConfig.skillIDs == "" ? [] : roleConfig.skillIDs.split(",");
    //         skillAry.forEach(skillId =>{
    //             roleVo.skillVos.push(this.getSkillVoByID(skillId));
    //         });
    //         roleVo.scaleX = roleConfig.scaleX;
    //         roleVo.runWidth = roleConfig.runWidth;
    //         roleVo.runHeight = roleConfig.runHeight; 
    //         var rectAry = roleConfig.attackRect.split(",");
    //         ax = rectAry[0];
    //         ay = rectAry[1];
    //         bx = rectAry[2];
    //         by = rectAry[3];
    //         roleVo.attackRange = new Rectangle(ax,ay,bx-ax,by-ay);
    //         roleVo.hp = roleConfig.hp;
    //         roleVo.dieAttTimes = roleConfig.dieAttTimes;
    //         roleVo.att = roleConfig.att;
    //         roleVo.atts = roleConfig.atts;
    //         roleVo.attFar = roleConfig.attFar;
    //         this.roleConfigDic.set(roleVo.id,roleVo);
    //     });
    // }
    /**
     *解析技能配置
     */
    // public parseSkillConfig():void
    // {
    //     var skillVo:SkillVo;
    //     var skillConfig:Object;
    //     this.skillConfigAry.forEach(skillConfig => {
    //         skillVo = new SkillVo();
    //         skillVo.key = skillConfig.id;
    //         skillVo.name = skillConfig.name;
    //         skillVo.cd = skillConfig.cd;
    //         this.skillConfigDic.set(skillVo.key,skillVo);
    //     });
    // }
    /**解析预加载配置表 */
    ConfigManager.prototype.parsePreLoadConfigs = function () {
        this.parseQualitySample();
        this.parseQualityScoreSample();
        this.parseHeroSample();
        this.parseHeroLevelSample();
        this.parseHeroTypeSample();
        this.parseGateMapSample();
        this.parseGateSample();
        this.parseHeroSkillSample();
        this.parseMasterHeroSample();
        this.parseItemSampleDic();
    };
    /**宠物品质 */
    ConfigManager.prototype.parseQualitySample = function () {
        if (this.qualitySampleVoDic == null) {
            this.qualitySampleVoDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/QualitySample.xml");
        this.xmlToObjcet(configStr, QualitySampleConfig, "key", this.qualitySampleVoDic);
        Laya.loader.clearRes("res/config/QualitySample.xml");
    };
    /**宠物等级 */
    ConfigManager.prototype.parseHeroLevelSample = function () {
        if (this.heroLevelSampleDic == null) {
            this.heroLevelSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroLevelSample.xml");
        this.xmlToObjcet(configStr, HeroLevelSampleConfig, "key", this.heroLevelSampleDic);
        Laya.loader.clearRes("res/config/HeroLevelSample.xml");
    };
    /**宠物配置 */
    ConfigManager.prototype.parseHeroSample = function () {
        if (this.heroSampleDic == null) {
            this.heroSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroSample.xml");
        this.xmlToObjcet(configStr, HeroSampleConfig, "key", this.heroSampleDic);
        Laya.loader.clearRes("res/config/HeroSample.xml");
    };
    /**宠物品质 */
    ConfigManager.prototype.parseHeroTypeSample = function () {
        if (this.heroTypeSampleDic == null) {
            this.heroTypeSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroTypeSample.xml");
        this.xmlToObjcet(configStr, HeroTypeSampleConfig, "key", this.heroTypeSampleDic);
        Laya.loader.clearRes("res/config/HeroTypeSample.xml");
    };
    /**宠物品质 */
    ConfigManager.prototype.parseQualityScoreSample = function () {
        if (this.qualityScoreSampleDic == null) {
            this.qualityScoreSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/QualityScoreSample.xml");
        this.xmlToObjcet(configStr, QualityScoreSampleConfig, "key", this.qualityScoreSampleDic);
        Laya.loader.clearRes("res/config/QualityScoreSample.xml");
    };
    /**地图配置 */
    ConfigManager.prototype.parseGateMapSample = function () {
        if (this.gateMapSampleDic == null) {
            this.gateMapSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/GateMapSample.xml");
        this.xmlToObjcet(configStr, GateMapSampleConfig, "key", this.gateMapSampleDic);
        this.gateMapSampleDic.keys.forEach(function (key) {
            GameConfig.GATE_MAP_KEYS.push(key);
        });
        Laya.loader.clearRes("res/config/GateMapSample.xml");
    };
    /**关卡配置 */
    ConfigManager.prototype.parseGateSample = function () {
        if (this.gateSampleDic == null) {
            this.gateSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/GateSample.xml");
        this.xmlToObjcet(configStr, GateSampleConfig, "key", this.gateSampleDic);
        Laya.loader.clearRes("res/config/GateSample.xml");
    };
    /**宠物技能 */
    ConfigManager.prototype.parseHeroSkillSample = function () {
        if (this.heroSkillSampleDic == null) {
            this.heroSkillSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroSkillSample.xml");
        this.xmlToObjcet(configStr, HeroSkillSampleConfig, "key", this.heroSkillSampleDic);
        Laya.loader.clearRes("res/config/HeroSkillSample.xml");
    };
    /**怪物配置 */
    ConfigManager.prototype.parseMasterHeroSample = function () {
        if (this.masterHeroSampleDic == null) {
            this.masterHeroSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/MasterHeroSample.xml");
        this.xmlToObjcet(configStr, MasterHeroSampleConfig, "key", this.masterHeroSampleDic);
        Laya.loader.clearRes("res/config/MasterHeroSample.xml");
    };
    /**道具配置 */
    ConfigManager.prototype.parseItemSampleDic = function () {
        if (this.itemSampleDic == null) {
            this.itemSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/ItemSample.xml");
        this.xmlToObjcet(configStr, ItemSampleConfig, "key", this.itemSampleDic);
        Laya.loader.clearRes("res/config/ItemSample.xml");
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
    /**得到对应地图块所有关卡 */
    ConfigManager.prototype.getGateConfigsByMapKey = function (mapKey) {
        var ary = [];
        var config;
        for (var i = 0; i < this.gateSampleDic.values.length; i++) {
            config = this.gateSampleDic.values[i];
            if (mapKey == config.mapId) {
                ary.push(config);
            }
        }
        return ary;
    };
    //*********************************************新配置取得 */
    /**根据key得到品质配置 */
    ConfigManager.prototype.getQualitySampleConfig = function (key) {
        return this.qualitySampleVoDic.get(key);
    };
    /**根据qulityKey得到品质索引 */
    ConfigManager.prototype.getHeroQualityInd = function (key) {
        var qualitySampleConfig = this.qualitySampleVoDic.get(key);
        for (var i = 0; i < this.heroQulityNames.length; i++) {
            if (qualitySampleConfig.qsName == this.heroQulityNames[i]) {
                return i;
            }
        }
        return 0;
    };
    /**根据key得到英雄等级配置 */
    ConfigManager.prototype.getHeroLevelSampleConfig = function (key) {
        return this.heroLevelSampleDic.get(key);
    };
    /**根据key得到地图配置 */
    ConfigManager.prototype.getMapSampleConfig = function (key) {
        return this.gateMapSampleDic.get(key);
    };
    /**根据key得到刮卡配置 */
    ConfigManager.prototype.getGateSampleConfig = function (key) {
        return this.gateSampleDic.get(key);
    };
    /**根据key得到宠物配置 */
    ConfigManager.prototype.getHeroSampleConfig = function (key) {
        return this.heroSampleDic.get(key);
    };
    /**根据key得到宠物技能配置*/
    ConfigManager.prototype.getHeroSkillSampleConfig = function (key) {
        return this.heroSkillSampleDic.get(key);
    };
    /**根据key得到宠物类型配置 */
    ConfigManager.prototype.getHeroTypeSampleConfig = function (key) {
        return this.heroTypeSampleDic.get(key);
    };
    /**根据key得到怪物配置 */
    ConfigManager.prototype.getMasterHeroSampleConfig = function (key) {
        return this.masterHeroSampleDic.get(key);
    };
    /**根据key得到物品配置 */
    ConfigManager.prototype.getItemSampleConfig = function (key) {
        return this.itemSampleDic.get(key);
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
        var datas = content.split("\r");
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
                    if (value.indexOf("<element") == -1 && value.indexOf("/>") == -1) {
                        var keyValueAry = value.split("=");
                        if (isNaN(Number(keyValueAry[1]))) {
                            obj[keyValueAry[0]] = keyValueAry[1].split("\'")[1];
                        }
                        else {
                            obj[keyValueAry[0]] = Number(keyValueAry[1]);
                        }
                        // console.log(value,"=",obj[value]);
                    }
                }
                dic.set(obj[keyPro], obj);
                // console.log(obj.modelId,obj.key,obj.name);
            }
        }
    };
    ConfigManager.prototype.xmlToObjcet2 = function (xml, DineClass, keyPro, dic) {
        var node;
        for (var j = 0; j < xml.all.length; j++) {
            node = xml.all[j];
            if (node.nodeName == "element") {
                var nameNodeMap = node.attributes;
                var attr;
                var obj = new DineClass();
                for (var i = 0; i < nameNodeMap.length; i++) {
                    attr = nameNodeMap[i];
                    if (isNaN(Number(attr.nodeValue))) {
                        obj[attr.nodeName] = attr.nodeValue;
                    }
                    else {
                        obj[attr.nodeName] = Number(attr.nodeValue);
                    }
                }
                dic.set(obj[keyPro], obj);
            }
        }
    };
    /**
     * xml转为对象
     * @param str
     * @param DineClass
     * @param keyPro
     * @param dic
     */
    ConfigManager.prototype.xmlToObjcet1 = function (str, DineClass, keyPro, dic) {
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
                        var attrValue = tempAry[j].split("\"")[1];
                        if (!attrValue)
                            attrValue = tempAry[j];
                        obj[value] = attrValue;
                        // console.log(value,"=",obj[value]);
                    }
                }
                dic.set(obj[keyPro], obj);
                // console.log(obj.modelId,obj.key,obj.name);
            }
        }
    };
    ConfigManager._ins = null;
    return ConfigManager;
}());
//# sourceMappingURL=ConfigManager.js.map