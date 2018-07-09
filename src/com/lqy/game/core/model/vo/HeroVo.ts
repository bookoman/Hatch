/*
* 宠物数据
*/
class HeroVo extends BaseRoleVo{
    public heroId:string;
    public exp:number;
    public createTime:string;
    public heroKey:string;
    public levelKey:string;
    public qualityKey:string;
    public heroAttr:HeroAttr;
    public heroTypeKey:string;
    
    /**性别 女 true,男 false */
    public female:boolean;
    /**是否交配 */
    public coitus:boolean;
    public maxExp:number;

    constructor(){
        super(false);
    }

    public initBaseData():void
    {
        
        this.roleId = this.heroId;
        this.scale = -1;
        this.key = this.heroKey;
        var config:HeroSampleConfig = ConfigManager.ins.getHeroSampleConfig(this.heroKey);
        this.modelId = config.modelId;
        this.scale = config.modelSize;
        this.name = config.name;
        this.hurt = config.hurt;
        this.tenacity = config.tenacity;
        this.dieAttTimes = 100;

        if(GameConfig.SINGLE_GAME)
        {
            this.qualityKey = "Q_10001";
            var qualityConfig:QualitySampleConfig = ConfigManager.ins.getQualitySampleConfig(this.qualityKey);
            this.doubleAtk = config.doubleAtk;
            this.upAtk = qualityConfig.aktMin;
            this.updef = qualityConfig.defMin;
            this.level = 1;
            // this.doubleAtk = 1;
            // this.upAtk = 4;
            // this.updef = 3;
            // this.level = 1;
            this.atk = Math.ceil(config.atk)
            this.def = Number(config.def);
            this.hp = Number(config.hp);
        }
        else
        {
            this.doubleAtk = this.heroAttr.doubleAtkRate;
            this.upAtk = this.heroAttr.upAtk;
            this.updef = this.heroAttr.upDef;
        }

        /**技能数据 */
        this.skillVos = [];
        var skillVo:SkillVo = new SkillVo();

        var bool:boolean = skillVo.initData(config.skillKey);
        //流血buff测试
        if(this.name == "三角龙"){
            //流血技能
            // bool = skillVo.initData("SK_0096");
            //单个加血技能
            // bool = skillVo.initData("SK_0061");
            //提升攻击力技能
            // bool = skillVo.initData("SK_0012");
            //嘲讽
            // bool = skillVo.initData("SK_0241");
            // skillVo.cd = 0;
            // skillVo.skillContinued = 1;
        }
        if(bool){
            this.skillVos.push(skillVo);
        }

        super.initBaseData();

    }
    
}

/**生成属性 */
class HeroAttr{
    public hp:number;
    public atk:number;
    public def:number;
    public speed:number;
    public hitEffectRate:number;
    public maxAtk:number;
    public maxDef:number;
    public maxHp:number;
    public maxSpeed:number;
    public upAtk:number;
    public upDef:number;
    public upHp:number;
    public upSpeed:number;
    public hitRate:number;
    public evadeRate:number;
    public resistRate:number;
    public doubleAtkRate:number;
    public hurtRate:number;
    public tenacityRate:number;
    public injuryRate:number;

    constructor(){

    }
}