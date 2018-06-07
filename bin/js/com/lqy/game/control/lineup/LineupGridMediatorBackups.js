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
/*
* 阵型格子备份
*/
var LineupGridMediatorBackups = /** @class */ (function (_super) {
    __extends(LineupGridMediatorBackups, _super);
    function LineupGridMediatorBackups(assetsUrl, view, caller, clickCall) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.skeletonAni = null;
        _this.isLoaded = false;
        _this.aniCount = 0;
        _this.caller = caller;
        _this.clickCall = clickCall;
        return _this;
    }
    LineupGridMediatorBackups.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    LineupGridMediatorBackups.prototype.addEvents = function () {
        // this.view.on(Laya.Event.CLICK,this,this.onSkeletonAniClick);
        this.view.on(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediatorBackups.prototype.removeEvents = function () {
        // this.view.off(Laya.Event.CLICK,this,this.onSkeletonAniClick);
        this.view.off(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediatorBackups.prototype.getView = function () {
        return this.view;
    };
    LineupGridMediatorBackups.prototype.setUpHero = function (roleID) {
        if (roleID == this.roleID) {
            return;
        }
        this.roleID = roleID;
        if (this.skeletonAni == null) {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.scale(-1, 1);
            this.skeletonAni.pos(this.view.clipShadow.width / 2, this.view.clipShadow.height / 2);
            this.view.addChild(this.skeletonAni);
        }
        this.isLoaded = false;
        this.aniPlay(RoleAniIndex.STAND);
    };
    LineupGridMediatorBackups.prototype.revokeUpHero = function (roleID) {
    };
    LineupGridMediatorBackups.prototype.setClipShadowIndex = function (index) {
        this.view.clipShadow.index = index;
    };
    LineupGridMediatorBackups.prototype.onViewClick = function (e) {
        if (this.caller && this.clickCall) {
            this.clickCall.call(this.caller, this);
        }
    };
    // private onSkeletonAniClick(e):void
    // {
    //     this.aniPlay(RoleAniIndex.ATTACK,true,this,function():void{
    //         this.aniPlay(RoleAniIndex.STAND,true);
    //     });
    // }
    /**
    *
    * @param aniID 动画id
    */
    LineupGridMediatorBackups.prototype.aniPlay = function (aniID, loop, caller, method) {
        if (this.isLoaded) {
            /**测试自己龙动作 */
            if (this.roleID == "20005") {
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
                this.skeletonAni.player.on(Laya.Event.COMPLETE, this, this.onPlayCompleted, [caller, method]);
                this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
                this.skeletonAni.play(aniID, loop);
            }
        }
        else {
            if (this.roleID) {
                var url = "res/outside/anim/role/role" + this.roleID + "/" + this.roleID + ".sk";
                if (this.roleID == "20005") {
                    url = "res/outside/anim/role/role" + this.roleID + "/alien-pro.sk";
                }
                this.skeletonAni.load(url, Laya.Handler.create(this, this.loadCompleted, [aniID, loop, caller, method]));
            }
        }
    };
    /**播放一次动画回调 */
    LineupGridMediatorBackups.prototype.onPlayCompleted = function (caller, method) {
        this.skeletonAni.player.off(Laya.Event.COMPLETE, this, this.onPlayCompleted);
        if (caller && method) {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            method.call(caller);
        }
    };
    LineupGridMediatorBackups.prototype.loadCompleted = function (aniID, loop, caller, method) {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(aniID, loop, caller, method);
        }
    };
    return LineupGridMediatorBackups;
}(BaseMediator));
//# sourceMappingURL=LineupGridMediatorBackups.js.map