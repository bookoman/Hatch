/*
* 对象池工具
*/
var ObjectPoolUtil = /** @class */ (function () {
    function ObjectPoolUtil() {
    }
    ObjectPoolUtil.init = function () {
        this.TestPageUIAry = new Array();
        for (var i = 0; i < 10; i++) {
            this.TestPageUIAry.push(new ui.test.TestPageUI());
        }
    };
    /**借用一个对象 */
    ObjectPoolUtil.borrowObjcet = function (view) {
        var ary = this[view.constructor.name + "Ary"];
        if (ary && ary.length > 0) {
            return ary.pop();
        }
        return null;
    };
    /**还一个对象 */
    ObjectPoolUtil.stillObject = function (view) {
        var ary = this[view.constructor.name + "Ary"];
        if (ary) {
            ary.push(view);
        }
    };
    ObjectPoolUtil.TestPageUIAry = null;
    return ObjectPoolUtil;
}());
//# sourceMappingURL=ObjectPoolUtil.js.map