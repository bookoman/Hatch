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
        _this.LblName = null;
        _this.roleBloodBar = null;
        _this.showPriority = 0;
        return _this;
    }
    BaseRole.prototype.initRole = function (roleVo, showPriority, scale, parentDis) {
        this.roleVo = roleVo;
        this.showPriority = showPriority;
        if (scale) {
            this.aniScale = scale;
        }
        this.isLoaded = false;
        this.skeletonAni = new Skeleton();
        this.skeletonAni.scale(this.aniScale, this.aniScale);
        this.skeletonAni.scaleX = this.roleVo.scaleX * this.aniScale;
        this.addChild(this.skeletonAni);
        if (parentDis) {
            parentDis.addChild(this);
        }
        else {
            LayerManager.ins.addToLayer(this, LayerManager.ROLE_LAYER, false, true, false);
        }
        this.visible = true;
    };
    BaseRole.prototype.showFloatFont = function (blood) {
        var floatFontTip = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if (floatFontTip) {
            floatFontTip.setAttribute(40, "#ff0000");
            floatFontTip.show("-" + blood, this, -50, -180, 1.0, 80);
        }
    };
    /**
     *
     * @param aniID 动画id
     */
    BaseRole.prototype.aniPlay = function (aniID, loop, caller, method, defRole) {
        if (this.isLoaded) {
            loop = loop === undefined ? true : loop;
            aniID = aniID % this.aniCount;
            //>= aniCount默认播放第一个动画
            if (this.skeletonAni) {
                if (!this.skeletonAni.hasListener(Laya.Event.COMPLETE)) {
                    this.skeletonAni.player.on(Laya.Event.COMPLETE, this, this.onPlayCompleted, [defRole]);
                }
                this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
                this.aniCaller = caller;
                this.aniMethod = method;
                this.skeletonAni.play(aniID, loop);
                // if(aniID == RoleAniIndex.ATTACK)
                // {
                //     console.log(1111);
                // }
            }
        }
        else {
            //分帧加载
            Laya.timer.frameOnce(this.showPriority * 6, this, this.skeletonAniLoad, [aniID, loop]);
        }
    };
    /**播放一次动画回调 */
    BaseRole.prototype.onPlayCompleted = function (defRole) {
        if (this.aniCaller && this.aniMethod) {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            this.aniMethod.call(this.aniCaller, [this, defRole]);
        }
    };
    BaseRole.prototype.skeletonAniLoad = function (aniID, loop) {
        this.skeletonAni.load("res/outside/anim/role/role" + this.roleVo.id + "/" + this.roleVo.id + ".sk", new Laya.Handler(this, this.loadCompleted, [aniID, loop]));
    };
    BaseRole.prototype.loadCompleted = function (ind, loop) {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(ind, loop);
            this.initComponets();
            // console.log("播放动画名字："+this.aniCount);
        }
    };
    BaseRole.prototype.initComponets = function () {
        //血条
        this.roleBloodBar = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ROLE_BLOOD_BAR);
        this.roleBloodBar.scaleX = 0.5;
        this.roleBloodBar.x = -60;
        this.roleBloodBar.y = -180;
        this.roleBloodBar.init();
        this.addChild(this.roleBloodBar);
        //名字
        this.LblName = new Laya.Label();
        this.LblName.width = 114;
        this.LblName.x = this.roleBloodBar.x;
        this.LblName.y = this.roleBloodBar.y - 30;
        this.LblName.fontSize = 24;
        this.LblName.color = "#00FF99";
        this.LblName.align = "center";
        this.LblName.text = this.roleVo.name;
        this.addChild(this.LblName);
    };
    BaseRole.prototype.setBlood = function (value) {
        if (this.roleBloodBar) {
            this.roleBloodBar.setProgress(value);
        }
    };
    /**设置显示层级 */
    BaseRole.prototype.setShowIndex = function (ind) {
        if (this.parent && ind >= 0) {
            this.parent.setChildIndex(this, ind);
        }
    };
    BaseRole.prototype.run = function () {
        this.aniPlay(RoleAniIndex.MOVE);
    };
    BaseRole.prototype.setVisible = function (bool) {
        Laya.timer.once(1000, this, this.setVis, [bool]);
    };
    BaseRole.prototype.setVis = function (bool) {
        //延迟回调判断，复活就设置隐藏
        if (this.roleVo && this.roleVo.isDeath) {
            this.visible = bool;
        }
    };
    BaseRole.prototype.dispose = function () {
        this.parent.setChildIndex(this, 0);
        this.removeSelf();
        if (this.skeletonAni) {
            // this.skeletonAni.player.off(Laya.Event.COMPLETE,this,this.onPlayCompleted);
            Laya.loader.clearRes(this.skeletonAni.url);
            this.skeletonAni.destroy();
        }
        this.skeletonAni = null;
        if (this.LblName) {
            this.LblName.removeSelf();
        }
        if (this.roleBloodBar) {
            this.roleBloodBar.removeSelf();
            ObjectPoolUtil.stillObject(ObjectPoolUtil.ROLE_BLOOD_BAR, this.roleBloodBar);
        }
        this.roleVo = null;
    };
    BaseRole.prototype.moveByMap = function (speed) {
    };
    return BaseRole;
}(Laya.Sprite));
//# sourceMappingURL=BaseRole.js.map