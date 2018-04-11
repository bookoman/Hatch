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
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        return _super.call(this) || this;
    }
    Monster.prototype.initRole = function (aniURL, scale, lineupVo) {
        _super.prototype.initRole.call(this, aniURL, scale, lineupVo);
        this.skeletonAni.transform.scaleEx(-1, 1);
        this.skeletonAni.pos(460 + (this.lineupVo.col - 1) * 120, 480 + (this.lineupVo.row - 1) * 100);
    };
    return Monster;
}(BaseRole));
//# sourceMappingURL=Monster.js.map