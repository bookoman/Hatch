/*
* websocket管理器
*/
class WebSocketManager{
    /**通信code次数 */
    public static codeCount:number = 0;
    private ip:string;
    private port:number;
    private webSocket:Laya.Socket;
    private socketHanlderDic:Laya.Dictionary;
    private protoRoot:any;
    constructor(){
        this.socketHanlderDic = new Laya.Dictionary();
    }
    private static _ins:WebSocketManager = null;
    public static get ins():WebSocketManager{
        if(this._ins == null)
        {  
            this._ins = new WebSocketManager();
        }
        return this._ins;
    }

    public connect(ip:string,port:number):void
    {
        this.ip = ip;
        this.port = port;

        this.webSocket = new Laya.Socket();
        this.webSocket.on(Laya.Event.OPEN,this,this.webSocketOpen);
        this.webSocket.on(Laya.Event.MESSAGE,this,this.webSocketMessage);
        this.webSocket.on(Laya.Event.CLOSE,this,this.webSocketClose);
        this.webSocket.on(Laya.Event.ERROR,this,this.webSocketError);
        //加载协议
        var protoBufUrls = ["res/outside/proto/userMessage.proto","res/outside/proto/loginMessage.proto",
        "res/outside/proto/playerMessage.proto","res/outside/proto/skillMessage.proto"];
        Laya.Browser.window.protobuf.load(protoBufUrls,this.protoLoadComplete);
    }
    
   
    private protoLoadComplete(error,root):void
    {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://"+WebSocketManager.ins.ip+":"+WebSocketManager.ins.port);
    }
    private webSocketOpen():void
    {
        console.log("websocket open...");
        WebSocketManager.codeCount = 1;
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    }
    
    private webSocketMessage(data):void
    {
        var packageIn:PackageIn = new PackageIn();
        packageIn.read(data);
        // console.log("websocket msg...",packageIn.module,packageIn.cmd);
        // var key:string = packageIn.module+"_"+ packageIn.cmd;
        console.log("websocket msg...",packageIn.cmd);
        var key:string = ""+ packageIn.cmd;
        var handlers = this.socketHanlderDic.get(key);
        handlers.forEach(socketHanlder => {
            socketHanlder.explain(packageIn.body);
        });
        
    }
    private webSocketClose():void
    {
         console.log("websocket close...");
    }
    private webSocketError():void
    {
         console.log("websocket error...");
    }
    /**
     * 发送消息
     * @param cmd 
     * @param data 
     */
    public sendMsg(cmd:number,data?:any):void
    {
        var packageOut:PackageOut = new PackageOut();
        // packageOut.pack(module,cmd,data);
        packageOut.pack(cmd,data);
        this.webSocket.send(packageOut.buffer);
    }
    /**
     * 定义protobuf类
     * @param protoType 协议模块类型
     * @param classStr 类
     */
    public defineProtoClass(classStr:string):any
    {
        return this.protoRoot.lookup(classStr);
    }

    /**注册 */
    public registerHandler(cmd:number,handler:SocketHanlder):void
    {
        // var key:string = protocol+"_"+cmd;
        var key:string = ""+cmd;
        var handlers:Array<SocketHanlder> = this.socketHanlderDic.get(key);
        if(!handlers)
        {
            handlers = [];
            handlers.push(handler);
            this.socketHanlderDic.set(key,handlers);
        }
        else
        {
            handlers.push(handler);
        }
    }
    /**删除 */
    public unregisterHandler(cmd:number,caller:any):void
    {
        var key:string = "" + cmd;
        var handlers:Array<SocketHanlder> = this.socketHanlderDic.get(key);
        if(handlers)
        {
            var handler;
            for(var i = handlers.length - 1;i >= 0 ;i--)
            {
                handler = handlers[i];
                if(handler.caller === caller)
                {
                    handlers.splice(i,1);
                }
            }
            if(handlers.length == 0)
            {
                this.socketHanlderDic.remove(key);
            }
        }
    }
}
