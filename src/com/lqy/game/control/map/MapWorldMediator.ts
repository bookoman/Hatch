/*
* 世界地图
*/
class MapWorldMediator extends BaseMediator{
    private gateListMediator:GateListMediator;
    private lastMoveX:number = 0;
    private mouseDownX:number = 0;
    private mouseUpX:number = 0;
    //颜色滤镜矩阵,灰色
    private grayFilter:Laya.ColorFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,  //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0,  //B
            0, 0, 0, 1, 0, //A
        ]);
    //发光滤镜#0099FF
    private glowFilter:Laya.GlowFilter = new Laya.GlowFilter("#00FF00", 100, 0, 0);
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {   
        this.view = new ui.map.MapWorldViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);

        var imgBlock:Laya.Image;
        for(var i = 0; i < GameConfig.GATE_MAP_KEYS.length;i++)
        {
            imgBlock = this.view["imgBlock"+i];
            imgBlock.name = GameConfig.GATE_MAP_KEYS[i];
            this.setBlockGray(imgBlock);
            this.view["imgBlock"+i].on(Laya.Event.CLICK,this,this.onBlockClick);
        }

        this.view.visible = true;
        super.initView();
        this.worldmapEffect();

        RightFunctionButtons.ins.show(this.view);
    }
    protected addEvents():void
    {
        this.view.panelBlock.on(Laya.Event.MOUSE_DOWN,this,this.onViewMouseEvent);
        this.view.panelBlock.on(Laya.Event.MOUSE_UP,this,this.onViewMouseEvent);
        
        
        // console.log(imgBlock.mouseEnabled,imgBlock.mouseThrough);
    }
    
    protected removeEvents():void
    {
        this.view.panelBlock.off(Laya.Event.MOUSE_DOWN,this.onViewMouseEvent);
        this.view.panelBlock.off(Laya.Event.MOUSE_UP,this.onViewMouseEvent);
        

        for(var i = 0; i < GameConfig.GATE_MAP_KEYS.length;i++)
        {
            this.view["imgBlock"+i].off(Laya.Event.CLICK,this,this.onBlockClick);
        }
    }
    /**云雾特效 */
    public worldmapEffect(): void {
        Tween.to(this.view.yun1, { x: -326, y: -927, alpha: 0 }, 3000, null, Laya.Handler.create(this,this.yunMoveComplete,[this.view.yun1]), 1000);
        Tween.to(this.view.yun2, { x: -1497, y: 1377, alpha: 0 }, 3000, null, Laya.Handler.create(this,this.yunMoveComplete,[this.view.yun2]), 1000);
        Tween.to(this.view.yun3, { x: -2004, y: 116, alpha: 0 }, 3000, null, Laya.Handler.create(this,this.yunMoveComplete,[this.view.yun3]), 1000);
        Tween.to(this.view.yun4, { x: 2165, y: 1031, alpha: 0 }, 3000, null, Laya.Handler.create(this,this.yunMoveComplete,[this.view.yun4]), 1000);

        Tween.to(this.view.wumaiImage, { x: 1500, alpha: 0 }, 3500, null, Laya.Handler.create(this,this.yunMoveComplete,[this.view.wumaiImage]), 0);
        Tween.to(this.view.panelBlock, { x: 0, y: 0, scaleX: 1.0, scaleY: 1.0 }, 1000, null, null, 1000);

        //选中当前打的地图板块
        this.view.imgBlock0.filters = [this.glowFilter];
    }
    private yunMoveComplete(disImg:Laya.Image):void
    {
        if(disImg){
            Laya.Tween.clearAll(disImg);
            disImg.removeSelf();
        }
    }
   
    /**进入地图假战斗 */
    public enterMapBattle():void
    {

    }
    /**
     * 
     * @param imgBlock 
     * @param bool 
     */
    private setBlockGray(imgBlock:Laya.Image):void
    {
        var bool:boolean = GameDataManager.ins.getGateMapIsOpen(imgBlock.name);
        imgBlock.filters = bool == false ? [this.grayFilter] : null;
    }
    private onBlockClick(e):void
    {
        if(Math.abs(this.mouseDownX - this.mouseUpX) > 10)
        {
            return;
        }
        if(!GameDataManager.ins.getGateMapIsOpen(e.target.name))
        {
            TipsManager.ins.showFloatMsg("关卡未开启，请通关上一地图所有关卡",30,"#ff0000",this.view,this.view.width/2,this.view.height/2,1,0,100);
            return;
        }
        var imgBlock:Laya.Image;
        for(var i = 0; i < 7;i++)
        {
            imgBlock = this.view["imgBlock"+i];
            if(GameDataManager.ins.getGateMapIsOpen(imgBlock.name))
            {
                imgBlock.filters = null;
            }
        }
        imgBlock = e.target;
        imgBlock.filters = [this.glowFilter];
        this.gateListMediator = new GateListMediator();
        this.gateListMediator.setData(imgBlock.name);

    }
    private onViewMouseEvent(e:Laya.Event):void
    {
        if(e.type == Laya.Event.MOUSE_DOWN)
        {
            this.lastMoveX = this.view.panelBlock.mouseX;
            this.mouseDownX = this.view.panelBlock.mouseX;
            this.view.panelBlock.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
            // console.log("mouseDwon：",this.view.panelBlock.mouseX);
            // this.onBtnEnter(null);
        }
        else if(e.type == Laya.Event.MOUSE_UP)
        {
            this.mouseUpX = this.view.panelBlock.mouseX;
            this.view.panelBlock.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
            //缓缓移动效果
            var tweenX:number = 0;
            if(this.distanceX > 0)
            {
                tweenX = this.view.panelBlock.x + 50;
            }
            else if(this.distanceX < 0)
            {
                tweenX = this.view.panelBlock.x - 50;
            }
            if(tweenX > 0 || tweenX < - (this.view.panelBlock.width - GameConfig.STAGE_WIDTH)){
                return;
            }
            if(tweenX != 0)
            {
                Laya.Tween.to(this.view.panelBlock,{x:tweenX},200,Laya.Ease.circIn);
            }

            // console.log("mouseUp：",this.view.panelBlock.mouseX);
        }
    }
    private distanceX:number;
    private onMouseMove(e:Laya.Event):void
    {
        this.distanceX = 0;
        var tx:number = this.view.panelBlock.x;
        if(this.lastMoveX != this.view.panelBlock.mouseX)
        {
            this.distanceX = this.view.panelBlock.mouseX - this.lastMoveX;
            tx += this.distanceX;
        }
        if(tx > 0 || tx < -(this.view.panelBlock.width - GameConfig.STAGE_WIDTH)){
            this.distanceX = 0;
            return;
        }
        
        this.view.panelBlock.x = tx;

        this.lastMoveX = this.view.panelBlock.mouseX;
    }
 
    public dispose():void
    {
        RightFunctionButtons.ins.hide();
        if(this.gateListMediator)
        {
            this.gateListMediator.dispose();
            this.gateListMediator = null;
        }
        super.dispose();
    }
}