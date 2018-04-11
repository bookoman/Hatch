/*
* 地图管理
*/
class MapManager{
    //地图测试数据 mapId >> mapVO
    private mapCofing:Object = {
        "1":{"mapID":1},
        "2":{"mapID":2}
    }
    constructor(){
        
    }
    private static _ins:MapManager = null;
    private mapEngine:MapEngine = null;
    private mapLoopEngine:MapLoopEngine = null;
    private nearMapLoopEngin:MapLoopEngine = null;
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
        this.mapLoopEngine.y = 392;
        LayerManager.ins.addToLayer(this.mapLoopEngine,LayerManager.BG_LAYER,false,true,false);
        this.nearMapLoopEngin = new MapLoopEngine();
        this.nearMapLoopEngin.initMap("res/outside/map",1,MapType.NEAR_MAP,3,GameConfig.STAGE_WIDTH);
        this.nearMapLoopEngin.y = 600;
        LayerManager.ins.addToLayer(this.nearMapLoopEngin,LayerManager.BG_NEAR_LAYER,false,true,false);
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
        if(this.mapLoopEngine)
        {   
            this.mapLoopEngine.onScroll(4);
        }
        if(this.nearMapLoopEngin)
        {   
            this.nearMapLoopEngin.onScroll(3);
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
}