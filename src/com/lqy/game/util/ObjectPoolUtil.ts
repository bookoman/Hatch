/*
* 对象池工具
*/
class ObjectPoolUtil{
    /**飘字对象 */
    public static FLOAT_FONT_TIPS:string = "floatFontTips";
    /**角色血条 */
    public static ROLE_BLOOD_BAR:string = "roleBloodBar";


    /**飘字对象 */
    private static floatFontTipsAry:Array<FloatFontTips> = null;
    /**角色血条 */
    private static roleBloodBarAry:Array<RoleBloodBar> = null;
    constructor(){

    }

    public static init():void
    {
        this.floatFontTipsAry = new Array();
        for(var i = 0;i < 10; i++)
        {
            this.floatFontTipsAry.push(new FloatFontTips());
        }
        
        this.roleBloodBarAry = new Array();
        for(i = 0;i < 10;i++)
        {
            this.roleBloodBarAry.push(new RoleBloodBar());
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