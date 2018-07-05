/*
* 进入游戏
*/
class EnterGameMediator extends BaseMediator{
    private choiceServerMediator:ChoiceServerMediator;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.EnterGameViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();
        //选择服务器列表
        this.choiceServerMediator = new ChoiceServerMediator(null,this.view.serverListView,this,this.updateServerInfo);
        AnimationManager.ins.popCenterLittleToBig(this.view,300);
        this.updateServerInfo();
    }
    protected addEvents():void
    {
        this.view.btnLogin.on(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnChoice.on(Laya.Event.CLICK,this,this.onBtnChoice);
        this.view.btnSelect.on(Laya.Event.CLICK,this,this.onBtnChoice);
        this.view.btnRegster.on(Laya.Event.CLICK,this,this.onBtnRegster);
        WebSocketManager.ins.registerHandler(Protocol.USER_LOGIN,Protocol.USER_LOGIN_CMD,new UserLoginHandler(this,this.onWebSocketLogined));
        
    }

    protected removeEvents():void
    {
        this.view.btnLogin.off(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnChoice.off(Laya.Event.CLICK,this,this.onBtnChoice);
        this.view.btnSelect.off(Laya.Event.CLICK,this,this.onBtnChoice);
        this.view.btnRegster.off(Laya.Event.CLICK,this,this.onBtnRegster);
        WebSocketManager.ins.unregisterHandler(Protocol.USER_LOGIN,Protocol.USER_LOGIN_CMD,this);
        
    }

    private onWebSocketLogined(data):void
    {
        console.log("登录成功。。。"+data);  
        PreLoadingView.ins.show();
        SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        this.dispose();  
        
    }
    
    public updateServerInfo():void
    {
        if(GameDataManager.ins.curServerInfo)
        {
            this.view.lblServName.text = GameDataManager.ins.curServerInfo.name;
            var sevState:number = GameDataManager.ins.curServerInfo.state;
            if(sevState > 2)
                sevState = 2;
            this.view.imgServState.skin = "login/img_state"+sevState+".png";
        }
    }
    
    private onBtnLogin(e:Laya.Event):void
    {
        if(GameConfig.SINGLE_GAME)
        {
            //单机测试
            PreLoadingView.ins.show();
            SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
            this.dispose();
        }
        else
        {
            //登录web服
            var curServerInfo:ServerInfoVo = GameDataManager.ins.curServerInfo;
            ClientSender.httpEnterGameReq(curServerInfo.guid,this,this.webEnterGameHanlder);
        }

    }

    private onBtnRegster(e:Laya.Event):void{
        // var enterGameMediator:SignMediator = new SignMediator();     
        // window.history.forward();
        // window.history.back();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
    }


    private webEnterGameHanlder(data):void
    {
        var jsonObj:any = JSON.parse(data);
        if(jsonObj.code == 200)
        {
            GameDataManager.ins.loginToken = jsonObj.token;
            EventManager.ins.addEvent(EventManager.SERVER_CONNECTED,this,this.onServerConnected);
            WebSocketManager.ins.connect(GameDataManager.ins.curServerInfo.ip,GameDataManager.ins.curServerInfo.port);
        }
        else
        {
            console.log("进入服务器异常！错误码："+jsonObj.code);
        }
    }

    private onServerConnected():void
    {
        EventManager.ins.removeEvent(EventManager.SERVER_CONNECTED,this.onServerConnected);
        ClientSender.loginReq(GameDataManager.ins.selfPlayerData.name);
    }

    private onBtnChoice():void{
        this.choiceServerMediator.show();     
    }

    public dispose():void
    {
        this.choiceServerMediator.dispose();
        super.dispose();
    }
}