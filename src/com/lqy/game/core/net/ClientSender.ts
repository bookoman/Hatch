/*
* 客户端发送器
*/
class ClientSender{

    constructor(){

    }

    /**********************************webSocket */
    /**
     * 用户注册
     */
    public static registerReq(userName:string,userPass:string):void
    {
        var ReqRegisterUser:any = WebSocketManager.ins.defineProtoClass("ReqRegisterUser");
        var message:any = {};
        message.userName = userName;
        message.userPass = userPass;
        var buffer = ReqRegisterUser.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_REGISTER_REQ,buffer);
    }

    /**
     * 用户登录
     * @param userName 
     * @param userPass 
     */
    public static loginReq(userName:string,userPass:string):void
    {
        var ReqUserLogin:any = WebSocketManager.ins.defineProtoClass("ReqUserLogin");
        var message:any = {};
        message.userName = userName;
        message.userPass = userPass;
        message.clientId = 0;
        var buffer = ReqUserLogin.encode(message).finish();
        WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN_REQ,buffer);
    }





    /**登录请求 */
    // public static loginReq(account:string):void
    // {
    //     var LoginRequest:any = WebSocketManager.ins.defineProtoClass("LoginRequest");
    //     var message:any = {};
    //     message.name = account;
    //     message.token = GameDataManager.ins.loginToken;
    //     message.nickname = "xielong";
    //     var buffer = LoginRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.USER_LOGIN,Protocol.USER_LOGIN_CMD,buffer);
    // }
    // /**获取英雄信息 */
    // public static getHeroInfoReq(statusCode:number):void
    // {
    //     var HeroInfoRequest:any = WebSocketManager.ins.defineProtoClass("HeroInfoRequest");
    //     var message:any = {};
    //     message.statusCode = statusCode;
    //     var buffer = HeroInfoRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.HERO,Protocol.HERO_GET_INFOS,buffer);
    // }
    // /**英雄上、下、更新阵型 */
    // public static heroLinuepUpdateReq(lineupId:number,heroId:string,isUp:boolean):void
    // {
    //     if(!isUp && GameDataManager.ins.selfPlayerData.heroLineupDic.values.length <= 1)
    //     {
    //         TipsManager.ins.showFloatMsg("阵上英雄不得少于一个",30,"#ff0000",LayerManager.ins.getLayer(LayerManager.TIP_LAYER),GameConfig.STAGE_WIDTH/2,GameConfig.STAGE_HEIGHT/2,1,0,200);
    //         return;
    //     }
    //     var UpdateFormationRequest:any = WebSocketManager.ins.defineProtoClass("UpdateFormationRequest");
    //     var message:any = {};
    //     message.siteIdx = lineupId;
    //     message.heroId = heroId;
    //     message.flag = isUp;
    //     var buffer = UpdateFormationRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.HERO,Protocol.HERO_UPDATE_FORMATION,buffer);
    // }
    // /**请求关卡信息 */
    // public static gateGateInfoReq():void
    // {
    //     var GateInfoRequest = WebSocketManager.ins.defineProtoClass("GateInfoRequest");
    //     var message:any = {};
    //     message.statusCode = 1;
    //     var buffer = GateInfoRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_INFO,buffer);
    // }
    // /**挑战关卡 */
    // public static ballteGateReq(gateKey:string):void
    // {
    //     var BattleGateRequest = WebSocketManager.ins.defineProtoClass("BattleGateRequest");
    //     var message:any = {};
    //     message.gateKey = gateKey;
    //     var buffer = BattleGateRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_BATTLE,buffer);
    // }

    // /**请求扫荡关卡 */
    // public static scanGateReq(gateKey:string):void
    // {
    //     var ScanGateRequest = WebSocketManager.ins.defineProtoClass("ScanGateRequest");
    //     var message:any = {};
    //     message.gateKey = gateKey;
    //     var buffer = ScanGateRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_SCAN,buffer);
    // }
    // /**请求关卡挂机奖励信息 */
    // public static gateHangupStateReq():void
    // {
    //     var HangupStateRequest = WebSocketManager.ins.defineProtoClass("HangupStateRequest");
    //     var message:any = {};
    //     message.statusCode = 1;
    //     var buffer = HangupStateRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_HANDUP_STATE,buffer);
    //     // WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_HANDUP_STATE);
    // }
    // /**请求关卡挂机信息 */
    // public static gateSwitchHangReq(gateKey:string):void
    // {
    //     var SwitchHangGateRequest = WebSocketManager.ins.defineProtoClass("SwitchHangGateRequest");
    //     var message:any = {};
    //     message.gateKey = gateKey;
    //     var buffer = SwitchHangGateRequest.encode(message).finish();
    //     WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_SWITCH_HANG_GATE,buffer);
    //     // WebSocketManager.ins.sendMsg(Protocol.GATE,Protocol.GATE_HANDUP_STATE);
    // }
    


    // /**********************************Http */
    // /**测试登录 */
    // public static httpLoginReq(account:string,pwd:string,caller?:any,callBack?:Function):void
    // {
    //     var params:any = {};
    //     params.account = account;
    //     params.password = pwd;
    //     HttpManager.ins.send(HTTPRequestUrl.testLoginURL,HTTPReqType.GET,params,caller,callBack);
    // }
    // /**获取服务器列表 */
    // public static httpGameServerReq(caller?:any,callBack?:Function):void
    // {
    //     HttpManager.ins.send(HTTPRequestUrl.gameServerURL,HTTPReqType.GET,null,caller,callBack);
    // }
    // /**进入游戏 */
    // public static httpEnterGameReq(sid:number,caller?:any,callBack?:Function):void
    // {
    //     var params:any = {};
    //     params.sid = sid;
    //     HttpManager.ins.send(HTTPRequestUrl.enterGameURL,HTTPReqType.GET,params,caller,callBack);
    // }
}