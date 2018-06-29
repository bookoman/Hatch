var Ease = Laya.Ease;
var Sprite = Laya.Sprite;
var BoneSlot = Laya.BoneSlot;
var Tween = Laya.Tween;
/**
* 特效支持工具
*/
var TankUtil = /** @class */ (function () {
    function TankUtil() {
    }
    /**
     * Spine模型纹理破碎效果
     * @param spineModel
     * @param isPhysics 是否开启物理效果
     */
    TankUtil.disruption = function (spineModel, isPhysics) {
        var _this = this;
        var boneArray = spineModel["_boneSlotArray"];
        var spriteNodes = new Array();
        boneArray.forEach(function (element) {
            var bs = element;
            var sprite = new Sprite();
            sprite.texture = bs.currTexture;
            sprite.x = spineModel.x;
            sprite.y = spineModel.y;
            spriteNodes.push(sprite);
        });
        spriteNodes.forEach(function (element) {
            Laya.stage.addChild(element);
            Tween.to(element, { x: Math.random() * Laya.stage.width, y: Math.random() * Laya.stage.height }, 500, null, Handler.create(_this, function (element) {
                // element.removeSelf();
                this.createPhysics(element);
            }, [element]));
        });
    };
    /**
     * 抖动效果
     * @param node
     */
    TankUtil.shake = function (node) {
        Laya.Tween.to(node, { y: node.y + 100 }, 100, null, Handler.create(this, function () {
            Laya.Tween.to(node, { y: node.y - 100 }, 1000, Ease.elasticOut);
        }));
    };
    /**
   * 震动屏幕
   * @param callBack
   * @param times
   * @param offset
   * @param speed
   *
   */
    TankUtil.stageShake = function (view, times, offset, speed, caller, callBack) {
        if (times === void 0) { times = 2; }
        if (offset === void 0) { offset = 12; }
        if (speed === void 0) { speed = 32; }
        if (callBack === void 0) { callBack = null; }
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        var num = 0;
        var offsetArr = [0, 0];
        var point = new Point(view.x, view.y);
        Laya.stage.timerLoop(speed, this, shakeObject);
        function shakeObject(args, frameNum, frameTime) {
            if (args === void 0) { args = null; }
            if (frameNum === void 0) { frameNum = 1; }
            if (frameTime === void 0) { frameTime = 0; }
            var count = (num++) % 4;
            offsetArr[num % 2] = count < 2 ? 0 : offset;
            view.x = offsetArr[0] + point.x;
            view.y = offsetArr[1] + point.y;
            if (num > (times * 4 + 1)) {
                Laya.stage.clearTimer(this, shakeObject);
                num = 0;
                this.isShake = false;
                if (callBack != null) {
                    callBack.call(caller);
                }
            }
        }
    };
    TankUtil.isShake = false;
    return TankUtil;
}());
//# sourceMappingURL=TankUtils.js.map