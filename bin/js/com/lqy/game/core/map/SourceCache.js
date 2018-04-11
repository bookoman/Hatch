/*
* 地图资源缓存
*/
var SourceCache = /** @class */ (function () {
    function SourceCache() {
        this.imageLoaderDic = null;
    }
    SourceCache.createSourceCache = function (sceneID, code) {
        if (this._ins == null) {
            this._ins = new SourceCache();
        }
        return this._ins;
    };
    SourceCache.prototype.removeAllSource = function () {
    };
    SourceCache.prototype.start = function () {
        // Laya.timer.frameLoop(20,this,this.frameLoop,null,true);
        if (this.imageLoaderDic == null) {
            this.imageLoaderDic = new Dictionary();
        }
        this.imageLoaderDic.values.forEach(function (element) {
            element.load();
        });
        // var imgLoader:ImageLoader;
        // for(var key in this.imageLoaderDic.values)
        // {
        //     imgLoader = this.imageLoaderDic.values[key];
        //     imgLoader.load();
        // }
    };
    // private frameLoop():void
    // {
    // }
    /**
     * 添加缓存资源
     * @param mapID 地图id
     * @param url 图片路径
     */
    SourceCache.prototype.addSource = function (mapID, url) {
        if (this.imageLoaderDic == null) {
            this.imageLoaderDic = new Dictionary();
        }
        var imgLoader = new ImageLoader(mapID, url);
        this.imageLoaderDic.set(mapID + "_" + url, imgLoader);
        return imgLoader;
    };
    /**移除缓存资源 */
    SourceCache.prototype.removeSource = function (key) {
        delete this.imageLoaderDic[key];
    };
    SourceCache._ins = null;
    return SourceCache;
}());
//# sourceMappingURL=SourceCache.js.map