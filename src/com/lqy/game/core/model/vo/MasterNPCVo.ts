/*
* 假打NPC敌人
*/
class MasterNPCVo extends BaseRoleVo{
    public masterKey:string;
    public atk:number;
    public def:number;
    public speed:number;
    public hp:number;

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
        this.name = config.name;
        this.dieAttTimes = 3;

        this.atk = config.atk;
        this.atkSpeed = config.speed;
    }

    
}