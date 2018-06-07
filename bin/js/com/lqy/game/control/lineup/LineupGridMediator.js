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
* 阵型格子
*/
var LineupGridMediator = /** @class */ (function (_super) {
    __extends(LineupGridMediator, _super);
    function LineupGridMediator(assetsUrl, view, caller, clickCall, mapGridPoint) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.skeletonAni = null;
        _this.isLoaded = false;
        _this.aniCount = 0;
        _this.caller = caller;
        _this.clickCall = clickCall;
        _this.mapGridPoint = mapGridPoint;
        return _this;
    }
    LineupGridMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    LineupGridMediator.prototype.addEvents = function () {
        this.view.on(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediator.prototype.removeEvents = function () {
        this.view.off(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediator.prototype.getView = function () {
        return this.view;
    };
    LineupGridMediator.prototype.setUpHero = function (roleID, iconView) {
        if (roleID == this.roleID) {
            return;
        }
        if (this.iconView) {
            this.iconView.setSelect(false);
        }
        this.roleID = roleID;
        this.iconView = iconView;
        this.isLoaded = false;
        if (this.skeletonAni == null) {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.scale(-1, 1);
            this.skeletonAni.pos(this.view.clipShadow.width / 2, this.view.clipShadow.height / 2);
        }
        this.view.addChild(this.skeletonAni);
        this.aniPlay(RoleAniIndex.STAND);
    };
    LineupGridMediator.prototype.revokeUpHero = function () {
        this.roleID = null;
        if (this.skeletonAni && this.skeletonAni.parent) {
            this.skeletonAni.parent.removeChild(this.skeletonAni);
        }
        if (this.iconView) {
            this.iconView.setSelect(false);
            this.iconView = null;
        }
    };
    /**设置阴影选中 */
    LineupGridMediator.prototype.setClipShadowIndex = function (index) {
        this.view.clipShadow.index = index;
    };
    LineupGridMediator.prototype.setLineupIDLable = function (lineupID) {
        this.view.lblLineupID.text = lineupID;
    };
    LineupGridMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.skeletonAni) {
            if (this.skeletonAni.parent) {
                this.skeletonAni.parent.removeChild(this.skeletonAni);
            }
            this.skeletonAni.destroy();
            this.skeletonAni = null;
        }
        this.caller = null;
        this.clickCall = null;
        this.iconView = null;
    };
    LineupGridMediator.prototype.onViewClick = function (e) {
        if (this.caller && this.clickCall) {
            this.clickCall.call(this.caller, this);
        }
    };
    /**
    *
    * @param aniID 动画id
    */
    LineupGridMediator.prototype.aniPlay = function (aniID, loop, caller, method) {
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
                var roleVo = ConfigManager.ins.getRoleVoByID(this.roleID);
                var url = "res/outside/anim/role/" + roleVo.modelId + "/" + roleVo.modelId + ".sk";
                this.skeletonAni.load(url, Laya.Handler.create(this, this.loadCompleted, [aniID, loop, caller, method]));
            }
        }
    };
    /**播放一次动画回调 */
    LineupGridMediator.prototype.onPlayCompleted = function (caller, method) {
        this.skeletonAni.player.off(Laya.Event.COMPLETE, this, this.onPlayCompleted);
        if (caller && method) {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            method.call(caller);
        }
    };
    LineupGridMediator.prototype.loadCompleted = function (aniID, loop, caller, method) {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(aniID, loop, caller, method);
        }
    };
    return LineupGridMediator;
}(BaseMediator));
//# sourceMappingURL=LineupGridMediator.js.map