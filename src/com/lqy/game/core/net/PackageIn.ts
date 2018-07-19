/*
* 包解析
*/
class PackageIn extends Laya.Byte{
    
    // public module:number;
    public cmd:number;
    public body;
    constructor(){
        super();
    }
    // public read(msg:Object = null):void
    // {
    //     this.endian = Laya.Byte.BIG_ENDIAN;//设置endian；
    //     this.clear();
    //     this.writeArrayBuffer(msg);
    //     this.pos = 0;
    //     //标记和长度
    //     var mark = this.getInt16();
    //     var len = this.getInt32();
    //     //包头
    //     this.module = this.getInt32();
    //     this.cmd = this.getInt32();
    //     var type = this.getByte();
    //     var format = this.getByte();
    //     //数据
    //     var tempByte = this.buffer.slice(this.pos);
    //     this.body = new Uint8Array(tempByte);

    // }

    //新通信
    public read(msg:Object = null):void
    {
        this.endian = Laya.Byte.BIG_ENDIAN;//设置endian；
        this.clear();
        this.writeArrayBuffer(msg);
        this.pos = 0;

        var len = this.getInt32();
        this.cmd = this.getInt32();
        //数据
        var tempByte = this.buffer.slice(this.pos);
        this.body = new Uint8Array(tempByte);

    }
    
}
