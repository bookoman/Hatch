/*
* 游戏主界面代理器
*/
class GameMediator extends BaseMediator{
    private curMediator:BaseMediator = null;
    private showViewIndex:number = -1;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        ObjectPoolUtil.init();

        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.TOP_LAYER,false,false,true);
        super.initView();
        this.onBtnMap();
    }
    protected addEvents():void
    {
        this.view.btnOpen.on(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnMap.on(Laya.Event.CLICK,this,this.onBtnMap);
        this.view.btnLineup.on(Laya.Event.CLICK,this,this.onBtnLineup);
        this.view.btnHero.on(Laya.Event.CLICK,this,this.onBtnHero);
        this.view.btnEquip.on(Laya.Event.CLICK,this,this.onBtnEquip);
        this.view.btnHome.on(Laya.Event.CLICK,this,this.onBtnHome);
        
    }
    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnMap.off(Laya.Event.CLICK,this,this.onBtnMap);
        this.view.btnLineup.off(Laya.Event.CLICK,this,this.onBtnLineup);
        this.view.btnHero.off(Laya.Event.CLICK,this,this.onBtnHero);
        this.view.btnEquip.off(Laya.Event.CLICK,this,this.onBtnEquip);
        this.view.btnHome.off(Laya.Event.CLICK,this,this.onBtnHome);
    }

    private onBtnOpen(e:Laya.Event):void
    {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    }
    /**地图系统 */
    private onBtnMap(e?:Laya.Event):void
    {
        if(this.showViewIndex == GameButtomTabIndex.MAP_BATTLE)
        {
            return;
        }
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }

        this.curMediator = new MapBattleMediator();
        this.showViewIndex = GameButtomTabIndex.MAP_BATTLE;
    }
    /**阵型系统 */
    private onBtnLineup(e?:Laya.Event):void
    {
        if(this.showViewIndex == GameButtomTabIndex.LINEUP)
        {
            return;
        }
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        var resAry:Array<Object> = [
            {url:"res/atlas/lineup.atlas",type:Loader.ATLAS}
        ];
        this.curMediator = new LineupMediator(resAry);
        this.showViewIndex = GameButtomTabIndex.LINEUP;
    }
    /**英雄系统*/ 
    private onBtnHero(e):void
    {
        if(this.showViewIndex == GameButtomTabIndex.HERO)
        {
            return;
        }
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        this.curMediator = new HeroMediator();
        this.showViewIndex = GameButtomTabIndex.HERO;
    }
     /**战斗系统*/ 
    private onBtnEquip(e):void
    {
        if(this.showViewIndex == GameButtomTabIndex.EQUIP)
        {
            return;
        }
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        this.curMediator = new EquipMediator();
        this.showViewIndex = GameButtomTabIndex.EQUIP;
    }
    /**家园系统*/ 
    private onBtnHome(e):void
    {
        if(this.showViewIndex == GameButtomTabIndex.HOME)
        {
            return;
        }
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        this.curMediator = new HomeMediator();
        this.showViewIndex = GameButtomTabIndex.HOME;
    }
    
    public dispose():void
    {
        
    }
    
}