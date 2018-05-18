/*
* 对象池工具
*/
var ObjectPoolUtil = /** @class */ (function () {
    function ObjectPoolUtil() {
    }
    ObjectPoolUtil.init = function () {
        this.floatFontTipsAry = new Array();
        for (var i = 0; i < 30; i++) {
            this.floatFontTipsAry.push(new FloatFontTips());
        }
        this.roleBloodBarAry = new Array();
        for (i = 0; i < 30; i++) {
            this.roleBloodBarAry.push(new RoleBloodBar());
        }
        this.heroAry = new Array();
        this.enemyAry = new Array();
        for (i = 0; i < 20; i++) {
            this.heroAry.push(new Hero());
            this.enemyAry.push(new Enemy());
        }
        this.skillAry = new Array();
        for (i = 0; i < 20; i++) {
            this.skillAry.push(new Skill());
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
    /**角色显示对象 */
    ObjectPoolUtil.HERO_ROLE = "hero";
    /**敌人显示对象 */
    ObjectPoolUtil.ENEMY_ROLE = "enemy";
    /**技能显示对象 */
    ObjectPoolUtil.SKILL = "skill";
    /**飘字对象 */
    ObjectPoolUtil.floatFontTipsAry = null;
    /**角色血条 */
    ObjectPoolUtil.roleBloodBarAry = null;
    /**英雄显示对象 */
    ObjectPoolUtil.heroAry = null;
    /**敌人显示对象 */
    ObjectPoolUtil.enemyAry = null;
    /**技能对象 */
    ObjectPoolUtil.skillAry = null;
    return ObjectPoolUtil;
}());
//# sourceMappingURL=ObjectPoolUtil.js.map