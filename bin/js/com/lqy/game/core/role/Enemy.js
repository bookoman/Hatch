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
    Enemy.prototype.initRole = function (aniURL, scale, roleVo) {
        _super.prototype.initRole.call(this, aniURL, scale, roleVo);
        this.skeletonAni.transform.scaleEx(-1, 1);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = GameConfig.STAGE_WIDTH + (roleVo.lineupCol - 1) * GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        // this.x = GameConfig.STAGE_WIDTH + roleVo.runWidth;
        this.y = this.roleVo.posPoint.y;
    };
    Enemy.prototype.run = function () {
        Laya.Tween.to(this, { x: this.roleVo.posPoint.x, complete: new Handler(this, this.onMoveComplete) }, GameConfig.BATTLE_RUN_TIME * 1000);
    };
    Enemy.prototype.onMoveComplete = function () {
    };
    return Enemy;
}(BaseRole));
//# sourceMappingURL=Enemy.js.map