/*
* 地图管理
*/
var MapManager = /** @class */ (function () {
    function MapManager() {
        //地图测试数据 mapId >> mapVO
        this.mapCofing = {
            "1": { "mapID": 1 },
            "2": { "mapID": 2 }
        };
        this.mapEngine = null;
        this.mapLoopEngine = null;
        this.nearMapLoopEngin = null;
        this.tx = 0;
    }
    Object.defineProperty(MapManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new MapManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    MapManager.prototype.enterMap = function (rootUrl, mapID, loadType, visualWidth, visualHeight, mapWidth, mapHeight, tileWidth, tileHeight) {
        if (tileWidth === void 0) { tileWidth = 0; }
        if (tileHeight === void 0) { tileHeight = 0; }
        if (this.mapEngine) {
            this.mapEngine.dispose();
            this.mapEngine = null;
        }
        //卡马克
        // this.mapEngine = new MapEngine();
        // this.mapEngine.initMap(rootUrl,mapID,loadType,visualWidth,visualHeight,mapWidth,mapHeight);
        // this.mapEngine.y = 600;
        // LayerManager.ins.addToLayer(this.mapEngine,LayerManager.TIP_LAYER,false,false,false);
        //地图循环
        this.mapLoopEngine = new MapLoopEngine();
        this.mapLoopEngine.initMap("res/outside/map", 1, MapType.BACKGROUND_MAP, 6, GameConfig.STAGE_WIDTH);
        this.mapLoopEngine.y = 392;
        LayerManager.ins.addToLayer(this.mapLoopEngine, LayerManager.BG_LAYER, false, true, false);
        this.nearMapLoopEngin = new MapLoopEngine();
        this.nearMapLoopEngin.initMap("res/outside/map", 1, MapType.NEAR_MAP, 3, GameConfig.STAGE_WIDTH);
        this.nearMapLoopEngin.y = 600;
        LayerManager.ins.addToLayer(this.nearMapLoopEngin, LayerManager.BG_NEAR_LAYER, false, true, false);
        //测试移动
        Laya.timer.frameLoop(2, this, this.mapMoveLoop);
    };
    MapManager.prototype.mapMoveLoop = function () {
        //卡马克滚动
        // this.moveOnScrol(this.tx,0);
        // this.tx += 2;
        // if(this.tx > 920)
        // {
        //     this.tx = 0;
        // }
        //地图循环滚动
        if (this.mapLoopEngine) {
            this.mapLoopEngine.onScroll(4);
        }
        if (this.nearMapLoopEngin) {
            this.nearMapLoopEngin.onScroll(3);
        }
        // console.log("地图打印："+this.tx);
    };
    /**
     * 滚动更新
     * @param fx
     * @param fy
     */
    MapManager.prototype.moveOnScrol = function (fx, fy) {
        if (this.mapEngine) {
            this.mapEngine.onScroll(fx, fy);
        }
    };
    MapManager._ins = null;
    return MapManager;
}());
//# sourceMappingURL=MapManager.js.map