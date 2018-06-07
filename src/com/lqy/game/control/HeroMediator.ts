/*
* 阵型
*/
class HeroMediator extends BaseMediator{
    private uiRole:UIRole;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.HeroViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();

        this.uiRole = new UIRole("10006");
        var rx:number = this.view.clipShadow.x + this.view.clipShadow.width / 2;
        var ry:number = this.view.clipShadow.y + this.view.clipShadow.height / 2;
        this.uiRole.addParent(this.view,rx,ry,-0.8,0.8);
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
        if(this.uiRole)
        {
            this.uiRole.dispose();
        }
    }
}