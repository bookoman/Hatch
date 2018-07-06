var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 地图循环引擎
* 地图移动完成后重置到0位子，但是后面要用前面半个屏幕部分纹理补上，帮助过度
*/
var MapLoopEngine = /** @class */ (function (_super) {
    __extends(MapLoopEngine, _super);
    function MapLoopEngine() {
        var _this = _super.call(this) || this;
        //路径
        _this.rootPath = "";
        //地图id
        _this.mapID = 0;
        //地图纹理
        _this.mapTexture = null;
        //滚动速度X
        _this.scrollXSpeed = 2;
        //滚动速度Y
        _this.scrollYSpeed = 2;
        return _this;
    }
    /**
     *
     * @param rootPath
     * @param mapID
     * @param mapType
     * @param scrollXSpeed
     * @param visualWidth
     * @param visualHeight
     */
    MapLoopEngine.prototype.initMap = function (rootPath, mapID, mapType, scrollXSpeed, visualWidth, visualHeight) {
        if (this.mapID == mapID) {
            return;
        }
        else {
            this.dispose();
        }
        this.rootPath = rootPath;
        this.mapID = mapID;
        this.fx = 0;
        this.fy = 0;
        this.scrollXSpeed = scrollXSpeed;
        this.scrollYSpeed = 0;
        if (visualHeight) {
            this.visualWidth = visualWidth;
        }
        else {
            this.visualWidth = GameConfig.STAGE_WIDTH;
        }
        this.visualHeight = visualHeight;
        var url;
        if (mapType == MapType.NEAR_MAP) {
            url = this.rootPath + "/" + mapID + "/near.png";
        }
        else if (mapType == MapType.FAR_MAP) {
            url = this.rootPath + "/" + mapID + "/far.png";
        }
        else {
            url = this.rootPath + "/" + mapID + "/middle.png";
        }
        Laya.loader.load(url, new Handler(this, this.loadMapCompleted), null, Loader.IMAGE);
    };
    MapLoopEngine.prototype.loadMapCompleted = function (data) {
        this.mapTexture = data;
        if (!this.visualHeight) {
            this.visualHeight = this.mapTexture.height;
        }
        this.mapWidth = this.mapTexture.width;
        this.mapHeight = this.mapTexture.height;
        this.scrollRect = new Rectangle(0, 0, this.mapWidth, this.mapHeight);
        this.graphics.drawTexture(this.mapTexture);
        //补位纹理
        var repairTexture = Laya.Texture.createFromTexture(this.mapTexture, 0, 0, this.visualWidth, this.visualHeight);
        this.graphics.drawTexture(repairTexture, this.mapWidth, this.fy);
    };
    /**
     *
     * @param speedX x方向滚动速度
     * @param speedY y方向滚动速度
     */
    MapLoopEngine.prototype.onScroll = function (speedX, speedY) {
        if (this.mapTexture == null) {
            return;
        }
        if (speedX && speedX != this.scrollXSpeed) {
            this.scrollXSpeed = speedX;
        }
        if (speedY && speedY == this.scrollYSpeed) {
            this.scrollYSpeed = this.scrollYSpeed;
        }
        var fx = this.fx + this.scrollXSpeed;
        var fy = this.fy + this.scrollYSpeed;
        if (this.fx != fx || this.fy != fy) {
            this.cacheAsBitmap = false;
            this.fx = fx;
            this.fy = fy;
            if (this.fx > this.mapWidth) {
                this.fx = 0;
            }
            //滚动视图
            var rect = this.scrollRect;
            rect.x = this.fx;
            rect.y = this.fy;
            this.scrollRect = rect;
            //坐标移动
            // this.x = -this.fx;
            // console.log("地图打印："+this.fx);
        }
        else {
            // this.cacheAsBitmap = true;  
        }
    };
    /**销毁  一般会在切换场景时需要执行此方法，用于清除上一张地图的位图缓存， 回收内存**/
    MapLoopEngine.prototype.dispose = function () {
        //执行removeAllSource()将会删除当前加载管理中所有资源,并清除当前加载队列 
        this.rootPath = "";
        this.mapID = 0;
        this.mapWidth = 0;
        this.mapHeight = 0;
        if (this.mapTexture) {
            this.mapTexture.destroy();
            this.mapTexture = null;
        }
    };
    return MapLoopEngine;
}(Laya.Sprite));
//# sourceMappingURL=MapLoopEngine.js.map