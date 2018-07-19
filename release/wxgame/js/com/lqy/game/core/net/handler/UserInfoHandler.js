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
var UserInfoHandler = /** @class */ (function (_super) {
    __extends(UserInfoHandler, _super);
    function UserInfoHandler(cmd, caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, cmd, caller, callback) || this;
    }
    UserInfoHandler.prototype.explain = function (errorCode, data) {
        _super.prototype.explain.call(this, errorCode, data);
    };
    /**处理数据 */
    UserInfoHandler.prototype.success = function (data) {
    };
    return UserInfoHandler;
}(SocketHanlder));
//# sourceMappingURL=UserInfoHandler.js.map