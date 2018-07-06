/*
* 地图管理
*/
var MapManager = /** @class */ (function () {
    function MapManager() {
        //地图测试数据 mapId >> mapVO
        this.mapCofing = {
            "1": { "mapID": 1, "name": "1", "battleHeroGrid": [[1, 0], [1, 2], [1, 4], [0, 1], [0, 3], [0, 2]], "battleEnemyGrid": [[2, 0], [2, 2], [2, 4]], "middleBgInitY": 0, "nearBgInitY": 782, "battleInitY": 600, "battleSceneH": 500, "gw": 240, "gh": 100 },
            "2": { "mapID": 2, "name": "2", "battleHeroGrid": [[1, 0], [1, 2], [1, 4], [0, 1], [0, 3], [0, 2]], "battleEnemyGrid": [[2, 0], [2, 2], [2, 4]], "middleBgInitY": 560, "nearBgInitY": 782, "battleInitY": 860, "battleSceneH": 500, "gw": 240, "gh": 100 },
            "10000": { "mapID": 10000, "name": "Boss挑战", "battleHeroGrid": [[1, 2], [1, 6], [1, 10], [1, 14], [1, 18], [0, 10]], "battleEnemyGrid": [[5, 2], [5, 6], [5, 10], [5, 14], [5, 18]], "middleBgInitY": 100, "nearBgInitY": 782, "battleInitY": 100, "battleSceneH": 1000, "gw": 100, "gh": 100 }
        };
        this.mapEngine = null;
        this.farMapEngine = null;
        this.mapLoopEngine = null;
        this.nearMapLoopEngin = null;
        this.squintAngleGrid = null;
        /**地图开关 */
        this.mapScrollSwitch = true;
        this.challegenBossBg = null;
        this.enemyMoveSwitch = false;
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
        GameConfig.BATTLE_INIT_Y = this.curMapConfig["battleInitY"];
        GameConfig.BATTLE_SCENE_HEIGHT = this.curMapConfig["battleSceneH"];
        GameConfig.LINEUP_GRID_WIDTH = this.curMapConfig["gw"];
        GameConfig.LINEUP_GRID_HEIGHT = this.curMapConfig["gh"];
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
            // this.challegenBossBg = new Laya.Image("unpack/challengeboss/bg.png");
            // LayerManager.ins.addToLayer(this.challegenBossBg,LayerManager.BG_LAYER,false,true,false);
            // this.nearMapLoopEngin.visible = false;
            // EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS,[false]);
        }
        else {
            if (this.curLoopMapId != mapID) {
                this.curLoopMapId = mapID;
                //地图循环
                this.farMapEngine = new MapLoopEngine();
                this.farMapEngine.initMap("res/outside/map", mapID, MapType.FAR_MAP, 1, GameConfig.STAGE_WIDTH);
                this.farMapEngine.y = 0;
                LayerManager.ins.addToLayer(this.farMapEngine, LayerManager.BG_LAYER, false, true, false);
                this.mapLoopEngine = new MapLoopEngine();
                this.mapLoopEngine.initMap("res/outside/map", mapID, MapType.BACKGROUND_MAP, 8, GameConfig.STAGE_WIDTH);
                this.mapLoopEngine.y = this.curMapConfig.middleBgInitY;
                LayerManager.ins.addToLayer(this.mapLoopEngine, LayerManager.BG_LAYER, false, true, false);
                this.nearMapLoopEngin = new MapLoopEngine();
                this.nearMapLoopEngin.initMap("res/outside/map", mapID, MapType.NEAR_MAP, 5, GameConfig.STAGE_WIDTH);
                this.nearMapLoopEngin.y = this.curMapConfig.nearBgInitY;
                LayerManager.ins.addToLayer(this.nearMapLoopEngin, LayerManager.BG_NEAR_LAYER, false, true, false);
                //测试移动
                Laya.timer.frameLoop(2, this, this.mapMoveLoop);
            }
        }
        this.calSquintAngleGrid();
        GameDataManager.ins.calMapRowColPosPoint();
        //声音
        // var soundUrl:string = mapID >= 10000 ?"res/outside/sound/bg/zzd.mp3" : "res/outside/sound/bg/jzd.mp3";
        // SoundsManager.ins.playMusic(soundUrl,1000);
    };
    MapManager.prototype.backLoopMap = function () {
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
            if (this.farMapEngine) {
                this.farMapEngine.onScroll();
            }
            if (this.mapLoopEngine) {
                this.mapLoopEngine.onScroll();
            }
            if (this.nearMapLoopEngin) {
                this.nearMapLoopEngin.onScroll();
            }
            if (this.enemyMoveSwitch) {
                RoleManager.ins.enemyMoveByMap(this.mapLoopEngine.scrollXSpeed);
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
        this.squintAngleGrid = new SquintAngleGrid(mapWidth, mapHeight, false);
        this.squintAngleGrid.initGrid();
    };
    MapManager.prototype.getHeroMapBalltGridPoint = function (gridNum) {
        var gridPointAry = this.curMapConfig["battleHeroGrid"];
        return gridPointAry[gridNum];
    };
    MapManager.prototype.getEnemyMapBalltGridPoint = function (gridNum) {
        var gridPointAry = this.curMapConfig["battleEnemyGrid"];
        return gridPointAry[gridNum];
    };
    MapManager.prototype.getConfigById = function (mapId) {
        return this.mapCofing[mapId];
    };
    MapManager._ins = null;
    return MapManager;
}());
//# sourceMappingURL=MapManager.js.map