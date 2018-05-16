/*
* name;
*/
class LoginMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.LoginViewUI();
        AnimationManager.ins.popCenterLittleToBig(this.view,300);
        LayerManager.ins.addToLayer(this.view,LayerManager.BG_LAYER,true,false,true);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnLogin.on(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnChoice.on(Laya.Event.CLICK,this,this.onBtnChoice);

        WebSocketManager.ins.registerHandler(Protocol.USER_LOGIN,new UserLoginHandler(Protocol.USER_LOGIN,this,this.onLogined));
    }

    protected removeEvents():void
    {
        this.view.btnLogin.off(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnChoice.off(Laya.Event.CLICK,this,this.onBtnChoice);
    }
    private onLogined(data):void
    {
      
        if(data.statusCode == 0)
        {
            console.log("登录成功。。。"+data);    
            PreLoadingView.ins.show();
            SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        }
        
    }
    
    public dispose():void
    {
        
    }
    private onBtnLogin(e:Laya.Event):void
    {
        EventManager.ins.addEvent(EventManager.SERVER_CONNECTED,this,this.onServerConnected);
        var serverID:string = this.view.inputSIP.text;
        var port:number = Number(this.view.inputPort.text);
        WebSocketManager.ins.connect(serverID,port);
        
    }
    private onServerConnected():void
    {
        EventManager.ins.removeEvent(EventManager.SERVER_CONNECTED,this.onServerConnected);
        ClientSender.loginReq(this.view.inputAccount.text);


        
    }

    private onBtnChoice():void{
        new ChoiceMediator();       
    }
}