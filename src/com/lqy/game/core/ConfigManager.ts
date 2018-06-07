/*
* 配置表管理器
*/
class ConfigManager{
    /*********测试配置数据 */
    private roleConfigAry:Array<any> = [
        {"id":"10000",modelId:"role10000",name:"石头怪","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10006","attackRect":"0,50,50,0","hp":4000,"dieAttTimes":10,"att":10,"atts":10,"attFar":1},
        {"id":"10001",modelId:"role10001","name":"黄狼","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10001","attackRect":"0,50,50,0","hp":4000,"dieAttTimes":10,"att":10,"atts":3,"attFar":0},
        {"id":"10002",modelId:"role10002","name":"巨石人","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10002","attackRect":"0,50,50,0","hp":4000,"dieAttTimes":10,"att":10,"atts":6,"attFar":0},
        {"id":"10003",modelId:"role10003","name":"蓝狼","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10003","attackRect":"0,50,50,0","hp":4000,"dieAttTimes":10,"att":10,"atts":8,"attFar":0},
        {"id":"10004",modelId:"role10004","name":"骷髅头","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":4000,"dieAttTimes":10,"att":10,"atts":3,"attFar":1},
        {"id":"10005",modelId:"role10005","name":"萌仙仙","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":10,"att":5,"atts":10,"attFar":0},
        {"id":"10006",modelId:"baolong001","name":"暴龙","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":10,"att":5,"atts":10,"attFar":0},
        {"id":"10007",modelId:"leilong001","name":"雷龙","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":10,"att":5,"atts":10,"attFar":0},
        {"id":"20000",modelId:"role20000","name":"幽灵","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10005","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":3,"atts":1,"attFar":0},
        {"id":"20001",modelId:"role20001","name":"鳄鱼龙","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10000","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":3,"atts":6,"attFar":0},
        {"id":"20002",modelId:"role20002","name":"骨龙","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10002","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":4,"atts":4,"attFar":1},
        {"id":"20003",modelId:"role20003","name":"骷髅射手","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10003","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":4,"atts":5,"attFar":1},
        {"id":"20004",modelId:"role20004","name":"斧头怪","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":5,"atts":10,"attFar":0},
        {"id":"20005",modelId:"alien-pro","name":"迅猛龙","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":3000,"dieAttTimes":3,"att":5,"atts":10,"attFar":0}
    ];

    private skillConfigAry:Array<any> = [
        {"id":"10000","name":"蛇皮技能","cd":10,"attFar":1},
        {"id":"10001","name":"湖怪","cd":8,"attFar":0},
        {"id":"10002","name":"暴雨针","cd":12,"attFar":1},
        {"id":"10003","name":"啸如虎","cd":10,"attFar":0},
        {"id":"10004","name":"徐如林","cd":6,"attFar":0},
        {"id":"10005","name":"破风","cd":16,"attFar":0},
        {"id":"10006","name":"绿色","cd":2,"attFar":0}
    ];


    public roleConfigDic:Dictionary = null;

    public skillConfigDic:Dictionary = null;

    /**宠物品质配置 */
    public qualitySampleVoDic:Dictionary = null;
    /**宠物经验配制表 */
    public heroLevelSampleDic:Dictionary = null;
    /**宠物配制表 */
    public heroSampleDic:Dictionary = null;
    /**宠物物种配制表 */
    public heroTypeSampleDic:Dictionary = null;
    /**宠物品质评分配制表 */
    public qualityScoreSampleDic:Dictionary = null;
    /**地图配置 */
    public gateMapSampleDic:Dictionary = null;
    /**关卡配置 */
    public gateSampleDic:Dictionary = null;
    /**英雄技能配置 */
    public heroSkillSampleDic:Dictionary = null;

    private static _ins:ConfigManager = null;

    public static get ins():ConfigManager
    {
        if(this._ins == null)
        {
            this._ins = new ConfigManager();
        }
        return this._ins;
    }
    constructor(){
        //测试数据
        this.roleConfigDic = new Dictionary();
        this.skillConfigDic = new Dictionary();
        
        this.parseSkillConfig();
        this.parseRoleConfig();

    }
    /**
     * 解析角色配资
     */
    public parseRoleConfig():void
    {
        var rectAry:Array<number>;
        var roleVo:RoleVo;
        var ax:number,ay:number,bx:number,by:number;
        this.roleConfigAry.forEach(roleConfig => {
            roleVo = new RoleVo();
            roleVo.id = roleConfig.id;
            roleVo.modelId = roleConfig.modelId;
            roleVo.name = roleConfig.name;
            roleVo.skillVos = [];

            var skillAry:Array<string> = roleConfig.skillIDs == "" ? [] : roleConfig.skillIDs.split(",");
            skillAry.forEach(skillId =>{
                roleVo.skillVos.push(this.getSkillVoByID(skillId));
            });
            roleVo.scaleX = roleConfig.scaleX;
            roleVo.runWidth = roleConfig.runWidth;
            roleVo.runHeight = roleConfig.runHeight; 
            var rectAry = roleConfig.attackRect.split(",");
            ax = rectAry[0];
            ay = rectAry[1];
            bx = rectAry[2];
            by = rectAry[3];
            roleVo.attackRange = new Rectangle(ax,ay,bx-ax,by-ay);
            roleVo.hp = roleConfig.hp;
            roleVo.dieAttTimes = roleConfig.dieAttTimes;
            roleVo.att = roleConfig.att;
            roleVo.atts = roleConfig.atts;
            roleVo.attFar = roleConfig.attFar;
            this.roleConfigDic.set(roleVo.id,roleVo);
        });
    }
    /**
     *解析技能配置
     */
    public parseSkillConfig():void
    {
        var skillVo:SkillVo;
        var skillConfig:Object;
        this.skillConfigAry.forEach(skillConfig => {
            skillVo = new SkillVo();
            skillVo.id = skillConfig.id;
            skillVo.name = skillConfig.name;
            skillVo.cd = skillConfig.cd;
            this.skillConfigDic.set(skillVo.id,skillVo);
        });
        
    }
    /**解析预加载配置表 */
    public parsePreLoadConfigs():void
    {
        this.parseQualitySample();
        this.parseQualityScoreSample();
        this.parseHeroSample();
        this.parseHeroLevelSample();
        this.parseHeroTypeSample();
        this.parseGateMapSample();
        this.parseGateSample();
        this.parseHeroSkillSample();
    }
    
