/*
* 语言包
*/
var LG = /** @class */ (function () {
    function LG() {
    }
    LG.parse = function (data) {
        if (this.dic == null) {
            this.dic = new Dictionary();
        }
        var list = String(data).split("\r\n");
        for (var i = 0; i < list.length; i++) {
            var s = list[i];
            if (s.indexOf("#") == 0)
                continue;
            s = s.replace(/\\r/g, "\r");
            s = s.replace(/\\n/g, "\n");
            var index = s.indexOf(":");
            if (index != -1) {
                var name = s.substring(0, index);
                var value = s.substr(index + 1);
                value = value.split("##")[0];
                this.dic[name] = StringUtil.trimRight(value);
            }
        }
    };
    /**
    * 替换占位符
    * @param key int或String类型，int是为了兼容旧的语言配置
    * @param rest
    * @return String
    */
    LG.getTXT = function (translationId, args) {
        var reg = new RegExp("\\{(\\d+)\\}");
        var input = this[translationId] ? this[translationId] : translationId + "";
        var obj = reg.exec(input);
        while (obj && args.length > 0) {
            var id = parseInt(obj[1]);
            var str = String(args[id]);
            if (id >= 0 && id < args.length) {
                var idx = str.indexOf("$");
                if (idx > -1) {
                    str = str.slice(0, idx) + "$" + str.slice(idx);
                }
                input = input.replace(reg, str);
            }
            else {
                input = input.replace(reg, "{}");
            }
            obj = reg.exec(input);
        }
        return input;
    };
    LG.dic = null;
    return LG;
}());
//# sourceMappingURL=LG.js.map