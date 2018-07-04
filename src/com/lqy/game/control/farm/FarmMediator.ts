/*
* 农场
*/
class FarmMediator extends BaseMediator{
    private lastMoveX:number = 0;
    private mouseDownX:number = 0;
    private mouseUpX:number = 0;
    private distanceX:number;
    constructor(assetsUrl?:any,view?:any,caller?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.farm.FarmViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        super.initView();
        //var spr:Sprite;
        //spr.mouseEnabled
        //入场动画
        
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK, this,this.onCloseBtnClick);
        this.view.panlePlant.on(Laya.Event.MOUSE_DOWN,this,this.onViewMouseEvent);
        this.view.panlePlant.on(Laya.Event.MOUSE_UP,this,this.onViewMouseEvent);
    }
    protected removeEvents():void
    {
        this.view.btnClose.off(Laya.Event.CLICK, this,this.onCloseBtnClick);
        this.view.panlePlant.off(Laya.Event.MOUSE_DOWN,this,this.onViewMouseEvent);
        this.view.panlePlant.off(Laya.Event.MOUSE_UP,this,this.onViewMouseEvent);
    }
    private onCloseBtnClick(e):void
    {
        this.dispose();
        // console.log(e.target);
    }

    public dispose():void
    {
        if(this.view)
        {
            
        }
        super.dispose();
    }

    private onViewMouseEvent(e:Laya.Event):void
    {
        if(e.type == Laya.Event.MOUSE_DOWN)
        {
            this.lastMoveX = this.view.panlePlant.mouseX;
            this.mouseDownX = this.view.panlePlant.mouseX;
            this.view.panlePlant.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
            // console.log("mouseDwon：",this.view.panlePlant.mouseX);
            // this.onBtnEnter(null);
        }
        else if(e.type == Laya.Event.MOUSE_UP)
        {
            this.mouseUpX = this.view.panlePlant.mouseX;
            this.view.panlePlant.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
            //缓缓移动效果
            var tweenX:number = 0;
            if(this.distanceX > 0)
            {
                tweenX = this.view.panlePlant.x + 50;
            }
            else if(this.distanceX < 0)
            {
                tweenX = this.view.panlePlant.x - 50;
            }
            if(tweenX > 0 || tweenX < - (this.view.panlePlant.width - GameConfig.STAGE_WIDTH)){
                return;
            }
            if(tweenX != 0)
            {
                Laya.Tween.to(this.view.panlePlant,{x:tweenX},200,Laya.Ease.backOut);
            }

            // console.log("mouseUp：",this.view.panlePlant.mouseX);
        }
    }
    
    private onMouseMove(e:Laya.Event):void
    {
        this.distanceX = 0;
        var tx:number = this.view.panlePlant.x;
        if(this.lastMoveX != this.view.panlePlant.mouseX)
        {
            this.distanceX = this.view.panlePlant.mouseX - this.lastMoveX;
            tx += this.distanceX;
        }
        if(tx > 0 || tx < -(this.view.panlePlant.width - GameConfig.STAGE_WIDTH)){
            this.distanceX = 0;
            return;
        }
        
        this.view.panlePlant.x = tx;

        this.lastMoveX = this.view.panlePlant.mouseX;
    }
}