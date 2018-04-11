/*
* name;
*/
class LoginMediator extends BaseMediator{
    constructor(assetsUrl = null,view = null){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.LoginViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.BG_LAYER,true,false,true);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnLogin.on(Laya.Event.CLICK,this,this.onBtnLogin);
    }

    protected removeEvents():void
    {
        this.view.btnLogin.off(Laya.Event.CLICK,this,this.onBtnLogin);
    }
        
    
    public dispose():void
    {
        
    }
    private onBtnLogin(e:Laya.Event):void
    {
        SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
    }
}