/*
* 对象池工具
*/
class ObjectPoolUtil{
    /**飘字对象 */
    public static FLOAT_FONT_TIPS:string = "floatFontTips";
    /**角色血条 */
    public static ROLE_BLOOD_BAR:string = "roleBloodBar";
    /**角色显示对象 */
    public static HERO_ROLE:string = "hero";
    /**敌人显示对象 */
    public static ENEMY_ROLE:string = "enemy";
    /**技能显示对象 */
    public static SKILL:string = "skill";

    /**飘字对象 */
    private static floatFontTipsAry:Array<FloatFontTips> = null;
    /**角色血条 */
    private static roleBloodBarAry:Array<RoleBloodBar> = null;
    /**英雄显示对象 */
    private static heroAry:Array<Hero> = null;
    /**敌人显示对象 */
    private static enemyAry:Array<Hero> = null;
    /**技能对象 */
    private static skillAry:Array<Skill> = null;
    constructor(){

    }

    public static init():void
    {
        this.floatFontTipsAry = new Array();
        for(var i = 0;i < 30; i++)
        {
            this.floatFontTipsAry.push(new FloatFontTips());
        }
        
        this.roleBloodBarAry = new Array();
        for(i = 0;i < 20;i++)
        {
            this.roleBloodBarAry.push(new RoleBloodBar());
        }

        this.heroAry = new Array();
        this.enemyAry = new Array();
        for(i = 0;i < 15;i++)
        {
            this.heroAry.push(new Hero());
            this.enemyAry.push(new Enemy());
        }

        this.skillAry = new Array();
        for(i = 0;i < 20; i++)
        {
            this.skillAry.push(new Skill());
        }
    }
    /**借用一个对象 */
    public static borrowObjcet(property:string)
    {
        
        var ary = this[property+"Ary"];
        if(ary && ary.length > 0)
        {
           return ary.pop();
        }
        return null;
    }
    /**还一个对象 */
    public static stillObject(property:string,obj:any):void
    {
        var ary = this[property+"Ary"];
        if(ary)
        {
            ary.push(obj);
        }
    }
}