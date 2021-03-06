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
* 用户登录
*/
var UserLoginHandler = /** @class */ (function (_super) {
    __extends(UserLoginHandler, _super);
    function UserLoginHandler(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    UserLoginHandler.prototype.explain = function (data) {
        var ResUserCode = WebSocketManager.ins.defineProtoClass("ResUserCode");
        var message = ResUserCode.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    UserLoginHandler.prototype.success = function (message) {
        _super.prototype.success.call(this, message);
    };
    return UserLoginHandler;
}(SocketHanlder));
//# sourceMappingURL=UserLoginHandler.js.map