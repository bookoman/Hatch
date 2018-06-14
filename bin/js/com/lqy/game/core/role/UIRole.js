/*
* UI界面角色模型
*/
var UIRole = /** @class */ (function () {
    function UIRole(heroKey) {
        this.skeletonAni = null;
        this.isLoaded = false;
        this.aniCount = 0;
        this.heroKey = heroKey;
        this.isLoaded = false;
        this.skeletonAni = new Skeleton();
    }
    UIRole.prototype.addParent = function (parent, rx, ry, sx, sy, showShadow) {
        this.disParent = parent;
        var config = ConfigManager.ins.getHeroSampleConfig(this.heroKey);
        if (sx === undefined) {
            sx = -config.modelSize;
        }
        if (sy === undefined) {
            sy = config.modelSize;
        }
        if (showShadow === undefined)
            showShadow = false;
        this.imgShadow = new Laya.Image("comp/img_shadow.png");
        this.imgShadow.scale(sx, sy);
        this.imgShadow.x = rx - this.imgShadow.width * sx / 2;
        this.imgShadow.y = ry - this.imgShadow.height * sy / 2;
        this.imgShadow.alpha = 0.3;
        this.imgShadow.visible = showShadow;
        parent.addChild(this.imgShadow);
        this.skeletonAni.scale(sx, sy);
        this.skeletonAni.pos(rx, ry);
        this.disParent.addChild(this.skeletonAni);
        this.aniPlay(RoleAniIndex.STAND);
    };
    UIRole.prototype.updateRole = function (heroKey, sx, sy) {
        if (this.disParent && this.skeletonAni) {
            this.heroKey = heroKey;
            this.isLoaded = false;
            this.addParent(this.disParent, this.skeletonAni.x, this.skeletonAni.y, sx, sy);
        }
    };
    /**销毁 */
    UIRole.prototype.dispose = function () {
        if (this.skeletonAni) {
            if (this.skeletonAni.parent) {
                this.skeletonAni.parent.removeChild(this.skeletonAni);
            }
            this.skeletonAni.destroy();
            this.skeletonAni = null;
        }
        this.disParent = null;
    };
    /**
    *
    * @param aniID 动画id
    */
    UIRole.prototype.aniPlay = function (aniID, loop, caller, method) {
        this.aniId = aniID;
        this.loop = loop;
        this.caller = caller;
        this.method = method;
        if (this.isLoaded) {
            /**测试自己龙动作 */
            // if(this.roleID == "10006")
            // {
            //     if(aniID == RoleAniIndex.ATTACK)
            //         aniID = NewRoleAniIndex.ATTACK;
            //     else if(aniID == RoleAniIndex.INJURED)
            //         aniID = NewRoleAniIndex.INJURED;
            //     else if(aniID == RoleAniIndex.DEATH)
            //         aniID = NewRoleAniIndex.DEATH;
            //     else if(aniID == RoleAniIndex.MOVE)
            //         aniID = NewRoleAniIndex.MOVE;
            //     else if(aniID == RoleAniIndex.STAND)
            //         aniID = NewRoleAniIndex.STAND;
            // }
            loop = loop === undefined ? true : loop;
            aniID = aniID % this.aniCount;
            // console.log(aniID);
            //>= aniCount默认播放第一个动画
            if (this.skeletonAni) {
                this.skeletonAni.player.on(Laya.Event.COMPLETE, this, this.onPlayCompleted);
                this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
                this.skeletonAni.play(aniID, loop);
            }
        }
        else {
            if (this.heroKey) {
                Laya.loader.on(/*laya.events.Event.ERROR*/ "error", this, this.skeletonLoadError);
                var config = ConfigManager.ins.getHeroSampleConfig(this.heroKey);
                this.aniUrl = "res/outside/anim/role/" + config.modelId + "/" + config.modelId + ".sk";
                this.skeletonAni.load(this.aniUrl, Laya.Handler.create(this, this.loadCompleted));
            }
        }
    };
    /**播放一次动画回调 */
    UIRole.prototype.onPlayCompleted = function () {
        this.skeletonAni.player.off(Laya.Event.COMPLETE, this, this.onPlayCompleted);
        if (this.caller && this.method) {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            this.method.call(this.caller);
        }
    };
    UIRole.prototype.loadCompleted = function () {
        if (!this.isLoaded && this.skeletonAni.templet) {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(this.aniId, this.loop, this.caller, this.method);
            // var rect = this.skeletonAni.getSelfBounds();
            // this.imgShadow.width = rect.width / 4;
            // this.imgShadow.height = this.imgShadow.height * this.skeletonAni.scaleY;
            // this.imgShadow.x = this.skeletonAni.x - this.imgShadow.width / 2;
            // this.imgShadow.y = this.skeletonAni.y - this.imgShadow.height / 2;
        }
    };
    UIRole.prototype.skeletonLoadError = function (url) {
        if (url == this.aniUrl) {
            Laya.loader.off(/*laya.events.Event.ERROR*/ "error", this, this.skeletonLoadError);
            url = "res/outside/anim/role/" + GameConfig.HERO_DEFAULT_ANI_MODELID + "/" + GameConfig.HERO_DEFAULT_ANI_MODELID + ".sk";
            this.skeletonAni.load(url, Laya.Handler.create(this, this.loadCompleted));
        }
    };
    return UIRole;
}());
//# sourceMappingURL=UIRole.js.map