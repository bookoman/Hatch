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
    Enemy.prototype.initRole = function (roleVo, showPriority, scale) {
        _super.prototype.initRole.call(this, roleVo, showPriority, scale);
        // this.x = GameConfig.STAGE_WIDTH + GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        this.x = this.roleVo.posPoint.x + GameConfig.STAGE_WIDTH;
        this.y = this.roleVo.posPoint.y;
    };
    // public run():void
    // {
    //     this.aniPlay(RoleAniIndex.STAND);
    //     // super.run();
    //     Laya.Tween.to(this,{x:this.roleVo.posPoint.x,complete:new Handler(this,this.onMoveComplete)},GameConfig.BATTLE_RUN_TIME*1000);
    // }
    // private onMoveComplete():void
    // {
    //     console.log("敌人到达战场...");
    //     EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
    //     this.aniPlay(RoleAniIndex.STAND);
    // }
    /**跟随地图移动 */
    Enemy.prototype.moveByMap = function (speed) {
        if (this.roleVo && this.x > this.roleVo.posPoint.x) {
            this.x -= speed;
            if (this.x <= this.roleVo.posPoint.x) {
                EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
            }
        }
    };
    return Enemy;
}(BaseRole));
//# sourceMappingURL=Enemy.js.map