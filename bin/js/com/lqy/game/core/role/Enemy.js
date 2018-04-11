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
    };
    return Enemy;
}(BaseRole));
//# sourceMappingURL=Enemy.js.map