/*
* 飘字tips
*/
class FloatFontTips extends Laya.Label{
    private htmlDiv:Laya.HTMLDivElement;
    constructor(){
        super();
        this.htmlDiv = new Laya.HTMLDivElement();
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
    public show(msg:string,parent:Laya.Sprite,sx:number,sy:number,showTime:number,floatWidth:number,floatHei:number,isRight?:boolean):void
    {
        this.text = msg;
        this.x = sx - this.width / 2;
        this.y = sy - this.height / 2;
        parent.addChild(this);
        this.alpha = 1;
        var tx:number = this.x + (isRight ? 1 : -1) * floatWidth;
        // Laya.Tween.to(this,{x:tx,y:this.y - floatHei,alpha:0.6},showTime * 1000,Laya.Ease.backInOut,Laya.Handler.create(this,this.floatCompleted));
        Laya.Tween.to(this,{x:tx,y:this.y - floatHei,alpha:0.6},showTime * 1000,Laya.Ease.backOut,Laya.Handler.create(this,this.floatCompleted));
    }
    /**
     * 显示html文本
     * @param html 
     * @param parent 
     * @param sx 
     * @param sy 
     * @param showTime 
     * @param floatHei 
     */
    public showHtml(html:string,parent:Laya.Sprite,sx:number,sy:number,showTime:number,floatHei:number):void
    {
        this.htmlDiv.innerHTML = html;
        this.addChild(this.htmlDiv);
        // htmlDiv.pos(50, 200);
        this.x = sx - this.htmlDiv.contextWidth / 2;
        this.y = sy - this.htmlDiv.contextHeight / 2;
        parent.addChild(this);
        this.alpha = 1;
        Laya.Tween.to(this,{y:this.y - floatHei,alpha:0.6},showTime * 1000,Laya.Ease.backInOut,Laya.Handler.create(this,this.floatCompleted));
    }
    /**
     * 移动完成
     */
    private floatCompleted():void
    {
        this.htmlDiv.innerHTML = "";
        this.text = "";
        this.removeSelf();
        Laya.Tween.clearAll(this);
        ObjectPoolUtil.stillObject(ObjectPoolUtil.FLOAT_FONT_TIPS,this);
    }

}