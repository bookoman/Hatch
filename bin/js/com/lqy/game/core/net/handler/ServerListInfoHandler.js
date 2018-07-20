var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var ServerListInfoHandler = /** @class */ (function (_super) {
    __extends(ServerListInfoHandler, _super);
    function ServerListInfoHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    ServerListInfoHandler.prototype.explain = function (data) {
        var ResServerList = WebSocketManager.ins.defineProtoClass("ResServerList");
        var message = ResServerList.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    ServerListInfoHandler.prototype.success = function (message) {
        var gameDataMgr = GameDataManager.ins;
        gameDataMgr.serverList = new Array();
        var serInfoVo;
        var info;
        for (var i = 0; i < message.serverInfoList.length; i++) {
            info = message.serverInfoList[i];
            if (info) {
                serInfoVo = new ServerInfoVo();
                serInfoVo.ip = info.ip;
                serInfoVo.port = info.port;
                serInfoVo.serverId = info.serverId;
                serInfoVo.serverName = info.serverName;
                serInfoVo.state = info.state;
                gameDataMgr.serverList.push(serInfoVo);
            }
        }
        if (!gameDataMgr.curServerInfo) {
            gameDataMgr.curServerInfo = gameDataMgr.serverList[0];
        }
        _super.prototype.success.call(this);
    };
    return ServerListInfoHandler;
}(SocketHanlder));
//# sourceMappingURL=ServerListInfoHandler.js.map