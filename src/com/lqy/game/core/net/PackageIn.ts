/*
* 包解析
*/
class PackageIn extends Laya.Byte{
    
    public module:number;
    public errorCode:number = 0;
    public body;
    constructor(){
        super();
    }
    public read(msg:Object = null):void
    {
        this.endian = Laya.Byte.BIG_ENDIAN;//设置endian；
        this.clear();
        this.writeArrayBuffer(msg);
        this.pos = 0;
        //标记和长度
        var mark = this.getInt16();
        var len = this.getInt32();
        //包头
        this.module = this.getInt32();
        var cmd = this.getInt32();
        var type = this.getByte();
        var format = this.getByte();
        //数据
        var tempByte = this.buffer.slice(this.pos);
        this.body = new Uint8Array(tempByte);
    }
    
}
