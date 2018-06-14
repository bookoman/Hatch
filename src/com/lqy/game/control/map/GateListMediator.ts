/*
* 关卡列表
*/
class GateListMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.map.GateListViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,true,true,true);
        
        super.initView();
    }
    protected addEvents():void
    {
        this.view.listGate.renderHandler = new Handler(this,this.listGateRender);
        this.view.listGate.mouseHandler = new Handler(this,this.listMouseHandler);
        
        var layer:MyLayer = LayerManager.ins.getLayer(LayerManager.UI_LAYER);
        if(layer)
        {
            layer.maskSprite.on("click",this,this.onMaskSpriteClick);
        }
    }
    protected removeEvents():void
    {
        this.view.listGate.renderHandler = null;
        this.view.listGate.mouseHandler = null;
        var layer:MyLayer = LayerManager.ins.getLayer(LayerManager.UI_LAYER);
        if(layer)
        {
            layer.maskSprite.off("click",this,this.onMaskSpriteClick);
        }
    }

    private listMouseHandler(e:Laya.Event,index:number):void
    {
        if(e.type == Laya.Event.CLICK)
        {
            var cell:Box = this.view.listGate.getCell(index);
            if(e.target == cell.getChildByName("btnChanllege"))
            {
                GameDataManager.ins.hangGateKey = (cell.dataSource as GateSampleConfig).key;
                EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
            }
        }
    }
    private listGateRender(cell:Box,index:number):void
    {
        if(cell && cell.dataSource)
        {
            var gateConfig:GateSampleConfig = cell.dataSource;
            var gateInfoVo:GateInfoVo = GameDataManager.ins.getGateInfoVo(gateConfig.key);
            var isPass:boolean = gateInfoVo !== undefined && gateInfoVo !== null;
            (cell.getChildByName("lblName") as Laya.Label).text = gateConfig.gateName;
            (cell.getChildByName("lblLevel") as Laya.Label).text = "推荐等级：" + gateConfig.level;
            (cell.getChildByName("img_notice") as Laya.Image).visible = !isPass;
            (cell.getChildByName("btnSweep") as Laya.Button).visible = isPass && gateInfoVo.passGate;
            (cell.getChildByName("btnChanllege") as Laya.Button).visible = isPass;

            (cell.getChildByName("img_hand") as Laya.Image).visible = false;
            cell.disabled = !isPass;
            // (cell.getChildByName("imgIcon") as Laya.Image).skin = "res/outside/icons/heros/"+gateConfig +".png";
            var icon:Laya.Image = (cell.getChildByName("imgIcon") as Laya.Image);
            

            var heroKey:string;
            if(index == 0)
            {
                heroKey = "Hero_10017";
            }
            else if(index == 1)
                heroKey = "Hero_10049";
            else if(index == 2)
                heroKey = "Hero_10073";
            else if(index == 3)
                heroKey = "Hero_10065";
            else if(index == 4)
                heroKey = "Hero_10009";
            if(icon.numChildren == 0)
            {
                var uiRole = new UIRole(heroKey);
                uiRole.addParent(icon,icon.width/2,icon.height - 10,0.3,0.3,true);
            }
            
        }
    }
    /**设置管卡数据 */
    public setData(mapKey:string):void
    {
        var gateConfigs = ConfigManager.ins.getGateConfigsByMapKey(mapKey);
        this.view.listGate.array = gateConfigs;
        
    }
    public onMaskSpriteClick():void
    {
        this.dispose();
    } 

    public dispose():void
    {
        // super.dispose();
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,true);
    }
}