/*
* http请求管理器
*/
class HttpManager{
    constructor(){

    }
    private static _ins:HttpManager = null;
    public static get ins():HttpManager
    {
        if(this._ins == null)
        {
            this._ins = new HttpManager();
        }
        return this._ins;
    }
    /**
     * 发送请求
     * @param url 地址
     * @param reqType 请求类型 post get 
     * @param params 请求参数
     * @param caller 封装heads
     * @param caller 请求回调caller
     * @param callBack 请求回调方法
     */
    public send(url:string,reqType:string,params?:Object,caller?:any,callBack?:Function)
    {
        var xhr:Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        if(caller && callBack)
        {
            xhr.once(Laya.Event.COMPLETE, caller, callBack);
        }
        var paramsStr:string = params ? this.formart(params) : "";
        //封装heads
        var heads:Array<string>;
        if(GameDataManager.ins.loginAuthentication)
        {
            heads = ["authentication",GameDataManager.ins.loginAuthentication];
        }
        if(reqType == HTTPReqType.GET)
        {
            if(paramsStr != "")
            {
                url = url + "?" + paramsStr;
            }
            xhr.send(url,"",reqType,"text",heads);
        }
        else if(reqType == HTTPReqType.POST)
        {
            xhr.send(url,"",paramsStr,"text",heads);
        }
    }
    /**
     * 参数格式化
     * @param params 
     */
    private formart(params:Object):string
    {
        var paramsStr:string = "";
        for (var key in params) {
           paramsStr +=  key + "=" + params[key] + "&";
        }
        paramsStr = paramsStr.substr(0,paramsStr.length - 1);
        return paramsStr;
    }

    private processHandler(data:any): void {
        console.log(data);
    }
    private errorHandler(data:any): void {

    }
    private completeHandler(e:any): void {
         console.log(e);
    }
}