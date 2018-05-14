/*
* 地图管理
*/
var MapManager = /** @class */ (function () {
    function MapManager() {
        //地图测试数据 mapId >> mapVO
        this.mapCofing = {
            "1": { "mapID": 1, "name": "1", "battleHeroGrid": [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], "battleEnemyGrid": [[3, 0], [2, 1], [3, 2], [2, 3], [3, 4]], "mapInitY": 600, "battleSceneH": 500 },
            "2": { "mapID": 2, "name": "2", "battleHeroGrid": [[1, 0], [0, 1], [1, 2], [0, 3], [1, 4]], "battleEnemyGrid": [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]], "mapInitY": 600, "battleSceneH": 500 },
            "10000": { "mapID": 10000, "name": "Boss挑战", "battleHeroGrid": [[0, 2], [0, 5], [0, 8], [0, 11], [0, 14]], "battleEnemyGrid": [[3, 2], [2, 5], [3, 8], [2, 11], [3, 14]], "mapInitY": 300, "battleSceneH": 1000 }
        };
        this.mapEngine = null;
        this.mapLoopEngine = null;
        this.nearMapLoopEngin = null;
        this.squintAngleGrid = null;
        /**地图开关 */
        this.mapScrollSwitch = true;
        this.challegenBossBg = null;
        //循环地图Id
        this.curLoopMapId = 0;
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
    MapManager.prototype.resizeSet = function () {
        if (this.curMapConfig) {
        }
    };
    MapManager.prototype.enterMap = function (rootUrl, mapID, loadType, visualWidth, visualHeight, mapWidth, mapHeight, tileWidth, tileHeight) {
        if (tileWidth === void 0) { tileWidth = 0; }
        if (tileHeight === void 0) { tileHeight = 0; }
        this.curMapConfig = this.mapCofing[mapID];
        GameConfig.MAP_INIT_Y = this.curMapConfig["mapInitY"];
        GameConfig.BATTLE_SCENE_HEIGHT = this.curMapConfig["battleSceneH"];
        //卡马克
        // if(this.mapEngine)
        // {
        //     this.mapEngine.dispose();
        //     this.mapEngine = null;
        // }
        // this.mapEngine = new MapEngine();
        // this.mapEngine.initMap(rootUrl,mapID,loadType,visualWidth,visualHeight,mapWidth,mapHeight);
        // this.mapEngine.y = 600;
        // LayerManager.ins.addToLayer(this.mapEngine,LayerManager.TIP_LAYER,false,false,false);
        //boss地图
        if (mapID >= 10000) {
            this.challegenBossBg = new Laya.Image("unpack/challengeboss/bg.png");
            LayerManager.ins.addToLayer(this.challegenBossBg, LayerManager.BG_LAYER, false, true, false);
            this.nearMapLoopEngin.visible = false;
            EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS, [false]);
        }
        else {
            if (this.curLoopMapId != mapID) {
                this.curLoopMapId = mapID;
                //地图循环
                this.mapLoopEngine = new MapLoopEngine();
                this.mapLoopEngine.initMap("res/outside/map", mapID, MapType.BACKGROUND_MAP, 6, GameConfig.STAGE_WIDTH);
                this.mapLoopEngine.y = GameConfig.MAP_INIT_Y;
                LayerManager.ins.addToLayer(this.mapLoopEngine, LayerManager.BG_LAYER, false, true, false);
                this.nearMapLoopEngin = new MapLoopEngine();
                this.nearMapLoopEngin.initMap("res/outside/map", mapID, MapType.NEAR_MAP, 3, GameConfig.STAGE_WIDTH);
                this.nearMapLoopEngin.y = this.mapLoopEngine.y + 210;
                LayerManager.ins.addToLayer(this.nearMapLoopEngin, LayerManager.BG_NEAR_LAYER, false, true, false);
                //测试移动
                Laya.timer.frameLoop(2, this, this.mapMoveLoop);
            }
        }
        this.calSquintAngleGrid();
        //声音
        SoundsManager.ins.playMusic("res/outside/sound/bg/zhou.mp3", 1000);
    };
    MapManager.prototype.backLoopMap = function () {
        this.challegenBossBg.removeSelf();
        this.challegenBossBg = null;
        this.nearMapLoopEngin.visible = true;
        this.enterMap("res/map", this.curLoopMapId, MapUtil.TYPE_LOAD_NOCUT, 400, 300, 920, 300);
    };
    // private tx:number = 0;
    MapManager.prototype.mapMoveLoop = function () {
        //卡马克滚动
        // this.moveOnScrol(this.tx,0);
        // this.tx += 2;
        // if(this.tx > 920)
        // {
        //     this.tx = 0;
        // }
        //地图循环滚动
        if (this.mapScrollSwitch) {
            if (this.mapLoopEngine) {
                this.mapLoopEngine.onScroll(4);
            }
            if (this.nearMapLoopEngin) {
                this.nearMapLoopEngin.onScroll(3);
            }
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
    /**计算网格视图 */
    MapManager.prototype.calSquintAngleGrid = function () {
        if (this.squintAngleGrid) {
            this.squintAngleGrid.dispose();
        }
        var mapWidth = GameConfig.STAGE_WIDTH;
        var mapHeight = GameConfig.BATTLE_SCENE_HEIGHT;
        this.squintAngleGrid = new SquintAngleGrid(mapWidth, mapHeight, true);
        this.squintAngleGrid.initGrid();
    };
    MapManager.prototype.getHeroMapBalltGridPoint = function (gridNum) {
        var gridPointAry = this.curMapConfig["battleHeroGrid"];
        return gridPointAry[gridNum - 1];
    };
    MapManager.prototype.getEnemyMapBalltGridPoint = function (gridNum) {
        var gridPointAry = this.curMapConfig["battleEnemyGrid"];
        return gridPointAry[gridNum - 1];
    };
    MapManager.prototype.getConfigById = function (mapId) {
        return this.mapCofing[mapId];
    };
    MapManager._ins = null;
    return MapManager;
}());
//# sourceMappingURL=MapManager.js.map