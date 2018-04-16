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
var TextTure = Laya.Texture;
var Rectangle = Laya.Rectangle;
var Dictionary = Laya.Dictionary;
var Matrix = Laya.Matrix;
var Point = Laya.Point;
var LayaEvent = Laya.Event;
/*
* 地图引擎,卡马克地图模式
*/
var MapEngine = /** @class */ (function (_super) {
    __extends(MapEngine, _super);
    function MapEngine() {
        var _this = _super.call(this) || this;
        //路径
        _this.rootPath = "";
        //地图id
        _this.mapID = 0;
        //加载类型，1 普通加载，2 分块加载
        _this.loadType = 0;
        _this.bmpdDic = new Dictionary();
        _this.bmpdLoadDic = new Dictionary();
        //SoureCache 是一个加载管理器，因为代码比较多，暂时不公开，此处是创建一个场景地图加载的管理  
        //如需要使用此类，可以自行修改加载方式  
        _this.sourceCach = SourceCache.createSourceCache(GameConfig.SCENE_CACHE, 1);
        return _this;
    }
    /**
     * 初始化地图
     * @param String rootPath      地图路径
     * @param int    mapID         地图标识
     * @param int    loadType      加载类型
     * @param int    visualWidth   可视化宽
     * @param int    visualHeight  可视化高
     * @param int    mapWidth      地图高
     * @param int    mapHeight     地图宽
     * @param int    tileWidth     分块宽
     * @param int    tileHeight    分块高
     * **/
    MapEngine.prototype.initMap = function (rootPath, mapID, loadType, visualWidth, visualHeight, mapWidth, mapHeight, tileWidth, tileHeight) {
        if (tileWidth === void 0) { tileWidth = 0; }
        if (tileHeight === void 0) { tileHeight = 0; }
        // this.dispose();  
        this.mapID = mapID;
        this.rootPath = rootPath;
        this.loadType = loadType;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        if (loadType == MapUtil.TYPE_LOAD_NOCUT) {
            this.scrollRect = new Rectangle(0, 0, mapWidth, mapHeight);
            this.sMaxWidth = mapWidth - this.sMinWidth;
            this.sMaxHeight = mapHeight - this.sMinHeight;
        }
        else if (loadType == MapUtil.TYPE_LOAD_CUT) {
            //总tile行列大小   
            this.rows = Math.ceil(mapHeight / tileHeight);
            this.cols = Math.ceil(mapWidth / tileWidth);
            this.defaultBmpd = new Texture();
        }
        this.resetMap(visualWidth, visualHeight);
        this.loadSmallMap();
    };
    //加载小地图  
    MapEngine.prototype.loadSmallMap = function () {
        var item = this.sourceCach.addSource("smallMap" + this.mapID, this.rootPath + "/" + this.mapID + "/small.jpg");
        item.on(LayaEvent.COMPLETE, this, this.loadSmallComplete, [item]);
        this.sourceCach.start();
    };
    /**
     * 重置当前网页窗口的可视化大小
     * @param int    visualWidth   可视化宽
     * @param int    visualHeight  可视化高
     * **/
    MapEngine.prototype.resetMap = function (visualWidth, visualHeight) {
        if (this.visualWidth != visualWidth ||
            this.visualHeight != visualHeight) { //宽高与前面不相同才进行重置  
            this._visualWidth = Math.min(visualWidth, this.mapWidth);
            this._visualHeight = Math.min(visualHeight, this.mapHeight);
            //可视部分tile大小*****
            this.sMinWidth = this._visualWidth / 2;
            this.sMinHeight = this._visualHeight / 2;
            if (this.loadType == MapUtil.TYPE_LOAD_CUT) {
                //可视部分tile大小  
                // this.sMinWidth = this._visualWidth/2;  
                // this.sMinHeight = this._visualHeight/2;  
                var vRow = Math.min(Math.ceil(this._visualHeight / this.tileHeight) + 1, this.rows);
                var vCol = Math.min(Math.ceil(this._visualWidth / this.tileWidth) + 1, this.cols);
                if (this.vRow != vRow || this.vCol != vCol) {
                    this.vRow = vRow;
                    this.vCol = vCol;
                    this.scrollRect = new Rectangle(0, 0, this.vCol * this.tileWidth, this.vRow * this.tileHeight);
                }
                this.tx = -1;
                this.ty = -1;
                this.fx = -1;
                this.fy = -1;
            }
        }
    };
    Object.defineProperty(MapEngine.prototype, "px", {
        /**获取当前地图相对顶点X轴(普通地图的真实顶点)**/
        get: function () {
            return this.bx + this.tx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapEngine.prototype, "py", {
        /**获取当前地图相对顶点Y轴(普通地图的真实顶点)**/
        get: function () {
            return this.by + this.ty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapEngine.prototype, "visualWidth", {
        /**获取可视区域的宽**/
        get: function () {
            return this._visualWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapEngine.prototype, "visualHeight", {
        /**获取可视区域的高**/
        get: function () {
            return this._visualHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 滚动位图
     * @param Number fx 跟随者X轴坐标
     * @param Number fy 跟随者Y轴坐标
     * **/
    MapEngine.prototype.onScroll = function (fx, fy) {
        if (this.fx != fx || this.fy != fy) {
            this.cacheAsBitmap = false;
            this.fx = fx;
            this.fy = fy;
            if (this.loadType == MapUtil.TYPE_LOAD_CUT) {
                this.updateTXY(fx, fy);
                fx -= this.tx;
                fy -= this.ty;
            }
            this.centerMap(fx, fy);
            this.checkLoad();
        }
        else {
            this.cacheAsBitmap = true;
        }
    };
    //更新tile的顶点位置  
    MapEngine.prototype.updateTXY = function (x, y) {
        this.sRow = Math.floor((y - this.sMinHeight) / this.tileHeight);
        this.sCol = Math.floor((x - this.sMinWidth) / this.tileWidth);
        if (this.sRow <= 0) {
            this.sRow = 0;
        }
        else if (this.sRow >= (this.rows - this.vRow)) {
            this.sRow = this.rows - this.vRow;
        }
        if (this.sCol <= 0) {
            this.sCol = 0;
        }
        else if (this.sCol >= (this.cols - this.vCol)) {
            this.sCol = this.cols - this.vCol;
        }
        this.eRow = this.sRow + this.vRow;
        this.eCol = this.sCol + this.vCol;
        if (this.eRow >= this.rows) {
            this.sMaxHeight = this.mapHeight - this.sRow * this.tileHeight - this.sMinHeight;
        }
        else {
            this.sMaxHeight = this.vRow * this.tileHeight - this.sMinHeight;
        }
        if (this.eCol >= this.cols) {
            this.sMaxWidth = this.mapWidth - this.sCol * this.tileWidth - this.sMinWidth;
        }
        else {
            this.sMaxWidth = this.vCol * this.tileWidth - this.sMinWidth;
        }
        var tx = this.sCol * this.tileWidth;
        var ty = this.sRow * this.tileHeight;
        if (tx != this.tx || this.ty != ty) {
            this.tx = tx;
            this.ty = ty;
            this.updateAllBmpd();
        }
    };
    //地图居中  
    MapEngine.prototype.centerMap = function (fx, fy) {
        var centerX = 0;
        var centerY = 0;
        if (fx <= this.sMinWidth) {
            centerX = 0;
        }
        else if (fx >= this.sMaxWidth) {
            centerX = this.sMaxWidth - this.sMinWidth;
        }
        else {
            centerX = fx - this.sMinWidth;
        }
        if (fy <= this.sMinHeight) {
            centerY = 0;
        }
        else if (fy >= this.sMaxHeight) {
            centerY = this.sMaxHeight - this.sMinHeight;
        }
        else {
            centerY = fy - this.sMinHeight;
        }
        var rect = this.scrollRect;
        rect.x = centerX;
        rect.y = centerY;
        this.scrollRect = rect;
        this.bx = centerX;
        this.by = centerY;
    };
    //检查加载地图，判断地图是否在可视范围内，是的话加入加载队列中  
    MapEngine.prototype.checkLoad = function () {
        var item;
        if (this.loadType == MapUtil.TYPE_LOAD_NOCUT) {
            if (this.bmpdLoadDic.get(this.mapID + "_0_0") == undefined) {
                item = this.sourceCach.addSource(this.mapID + "_0_0", this.rootPath + "/" + this.mapID + "/big.png");
                item.on(LayaEvent.COMPLETE, this, this.loadComplete, [item]);
                this.bmpdDic[item.key] = item;
                this.bmpdLoadDic.set(this.mapID + "_0_0", true);
            }
        }
        else if (this.loadType == MapUtil.TYPE_LOAD_CUT) {
            for (var i = this.sRow; i < this.eRow; i++) {
                for (var j = this.sCol; j < this.eCol; j++) {
                    if (this.bmpdLoadDic.get(this.mapID + "_" + i + "_" + j) == undefined) {
                        item = this.sourceCach.addSource(this.mapID + "_" + i + "_" + j, this.rootPath + "/" + this.mapID + "/" + i + "_" + j + ".jpg");
                        item.on(LayaEvent.COMPLETE, this, this.loadComplete, [item]);
                        this.bmpdLoadDic.set(item.key, item);
                        this.bmpdLoadDic.set(this.mapID + "_" + i + "_" + j, true);
                    }
                }
            }
        }
        this.sourceCach.start();
    };
    //加载位图成功  
    MapEngine.prototype.loadComplete = function (event, data) {
        var item = data;
        if (item != null) {
            if (this.bmpdDic.get(item.key) instanceof TextTure) {
                this.bmpdDic.get(item.key).destroy();
            }
            var array = item.key.split("_");
            this.bmpdDic.set(item.key, item.bmpd);
            this.updateBmpd(Number(array[1]), Number(array[2]));
            item.on(LayaEvent.COMPLETE, this, this.loadComplete);
        }
    };
    //加载小地图成功  
    MapEngine.prototype.loadSmallComplete = function (event, data) {
        var item = data;
        if (item != null) {
            var bmpd;
            var matrix = new Matrix();
            if (this.loadType == MapUtil.TYPE_LOAD_NOCUT) {
                if (this.bmpdDic.get(this.mapID + "_0_0") == null) {
                    matrix.scale(this.mapWidth / item.bmpd.width, this.mapHeight / item.bmpd.height);
                    bmpd = Laya.Texture.create(item.bmpd, 0, 0, this.mapWidth, this.mapHeight);
                    // bmpd.draw(item.bmpd,matrix,null,null,null,false);  
                    this.bmpdDic.set(this.mapID + "_0_0", bmpd);
                    this.updateBmpd(0, 0);
                }
            }
            else if (this.loadType == MapUtil.TYPE_LOAD_CUT) {
                this.smallBmpd = item.bmpd;
                this.updateAllBmpd();
            }
            item.off(LayaEvent.COMPLETE, this, this.loadSmallComplete);
        }
    };
    //滚动到边缘时需要更新整张位图  
    MapEngine.prototype.updateAllBmpd = function () {
        this.graphics.clear();
        for (var i = this.sRow; i <= this.eRow; i++) {
            for (var j = this.sCol; j <= this.eCol; j++) {
                var point = new Point((j - this.sCol) * this.tileWidth, (i - this.sRow) * this.tileHeight);
                var bmpd;
                if (this.bmpdDic.get(this.mapID + "_" + i + "_" + j) instanceof Texture) {
                    bmpd = this.bmpdDic.get(this.mapID + "_" + i + "_" + j);
                }
                else if (this.smallBmpd != null) {
                    var matrix = new Matrix();
                    var stw = Math.round(this.smallBmpd.width / this.cols);
                    var sth = Math.round(this.smallBmpd.height / this.rows);
                    var sbmpd = Laya.Texture.createFromTexture(this.smallBmpd, j * stw, i * sth, stw, sth);
                    matrix.scale(this.tileWidth / stw, this.tileHeight / sth);
                    bmpd = Laya.Texture.create(sbmpd, 0, 0, matrix.getScaleX() * this.tileWidth, Math.pow(matrix.getScaleY(), this.tileHeight));
                    sbmpd.destroy();
                    this.bmpdDic.set(this.mapID + "_" + i + "_" + j, bmpd);
                }
                else {
                    bmpd = this.defaultBmpd;
                }
                this.graphics.drawTexture(bmpd);
                this.graphics.drawRect(point.x, point.y, bmpd.width, bmpd.height, "#ffffff");
            }
        }
        // this.graphics.endFill();  
    };
    //更新缓冲位图  
    MapEngine.prototype.updateBmpd = function (row, col) {
        var bmpd;
        if (this.loadType == MapUtil.TYPE_LOAD_NOCUT) {
            bmpd = this.bmpdDic.get(this.mapID + "_0_0");
            this.graphics.drawTexture(bmpd);
            // this.graphics.drawRect(0,0,bmpd.width,bmpd.height,"#ffffff");  
        }
        else if (this.loadType == MapUtil.TYPE_LOAD_CUT) {
            bmpd = this.bmpdDic.get(this.mapID + "_" + row + "_" + col);
            this.graphics.drawTexture(bmpd);
            // this.graphics.drawRect((col-this.sCol)*this.tileWidth,(row-this.sRow)*this.tileHeight,bmpd.width,bmpd.height,"#ffffff");  
        }
        // this.graphics.endFill();  
    };
    /**销毁  一般会在切换场景时需要执行此方法，用于清除上一张地图的位图缓存， 回收内存**/
    MapEngine.prototype.dispose = function () {
        //执行removeAllSource()将会删除当前加载管理中所有资源,并清除当前加载队列 
        this.sourceCach.removeAllSource();
        var temp;
        for (var key in this.bmpdDic) {
            temp = this.bmpdDic.get(key);
            if (temp instanceof ImageLoader) {
                temp.off(LayaEvent.COMPLETE, this, this.loadComplete);
            }
            else if (temp instanceof Texture) {
                temp.destroy();
            }
        }
        if (this.defaultBmpd != null) {
            this.defaultBmpd.destroy();
            this.defaultBmpd = null;
        }
        if (this.smallBmpd != null) {
            this.smallBmpd.destroy();
            this.smallBmpd = null;
        }
        this.bmpdDic = new Dictionary();
        this.bmpdLoadDic = new Dictionary();
        this.tx = -1;
        this.ty = -1;
        this.fx = -1;
        this.fy = -1;
    };
    return MapEngine;
}(Laya.Sprite));
//# sourceMappingURL=MapEngine.js.map