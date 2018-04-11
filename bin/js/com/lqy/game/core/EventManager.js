/*
* 事件管理器
*/
var EventManager = /** @class */ (function () {
    function EventManager() {
        /**事件管理器 */
        this.eventObj = null;
        if (this.eventObj == null) {
            this.eventObj = new Dictionary();
        }
    }
    Object.defineProperty(EventManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new EventManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**添加事件 */
    EventManager.prototype.addEvent = function (type, protoClass, call) {
        var event_handlers = this.eventObj[type];
        if (event_handlers === undefined) {
            event_handlers = [];
            this.eventObj[type] = event_handlers;
        }
        event_handlers.push({ proto: protoClass, callBack: call });
    };
    /**移除事件回调，第二个参数不传表示移除所有 */
    EventManager.prototype.removeEvent = function (type, call) {
        if (call === undefined || call === null) {
            delete this.eventObj[type];
        }
        else {
            var event_handlers = this.eventObj[type];
            if (event_handlers) {
                event_handlers.splice(event_handlers.indexOf(call), 1);
            }
        }
    };
    /**派发事件 */
    EventManager.prototype.dispatchEvent = function (type, data) {
        var arr = this.eventObj[type];
        for (var i in arr) {
            var callObj = arr[i];
            if (data) {
                callObj.callBack.call(callObj.proto, data);
            }
            else {
                callObj.callBack.call(callObj.proto);
            }
        }
    };
    /**是否存在事件 */
    EventManager.prototype.hasEvent = function (type) {
        return this.eventObj[type];
    };
    EventManager._ins = null;
    return EventManager;
}());
//# sourceMappingURL=EventManager.js.map