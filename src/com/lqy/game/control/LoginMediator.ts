/*
* 登录
*/
class LoginMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    
    protected initView():void
    {
        this.view = new ui.LoginViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
         
        super.initView();

        Laya.Tween.to(this.view.logoImg,{y:110},500,Laya.Ease.backOut);
        Laya.Tween.to(this.view.boxLogin,{y:418},500,Laya.Ease.backOut);

        SoundsManager.ins.playerMusicByEnum(MusicBGType.LOGIN_BG,1000);

        WebSocketManager.ins.connect(LoginServerInfo.IP,LoginServerInfo.PORT);

        // TankUtil.stageShake(this.view,10);
    }
    protected addEvents():void
    {
        this.view.btnLogin.on(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnRegister.on(Laya.Event.CLICK,this,this.onBtnRegister);

        WebSocketManager.ins.registerHandler(Protocol.USER_LOGIN_RESP,new UserLoginHandler(this,this.onWebSocketLogined));
        WebSocketManager.ins.registerHandler(Protocol.SERVER_LIST_RESP,new UserLoginHandler(this,this.onServerListRes));
    }

    protected removeEvents():void
    {
        this.view.btnLogin.off(Laya.Event.CLICK,this,this.onBtnLogin);
        this.view.btnRegister.off(Laya.Event.CLICK,this,this.onBtnRegister);

        WebSocketManager.ins.unregisterHandler(Protocol.USER_LOGIN_RESP,this);
        WebSocketManager.ins.unregisterHandler(Protocol.SERVER_LIST_RESP,this);
    }
    private onWebSocketLogined(data):void
    {
        console.log("登录成功。。。"+data);  
        // PreLoadingView.ins.show();
        // SceneMananger.ins.enter(SceneMananger.PRE_LOAD_SCENE);
        // this.dispose();  
    }
    private onServerListRes(data):void
    {

    }

    private onBtnRegister(e):void
    {
        var account:string = this.view.inputAccount.text;
        var pwd:string = this.view.inputPwd.text;
        if(!account || account == "")
        {
            console.log("用户名不能为空");
            return;
        }
        if(!pwd || pwd == "")
        {
            console.log("密码不能为空");
            return;
        }
        ClientSender.registerReq(account,pwd);
    }
    private onBtnLogin(e):void
    {
        if(GameConfig.SINGLE_GAME)
        {
            var jsonObj = JSON.parse('{"authentication": "taoken888888888888","data":"'+this.view.inputAccount.text+'"}');
            GameDataManager.ins.saveSelfPlayerData(jsonObj);
            //服务器列表
            jsonObj = JSON.parse(GameConfig.serverInfos);
            GameDataManager.ins.saveServerInfoList(jsonObj.data,jsonObj.lastInGameServers);

            //单机测试
            var resAry:Array<Object> = [
                {url:"unpack/login/logo.png",type:Loader.IMAGE}
            ];
            var enterGameMediator:EnterGameMediator = new EnterGameMediator(resAry);
        }
        else
        {
            //发送请求
            var account:string = this.view.inputAccount.text;
            var pwd:string = this.view.inputPwd.text;
            if(!account || account == "")
            {
                console.log("用户名不能为空");
                return;
            }
            if(!pwd || pwd == "")
            {
                console.log("密码不能为空");
                return;
            }
            // ClientSender.httpLoginReq(account,pwd,this,this.loginSuccessHanlder);
            ClientSender.loginReq(account,pwd);
           
            
        }

    }
    

    private loginSuccessHanlder(data:any):void
    {
        var jsonObj:any = JSON.parse(data);
        if(jsonObj.code == 200)
        {
            GameDataManager.ins.saveSelfPlayerData(jsonObj)
            // ClientSender.httpGameServerReq(this,this.onGameServersList);
        }
        else
        {
            console.log("登录异常！错误码:"+jsonObj.code);
        }
    }
    
    private onGameServersList(data):void
    {
        var jsonObj:any = JSON.parse(data);
        if(jsonObj.code == 200)
        {
            GameDataManager.ins.saveServerInfoList(jsonObj.data,jsonObj.lastInGameServers);
            var resAry:Array<Object> = [
                {url:"unpack/login/logo.png",type:Loader.IMAGE}
            ];
            var enterGameMediator:EnterGameMediator = new EnterGameMediator(resAry);

            this.dispose();
        }
        else
        {
            console.log("获取服务器列表异常！错误码："+jsonObj.code);
        }
    }

    public dispose():void
    {
        super.dispose();
    }
}