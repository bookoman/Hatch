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

    private onBtnLogin(e):void
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

        ClientSender.httpLoginReq(account,pwd,this,this.loginSuccessHanlder);
    }

    private loginSuccessHanlder(data:any):void
    {
        var jsonObj:any = JSON.parse(data);
        if(jsonObj.code == 200)
        {
            GameDataManager.ins.saveSelfPlayerData(jsonObj)
            ClientSender.httpGameServerReq(this,this.onGameServersList);
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