/*
* 战报视图
*/
class BattleReportMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.BattleReportViewUI();
        this.view.x = 0;
        this.view.y = 960;
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,false);
        super.initView();
        
    }
    protected addEvents():void
    {
        
    }

    protected removeEvents():void
    {
        
    }
    
}