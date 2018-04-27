/*
* name;
*/
class DebugViewUtil{
    private static MSG_SUM_LIMIT:number = 100;
    private static view:ui.DebugViewUI = null;
    private static msgArray:Array<string> = null;
    constructor(){
        
    }

    public static init():void
    {
        if(this.msgArray == null)
        {
            this.msgArray = new Array();
        }
        this.view = new ui.DebugViewUI();
        this.view.visible = GameConfig.DEBUG_VIEW_SWITCH;
        this.view.x = GameConfig.STAGE_WIDTH - this.view.width;
        this.view.y = 0;
        this.view.lblDec.text = "";
        LayerManager.ins.addToLayer(this.view,LayerManager.TIP_LAYER,false,true,false);
        this.view.btnClear.on(Laya.Event.CLICK,this,this.onBtnClear);
    }
    private static onBtnClear(e):void
    {
        this.msgArray = new Array();
        this.view.lblDec.text = "";
        this.view.lblDec.height = this.view.lblDec.textField.textHeight;
        this.view.imgBg.height = this.view.lblDec.height;
    }
    /**
     * 打印日志
     * @param key 
     * @param msg 
     */
    public static log(key?:string,msg?:string):void
    {
        
        msg = new Date().getUTCSeconds() + ","+key + ":" + msg + "\n";
        if(this.msgArray.length >= this.MSG_SUM_LIMIT)
        {
            this.msgArray.unshift();
        }
        this.view.lblDec.text += msg;

        if(this.view.imgBg.height < 1000)
        {
            this.view.lblDec.height = this.view.lblDec.textField.textHeight;
            this.view.imgBg.height = this.view.lblDec.height + 20;
        }

    }


}