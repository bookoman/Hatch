/*
* 地图资源缓存
*/
class SourceCache{
    private imageLoaderDic:Dictionary = null;
    constructor()
    {

    }
    private static _ins:SourceCache = null;
    public static createSourceCache(sceneID:number,code:number):SourceCache
    {
        if(this._ins == null)
        {
            this._ins = new SourceCache();
        }
        return this._ins;
    }

    public removeAllSource():void
    {   

    }

    public start():void
    {
        // Laya.timer.frameLoop(20,this,this.frameLoop,null,true);
        if(this.imageLoaderDic == null)
        {
            this.imageLoaderDic = new Dictionary();
        }
        
        this.imageLoaderDic.values.forEach(element => {
            (<ImageLoader>element).load();
        });
        // var imgLoader:ImageLoader;
        // for(var key in this.imageLoaderDic.values)
        // {
        //     imgLoader = this.imageLoaderDic.values[key];
        //     imgLoader.load();
        // }
    }

    // private frameLoop():void
    // {
        
    // }
    /**
     * 添加缓存资源
     * @param mapID 地图id
     * @param url 图片路径
     */
    public addSource(mapID:string,url:string):ImageLoader
    {
        if(this.imageLoaderDic == null)
        {
            this.imageLoaderDic = new Dictionary();
        }
        var imgLoader:ImageLoader = new ImageLoader(mapID,url);
        
        this.imageLoaderDic.set(mapID+"_"+url,imgLoader);
        return imgLoader;
    }
    /**移除缓存资源 */
    public removeSource(key:string):void
    {
        delete this.imageLoaderDic[key];
    }
}