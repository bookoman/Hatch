/*
* name;
*/
var TipsManager = /** @class */ (function () {
    function TipsManager() {
    }
    Object.defineProperty(TipsManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new TipsManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示飘字
     * @param msg
     * @param fontSize
     * @param color
     * @param parent
     * @param sx
     * @param sy
     * @param showTime
     * @param floatHei
     */
    TipsManager.prototype.showFloatMsg = function (msg, fontSize, color, parent, sx, sy, showTime, floatWidth, floatHei) {
        var floatFontTip = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if (floatFontTip) {
            floatFontTip.setAttribute(fontSize, color);
            floatFontTip.show(msg, parent, sx, sy, showTime, floatWidth, floatHei);
        }
    };
    /**
     * 显示飘HTMl字
     * @param msg
     * @param fontSize
     * @param color
     * @param parent
     * @param sx
     * @param sy
     * @param showTime
     * @param floatHei
     */
    TipsManager.prototype.showFloatHtmlMsg = function (html, parent, sx, sy, showTime, floatHei) {
        var floatFontTip = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if (floatFontTip) {
            floatFontTip.showHtml(html, parent, sx, sy, showTime, floatHei);
        }
    };
    TipsManager._ins = null;
    return TipsManager;
}());
//# sourceMappingURL=TipsManager.js.map