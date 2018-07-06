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
* 打包
*/
var PackageOut = /** @class */ (function (_super) {
    __extends(PackageOut, _super);
    function PackageOut() {
        var _this = _super.call(this) || this;
        _this.PACKET_MARK = 0x0;
        _this.module = 0;
        _this.type = 0;
        _this.formart = 0;
        return _this;
    }
    PackageOut.prototype.pack = function (module, cmd, data) {
        this.endian = Laya.Byte.BIG_ENDIAN; //设置endian；
        this.module = module;
        this.cmd = cmd;
        this.writeInt16(this.PACKET_MARK);
        this.writeInt32(data.byteLength + 10);
        //包头
        this.writeInt32(this.module);
        this.writeInt32(this.cmd);
        this.writeByte(this.type);
        this.writeByte(this.formart);
        //消息体
        if (data) {
            this.writeArrayBuffer(data);
        }
    };
    return PackageOut;
}(Laya.Byte));
//# sourceMappingURL=PackageOut.js.map