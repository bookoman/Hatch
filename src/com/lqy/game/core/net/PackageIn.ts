/*
* 包解析
*/
class PackageIn extends Laya.Byte{
    
    public protocol:number;
    public errorCode:number = 0;
    public body;
    constructor(){
        super();
    }
    public read(msg:Object = null):void
    {
        this.clear();
        this.writeArrayBuffer(msg);
        this.pos = 0;

        var mark = this.getUint8();
        var len = this.getInt16() + this.getUint8();
        //包头
        var module = this.getInt16();
        this.protocol = this.getInt16();
        var type = this.getByte();
        var format = this.getByte();
        //数据
        this.body = this.buffer.slice(this.pos);

    }
    
}
