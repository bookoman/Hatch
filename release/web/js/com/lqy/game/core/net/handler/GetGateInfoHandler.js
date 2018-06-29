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
var GetGateInfoHandler = /** @class */ (function (_super) {
    __extends(GetGateInfoHandler, _super);
    function GetGateInfoHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    GetGateInfoHandler.prototype.explain = function (data) {
        var GateInfoResponse = WebSocketManager.ins.defineProtoClass("GateInfoResponse");
        var message = GateInfoResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    GetGateInfoHandler.prototype.success = function (message) {
        var jsonObj = JSON.parse(message.roleGateInfo);
        GameDataManager.ins.saveGateInfoVoInfo(jsonObj);
        // console.log(message.roleGateInfo);
        _super.prototype.success.call(this);
    };
    return GetGateInfoHandler;
}(SocketHanlder));
//# sourceMappingURL=GetGateInfoHandler.js.map