    /**宠物品质 */
    public parseQualitySample():void
    {
        if(this.qualitySampleVoDic == null)
        {
            this.qualitySampleVoDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/QualitySample.xml");
        this.xmlToObjcet(configStr,QualitySampleConfig,"key",this.qualitySampleVoDic);

        Laya.loader.clearRes("res/config/QualitySample.xml");
    }
    /**宠物等级 */
    public parseHeroLevelSample():void
    {
        if(this.heroLevelSampleDic == null)
        {
            this.heroLevelSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroLevelSample.xml");
        this.xmlToObjcet(configStr,HeroLevelSampleConfig,"key",this.heroLevelSampleDic);

        Laya.loader.clearRes("res/config/HeroLevelSample.xml");
    }
    /**宠物配置 */
    public parseHeroSample():void
    {
        if(this.heroSampleDic == null)
        {
            this.heroSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroSample.xml");
        this.xmlToObjcet(configStr,HeroSampleConfig,"key",this.heroSampleDic);

        Laya.loader.clearRes("res/config/HeroSample.xml");
    }
    /**宠物品质 */
    public parseHeroTypeSample():void
    {
        if(this.heroTypeSampleDic == null)
        {
            this.heroTypeSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroTypeSample.xml");
        this.xmlToObjcet(configStr,HeroTypeSampleConfig,"key",this.heroTypeSampleDic);

        Laya.loader.clearRes("res/config/HeroTypeSample.xml");
    }
    /**宠物品质 */
    public parseQualityScoreSample():void
    {
        if(this.qualityScoreSampleDic == null)
        {
            this.qualityScoreSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/QualityScoreSample.xml");
        this.xmlToObjcet(configStr,QualityScoreSampleConfig,"key",this.qualityScoreSampleDic);

        Laya.loader.clearRes("res/config/QualityScoreSample.xml");
    }
    /**地图配置 */
    public parseGateMapSample():void
    {
        if(this.gateMapSampleDic == null)
        {
            this.gateMapSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/GateMapSample.xml");
        this.xmlToObjcet(configStr,GateMapSampleConfig,"key",this.gateMapSampleDic);

        Laya.loader.clearRes("res/config/GateMapSample.xml");
    }
    /**光卡配置 */
    public parseGateSample():void
    {
        if(this.gateSampleDic == null)
        {
            this.gateSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/GateSample.xml");
        this.xmlToObjcet(configStr,GateSampleConfig,"key",this.gateSampleDic);

        Laya.loader.clearRes("res/config/GateSample.xml");
    }
    /**宠物技能 */
    public parseHeroSkillSample():void
    {
        if(this.heroSkillSampleDic == null)
        {
            this.heroSkillSampleDic = new Dictionary();
        }
        var configStr = Laya.loader.getRes("res/config/HeroSkillSample.xml");
        this.xmlToObjcet(configStr,HeroSkillSampleConfig,"key",this.heroSkillSampleDic);

        Laya.loader.clearRes("res/config/HeroSkillSample.xml");
    }


    /**
     *得到角色配置
     * @param id 
     */
    public getRoleVoByID(id:string):RoleVo
    {
        return this.roleConfigDic.get(id);
    }

    public getSkillVoByID(id:string):SkillVo
    {
        return this.skillConfigDic.get(id);
    }

    /**
     * xml转为对象
     * @param str 
     * @param DineClass 
     * @param keyPro 
     * @param dic 
     */
    private xmlToObjcet(str:string,DineClass?:any,keyPro?:any,dic?:Dictionary):void
    {
        var content:string = str.split("<?xml version='1.0' encoding='utf-8'?>")[1];
        var datas:Array<string> = content.split("\r\n");
        var element:string;
        var tempAry;
        var value:string;
        var objs:Array<any> = [];
        var obj:any;
        for(var i = 0;i < datas.length;i++)
        {
            if(datas[i].indexOf("<element") != -1)
            {
                element = datas[i];
                tempAry = element.split(" ");
                obj = new DineClass();
                for(var j = 0;j < tempAry.length;j++)
                {
                    value = tempAry[j];
                    if(value.indexOf("<element") == -1 && value.indexOf("=") == -1 && value.indexOf("/>") == -1)
                    {
                        j = j + 2;
                        obj[value] = tempAry[j].split("\"")[1];
                    }
                }
                // console.log(obj);
                dic.set(obj[keyPro],obj);
            }
        }
    }
}