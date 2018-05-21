/*
* 数据处理Hanlder
*/
class SocketHanlder{
    public statusCode:number = 0;
    public module:number;
    private caller:any;
    private callBack:Function;
    constructor(module:number,caller:any,callback:Function = null){
        this.module = module;
        this.caller = caller;
        this.callBack = callback;
    }

    public explain(data):void
    {
        var statusCode = data.statusCode;
        if(statusCode == 0)
        {
            this.success(data);
        }
        else
        {
            console.log("服务器返回："+data.statusCode);
        }
    }
    protected success(data?:any):void
    {
        if(data)
        {
            this.callBack.call(this.caller,data);
            
        }
        else
        {
            this.callBack.call(this.caller);
        }
    }
}