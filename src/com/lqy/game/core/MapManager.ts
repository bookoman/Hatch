/*
* 地图管理
*/
class MapManager{
    //地图测试数据 mapId >> mapVO
    private mapCofing:Object = {
        "1":{"mapID":1,"battleHeroGrid":[[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[0,3],[1,3],[1,4]],"battleEnemyGrid":[[5,0],[4,1],[5,1],[4,2],[5,2],[6,2],[4,3],[5,3],[5,4]]},
        "2":{"mapID":2,"battleHeroGrid":[[2,0],[1,1],[2,1],[1,2],[2,2],[3,2],[1,3],[2,3],[2,4]],"battleEnemyGrid":[[5,0],[4,1],[5,1],[4,2],[5,2],[6,2],[4,3],[5,3],[5,4]]}
    }
    constructor(){
        
    }
    private static _ins:MapManager = null;
    private curMapConfig:Object;
    private mapEngine:MapEngine = null;
    private mapLoopEngine:MapLoopEngine = null;
    private nearMapLoopEngin:MapLoopEngine = null;

    public squintAngleGrid:SquintAngleGrid = null;
    /**地图开关 */
    public mapScrollSwitch:boolean = true;
    public static get ins():MapManager
    {
        if(this._ins == null)
        {
            this._ins = new MapManager();
        }
        return this._ins;
    }

    public enterMap(rootUrl,mapID:number,loadType:number,visualWidth:number,visualHeight:number,  
                                mapWidth:number,mapHeight:number,tileWidth:number = 0 ,tileHeight:number = 0):void
    {
        this.curMapConfig = this.mapCofing[mapID];
        if(this.mapEngine)
        {
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
        this.mapLoopEngine.initMap("res/outside/map",1,MapType.BACKGROUND_MAP,6,GameConfig.STAGE_WIDTH);
        this.mapLoopEngine.y = GameConfig.MAP_INIT_Y;
        LayerManager.ins.addToLayer(this.mapLoopEngine,LayerManager.BG_LAYER,false,true,false);
        this.nearMapLoopEngin = new MapLoopEngine();
        this.nearMapLoopEngin.initMap("res/outside/map",1,MapType.NEAR_MAP,3,GameConfig.STAGE_WIDTH);
        this.nearMapLoopEngin.y = this.mapLoopEngine.y + 210;
        LayerManager.ins.addToLayer(this.nearMapLoopEngin,LayerManager.BG_NEAR_LAYER,false,true,false);
        this.calSquintAngleGrid();
        //测试移动
        Laya.timer.frameLoop(2,this,this.mapMoveLoop);
    }
    private tx:number = 0;
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
            if(this.mapLoopEngine)
            {   
                this.mapLoopEngine.onScroll(4);
            }
            if(this.nearMapLoopEngin)
            {   
                this.nearMapLoopEngin.onScroll(3);
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
        var mapWidth:number = GameConfig.STAGE_WIDTH;
        var mapHeight:number = GameConfig.BATTLE_SCENE_HEIGHT;
        this.squintAngleGrid = new SquintAngleGrid(mapWidth,mapHeight);
        this.squintAngleGrid.initGrid();
        
    }

    public getHeroMapBalltGridPoint(gridNum:number):Array<any>
    {
        var gridPointAry:Array<any> = this.curMapConfig["battleHeroGrid"];
        return gridPointAry[gridNum - 1];
    }

    public getEnemyMapBalltGridPoint(gridNum:number):Array<any>
    {
        var gridPointAry:Array<any> = this.curMapConfig["battleEnemyGrid"];
        return gridPointAry[gridNum - 1];
    }
}