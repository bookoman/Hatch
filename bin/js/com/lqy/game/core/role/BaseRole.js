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
        _this.aniScale = 1;
        _this.isLoaded = false;
        return _this;
    }
    BaseRole.prototype.initRole = function (roleVo, scale) {
        this.roleVo = roleVo;
        if (scale) {
            this.aniScale = scale;
        }
        this.isLoaded = false;
        this.skeletonAni = new Skeleton();
        this.skeletonAni.scale(this.aniScale, this.aniScale);
        this.skeletonAni.scaleX = this.roleVo.scaleX;
        this.addChild(this.skeletonAni);
        LayerManager.ins.addToLayer(this, LayerManager.ROLE_LAYER, false, true, false);
    };
    BaseRole.prototype.onError = function () {
    };
    /**
     *
     * @param aniID 动画id
     */
    BaseRole.prototype.aniPlay = function (aniID, loop, laterTime, caller, method) {
        if (this.isLoaded) {
            loop = loop ? false : true;
            aniID = aniID % this.aniCount;
            //>= aniCount默认播放第一个动画
            if (this.skeletonAni) {
                this.skeletonAni.play(aniID, loop);
                if (laterTime && caller && method) {
                    Laya.timer.once(laterTime, caller, method);
                }
                // console.log("播放动画名字："+ this.skeletonAni.getAniNameByIndex(aniID));
            }
        }
        else {
            this.skeletonAni.load("res/outside/anim/role/role" + this.roleVo.id + "/" + this.roleVo.id + ".sk", new Laya.Handler(this, this.loadCompleted, [aniID]));
        }
    };
    BaseRole.prototype.loadCompleted = function (ind) {
        this.isLoaded = true;
        this.aniCount = this.skeletonAni.getAnimNum();
        this.aniPlay(ind);
        // var text:Laya.Label = new Laya.Label();
        // text.x = -60;
        // text.y = -180;
        // text.fontSize = 24;
        // text.color = "#ff0000";
        // text.text = this.roleVo.name;
        // this.addChild(text);
        // console.log("播放动画名字："+this.aniCount);
    };
    /**设置显示层级 */
    BaseRole.prototype.setShowIndex = function (ind) {
        var layer = LayerManager.ins.getLayer(LayerManager.ROLE_LAYER);
        if (ind >= 0 && ind < layer.numChildren) {
            layer.setChildIndex(this, ind);
        }
    };
    BaseRole.prototype.run = function () {
        this.aniPlay(RoleAniIndex.MOVE);
    };
    BaseRole.prototype.setVisible = function (bool) {
        Laya.timer.once(1000, this, this.setVis, [bool]);
    };
    BaseRole.prototype.setVis = function (bool) {
        this.visible = bool;
    };
    BaseRole.prototype.dispose = function () {
        // if(this.roleVo.isEnemy)
        // {
        this.removeSelf();
        if (this.skeletonAni) {
            this.skeletonAni.destroy();
        }
        this.skeletonAni = null;
        // this.roleVo = null;
        // }
    };
    return BaseRole;
}(Laya.Sprite));
//# sourceMappingURL=BaseRole.js.map