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
        Laya.Tween.to(node, { y: node.y + 100 }, 100, null, Handler.create(this, function () {
            Laya.Tween.to(node, { y: node.y - 100 }, 1000, Ease.elasticOut);
        }));
    }
    public static isShake:boolean = false;
    /**
   * 震动屏幕 
   * @param callBack
   * @param times
   * @param offset
   * @param speed
   *
   */  
  public static stageShake(view:Laya.Sprite, times:number = 2, offset:number = 12, speed:number = 32,caller?:any,callBack?:Function):void
  {
        if(this.isShake){
                return;
        }
        
        this.isShake = true;
        var num:number = 0;
        var offsetArr:Array<number> = [0, 0];
        var point:Point = new Point(view.x, view.y);
        Laya.stage.timerLoop(speed, this, shakeObject);
        
        function shakeObject(args:Array<any> = null, frameNum:number = 1, frameTime:number=0):void{
            var count:number = (num++) % 4;
            offsetArr[num % 2] = count < 2 ? 0 : offset;
            view.x = offsetArr[0] + point.x;
            view.y = offsetArr[1] + point.y;
            if(num > (times * 4 + 1)){
                Laya.stage.clearTimer(this, shakeObject);
                num = 0;
                this.isShake = false;
                if(callBack != null)
                {
                    callBack.call(caller);
                }
            }
        }
    }

}