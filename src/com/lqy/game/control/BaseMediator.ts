/*
* name;
*/
class BaseMediator{
    protected view = null;
    protected assetsUrl;
    constructor(assetsUrl?:any,view?:any){
        this.assetsUrl = assetsUrl;
        this.view = view;
        if(this.assetsUrl)
        {
            ModuleLoadingView.ins.show();
            Laya.loader.load(this.assetsUrl,new Laya.Handler(this,this.onLoaded),new Laya.Handler(this,this.onLoadProgress));
        }
        else
        {
            this.initView();
        }
    }
    /**资源加载完成 */
    protected onLoaded(data):void
    {
        this.initView();
        ModuleLoadingView.ins.setProgress(1);
    }
    /**资源加载进度 */
    protected onLoadProgress(data):void
    {
        ModuleLoadingView.ins.setProgress(data);
    }

    protected initView():void
    {
        this.addEvents();
        
    }
    protected addEvents():void
    {
        
    }

    protected removeEvents():void
    {

    }

    public dispose():void
    {
        if(this.assetsUrl)
        {
            if(this.assetsUrl as Array<any>)
            {
                this.assetsUrl.forEach(element => {
                    Laya.loader.clearRes(element.url);
                });
            }
            else
            {
                Laya.loader.clearRes(this.assetsUrl);
            }
            this.assetsUrl = null;
        }
        if(this.view)
        {
            this.removeEvents();
            this.view.removeSelf();
        }
        this.view = null;
    }

    

}