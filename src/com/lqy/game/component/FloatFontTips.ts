/*
* 飘字tips
*/
class FloatFontTips extends Laya.Label{
    constructor(){
        super();
    }
    /**
     * 设置属性
     * @param fontSize 
     * @param color 
     * @param font 
     */
    public setAttribute(fontSize?:number,color?:string,font?:string):void
    {
        fontSize = fontSize ? fontSize : 24;
        font = font ? font : "SimHei";
        color = color ? color : "#000000";

        this.fontSize = fontSize;
        this.color = color;
        this.font = font;
        this.bold = true;
    }
    /**
     * 飘字
     * @param showTime 
     * @param floatHei 
     */
    public show(msg:string,parent:Laya.Sprite,sx:number,sy:number,showTime:number,floatHei:number):void
    {
        this.text = msg;
        this.x = sx;
        this.y = sy;
        parent.addChild(this);
        this.alpha = 1;
        Laya.Tween.to(this,{y:this.y - floatHei,alpha:0.6},showTime * 1000,Laya.Ease.backInOut,new Laya.Handler(this,this.floatCompleted));
    }
    /**
     * 移动完成
     */
    private floatCompleted():void
    {
        this.removeSelf();
        ObjectPoolUtil.stillObject(ObjectPoolUtil.FLOAT_FONT_TIPS,this);
    }

}