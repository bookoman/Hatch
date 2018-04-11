/*
* name;
*/
var StringUtil = /** @class */ (function () {
    function StringUtil() {
    }
    /**转换Rectangle为逗号间隔的字符串*/
    StringUtil.rectToString = function (rect) {
        if (rect) {
            return rect.x + "," + rect.y + "," + rect.width + "," + rect.height;
        }
        return null;
    };
    StringUtil.trimRight = function (param1) {
        if (param1 == null) {
            return "";
        }
        return param1.replace(/\s+$""\s+$/, "");
    };
    /**
     * 得到时间字符串(时:分:秒)
     * @param timer
     * @return
     *
     */
    StringUtil.getTimeStr = function (timer) {
        var hour = timer / 3600;
        var min = timer % 3600 / 60;
        var s = timer % 3600 % 60;
        var timeStr = "";
        timeStr += (hour < 10 ? "0" + hour : hour) + ":";
        timeStr += (min < 10 ? "0" + min : min) + ":";
        timeStr += s < 10 ? "0" + s : s;
        return timeStr;
    };
    return StringUtil;
}());
//# sourceMappingURL=StringUtil.js.map