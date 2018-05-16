/*
* name;
*/
class PackageOut extends Laya.Byte{
    private PACKET_MARK = 0x0;
    private module = 0;
    private cmd;
    private type = 0;
    private formart = 0;
    constructor(){
        super();
    }
    public pack(module,cmd,data?:any):void
    {
        this.module = module;
        this.cmd = cmd;
        this.writeUint8(this.PACKET_MARK);
        var tempByte:Laya.Byte = new Laya.Byte();
        if(data)
        {
            tempByte.writeArrayBuffer(data);
        }
        this.writeUint8(this.PACKET_MARK + tempByte.bytesAvailable);
        //包头
        this.writeInt16(this.module);
        this.writeInt16(this.cmd);
        this.writeInt16(this.type);
        this.writeInt16(this.formart);
        //消息体
        if(data)
        {
            this.writeArrayBuffer(tempByte);
        }
    }
}