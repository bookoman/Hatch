/*
* 动画管理器
*/
var AnimationManager = /** @class */ (function () {
    function AnimationManager() {
        /**雨特效 */
        this.rainFrameAni = null;
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
    /**
     * 添加战场雨点特效
     * @param showTime
     */
    AnimationManager.prototype.addBattleRainEffect = function (showTime) {
        if (showTime <= 0) {
            return;
        }
        this.removeBattleRainEffect();
        var layer = LayerManager.ins.getLayer(LayerManager.BG_EFFECT_LAYER);
        this.rainFrameAni = new FrameAnimation(layer, GameConfig.STAGE_WIDTH / 2, GameConfig.STAGE_HEIGHT / 2);
        this.rainFrameAni.playAni("rain_01", true);
        Laya.timer.once(showTime * 1000, this, this.removeBattleRainEffect);
    };
    /**移除战场雨点特效 */
    AnimationManager.prototype.removeBattleRainEffect = function () {
        if (this.rainFrameAni) {
            Laya.timer.clearAll(this.rainFrameAni);
            this.rainFrameAni.dispose();
            this.rainFrameAni = null;
        }
    };
    AnimationManager._ins = null;
    return AnimationManager;
}());
//# sourceMappingURL=AnimationManager.js.map