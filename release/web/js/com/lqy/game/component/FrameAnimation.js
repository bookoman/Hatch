/*
* 帧动画
*/
var FrameAnimation = /** @class */ (function () {
    function FrameAnimation(disParent, tx, ty, scale) {
        this.isLoop = false;
        this.scale = 1;
        this.scale = scale;
        this.animation = new Laya.Animation;
        this.animation.pos(tx, ty);
        this.animation.scale(this.scale, this.scale);
        disParent.addChild(this.animation);
        this.isLoaded = false;
        Laya.loader.on("error" /**Laya.Event.ERROR*/, this, this.onLoadAniError);
    }
    FrameAnimation.prototype.playAni = function (modelId, isLoop, caller, callBack) {
        this.isLoop = isLoop === undefined ? false : isLoop;
        this.modelId = modelId;
        this.caller = caller;
        this.callBack = callBack;
        if (this.isLoaded) {
            this.animation.loadAnimation("res/ani/" + this.modelId + ".ani");
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
        this.dispose();
        if (this.caller && this.callBack) {
            this.callBack.call(this.caller);
        }
    };
    FrameAnimation.prototype.onLoadAniError = function (e) {
        // console.log("。。。。。。。。。。"+ e);
        if (e.indexOf(this.modelId + ".ani") != -1) {
            this.modelId = "SK_0101";
            this.animation.loadAtlas("res/atlas/ani/" + this.modelId + ".atlas", Laya.Handler.create(this, this.onLoaded));
        }
    };
    return FrameAnimation;
}());
//# sourceMappingURL=FrameAnimation.js.map