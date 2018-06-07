/*
* 阵型
*/
class HomeMediator extends BaseMediator{

    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.HomeViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
    }
    protected addEvents():void
    {

    }
    protected removeEvents():void
    {

    }

    public dispose():void
    {
        super.dispose();
    }
}