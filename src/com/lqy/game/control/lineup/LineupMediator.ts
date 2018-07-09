/*
* 阵型
*/
class LineupMediator extends BaseMediator{
    private dragIcon:IconView;
    private selectIconView:IconView;
    private curSelectGrid:LineupGridMediator;
    private lineupGrids:Array<LineupGridMediator>;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();

        this.lineupGrids = [];
        var lineupGridMediator:LineupGridMediator = null;
        for(var i = 0;i < 5; i++)
        {
            lineupGridMediator = new LineupGridMediator(null,this.view["grid"+i],this,this.onLineupGridClick);
            lineupGridMediator.lineupId = i;
            this.lineupGrids.push(lineupGridMediator);
        }

        this.initLineup();
        
    }
    protected addEvents():void
    {
        this.view.listIcon.renderHandler = new Handler(this,this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this,this.onMouseHandler);
        
        WebSocketManager.ins.registerHandler(Protocol.HERO,Protocol.HERO_UPDATE_FORMATION,new HeroUpdateLineupHanlder(this,this.heroUpdateLineupHandler));
    }
    protected removeEvents():void
    {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
        WebSocketManager.ins.unregisterHandler(Protocol.HERO,Protocol.HERO_UPDATE_FORMATION,this);
    }
    /**更新阵型服务器返回 */
    private heroUpdateLineupHandler(isUp:boolean):void
    {
        if(isUp)
        {
            this.selectIconView.setSelect(true);
            this.curSelectGrid.setUpHero(this.selectIconView.heroId,this.selectIconView);
        }
        else
        {
            this.lineupGrids.forEach(lineupGrid => {
                if(lineupGrid.heroId == this.selectIconView.heroId){
                    this.selectIconView.setSelect(false);
                    lineupGrid.revokeUpHero();
                }
            });
        }
    }
    private listIconRender(cell:IconView,index:number):void
    {
        if(cell && cell.dataSource)
        {
            cell.setData(cell.dataSource);
        }
        
    }
    private onLineupGridClick(lineupGrid:LineupGridMediator):void
    {
        this.curSelectGrid = lineupGrid;
        this.lineupGrids.forEach(lineupGrid => {
            lineupGrid.setClipShadowIndex(0);
        });
        this.curSelectGrid.setClipShadowIndex(1);

    }

    private listIconSelect(index:number):void
    {
        
    }
   
    private onMouseHandler(e:Laya.Event,index:number):void
    {
        if(e.type == Laya.Event.CLICK)
        {
            
            this.selectIconView = this.view.listIcon.getCell(index);
            if(this.selectIconView)
            {
                var lineupId:number;
                var isUp:boolean;
                if(this.curSelectGrid)
                {
                    
                    if(this.selectIconView.selectTick)
                    {
                        lineupId = this.selectIconView.lineupId;
                        isUp = false;
                    }
                    else
                    {
                        lineupId = this.curSelectGrid.lineupId;
                        isUp = true;
                    }
                    if(GameConfig.SINGLE_GAME)//单机测试
                        this.singleGameUpdateLineup(isUp,this.selectIconView.heroId,lineupId);
                    else
                        ClientSender.heroLinuepUpdateReq(lineupId,this.selectIconView.heroId,isUp); 
                }
                else
                {
                    if(this.selectIconView.selectTick)
                    {
                        lineupId = this.selectIconView.lineupId;
                        isUp = false;
                        if(GameConfig.SINGLE_GAME)//单机测试
                            this.singleGameUpdateLineup(isUp,this.selectIconView.heroId,lineupId);
                        else
                            ClientSender.heroLinuepUpdateReq(lineupId,this.selectIconView.heroId,isUp);   
                    }
                }
            }
        }
        else if(e.type == Laya.Event.MOUSE_UP)
        {   

        }
    }
    /**单机游戏模拟上阵 */
    private singleGameUpdateLineup(isUp:boolean,heroId:string,lineupId:number):void
    {
        var selfPlayerData:PlayerData = GameDataManager.ins.selfPlayerData;
        var heroVo;
        if(isUp)
        {
            selfPlayerData.heroLineupDic.set(lineupId,heroId);
            heroVo = selfPlayerData.addUpHeroVo(heroId,lineupId);
        }
        else
        {
            selfPlayerData.heroLineupDic.remove(lineupId);
            heroVo = selfPlayerData.removeUpHeroVo(heroId);
        }
        if(BattleEngine.ins.isLoopBattle && heroVo)
            RoleManager.ins.updateLineupHeros(heroVo,isUp);
        this.heroUpdateLineupHandler(isUp);
    }

    private initLineup():void
    {

        var lineupDic:Dictionary = GameDataManager.ins.selfPlayerData.heroLineupDic;
        var lineupGridMediator:LineupGridMediator = null;
        var heroId:string;
        lineupDic.keys.forEach(lineupId => {
            heroId = lineupDic.get(lineupId);
            if(heroId && heroId != "")
            {
                lineupGridMediator = this.lineupGrids[lineupId];
                lineupGridMediator.lineupId = Number(lineupId);
                lineupGridMediator.setUpHero(heroId);
            }
        });
        
        
        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var backpackHeroVos:Array<HeroVo> = GameDataManager.ins.selfPlayerData.heroVoDic.values;
        var heroVo:HeroVo;
        var ary:Array<Object> = [];
        var qulityInd:number;
        var icon:string;
        var isSelect:boolean;
        for(var i = 0;i < backpackHeroVos.length;i++)
        {
            isSelect = false;
            heroVo = backpackHeroVos[i];
            qulityInd = ConfigManager.ins.getHeroQualityInd(heroVo.qualityKey);
            icon = ConfigManager.ins.getHeroSampleConfig(heroVo.heroKey).icon;
            var lId:number;
            for(var j = 0;j < lineupDic.values.length;j++)
            {
                if(heroVo.heroId == lineupDic.values[j])
                {
                    isSelect = true;
                    lId = lineupDic.keys[j];
                    break;
                }
            }
            ary.push({quality:qulityInd,iconName:icon,heroId:heroVo.heroId,lineupId:lId,select:isSelect});
        }
        
        this.view.listIcon.array = ary;

    }
   

    public dispose():void
    {
        this.lineupGrids.forEach(element => {
            element.dispose();
            element = null;
        });
        this.lineupGrids = null;
        super.dispose();
    }
}