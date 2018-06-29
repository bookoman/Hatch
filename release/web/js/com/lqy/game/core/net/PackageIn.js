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
        this.endian = Laya.Byte.BIG_ENDIAN; //设置endian；
        this.clear();
        this.writeArrayBuffer(msg);
        this.pos = 0;
        //标记和长度
        var mark = this.getInt16();
        var len = this.getInt32();
        //包头
        this.module = this.getInt32();
        this.cmd = this.getInt32();
        var type = this.getByte();
        var format = this.getByte();
        //数据
        var tempByte = this.buffer.slice(this.pos);
        this.body = new Uint8Array(tempByte);
    };
    return PackageIn;
}(Laya.Byte));
//# sourceMappingURL=PackageIn.js.map