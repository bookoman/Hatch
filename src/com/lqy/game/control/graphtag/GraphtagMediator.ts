/*
* 图鉴
*/
class GraphtagMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any,caller?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.graphtag.GraphtagViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        super.initView();
        //入场动画
        Tween.to(this.view.graptitleImage, { x: 0 }, 500, Ease.backInOut);
        Tween.to(this.view.graphtagPanel, { x: 9 }, 500, Ease.backInOut);

        
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK, this,this.onCloseBtnClick);
    }
    protected removeEvents():void
    {
        this.view.btnClose.off(Laya.Event.CLICK, this,this.onCloseBtnClick);
    }
    private onCloseBtnClick(e):void
    {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP);
        Tween.to(this.view.graptitleImage, { x: -227 }, 100);
        Tween.to(this.view.graphtagPanel, { x: 755 }, 100, null, Handler.create(this, this.dispose));
    }

    public dispose():void
    {
        if(this.view)
        {
            Laya.Tween.clearAll(this.view.graptitleImage);
            Laya.Tween.clearAll(this.view.graphtagPanel);
        }
        super.dispose();
        
    }
}