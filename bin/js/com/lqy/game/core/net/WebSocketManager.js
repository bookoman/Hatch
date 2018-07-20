/*
* websocket管理器
*/
var WebSocketManager = /** @class */ (function () {
    function WebSocketManager() {
        this.socketHanlderDic = new Laya.Dictionary();
    }
    Object.defineProperty(WebSocketManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new WebSocketManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    WebSocketManager.prototype.connect = function (ip, port) {
        this.ip = ip;
        this.port = port;
        this.webSocket = new Laya.Socket();
        this.webSocket.on(Laya.Event.OPEN, this, this.webSocketOpen);
        this.webSocket.on(Laya.Event.MESSAGE, this, this.webSocketMessage);
        this.webSocket.on(Laya.Event.CLOSE, this, this.webSocketClose);
        this.webSocket.on(Laya.Event.ERROR, this, this.webSocketError);
        //加载协议
        var protoBufUrls = ["res/outside/proto/userMessage.proto", "res/outside/proto/loginMessage.proto",
            "res/outside/proto/playerMessage.proto", "res/outside/proto/skillMessage.proto"];
        Laya.Browser.window.protobuf.load(protoBufUrls, this.protoLoadComplete);
    };
    WebSocketManager.prototype.protoLoadComplete = function (error, root) {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://" + WebSocketManager.ins.ip + ":" + WebSocketManager.ins.port);
    };
    WebSocketManager.prototype.webSocketOpen = function () {
        console.log("websocket open...");
        this.byteBuffData = new Laya.Byte();
        this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN; //设置endian;
        this.byteDataPos = 0;
        this.byteLent = new Laya.Byte();
        this.byteLent.endian = Laya.Byte.BIG_ENDIAN;
        WebSocketManager.codeCount = 1;
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    };
    WebSocketManager.prototype.parsePackageData = function (packLen) {
        var packageIn = new PackageIn();
        var buff = this.byteBuffData.buffer.slice(this.byteDataPos, packLen);
        packageIn.read(buff);
        console.log("websocket msg...", packageIn.cmd);
        var key = "" + packageIn.cmd;
        var handlers = this.socketHanlderDic.get(key);
        if (handlers) {
            handlers.forEach(function (socketHanlder) {
                socketHanlder.explain(packageIn.body);
            });
        }
        this.byteDataPos = packLen;
        //递归检测是否有完整包
        if (this.byteBuffData.length > 4) {
            this.byteLent.clear();
            this.byteLent.writeArrayBuffer(this.byteBuffData.buffer, this.byteDataPos, 4);
            this.byteLent.pos = 0;
            packLen = this.byteDataPos + this.byteLent.getInt32() + 4;
            if (this.byteBuffData.length >= packLen) {
                this.parsePackageData(packLen);
            }
            else {
                //断包处理
                this.byteBuffData = new Laya.Byte(this.byteBuffData.getUint8Array(this.byteDataPos, this.byteBuffData.length));
                this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN; //设置endian;
                this.byteDataPos = 0;
            }
        }
    };
    WebSocketManager.prototype.webSocketMessage = function (data) {
        this.byteBuffData.writeArrayBuffer(data);
        if (this.byteBuffData.length > 4) {
            this.byteLent.clear();
            this.byteLent.writeArrayBuffer(this.byteBuffData.buffer, this.byteDataPos, 4);
            this.byteLent.pos = 0;
            var packLen = this.byteDataPos + this.byteLent.getInt32() + 4;
            if (this.byteBuffData.length >= packLen) {
                this.parsePackageData(packLen);
            }
            else {
                //断包处理
                this.byteBuffData = new Laya.Byte(this.byteBuffData.getUint8Array(this.byteDataPos, this.byteBuffData.length));
                this.byteBuffData.endian = Laya.Byte.BIG_ENDIAN; //设置endian;
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
    };
    WebSocketManager.prototype.webSocketClose = function () {
        console.log("websocket close...");
    };
    WebSocketManager.prototype.webSocketError = function () {
        console.log("websocket error...");
    };
    /**
     * 发送消息
     * @param cmd
     * @param data
     */
    WebSocketManager.prototype.sendMsg = function (cmd, data) {
        var packageOut = new PackageOut();
        // packageOut.pack(module,cmd,data);
        packageOut.pack(cmd, data);
        this.webSocket.send(packageOut.buffer);
    };
    /**
     * 定义protobuf类
     * @param protoType 协议模块类型
     * @param classStr 类
     */
    WebSocketManager.prototype.defineProtoClass = function (classStr) {
        return this.protoRoot.lookup(classStr);
    };
    /**注册 */
    WebSocketManager.prototype.registerHandler = function (cmd, handler) {
        // var key:string = protocol+"_"+cmd;
        var key = "" + cmd;
        var handlers = this.socketHanlderDic.get(key);
        if (!handlers) {
            handlers = [];
            handlers.push(handler);
            this.socketHanlderDic.set(key, handlers);
        }
        else {
            handlers.push(handler);
        }
    };
    /**删除 */
    WebSocketManager.prototype.unregisterHandler = function (cmd, caller) {
        var key = "" + cmd;
        var handlers = this.socketHanlderDic.get(key);
        if (handlers) {
            var handler;
            for (var i = handlers.length - 1; i >= 0; i--) {
                handler = handlers[i];
                if (handler.caller === caller) {
                    handlers.splice(i, 1);
                }
            }
            if (handlers.length == 0) {
                this.socketHanlderDic.remove(key);
            }
        }
    };
    /**通信code次数 */
    WebSocketManager.codeCount = 0;
    WebSocketManager._ins = null;
    return WebSocketManager;
}());
//# sourceMappingURL=WebSocketManager.js.map