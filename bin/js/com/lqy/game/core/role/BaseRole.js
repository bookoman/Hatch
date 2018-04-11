var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Skeleton = Laya.Skeleton;
/*
* 角色
*/
var BaseRole = /** @class */ (function (_super) {
    __extends(BaseRole, _super);
    function BaseRole() {
        var _this = _super.call(this) || this;
        _this.skeletonAni = null;
        _this.aniCount = 0;
        return _this;
    }
    BaseRole.prototype.initRole = function (aniURL, scale, roleVo) {
        if (aniURL) {
            this.roleVo = roleVo;
            this.skeletonAni = new Skeleton();
            this.skeletonAni.load(aniURL, new Laya.Handler(this, this.loadCompleted));
            if (scale) {
                this.skeletonAni.scale(scale, scale);
            }
            this.addChild(this.skeletonAni);
        }
        this.x = roleVo.posPoint.x;
        this.y = roleVo.posPoint.y;
        LayerManager.ins.addToLayer(this, LayerManager.ROLE_LAYER, false, true, false);
    };
    BaseRole.prototype.loadCompleted = function () {
        this.aniCount = this.skeletonAni.getAnimNum();
        var text = new Laya.Label();
        text.x = -60;
        text.y = -180;
        text.fontSize = 24;
        text.color = "#ff0000";
        text.text = this.roleVo.name;
        this.skeletonAni.addChildAt(text, 0);
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
}(Laya.Sprite));
//# sourceMappingURL=BaseRole.js.map