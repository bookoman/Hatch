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
* 挑战关卡
*/
var BattleGateHandler = /** @class */ (function (_super) {
    __extends(BattleGateHandler, _super);
    function BattleGateHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    BattleGateHandler.prototype.explain = function (data) {
        var BattleGateResponse = WebSocketManager.ins.defineProtoClass("BattleGateResponse");
        var message = BattleGateResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    BattleGateHandler.prototype.success = function (message) {
        // var jsonObj = JSON.parse(message.roleGateInfo);
        // GameDataManager.ins.saveGateInfoVoDic(jsonObj);
        // console.log(message);
        _super.prototype.success.call(this, message.gateKey);
    };
    return BattleGateHandler;
}(SocketHanlder));
//# sourceMappingURL=BattleGateHandler.js.map