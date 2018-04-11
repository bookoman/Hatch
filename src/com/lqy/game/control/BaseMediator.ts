/*
* name;
*/
class BaseMediator{
    protected view = null;
    protected assetsUrl;
    constructor(assetsUrl = null,view = null){
        this.assetsUrl = assetsUrl;
        this.view = view;
        if(this.assetsUrl)
        {
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
    }
    /**资源加载进度 */
    protected onLoadProgress(data):void
    {

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

    

}