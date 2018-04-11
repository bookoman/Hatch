/*
* 对象池工具
*/
class ObjectPoolUtil{
    private static TestPageUIAry:Array<ui.test.TestPageUI> = null;
    constructor(){

    }

    public static init():void
    {
        this.TestPageUIAry = new Array();
        for(var i = 0;i < 10; i++)
        {
            this.TestPageUIAry.push(new ui.test.TestPageUI());
        }
        
    }
    /**借用一个对象 */
    public static borrowObjcet(view)
    {
        var ary = this[view.constructor.name+"Ary"];
        if(ary && ary.length > 0)
        {
           return ary.pop();
        }
        return null;
    }
    /**还一个对象 */
    public static stillObject(view):void
    {
        var ary = this[view.constructor.name+"Ary"];
        if(ary)
        {
            ary.push(view);
        }
    }
}