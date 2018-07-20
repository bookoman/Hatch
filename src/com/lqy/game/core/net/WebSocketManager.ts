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
        if(!this.protoRoot){
            var protoBufUrls = ["res/outside/proto/userMessage.proto","res/outside/proto/loginMessage.proto",
            "res/outside/proto/playerMessage.proto","res/outside/proto/skillMessage.proto"];
            Laya.Browser.window.protobuf.load(protoBufUrls,this.protoLoadComplete);
        }
    }
    /**关闭websocket */
    public closeSocket():void
    {
        if(this.webSocket)
        {
            this.webSocket.off(Laya.Event.OPEN,this,this.webSocketOpen);
            this.webSocket.off(Laya.Event.MESSAGE,this,this.webSocketMessage);
            this.webSocket.off(Laya.Event.CLOSE,this,this.webSocketClose);
            this.webSocket.off(Laya.Event.ERROR,this,this.webSocketError);
            this.webSocket.close();
            this.webSocket = null;
        }
    }
   
    private protoLoadComplete(error,root):void
    {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://"+WebSocketManager.ins.ip+":"+WebSocketManager.ins.port);
    }
    private webSocketOpen():void
    {
        console.log("websocket open...");
        this.byteBuffData = new Laya.Byte();
        this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN;//设置endian;
        this.byteDataPos = 0;
        this.byteLent = new Laya.Byte();
        this.byteLent.endian = Laya.Byte.BIG_ENDIAN;

        WebSocketManager.codeCount = 1;
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    }
    //缓冲字节数组
    private byteBuffData:Laya.Byte;
    //长度字节数组
    private byteLent:Laya.Byte;
    //当前读取位置
    private byteDataPos:number;
    private parsePackageData(packLen:number):void
    {
        var packageIn:PackageIn = new PackageIn();
        var buff = this.byteBuffData.buffer.slice(this.byteDataPos,packLen);
        packageIn.read(buff);

        console.log("websocket msg...",packageIn.cmd);
        var key:string = ""+ packageIn.cmd;
        var handlers = this.socketHanlderDic.get(key);
        if(handlers)
        {
            handlers.forEach(socketHanlder => {
                socketHanlder.explain(packageIn.body);
            });
        }
        this.byteDataPos = packLen;
        //递归检测是否有完整包
        if(this.byteBuffData.length > 4)
        {
            this.byteLent.clear();
            this.byteLent.writeArrayBuffer(this.byteBuffData.buffer,this.byteDataPos,4);
            this.byteLent.pos = 0;
            packLen = this.byteDataPos + this.byteLent.getInt32() + 4;
            if(this.byteBuffData.length >= packLen)
            {
                this.parsePackageData(packLen);
            }
            else
            {
                //断包处理
                this.byteBuffData = new Laya.Byte(this.byteBuffData.getUint8Array(this.byteDataPos,this.byteBuffData.length));
                this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN;//设置endian;
                this.byteDataPos = 0;
            }
        }
        
    }
    private webSocketMessage(data):void
    {
        this.byteBuffData.writeArrayBuffer(data);

        if(this.byteBuffData.length > 4)
        {
            this.byteLent.clear();
            this.byteLent.writeArrayBuffer(this.byteBuffData.buffer,this.byteDataPos,4);
            this.byteLent.pos = 0;
            var packLen:number = this.byteDataPos + this.byteLent.getInt32() + 4;
            if(this.byteBuffData.length >= packLen)
            {
                this.parsePackageData(packLen);
            }
            else
            {
                //断包处理
                this.byteBuffData = new Laya.Byte(this.byteBuffData.getUint8Array(this.byteDataPos,this.byteBuffData.length));
                this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN;//设置endian;
                this.byteDataPos = 0;
            }
        }





        // var packageIn:PackageIn = new PackageIn();
        // packageIn.read(data);

        // console.log("websocket msg...",packageIn.cmd);
        // var key:string = ""+ packageIn.cmd;
        // var handlers = this.socketHanlderDic.get(key);
        // handlers.forEach(socketHanlder => {
        //     socketHanlder.explain(packageIn.body);
        // });
        
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
