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
        Tween.to(node, { y: node.y + 100 }, 100, null, Handler.create(this, function () {
            Tween.to(this.battleMap, { y: node.y - 100 }, 1000, Ease.elasticOut);
        }));
    };
    return TankUtil;
}());
//# sourceMappingURL=TankUtils.js.map