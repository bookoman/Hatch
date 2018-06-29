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
* 关卡切换挂机
*/
var GateSwitchHangupHandler = /** @class */ (function (_super) {
    __extends(GateSwitchHangupHandler, _super);
    function GateSwitchHangupHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    GateSwitchHangupHandler.prototype.explain = function (data) {
        var SwitchHangGateResponse = WebSocketManager.ins.defineProtoClass("SwitchHangGateResponse");
        var message = SwitchHangGateResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    GateSwitchHangupHandler.prototype.success = function (message) {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        _super.prototype.success.call(this, message.gateKey);
    };
    return GateSwitchHangupHandler;
}(SocketHanlder));
//# sourceMappingURL=GateSwitchHangupHandler.js.map