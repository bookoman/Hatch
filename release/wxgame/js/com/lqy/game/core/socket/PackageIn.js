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
* 包解析
*/
var PackageIn = /** @class */ (function (_super) {
    __extends(PackageIn, _super);
    function PackageIn() {
        return _super.call(this) || this;
    }
    PackageIn.prototype.read = function (msg) {
        if (msg === void 0) { msg = null; }
        this.clear();
        this.writeArrayBuffer(msg);
        this.pos = 0;
        var mark = this.getUint8();
        var len = this.getInt16() + this.getUint8();
        //包头
        var module = this.getInt16();
        this.cmd = this.getInt16();
        var type = this.getByte();
        var format = this.getByte();
        //数据
        var body = this.buffer.slice(this.pos);
    };
    return PackageIn;
}(Laya.Byte));
//# sourceMappingURL=PackageIn.js.map