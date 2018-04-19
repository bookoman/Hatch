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
* 血条
*/
var RoleBloodBar = /** @class */ (function (_super) {
    __extends(RoleBloodBar, _super);
    function RoleBloodBar() {
        var _this = _super.call(this) || this;
        _this.initSkin();
        return _this;
    }
    RoleBloodBar.prototype.initSkin = function () {
        this.bg = new Laya.Image();
        this.bg.texture = Laya.loader.getRes("main/img_bloodbg.png");
        this.addChild(this.bg);
        this.progress = new Laya.Image();
        this.progress.x = 1;
        this.progress.texture = Laya.loader.getRes("main/img_blood.png");
        this.addChild(this.progress);
    };
    RoleBloodBar.prototype.init = function () {
        this.setProgress(0);
    };
    /**
     *
     * @param value (0-1)
     */
    RoleBloodBar.prototype.setProgress = function (value) {
        var rect = new Rectangle(0, 0, this.progress.texture.width, this.progress.texture.height);
        rect.x = value * rect.width;
        this.progress.scrollRect = rect;
    };
    return RoleBloodBar;
}(Laya.Sprite));
//# sourceMappingURL=RoleBloodBar.js.map