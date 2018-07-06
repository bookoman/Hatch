/*
* 图集动画
*/
var AtlasAnimation = /** @class */ (function () {
    function AtlasAnimation() {
        this.animation = new Laya.Animation;
        this.isLoaded = false;
    }
    AtlasAnimation.prototype.playAni = function (modelId) {
        if (this.isLoaded) {
        }
        else {
            this.animation.loadAtlas("res/atlas/role.atlas", Laya.Handler.create(this, this.onLoaded));
        }
    };
    AtlasAnimation.prototype.onLoaded = function () {
        this.isLoaded = true;
    };
    return AtlasAnimation;
}());
//# sourceMappingURL=AtlasAnimation.js.map