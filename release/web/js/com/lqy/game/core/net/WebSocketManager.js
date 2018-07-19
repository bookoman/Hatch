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
        // var protoBufUrls = ["res/outside/proto/login.proto","res/outside/proto/role.proto","res/outside/proto/hero.proto",
        // "res/outside/proto/gate.proto"];
        var protoBufUrls = "res/outside/proto/userMessage.proto";
        Laya.Browser.window.protobuf.load(protoBufUrls, this.protoLoadComplete);
    };
    WebSocketManager.prototype.protoLoadComplete = function (error, root) {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://" + WebSocketManager.ins.ip + ":" + WebSocketManager.ins.port);
    };
    WebSocketManager.prototype.webSocketOpen = function () {
        console.log("websocket open...");
        WebSocketManager.codeCount = 1;
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    };
    WebSocketManager.prototype.webSocketMessage = function (data) {
        var packageIn = new PackageIn();
        packageIn.read(data);
        // console.log("websocket msg...",packageIn.module,packageIn.cmd);
        // var key:string = packageIn.module+"_"+ packageIn.cmd;
        console.log("websocket msg...", packageIn.cmd);
        var key = "" + packageIn.cmd;
        var handlers = this.socketHanlderDic.get(key);
        handlers.forEach(function (socketHanlder) {
            socketHanlder.explain(packageIn.body);
        });
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