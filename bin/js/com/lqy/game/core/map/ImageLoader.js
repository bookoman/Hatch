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
var Texture = Laya.Texture;
/*
* 地图块加载
*/
var ImageLoader = /** @class */ (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader(mapID, url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.key = mapID;
        return _this;
    }
    ImageLoader.prototype.load = function () {
        Laya.loader.load(this.url, new Handler(this, this.loadCompleted), null, Loader.IMAGE);
    };
    ImageLoader.prototype.loadCompleted = function (data) {
        this.bmpd = data;
        this.event(LayaEvent.COMPLETE, this);
    };
    return ImageLoader;
}(Laya.EventDispatcher));
//# sourceMappingURL=ImageLoader.js.map