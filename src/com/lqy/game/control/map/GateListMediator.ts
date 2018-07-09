/*
* 关卡列表
*/
class GateListMediator extends BaseMediator{
    private grayFilter:Laya.ColorFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,  //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0,  //B
            0, 0, 0, 1, 0, //A
        ]);
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

        WebSocketManager.ins.registerHandler(Protocol.GATE,Protocol.GATE_BATTLE,new BattleGateHandler(this,this.battleGateResponse));
        WebSocketManager.ins.registerHandler(Protocol.GATE,Protocol.GATE_SCAN,new ScanGateHandler(this,this.scanGateResponse));
        WebSocketManager.ins.registerHandler(Protocol.GATE,Protocol.GATE_SWITCH_HANG_GATE,new GateSwitchHangupHandler(this,this.switchHangupGateResponse));
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
        WebSocketManager.ins.unregisterHandler(Protocol.GATE,Protocol.GATE_BATTLE,this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE,Protocol.GATE_SCAN,this);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE,Protocol.GATE_SWITCH_HANG_GATE,this);
    }
    
    private listMouseHandler(e:Laya.Event,index:number):void
    {
        if(e.type == Laya.Event.CLICK)
        {
            var cell:Box = this.view.listGate.getCell(index);
            if(e.target == cell.getChildByName("btnChanllege"))
            {
                if(GameConfig.SINGLE_GAME)
                {
                    var gateKey:string = (cell.dataSource as GateSampleConfig).key;
                    GameDataManager.ins.hangGateKey = gateKey;
                    this.battleGateResponse(gateKey);
                }
                else
                {
                    ClientSender.ballteGateReq((cell.dataSource as GateSampleConfig).key);
                }
            }
            else if(e.target == cell.getChildByName("btnSweep"))
            {
                var btnSp:Button = (cell.getChildByName("btnSweep") as Button);
                if(btnSp.filters)
                {
                    TipsManager.ins.showFloatMsg("2秒之后才能扫荡",30,"#ff0000",this.view,this.view.width/2,this.view.height/2,1,0,100);
                    return;
                }
                Laya.timer.once(2000,this,this.timeEndCanScan,[btnSp],false);
                btnSp.filters = [this.grayFilter];
                if(GameConfig.SINGLE_GAME)
                    this.scanGateResponse((cell.dataSource as GateSampleConfig).key);
                else
                    ClientSender.scanGateReq((cell.dataSource as GateSampleConfig).key);
            }
            else if(e.target == cell.getChildByName("imgReward"))
            {
                console.log("点击宝箱");
            }
            else
            {
                if(GameConfig.SINGLE_GAME)
                {
                    var gateKey:string = (cell.dataSource as GateSampleConfig).key;
                    GameDataManager.ins.hangGateKey = gateKey;
                    this.switchHangupGateResponse(gateKey);
                }
                else
                {
                    ClientSender.gateSwitchHangReq((cell.dataSource as GateSampleConfig).key);
                }
            }
        }
    }
    private timeEndCanScan(btnSweep:Button):void
    {  
        btnSweep.filters = null;

    }
    private battleGateResponse(gateKey:string):void  
    {
        // GameDataManager.ins.hangGateKey = gateKey;
        EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
    }
    /**扫荡返回 */
    private scanGateResponse(gateKey:string):void  
    {
        var sampleConfig:GateSampleConfig = ConfigManager.ins.getGateSampleConfig(gateKey);
        var ary = sampleConfig.getRandowRewards();
        var itemKey:string;
        var itemNum:number;
        for(var i = 0;i < ary.length;i++)
        {
            itemKey = ary[i][0];
            itemNum = Number(ary[i][1]);
            var itemConfig:ItemSampleConfig = ConfigManager.ins.getItemSampleConfig(itemKey);
            if(!itemConfig)
                continue;
            Laya.timer.once(300 * i,this,this.showFloat,[itemConfig.itemName,itemNum],false);
        }
    }
    /**扫荡飘字 */
    private showFloat(itemName:string,itemNum:number):void
    {
        var html: string = "<span style='fontSize:30' color='#00ff00'>"+itemName+"X</span>";
        html += "<span style='color:#ff0000;font-weight:bold;fontSize:30'>"+itemNum+"</span>";
        TipsManager.ins.showFloatHtmlMsg(html,this.view,this.view.width/2,this.view.height/2,1.0,200);
    }
    private switchHangupGateResponse(gateKey:string):void  
    {
        // GameDataManager.ins.hangGateKey = gateKey;
        EventManager.ins.dispatchEvent(EventManager.CHOICE_CHALLEGEN_GATE);
    }
    private listGateRender(cell:Box,index:number):void
    {
        if(cell && cell.dataSource)
        {
            var gameDataMgr:GameDataManager = GameDataManager.ins;
            var gateConfig:GateSampleConfig = cell.dataSource;
            var gateInfoVo:GateInfoVo = gameDataMgr.getGateInfoVo(gateConfig.key);
            var isPass:boolean = gateInfoVo !== undefined && gateInfoVo !== null;
            (cell.getChildByName("lblName") as Laya.Label).text = gateConfig.gateName;
            (cell.getChildByName("lblLevel") as Laya.Label).text = "推荐等级：" + gateConfig.level;
            (cell.getChildByName("img_notice") as Laya.Image).visible = !isPass;
            (cell.getChildByName("btnSweep") as Laya.Button).visible = isPass && gateInfoVo.passGate;
            (cell.getChildByName("btnChanllege") as Laya.Button).visible = isPass && !gateInfoVo.passGate;

            (cell.getChildByName("img_hand") as Laya.Image).visible = gameDataMgr.hangGateKey == gateConfig.key;
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
        this.view.listGate.scrollBar.hide = true;
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