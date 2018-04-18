/*
* 对象池工具
*/
var ObjectPoolUtil = /** @class */ (function () {
    function ObjectPoolUtil() {
    }
    ObjectPoolUtil.init = function () {
        this.floatFontTipsAry = new Array();
        for (var i = 0; i < 10; i++) {
            this.floatFontTipsAry.push(new FloatFontTips());
        }
        this.roleBloodBarAry = new Array();
        for (i = 0; i < 10; i++) {
            this.roleBloodBarAry.push(new RoleBloodBar());
        }
    };
    /**借用一个对象 */
    ObjectPoolUtil.borrowObjcet = function (property) {
        var ary = this[property + "Ary"];
        if (ary && ary.length > 0) {
            return ary.pop();
        }
        return null;
    };
    /**还一个对象 */
    ObjectPoolUtil.stillObject = function (property, obj) {
        var ary = this[property + "Ary"];
        if (ary) {
            ary.push(obj);
        }
    };
    /**飘字对象 */
    ObjectPoolUtil.FLOAT_FONT_TIPS = "floatFontTips";
    /**角色血条 */
    ObjectPoolUtil.ROLE_BLOOD_BAR = "roleBloodBar";
    /**飘字对象 */
    ObjectPoolUtil.floatFontTipsAry = null;
    /**角色血条 */
    ObjectPoolUtil.roleBloodBarAry = null;
    return ObjectPoolUtil;
}());
//# sourceMappingURL=ObjectPoolUtil.js.map