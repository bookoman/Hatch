/*
* 怪物数据
*/
class MasterVo extends BaseRoleVo{

    public masterKey:string;
    
    
    constructor(){
        super(true);
    }
    public initBaseData(masKey?:string):void
    {
        this.scale = 1;
        this.key = masKey ? masKey : this.masterKey;
        this.roleId = this.key + "_"+ this.lineupGrid;
        
        var config:MasterHeroSampleConfig = ConfigManager.ins.getMasterHeroSampleConfig(this.key);
        this.modelId = config.modelId;
        this.scale = config.modelSize;
        this.name = config.name;
        this.dieAttTimes = 3;

        this.atk = Number(config.atk);
        this.def = Number(config.def);
        this.hp = Number(config.hp);
        this.speed = Number(config.speed);
        this.doubleAtk = Number(config.doubleAtk);
        this.hurt = Number(config.hurt);
        this.tenacity = Number(config.tenacity);
        this.level = 0;
        this.upAtk = 0;
        this.updef = 0;
        
        
    }
}