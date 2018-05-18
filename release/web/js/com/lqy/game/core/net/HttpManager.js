/*
* http请求管理器
*/
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    Object.defineProperty(HttpManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new HttpManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 发送请求
     * @param url 地址
     * @param reqType 请求类型 post get
     * @param params 请求参数
     * @param caller 请求回调caller
     * @param callBack 请求回调方法
     */
    HttpManager.prototype.send = function (url, reqType, params, caller, callBack) {
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 10000; //设置超时时间；
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        if (caller && callBack) {
            xhr.once(Laya.Event.COMPLETE, caller, callBack);
        }
        var paramsStr = params ? this.formart(params) : "";
        if (reqType == HTTPReqType.GET) {
            if (paramsStr != "") {
                url = url + "?" + paramsStr;
            }
            xhr.send(url, "", reqType, "text");
        }
        else if (reqType == HTTPReqType.POST) {
            xhr.send(url, "", paramsStr, "text");
        }
    };
    /**
     * 参数格式化
     * @param params
     */
    HttpManager.prototype.formart = function (params) {
        var paramsStr = "";
        for (var key in params) {
            paramsStr += key + "=" + params[key] + "&";
        }
        paramsStr = paramsStr.substr(0, paramsStr.length - 1);
        return paramsStr;
    };
    HttpManager.prototype.processHandler = function (data) {
        console.log(data);
    };
    HttpManager.prototype.errorHandler = function (data) {
    };
    HttpManager.prototype.completeHandler = function (e) {
    };
    HttpManager._ins = null;
    return HttpManager;
}());
//# sourceMappingURL=HttpManager.js.map