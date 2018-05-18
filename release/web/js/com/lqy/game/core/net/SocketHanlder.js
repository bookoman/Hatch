/*
* 数据处理Hanlder
*/
var SocketHanlder = /** @class */ (function () {
    function SocketHanlder(module, caller, callback) {
        if (callback === void 0) { callback = null; }
        this.module = module;
        this.caller = caller;
        this.callBack = callback;
    }
    SocketHanlder.prototype.explain = function (errorCode, data) {
        if (errorCode == 0) {
            this.success(data);
        }
        else {
            console.log(errorCode);
        }
    };
    SocketHanlder.prototype.success = function (data) {
        if (data) {
            this.callBack.call(this.caller, data);
        }
        else {
            this.callBack.call(this.caller);
        }
    };
    return SocketHanlder;
}());
//# sourceMappingURL=SocketHanlder.js.map