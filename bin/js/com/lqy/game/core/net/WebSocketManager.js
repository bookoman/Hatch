/*
* websocket管理器
*/
var WebSocketManager = /** @class */ (function () {
    function WebSocketManager() {
        this.ProtoBuf = Laya.Browser.window.protobuf;
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
        var urls = ["res/outside/proto/login.proto", "res/outside/proto/role.proto", "res/outside/proto/hero.proto"];
        this.ProtoBuf.load(urls, this.protoLoadComplete);
    };
    WebSocketManager.prototype.protoLoadComplete = function (error, root) {
        WebSocketManager.ins.protoRoot = root;
        WebSocketManager.ins.webSocket.connectByUrl("ws://" + WebSocketManager.ins.ip + ":" + WebSocketManager.ins.port);
        var test = WebSocketManager.ins.defineProtoClass("HeroInfoRequest");
    };
    WebSocketManager.prototype.webSocketOpen = function () {
        console.log("websocket open...");
        EventManager.ins.dispatchEvent(EventManager.SERVER_CONNECTED);
    };
    WebSocketManager.prototype.webSocketMessage = function (data) {
        console.log("websocket msg...");
        var packageIn = new PackageIn();
        packageIn.read(data);
        var socketHanlder = this.socketHanlderDic.get(packageIn.module);
        if (socketHanlder) {
            socketHanlder.explain(packageIn.body);
        }
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
    WebSocketManager.prototype.sendMsg = function (module, cmd, data) {
        var packageOut = new PackageOut();
        packageOut.pack(module, cmd, data);
        this.webSocket.send(packageOut.buffer);
    };
    /**定义protobuf类 */
    WebSocketManager.prototype.defineProtoClass = function (classStr) {
        return this.protoRoot.lookup(classStr);
    };
    /**注册 */
    WebSocketManager.prototype.registerHandler = function (protocol, handler) {
        var handlers = this.socketHanlderDic.get(protocol);
        if (!handlers) {
            handlers = new Array();
            this.socketHanlderDic.set(protocol, handler);
        }
        handlers.push(handler);
    };
    /**删除 */
    WebSocketManager.prototype.unregisterHandler = function (protocol, handler) {
        var handlers = this.socketHanlderDic.get(protocol);
        if (handlers) {
            handlers.splice(handlers.indexOf(handler), 1);
            if (handlers.length == 0) {
                this.socketHanlderDic.remove(protocol);
            }
        }
    };
    WebSocketManager._ins = null;
    return WebSocketManager;
}());
//# sourceMappingURL=WebSocketManager.js.map