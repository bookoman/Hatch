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
* name;
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
    PackageOut.prototype.pack = function (cmd, data) {
        this.writeUint8(this.PACKET_MARK);
        var tempByte = new Laya.Byte();
        tempByte.writeArrayBuffer(data);
        this.writeUint8(this.PACKET_MARK + tempByte.bytesAvailable);
        //包头
        this.writeInt16(this.module);
        this.writeInt16(cmd);
        this.writeInt16(this.type);
        this.writeInt16(this.formart);
        //消息体
        this.writeArrayBuffer(tempByte);
    };
    return PackageOut;
}(Laya.Byte));
//# sourceMappingURL=PackageOut.js.map