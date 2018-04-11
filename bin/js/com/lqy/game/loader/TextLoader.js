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
* 文本加载其
*/
var TextLoader = /** @class */ (function (_super) {
    __extends(TextLoader, _super);
    function TextLoader() {
        return _super.call(this) || this;
    }
    TextLoader.prototype.loadText = function (url, cache, group, ignoreCache) {
        _super.prototype.load.call(this, url, new Laya.Handler(this, this.onLoaded), null, Laya.Loader.TEXT, 1, false, null);
    };
    TextLoader.prototype.onLoaded = function (data) {
        console.log("加载数据：" + data);
    };
    return TextLoader;
}(BaseLoader));
//# sourceMappingURL=TextLoader.js.map