/*
* websocket管理器
*/
class WebSocketManager{
    private ProtoBuf:any  = Laya.Browser.window.protobuf;
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

        this.ProtoBuf.load("res/outside/proto/login.proto",this.protoLoadComplete);
    }
    private protoLoadComplete(error,root):void
    {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://"+WebSocketManager.ins.ip+":"+WebSocketManager.ins.port);
    }
    private webSocketOpen():void
    {
        console.log("websocket open...");
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    }
    
    private webSocketMessage(data):void
    {
        console.log("websocket msg...");
        var packageIn:PackageIn = new PackageIn();
        packageIn.read(data);
        var socketHanlder:SocketHanlder = this.socketHanlderDic.get(packageIn.module);
        if(socketHanlder)
        {
            socketHanlder.explain(packageIn.errorCode,packageIn.body);
        }
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
    public sendMsg(module:number,cmd:number,data?:any):void
    {
        var packageOut:PackageOut = new PackageOut();
        packageOut.pack(module,cmd,data);
        this.webSocket.send(packageOut.buffer);
    }
    /**定义protobuf类 */
    public defineProtoClass(classStr:string):any
    {
        return this.protoRoot.lookup(classStr);
    }

    /**注册 */
    public registerHandler(protocol:number,handler:SocketHanlder):void
    {
        var handlers:Array<SocketHanlder> = this.socketHanlderDic.get(protocol);
        if(!handlers)
        {
            handlers = new Array();
            this.socketHanlderDic.set(protocol,handler);
        }
        handlers.push(handler);
    }
    /**删除 */
    public unregisterHandler(protocol:number,handler:SocketHanlder):void
    {
        var handlers:Array<SocketHanlder> = this.socketHanlderDic.get(protocol);
        if(handlers)
        {
            handlers.splice(handlers.indexOf(handler),1);
            if(handlers.length == 0)
            {
                this.socketHanlderDic.remove(protocol);
            }
        }
    }
}
