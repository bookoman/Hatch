/*
* 地图管理
*/
class MapManager{
    //地图测试数据 mapId >> mapVO
    private mapCofing:Object = {
        "1":{"mapID":1,"name":"1","battleHeroGrid":[[1,0],[1,2],[1,4],[0,1],[0,3],[0,2]],"battleEnemyGrid":[[2,0],[2,2],[2,4]],"mapInitY":600,"battleSceneH":500,"gw":240,"gh":100},
        "2":{"mapID":2,"name":"2","battleHeroGrid":[[1,0],[1,2],[1,4],[0,1],[0,3],[0,2]],"battleEnemyGrid":[[2,0],[2,2],[2,4]],"mapInitY":560,"battleSceneH":500,"gw":240,"gh":100},
        "10000":{"mapID":10000,"name":"Boss挑战","battleHeroGrid":[[1,2],[1,6],[1,10],[1,14],[1,18],[0,10]],"battleEnemyGrid":[[5,2],[5,6],[5,10],[5,14],[5,18]],"mapInitY":100,"battleSceneH":1000,"gw":100,"gh":100}
    }
    constructor(){
        
    }
    private static _ins:MapManager = null;
    private curMapConfig:Object;
    private mapEngine:MapEngine = null;
    private farMapEngine:MapLoopEngine = null;
    private mapLoopEngine:MapLoopEngine = null;
    private nearMapLoopEngin:MapLoopEngine = null;

    public squintAngleGrid:SquintAngleGrid = null;
    /**地图开关 */
    public mapScrollSwitch:boolean = true;
    private challegenBossBg:Laya.Image = null;
    public enemyMoveSwitch:boolean = false;
    //循环地图Id
    private curLoopMapId:number = 0;
    public static get ins():MapManager
    {
        if(this._ins == null)
        {
            this._ins = new MapManager();
        }
        return this._ins;
    }
    public resizeSet():void
    {
        if(this.curMapConfig)
        {
            
        }
    }

    public enterMap(rootUrl,mapID:number,loadType:number,visualWidth:number,visualHeight:number,  
                                mapWidth:number,mapHeight:number,tileWidth:number = 0 ,tileHeight:number = 0):void
    {
        this.curMapConfig = this.mapCofing[mapID];
        GameConfig.MAP_INIT_Y = this.curMapConfig["mapInitY"];
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
        if(mapID >= 10000)
        {
            // this.challegenBossBg = new Laya.Image("unpack/challengeboss/bg.png");
            // LayerManager.ins.addToLayer(this.challegenBossBg,LayerManager.BG_LAYER,false,true,false);
            // this.nearMapLoopEngin.visible = false;
            // EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS,[false]);
        }
        else
        {
            if(this.curLoopMapId != mapID)
            {
                this.curLoopMapId = mapID;
                //地图循环
                this.farMapEngine = new MapLoopEngine();
                this.farMapEngine.initMap("res/outside/map",mapID,MapType.FAR_MAP,1,GameConfig.STAGE_WIDTH);
                this.farMapEngine.y = 0;
                LayerManager.ins.addToLayer(this.farMapEngine,LayerManager.BG_LAYER,false,true,false);
                this.mapLoopEngine = new MapLoopEngine();
                this.mapLoopEngine.initMap("res/outside/map",mapID,MapType.BACKGROUND_MAP,6,GameConfig.STAGE_WIDTH);
                this.mapLoopEngine.y = GameConfig.MAP_INIT_Y;
                LayerManager.ins.addToLayer(this.mapLoopEngine,LayerManager.BG_LAYER,false,true,false);
                this.nearMapLoopEngin = new MapLoopEngine();
                this.nearMapLoopEngin.initMap("res/outside/map",mapID,MapType.NEAR_MAP,3,GameConfig.STAGE_WIDTH);
                this.nearMapLoopEngin.y = this.mapLoopEngine.y + 210;
                LayerManager.ins.addToLayer(this.nearMapLoopEngin,LayerManager.BG_NEAR_LAYER,false,true,false);
                //测试移动
                Laya.timer.frameLoop(2,this,this.mapMoveLoop);
            }
            
        }
        this.calSquintAngleGrid();
        
        GameDataManager.ins.calMapRowColPosPoint();
        //声音
        SoundsManager.ins.playMusic("res/outside/sound/bg/zhou.mp3",1000);
    }
    public backLoopMap():void
    {
        this.enterMap("res/map",this.curLoopMapId,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
    }
    // private tx:number = 0;
    private mapMoveLoop():void
    {
        //卡马克滚动
        // this.moveOnScrol(this.tx,0);
        // this.tx += 2;
        // if(this.tx > 920)
        // {
        //     this.tx = 0;
        // }
        //地图循环滚动
        if(this.mapScrollSwitch)
        {
            if(this.farMapEngine)
            {   
                this.farMapEngine.onScroll();
            }
            if(this.mapLoopEngine)
            {   
                this.mapLoopEngine.onScroll();
            }
            if(this.nearMapLoopEngin)
            {   
                this.nearMapLoopEngin.onScroll();
            }
            if(this.enemyMoveSwitch)
            {
                RoleManager.ins.enemyMoveByMap(this.mapLoopEngine.scrollXSpeed);
            }
        }
        // console.log("地图打印："+this.tx);
    }
    /**
     * 滚动更新
     * @param fx 
     * @param fy
     */
    public moveOnScrol(fx:number,fy:number):void
    {
        if(this.mapEngine)
        {
            this.mapEngine.onScroll(fx,fy);
        }
        
    }
    /**计算网格视图 */
    public calSquintAngleGrid():void
    {
        if(this.squintAngleGrid)
        {
            this.squintAngleGrid.dispose();
        }
        var mapWidth:number = GameConfig.STAGE_WIDTH;
        var mapHeight:number = GameConfig.BATTLE_SCENE_HEIGHT;
        this.squintAngleGrid = new SquintAngleGrid(mapWidth,mapHeight,false);
        this.squintAngleGrid.initGrid();
        
    }

    public getHeroMapBalltGridPoint(gridNum:number):Array<any>
    {
        var gridPointAry:Array<any> = this.curMapConfig["battleHeroGrid"];
        return gridPointAry[gridNum];
    }

    public getEnemyMapBalltGridPoint(gridNum:number):Array<any>
    {
        var gridPointAry:Array<any> = this.curMapConfig["battleEnemyGrid"];
        return gridPointAry[gridNum];
    }

    public getConfigById(mapId:string):Object
    {
        return this.mapCofing[mapId];
    }
}