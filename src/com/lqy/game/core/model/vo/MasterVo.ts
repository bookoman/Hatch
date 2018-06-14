/*
* 怪物数据
*/
class MasterVo extends BaseRoleVo{

    public masterKey:string;

    public atk:number;
    public def:number;
    public speed:number;
    public hp:number;
    
    constructor(){
        super(false);
    }
    public initBaseData():void
    {
        // this.roleId = this.heroId;
        // this.scale = 1;
        // this.key = this.heroKey;
    }
}