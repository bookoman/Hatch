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
        _this.LblName = null;
        _this.roleBloodBar = null;
        _this.showPriority = 0;
        return _this;
        // EventManager.ins.addEvent(EventManager.TEST_CHANGE_ROLE_SCALE,this,this.testScale);
    }
    // private testScale(ary):void
    // {
    //     var roleID = ary[0];
    //     var sca = ary[1];
    //     if(this.roleVo && this.roleVo.id == roleID)
    //     {
    //         var s:number = this.roleVo.isEnemy ? 1 : -1;
    //         this.skeletonAni.scaleX = s * sca;
    //         this.skeletonAni.scaleY = sca;
    //         var bound = this.skeletonAni.getBounds(); // 加载完毕之后才能拿到有效的bounds
    //         console.log(this.roleVo.name,bound.width,bound.height);
    //     }
    // }
    BaseRole.prototype.initRole = function (roleVo, showPriority, scale, parentDis) {
        this.clipShadow = new Laya.Clip("main/clip_shadow.png");
        this.clipShadow.height = 43;
        this.clipShadow.x = -this.clipShadow.width / 2;
        this.clipShadow.y = -this.clipShadow.height / 2;
        this.clipShadow.clipY = 2;
        this.clipShadow.alpha = 0.3;
        this.addChild(this.clipShadow);
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
            /**测试自己龙动作 */
            if (this.roleVo.id == "20005" || this.roleVo.id == "10006") {
                if (aniID == RoleAniIndex.ATTACK)
                    aniID = NewRoleAniIndex.ATTACK;
                else if (aniID == RoleAniIndex.INJURED)
                    aniID = NewRoleAniIndex.INJURED;
                else if (aniID == RoleAniIndex.DEATH)
                    aniID = NewRoleAniIndex.DEATH;
                else if (aniID == RoleAniIndex.MOVE)
                    aniID = NewRoleAniIndex.MOVE;
                else if (aniID == RoleAniIndex.STAND)
                    aniID = NewRoleAniIndex.STAND;
            }
            loop = loop === undefined ? true : loop;
            aniID = aniID % this.aniCount;
            //>= aniCount默认播放第一个动画
            if (this.skeletonAni) {
                this.skeletonAni.player.on(Laya.Event.COMPLETE, this, this.onPlayCompleted, [defRole, caller, method]);
                this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
                this.skeletonAni.play(aniID, loop);
            }
        }
        else {
            Laya.timer.frameOnce(this.showPriority * 6, this, this.skeletonAniLoad, [aniID, loop, caller, method], false);
        }
    };
    /**播放一次动画回调 */
    BaseRole.prototype.onPlayCompleted = function (defRole, caller, method) {
        this.skeletonAni.player.off(Laya.Event.COMPLETE, this, this.onPlayCompleted);
        if (caller && method) {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            method.call(caller, [this, defRole]);
        }
    };
    BaseRole.prototype.skeletonAniLoad = function (aniID, loop, caller, method) {
        //分帧加载
        if (this.roleVo) {
            var url = "res/outside/anim/role/" + this.roleVo.modelId + "/" + this.roleVo.modelId + ".sk";
            // url = "res/outside/anim/role/baolong001/baolong001.sk";
            this.skeletonAni.load(url, Laya.Handler.create(this, this.loadCompleted, [aniID, loop, caller, method]));
        }
    };
    BaseRole.prototype.loadCompleted = function (aniID, loop, caller, method) {
        // var bound = this.skeletonAni.getBounds(); // 加载完毕之后才能拿到有效的bounds
        // console.log(this.roleVo.id,bound.width,bound.height);
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(aniID, loop, caller, method);
            this.initComponets();
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