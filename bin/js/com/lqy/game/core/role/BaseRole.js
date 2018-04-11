var Skeleton = Laya.Skeleton;
/*
* 角色
*/
var BaseRole = /** @class */ (function () {
    function BaseRole() {
        this.skeletonAni = null;
        this.aniCount = 0;
    }
    BaseRole.prototype.initRole = function (aniURL, scale, lineupVo) {
        if (aniURL) {
            this.skeletonAni = new Skeleton();
            // this.skeletonAni.pos(100,100);
            this.skeletonAni.load(aniURL, new Laya.Handler(this, this.loadCompleted));
            if (scale) {
                this.skeletonAni.scale(scale, scale);
            }
            this.lineupVo = lineupVo;
        }
        LayerManager.ins.addToLayer(this.skeletonAni, LayerManager.ROLE_LAYER, false, true, false);
    };
    BaseRole.prototype.loadCompleted = function () {
        this.aniCount = this.skeletonAni.getAnimNum();
        // console.log("播放动画名字："+this.aniCount);
    };
    BaseRole.prototype.onError = function () {
    };
    /**
     *
     * @param aniID 动画id
     */
    BaseRole.prototype.play = function (aniID) {
        if (this.skeletonAni) {
            //>= aniCount默认播放第一个动画
            aniID = aniID % this.aniCount;
            this.skeletonAni.play(aniID, true);
            console.log("播放动画名字：" + this.skeletonAni.getAniNameByIndex(aniID));
        }
    };
    return BaseRole;
}());
//# sourceMappingURL=BaseRole.js.map