/*
* name;
*/
class GameMediator extends BaseMediator{
    constructor(assetsUrl = null,view = null){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.BG_LAYER,false,false,true);
        super.initView();
        
    }
    protected addEvents():void
    {
        this.view.btnOpen.on(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnAni.on(Laya.Event.CLICK,this,this.onPlayAni);
    }

    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK,this,this.onPlayAni);
    }
    private aniID:number = 0;
    private onPlayAni(e:Laya.Event):void
    {
        
        RoleManager.ins.playAni(this.aniID);
        this.aniID++;
    }

    private onBtnOpen(e:Laya.Event):void
    {
        MapManager.ins.enterMap("res/map",1,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        
        GameDataManager.ins.initData();

        RoleManager.ins.initRoles();

        BattleEngine.ins.run();
        
    }
    
    public dispose():void
    {
        
    }
    
}