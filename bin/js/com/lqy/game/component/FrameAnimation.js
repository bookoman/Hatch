/*
* 帧动画
*/
var FrameAnimation = /** @class */ (function () {
    function FrameAnimation(disParent, tx, ty, isSkill, scale) {
        this.isLoop = false;
        this.scale = 1;
        this.isSkill = false;
        this.scale = scale === undefined ? 1 : scale;
        this.isSkill = isSkill === undefined ? false : isSkill;
        this.animation = new Laya.Animation;
        tx = tx === undefined ? 0 : tx;
        ty = ty === undefined ? 0 : ty;
        this.animation.pos(tx, ty);
        this.animation.scale(this.scale, this.scale);
        // if(isSkill){
        //     var ind:number = (disParent as BaseRole).getSkillEffectInd();
        //     disParent.addChildAt(this.animation,ind);
        // }
        // else{
        //     disParent.addChild(this.animation);
        // }
        disParent.addChild(this.animation);
        this.isLoaded = false;
        Laya.loader.on("error" /**Laya.Event.ERROR*/, this, this.onLoadAniError);
    }
    FrameAnimation.prototype.playAni = function (modelId, isLoop, caller, callBack) {
        this.isLoop = isLoop === undefined ? false : isLoop;
        this.modelId = modelId;
        this.caller = caller;
        this.callBack = callBack;
        //测试技能
        // if(this.isSkill == true)
        //     this.modelId = "SK_0101";
        if (this.isLoaded) {
            var aniUrl = this.isSkill == true ? "res/ani/skills/" + this.modelId + ".ani" : "res/ani/" + this.modelId + ".ani";
            this.animation.loadAnimation(aniUrl);
            this.animation.play();
        }
        else {
            if (!this.isLoop) {
                this.animation.on("complete" /**Laya.Event.COMPLETE*/, this, this.onOncePlayComplete);
            }
            this.animation.loadAtlas("res/atlas/ani/" + this.modelId + ".atlas", Laya.Handler.create(this, this.onLoaded));
        }
    };
    FrameAnimation.prototype.dispose = function () {
        Laya.loader.off("error" /**Laya.Event.ERROR*/, this, this.onLoadAniError);
        this.caller = null;
        this.callBack = null;
        // if(this.animation)
        // {
        this.animation.off("complete", this, this.onOncePlayComplete);
        this.animation.removeSelf();
        this.animation.destroy();
        this.animation = null;
        // }
    };
    FrameAnimation.prototype.onLoaded = function () {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.playAni(this.modelId, this.isLoop, this.caller, this.callBack);
            // var bound:Rectangle = this.animation.getBounds();
            // this.animation.pivotX = bound.width/2;
            // this.animation.pivotY = bound.height;
            // this.animation.scale(0.5,0.5);
        }
    };
    FrameAnimation.prototype.onOncePlayComplete = function (e) {
        if (this.caller && this.callBack) {
            this.callBack.call(this.caller);
        }
        this.dispose();
    };
    FrameAnimation.prototype.onLoadAniError = function (e) {
        // console.log("。。。。。。。。。。"+ e);
        if (e.indexOf(this.modelId + ".ani") != -1) {
            this.modelId = "SK_0101";
            var aniUrl = this.isSkill == true ? "res/ani/skills/" + this.modelId + ".ani" : "res/ani/" + this.modelId + ".ani";
            this.animation.loadAtlas("res/atlas/ani/" + this.modelId + ".atlas", Laya.Handler.create(this, this.onLoaded));
        }
    };
    return FrameAnimation;
}());
//# sourceMappingURL=FrameAnimation.js.map