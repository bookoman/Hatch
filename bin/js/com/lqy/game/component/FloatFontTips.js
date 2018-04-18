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
* 飘字tips
*/
var FloatFontTips = /** @class */ (function (_super) {
    __extends(FloatFontTips, _super);
    function FloatFontTips() {
        return _super.call(this) || this;
    }
    /**
     * 设置属性
     * @param fontSize
     * @param color
     * @param font
     */
    FloatFontTips.prototype.setAttribute = function (fontSize, color, font) {
        fontSize = fontSize ? fontSize : 24;
        font = font ? font : "SimHei";
        color = color ? color : "#000000";
        this.fontSize = fontSize;
        this.color = color;
        this.font = font;
        this.bold = true;
    };
    /**
     * 飘字
     * @param showTime
     * @param floatHei
     */
    FloatFontTips.prototype.show = function (msg, parent, sx, sy, showTime, floatHei) {
        this.text = msg;
        this.x = sx;
        this.y = sy;
        parent.addChild(this);
        this.alpha = 1;
        Laya.Tween.to(this, { y: this.y - floatHei, alpha: 0.3 }, showTime * 1000, Laya.Ease.backInOut, new Laya.Handler(this, this.floatCompleted));
    };
    /**
     * 移动完成
     */
    FloatFontTips.prototype.floatCompleted = function () {
        this.removeSelf();
        ObjectPoolUtil.stillObject(ObjectPoolUtil.FLOAT_FONT_TIPS, this);
    };
    return FloatFontTips;
}(Laya.Label));
//# sourceMappingURL=FloatFontTips.js.map