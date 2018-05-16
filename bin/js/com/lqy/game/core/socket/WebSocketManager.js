var ProtoBuf = Laya.Browser.window.protobuf;
/*
* websocket管理器
*/
var WebSocketManager = /** @class */ (function () {
    function WebSocketManager() {
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
        ProtoBuf.load("text.proto");
        this.webSocket = new Laya.Socket();
        this.webSocket.on(Laya.Event.OPEN, this, this.webSocketOpen);
        this.webSocket.on(Laya.Event.MESSAGE, this, this.webSocketMessage);
        this.webSocket.on(Laya.Event.CLOSE, this, this.webSocketClose);
        this.webSocket.on(Laya.Event.ERROR, this, this.webSocketError);
        // this.webSocket.connectByUrl("ws://"+ip+":"+port);
    };
    WebSocketManager.prototype.webSocketOpen = function () {
        console.log("websockt open...");
    };
    WebSocketManager.prototype.webSocketMessage = function () {
        console.log("websockt msg...");
    };
    WebSocketManager.prototype.webSocketClose = function () {
        console.log("websockt close...");
    };
    WebSocketManager.prototype.webSocketError = function () {
        console.log("websockt error...");
    };
    WebSocketManager._ins = null;
    return WebSocketManager;
}());
//# sourceMappingURL=WebSocketManager.js.map