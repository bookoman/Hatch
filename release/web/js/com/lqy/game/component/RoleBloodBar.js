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
        this.bg = new Laya.Image("main/img_bloodbg.png");
        this.bg.sizeGrid = "10,10,10,10";
        this.bg.width = 100;
        // this.bg.texture = Laya.loader.getRes("main/img_bloodbg.png");
        this.addChild(this.bg);
        this.progress = new Laya.Image("main/img_blood.png");
        this.progress.sizeGrid = "2,2,2,2";
        this.progress.x = 6;
        this.progress.y = 5;
        // this.progress.texture = Laya.loader.getRes("main/img_blood.png");
        this.progress.width = 90;
        this.addChild(this.progress);
        this.imgAttribute = new Laya.Image();
        this.imgAttribute.x = -20;
        this.imgAttribute.y = -5;
        this.addChild(this.imgAttribute);
    };
    RoleBloodBar.prototype.init = function () {
        this.setProgress(0);
        var attId = Math.ceil(Math.random() * 6);
        this.imgAttribute.skin = "main/img_att" + attId + ".png";
        console.log(this.imgAttribute.width, this.imgAttribute.height, this.imgAttribute.scaleX);
    };
    /**
     *
     * @param value (0-1)
     */
    RoleBloodBar.prototype.setProgress = function (value) {
        var rect = new Rectangle(0, 0, this.progress.width, this.progress.height);
        rect.x = value * rect.width;
        this.progress.scrollRect = rect;
        this.scaleX;
    };
    return RoleBloodBar;
}(Laya.Sprite));
//# sourceMappingURL=RoleBloodBar.js.map