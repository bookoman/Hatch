/*
* 配置表管理器
*/
class ConfigManager{
    /*********测试配置数据 */
    private roleConfigAry:Array<any> = [
        {"id":"10000","name":"石头怪","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10000","attackRect":"0,50,50,0","hp":40,"att":5,"atts":10,"attFar":1},
        {"id":"10001","name":"黄狼","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10001","attackRect":"0,50,50,0","hp":40,"att":5,"atts":3,"attFar":0},
        {"id":"10002","name":"巨石人","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10002","attackRect":"0,50,50,0","hp":40,"att":5,"atts":6,"attFar":0},
        {"id":"10003","name":"蓝狼","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10003","attackRect":"0,50,50,0","hp":40,"att":5,"atts":8,"attFar":0},
        {"id":"10004","name":"骷髅头","scaleX":-1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":40,"att":5,"atts":3,"attFar":1},
        {"id":"20000","name":"幽灵","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10005","attackRect":"0,50,50,0","hp":30,"att":3,"atts":1,"attFar":0},
        {"id":"20001","name":"鳄鱼龙","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10000","attackRect":"0,50,50,0","hp":30,"att":3,"atts":6,"attFar":0},
        {"id":"20002","name":"骨龙","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10002","attackRect":"0,50,50,0","hp":30,"att":4,"atts":4,"attFar":1},
        {"id":"20003","name":"骷髅射手","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10003","attackRect":"0,50,50,0","hp":30,"att":4,"atts":5,"attFar":1},
        {"id":"20004","name":"斧头怪","scaleX":1,"runWidth":60,"runHeight":100,"skillIDs":"10004","attackRect":"0,50,50,0","hp":30,"att":5,"atts":10,"attFar":0}
    ];

    private skillConfigAry:Array<any> = [
        {"id":"10000","name":"蛇皮技能","cd":10,"attFar":1},
        {"id":"10001","name":"湖怪","cd":8,"attFar":0},
        {"id":"10002","name":"暴雨针","cd":12,"attFar":1},
        {"id":"10003","name":"啸如虎","cd":10,"attFar":0},
        {"id":"10004","name":"徐如林","cd":6,"attFar":0},
        {"id":"10005","name":"破风","cd":16,"attFar":0}
    ];


    public roleConfigDic:Dictionary = null;

    public skillConfigDic:Dictionary = null;

    private languageMap:Object = {};
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
}