/*
* 动画管理器
*/
var AnimationManager = /** @class */ (function () {
    function AnimationManager() {
    }
    Object.defineProperty(AnimationManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new AnimationManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    //******************弹框动画 */
    /**
     * 舞台中央弹框由小到大
     * @param view
     * @param time
     */
    AnimationManager.prototype.popCenterLittleToBig = function (view, time) {
        if (time === void 0) { time = 100; }
        view.scaleX = 0;
        view.scaleY = 0;
        view.x = GameConfig.STAGE_WIDTH / 2;
        view.y = GameConfig.STAGE_HEIGHT / 2;
        var tx = GameConfig.STAGE_WIDTH - view.width >> 1;
        var ty = GameConfig.STAGE_HEIGHT - view.height >> 1;
        Laya.Tween.to(view, { scaleX: 1, scaleY: 1, x: tx, y: ty }, time);
    };
    AnimationManager._ins = null;
    return AnimationManager;
}());
//# sourceMappingURL=AnimationManager.js.map