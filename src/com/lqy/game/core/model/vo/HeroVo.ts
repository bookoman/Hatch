/*
* 宠物数据
*/
class HeroVo extends BaseRoleVo{
    public heroId:string;
    public level:number;
    public exp:number;
    public createTime:string;
    public heroKey:string;
    public levelKey:string;
    public qualityKey:string;
    public heroAttr:HeroAttr;
    public heroTypeKey:string;
    public atk:number;
    public def:number;
    public speed:number;
    public hp:number;
    /**性别 女 true,男 false */
    public female:boolean;
    /**是否交配 */
    public coitus:boolean;
    public maxExp:number;

    constructor(){
        super(false);
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