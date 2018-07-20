/*
* 数据处理Hanlder
*/
var SocketHanlder = /** @class */ (function () {
    function SocketHanlder(caller, callback) {
        if (callback === void 0) { callback = null; }
        this.caller = caller;
        this.callBack = callback;
    }
    SocketHanlder.prototype.explain = function (data) {
        // var statusCode = data.statusCode;
        // if(statusCode == 0)
        // {
        //     this.success(data);
        // }
        // else
        // {
        //     console.log("服务器返回：",data.statusCode);
        // }
        this.success(data);
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