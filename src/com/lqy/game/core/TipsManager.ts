/*
* name;
*/
class TipsManager{
    constructor(){

    }
    private static _ins:TipsManager = null;
    public static get ins():TipsManager
    {
        if(this._ins == null)
        {
            this._ins = new TipsManager();
        }
        return this._ins;
    }
    /**
     * 显示飘字
     * @param msg 
     * @param fontSize 
     * @param color 
     * @param parent 
     * @param sx 
     * @param sy 
     * @param showTime 
     * @param floatHei 
     */
    public showFloatMsg(msg:string,fontSize:number,color:string,parent:Laya.Sprite,sx:number,sy:number,showTime:number,floatHei:number):void
    {
        var floatFontTip:FloatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if(floatFontTip)
        {
            floatFontTip.setAttribute(fontSize,color);
            floatFontTip.show(msg,parent,sx,sy,showTime,floatHei);
        }
    }
    /**
     * 显示飘HTMl字
     * @param msg 
     * @param fontSize 
     * @param color 
     * @param parent 
     * @param sx 
     * @param sy 
     * @param showTime 
     * @param floatHei 
     */
    public showFloatHtmlMsg(html:string,parent:Laya.Sprite,sx:number,sy:number,showTime:number,floatHei:number):void
    {
       var floatFontTip:FloatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if(floatFontTip)
        {
            floatFontTip.showHtml(html,parent,sx,sy,showTime,floatHei);
        }
    }
}