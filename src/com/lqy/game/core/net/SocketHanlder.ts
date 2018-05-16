/*
* 数据处理Hanlder
*/
class SocketHanlder{
    public cmd:number;
    private caller:any;
    private callBack:Function;
    constructor(cmd:number,caller:any,callback:Function = null){
        this.cmd = cmd;
        this.caller = caller;
        this.callBack = callback;
    }

    public explain(errorCode:number,data):void
    {
        if(errorCode == 0)
        {
            console.log(errorCode);
        }
        else
        {
            this.success(data);
        }
    }
    protected success(data):void
    {
        if(data)
        {
            this.callBack.apply(this,data);
        }
        else
        {
            this.callBack();
        }
    }
}