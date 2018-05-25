/*
* 地图循环引擎
* 地图移动完成后重置到0位子，但是后面要用前面半个屏幕部分纹理补上，帮助过度
*/
class MapLoopEngine extends Laya.Sprite{
    //路径
    public rootPath:string = "";
    //地图id
    public mapID:number = 0;
    //可视化宽  
    private visualWidth:number;  
     //可视化高  
    private visualHeight:number;
    //上一次移动到的x轴位置  
    private fx:number;  
    //上一次移动到的y轴位置  
    private fy:number; 
    //地图的宽  
    private mapWidth:number;  
    //地图的高  
    private mapHeight:number; 
    //地图纹理
    private mapTexture:Texture = null;
    //滚动速度X
    public scrollXSpeed:number = 2;
    //滚动速度Y
    private scrollYSpeed:number = 2;
   
    constructor(){
        super();
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
    public initMap(rootPath:string,mapID:number,mapType:number,scrollXSpeed:number,visualWidth?:number,visualHeight?:number):void
    {
        if(this.mapID == mapID)
        {
            return;
        }
        else
        {
            this.dispose();
        }
        this.rootPath = rootPath;
        this.mapID = mapID;
        this.fx = 0;
        this.fy = 0;
        this.scrollXSpeed = scrollXSpeed;
        this.scrollYSpeed = 0;
        if(visualHeight)
        {
            this.visualWidth = visualWidth;
        }
        else
        {
            this.visualWidth = GameConfig.STAGE_WIDTH;
        }
        this.visualHeight = visualHeight;
        
        var url:string;
        if(mapType == MapType.NEAR_MAP)
        {
            url = this.rootPath+"/"+mapID+"/near.png";
        }
        else if(mapType == MapType.FAR_MAP)
        {
            url = this.rootPath+"/"+mapID+"/far.png";
        }
        else
        {
            url = this.rootPath+"/"+mapID+"/middle.png";
        }
        Laya.loader.load(url,new Handler(this,this.loadMapCompleted),null,Loader.IMAGE);
    }
    private loadMapCompleted(data):void
    {
        this.mapTexture = data;
        if(!this.visualHeight)
        {
            this.visualHeight = this.mapTexture.height;
        }
        this.mapWidth = this.mapTexture.width;
        this.mapHeight = this.mapTexture.height;
        this.scrollRect = new Rectangle(0,0,this.mapWidth,this.mapHeight);  
        this.graphics.drawTexture(this.mapTexture);
        //补位纹理
        var repairTexture:Texture = Laya.Texture.createFromTexture(this.mapTexture,0,0,this.visualWidth,this.visualHeight);
        this.graphics.drawTexture(repairTexture,this.mapWidth,this.fy);
    }
    
    /**
     * 
     * @param speedX x方向滚动速度
     * @param speedY y方向滚动速度
     */
    public onScroll(speedX?:number,speedY?:number):void
    {
        if(this.mapTexture == null)
        {
            return;
        }
        if(speedX && speedX != this.scrollXSpeed)
        {
            this.scrollXSpeed = speedX;
        }
        if(speedY && speedY == this.scrollYSpeed)
        {
            this.scrollYSpeed = this.scrollYSpeed;
        }
        var fx:number = this.fx + this.scrollXSpeed;
        var fy:number = this.fy + this.scrollYSpeed;
        if(this.fx != fx || this.fy != fy){  
            this.cacheAsBitmap = false;  
            this.fx = fx;  
            this.fy = fy;
            
            if(this.fx > this.mapWidth)
            {
                this.fx = 0;
            }
            
            //滚动视图
            var rect:Rectangle = this.scrollRect;
            rect.x = this.fx;  
            rect.y = this.fy;    
            this.scrollRect = rect;
            //坐标移动
            // this.x = -this.fx;
            // console.log("地图打印："+this.fx);
        }else{  
            // this.cacheAsBitmap = true;  
        }
    }

    /**销毁  一般会在切换场景时需要执行此方法，用于清除上一张地图的位图缓存， 回收内存**/  
    public dispose():void{  
        //执行removeAllSource()将会删除当前加载管理中所有资源,并清除当前加载队列 
        this.rootPath = "";
        this.mapID = 0;
        this.mapWidth = 0;
        this.mapHeight = 0;
        if(this.mapTexture)
        {
            this.mapTexture.destroy();
            this.mapTexture = null;
        }
    }  




}