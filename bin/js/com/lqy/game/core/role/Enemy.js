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
* 怪物
*/
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super.call(this) || this;
    }
    Enemy.prototype.initRole = function (roleVo, scale) {
        _super.prototype.initRole.call(this, roleVo, scale);
        this.x = GameConfig.STAGE_WIDTH + GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        this.y = this.roleVo.posPoint.y;
    };
    Enemy.prototype.run = function () {
        // this.aniPlay(RoleAniIndex.MOVE);
        _super.prototype.run.call(this);
        Laya.Tween.to(this, { x: this.roleVo.posPoint.x, complete: new Handler(this, this.onMoveComplete) }, GameConfig.BATTLE_RUN_TIME * 1000);
    };
    Enemy.prototype.onMoveComplete = function () {
        console.log("敌人到达战场...");
        EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
        this.aniPlay(RoleAniIndex.STAND);
    };
    return Enemy;
}(BaseRole));
//# sourceMappingURL=Enemy.js.map