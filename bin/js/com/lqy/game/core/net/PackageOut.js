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
        return _super.call(this) || this;
    }
    // public pack(module,cmd,data?:any):void
    // {
    //     this.endian = Laya.Byte.BIG_ENDIAN;//设置endian；
    //     this.module = module;
    //     this.cmd = cmd;
    //     this.writeInt16(this.PACKET_MARK);
    //     this.writeInt32(data.byteLength + 10);
    //     //包头
    //     this.writeInt32(this.module);
    //     this.writeInt32(this.cmd);
    //     this.writeByte(this.type);
    //     this.writeByte(this.formart);
    //     //消息体
    //     if(data)
    //     {
    //         this.writeArrayBuffer(data);
    //     }
    // }
    /**新通信 */
    PackageOut.prototype.pack = function (cmd, data) {
        this.endian = Laya.Byte.BIG_ENDIAN; //设置endian；
        var len = data.byteLength + 12;
        this.cmd = cmd;
        var code = WebSocketManager.codeCount ^ len ^ 512;
        this.writeInt32(len);
        this.writeInt32(code);
        this.writeInt32(this.cmd);
        if (data) {
            this.writeArrayBuffer(data);
        }
        WebSocketManager.codeCount++;
    };
    return PackageOut;
}(Laya.Byte));
//# sourceMappingURL=PackageOut.js.map