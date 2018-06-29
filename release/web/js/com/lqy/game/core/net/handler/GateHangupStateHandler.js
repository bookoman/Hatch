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
* 关卡挂机状态
*/
var GateHangupStateHandler = /** @class */ (function (_super) {
    __extends(GateHangupStateHandler, _super);
    function GateHangupStateHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    GateHangupStateHandler.prototype.explain = function (data) {
        var HangupStateResponse = WebSocketManager.ins.defineProtoClass("HangupStateResponse");
        var message = HangupStateResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    GateHangupStateHandler.prototype.success = function (message) {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        GameDataManager.ins.hangGateKey = message.gateKey;
        _super.prototype.success.call(this);
        // GameDataManager.ins.saveGateHandupInfo(message);
    };
    return GateHangupStateHandler;
}(SocketHanlder));
//# sourceMappingURL=GateHangupStateHandler.js.map