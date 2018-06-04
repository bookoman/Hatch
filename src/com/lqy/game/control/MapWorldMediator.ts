/*
* 世界地图
*/
class MapWorldMediator extends BaseMediator{
    private mapBattleMediator:MapBattleMediator;
    constructor(assetsUrl?:any,view?:any,caller?:MapBattleMediator){
        super(assetsUrl,view);
        this.mapBattleMediator = caller;
    }
    protected initView():void
    {   
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnEnter.on(Laya.Event.CLICK,this,this.onBtnEnter);
    }
    protected removeEvents():void
    {
        this.view.btnEnter.off(Laya.Event.CLICK,this,this.onBtnEnter);
    }
    
    private onBtnEnter(e):void
    {
        GameDataManager.ins.hundUpChapterData = 1;
        if(this.mapBattleMediator)
        {
            this.mapBattleMediator.enterMapBattle();
        }
        this.dispose();
    }

    public dispose():void
    {
        super.dispose();
        this.mapBattleMediator = null;
    }
}