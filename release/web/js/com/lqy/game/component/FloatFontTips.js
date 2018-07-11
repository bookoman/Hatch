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
        var _this = _super.call(this) || this;
        _this.htmlDiv = new Laya.HTMLDivElement();
        _this.fontClipView = new FontClipView("unpack/main/font_red.png", "+-0123456789");
        _this.fontClipView.anchorX = 0.5;
        _this.fontClipView.anchorY = 0.5;
        _this.fontClipView.scale(0.8, 0.8);
        return _this;
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
    FloatFontTips.prototype.show = function (msg, parent, sx, sy, showTime, floatWidth, floatHei, isRight) {
        this.text = msg;
        this.x = sx - this.width / 2;
        this.y = sy - this.height / 2;
        parent.addChild(this);
        this.alpha = 1;
        var tx = this.x + (isRight ? 1 : -1) * floatWidth;
        // Laya.Tween.to(this,{x:tx,y:this.y - floatHei,alpha:0.6},showTime * 1000,Laya.Ease.backInOut,Laya.Handler.create(this,this.floatCompleted));
        Laya.Tween.to(this, { x: tx, y: this.y - floatHei, alpha: 0.6 }, showTime * 1000, Laya.Ease.backOut, Laya.Handler.create(this, this.floatCompleted));
    };
    /**
     * 显示html文本
     * @param html
     * @param parent
     * @param sx
     * @param sy
     * @param showTime
     * @param floatHei
     */
    FloatFontTips.prototype.showHtml = function (html, parent, sx, sy, showTime, floatHei) {
        this.htmlDiv.innerHTML = html;
        this.addChild(this.htmlDiv);
        // htmlDiv.pos(50, 200);
        this.x = sx - this.htmlDiv.contextWidth / 2;
        this.y = sy - this.htmlDiv.contextHeight / 2;
        parent.addChild(this);
        this.alpha = 1;
        Laya.Tween.to(this, { y: this.y - floatHei, alpha: 0.6 }, showTime * 1000, Laya.Ease.backInOut, Laya.Handler.create(this, this.floatCompleted));
    };
    /**
     * 显示fontClip
     * @param msg
     * @param parent
     * @param sx
     * @param sy
     * @param showTime
     * @param floatWidth
     * @param floatHei
     * @param isRight
     * @param fontSkin
     * @param sheet
     */
    FloatFontTips.prototype.showFlontClip = function (msg, parent, sx, sy, showTime, floatWidth, floatHei, isRight, fontSkin, sheet) {
        this.text = "";
        fontSkin = fontSkin === undefined ? "unpack/main/font_red.png" : fontSkin;
        sheet = sheet === undefined ? "+-0123456789" : sheet;
        this.fontClipView.skin = fontSkin;
        this.fontClipView.sheet = sheet;
        this.fontClipView.value = msg;
        this.addChild(this.fontClipView);
        this.x = sx;
        this.y = sy;
        parent.addChild(this);
        this.alpha = 1;
        var tx = this.x + (isRight ? 1 : -1) * floatWidth;
        Laya.Tween.to(this, { x: tx, y: this.y - floatHei, alpha: 0.8 }, showTime * 1000, Laya.Ease.backOut, Laya.Handler.create(this, this.floatCompleted));
    };
    /**
     * 移动完成
     */
    FloatFontTips.prototype.floatCompleted = function () {
        this.htmlDiv.innerHTML = "";
        this.text = "";
        this.removeSelf();
        this.fontClipView.removeSelf();
        Laya.Tween.clearAll(this);
        ObjectPoolUtil.stillObject(ObjectPoolUtil.FLOAT_FONT_TIPS, this);
    };
    return FloatFontTips;
}(Laya.Label));
//# sourceMappingURL=FloatFontTips.js.map