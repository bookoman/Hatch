/*
* 数据处理Hanlder
*/
var SocketHanlder = /** @class */ (function () {
    function SocketHanlder(cmd, caller, callback) {
        if (callback === void 0) { callback = null; }
        this.cmd = cmd;
        this.caller = caller;
        this.callBack = callback;
    }
    SocketHanlder.prototype.explain = function (errorCode, data) {
        if (errorCode == 0) {
            console.log(errorCode);
        }
        else {
            this.success(data);
        }
    };
    SocketHanlder.prototype.success = function (data) {
        if (data) {
            this.callBack.apply(this, data);
        }
        else {
            this.callBack();
        }
    };
    return SocketHanlder;
}());
//# sourceMappingURL=SocketHanlder.js.map