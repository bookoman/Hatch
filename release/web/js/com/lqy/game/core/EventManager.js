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
    /**敌人跑动完成 */
    EventManager.ENEMY_RUNTO_COMPLETE = "ENEMY_RUNTO_COMPLETE";
    /**英雄跑动完成 */
    EventManager.HERO_RUNTO_COMPLETE = "HERO_RUNTO_COMPLETE";
    /**敌人攻击跑动完成 */
    EventManager.ENEMY_ATT_COMPLETE = "ENEMY_ATT_COMPLETE";
    /**敌人攻击跑动完成 */
    EventManager.CHALLENGE_BOSS = "CHALLENGE_BOSS";
    /**挑战boss准备完成 */
    EventManager.CHALLENGE_BOSS_READY = "CHALLENGE_BOSS_READY";
    /**服务器连接成功 */
    EventManager.SERVER_CONNECTED = "SERVER_CONNECTED";
    EventManager.TEST_CHANGE_ROLE_SCALE = "TEST_CHANGE_ROLE_SCALE";
    EventManager.TEST_LIST_SCRALE_RENDER = "TEST_LIST_SCRALE_RENDER";
    EventManager._ins = null;
    return EventManager;
}());
//# sourceMappingURL=EventManager.js.map