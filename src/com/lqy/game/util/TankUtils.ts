import Ease = Laya.Ease;
import Sprite = Laya.Sprite;
import BoneSlot = Laya.BoneSlot;
import Tween = Laya.Tween;
/**
* 特效支持工具
*/
class TankUtil {

    /**
     * Spine模型纹理破碎效果
     * @param spineModel 
     * @param isPhysics 是否开启物理效果
     */
    public static disruption(spineModel: Skeleton, isPhysics: boolean): void {
        var boneArray: Array<any> = spineModel["_boneSlotArray"];
        var spriteNodes: Array<Sprite> = new Array<Sprite>();
        boneArray.forEach(element => {
            var bs: BoneSlot = element as BoneSlot;
            var sprite: Sprite = new Sprite();
            sprite.texture = bs.currTexture;
            sprite.x = spineModel.x;
            sprite.y = spineModel.y;
            spriteNodes.push(sprite);
        });

        spriteNodes.forEach(element => {
            Laya.stage.addChild(element);
            Tween.to(element, { x: Math.random() * Laya.stage.width, y: Math.random() * Laya.stage.height }, 500, null, Handler.create(this,
                function (element: any) {
                    // element.removeSelf();
                    this.createPhysics(element);
                }, [element])
            )
        });
    }

    /**
     * 抖动效果
     * @param node 
     */
    public static shake(node: any): void {
        Tween.to(node, { y: node.y + 100 }, 100, null, Handler.create(this, function () {
            Tween.to(this.battleMap, { y: node.y - 100 }, 1000, Ease.elasticOut);
        }));
    }

}