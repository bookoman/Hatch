/*
* 数据处理Hanlder
*/
class SocketHanlder{
    public module:number;
    private caller:any;
    private callBack:Function;
    constructor(module:number,caller:any,callback:Function = null){
        this.module = module;
        this.caller = caller;
        this.callBack = callback;
    }

    public explain(errorCode:number,data):void
    {
        if(errorCode == 0)
        {
            this.success(data);
        }
        else
        {
            console.log(errorCode);
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