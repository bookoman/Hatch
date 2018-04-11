import TextTure = Laya.Texture;
import Rectangle = Laya.Rectangle;
import Dictionary = Laya.Dictionary;
import Matrix = Laya.Matrix;
import Point = Laya.Point;
import LayaEvent = Laya.Event;
/*
* 地图引擎,卡马克地图模式
*/
class MapEngine extends Laya.Sprite{
    //路径
    public rootPath:string = "";
    //地图id
    public mapID:number = 0;
    //加载类型，1 普通加载，2 分块加载
    public loadType:number = 0;
    //可视化宽  
    private _visualWidth:number;  
     //可视化高  
    private _visualHeight:number;  
    //地图的宽  
    private mapWidth:number;  
    //地图的高  
    private mapHeight:number;  
    //分块宽  
    private tileWidth:number;  
    //分块高  
    private tileHeight:number;  
    //分块列数  
    private cols:number;  
    //分块行数  
    private rows:number;  
    //当前位图滚动X轴  
    private bx:number;  
    //当前位图滚动Y轴  
    private by:number;  
    //等于位图滚动位置(0,0)时，px值  
    private tx:number;  
    //等于位图滚动位置(0,0)时，py值  
    private ty:number;  
    //上一次移动到的x轴位置  
    private fx:number;  
    //上一次移动到的y轴位置  
    private fy:number;  
    //当前地图开始行  
    private sRow:number;  
    //当前地图开始列  
    private sCol:number;  
    //当前地图结束行  
    private eRow:number;  
    //当前地图结束列  
    private eCol:number;  
    //当前地图可视化行  
    private vRow:number;  
    //当前地图可视化列  
    private vCol:number;  
    //最小滚动宽  
    private sMinWidth:number;  
    //最小滚动高  
    private sMinHeight:number;  
    //最大滚动宽  
    private sMaxWidth:number;  
    //最大滚动高  
    private sMaxHeight:number;  
    //小地图  
    private smallBmpd:TextTure;  
    //默认位图  
    private defaultBmpd:TextTure;  
    //地图资源管理器  
    private sourceCach:SourceCache;  
    //位图存储字典  
    private bmpdDic:Dictionary;  
    //位图加载队列  
    private bmpdLoadDic:Dictionary;  
    constructor(){
        super();
        this.bmpdDic = new Dictionary();  
        this.bmpdLoadDic = new Dictionary();
        //SoureCache 是一个加载管理器，因为代码比较多，暂时不公开，此处是创建一个场景地图加载的管理  
        //如需要使用此类，可以自行修改加载方式  
        this.sourceCach  = SourceCache.createSourceCache(GameConfig.SCENE_CACHE,1);  
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
    public initMap(rootPath:string,mapID:number,loadType:number,visualWidth:number,visualHeight:number,  
                                mapWidth:number,mapHeight:number,tileWidth:number = 0 ,tileHeight:number = 0):void{  
        // this.dispose();  
        this.mapID  = mapID;  
        this.rootPath = rootPath;  
        this.loadType = loadType;  
        this.mapWidth = mapWidth;  
        this.mapHeight = mapHeight;  
        this.tileWidth = tileWidth;  
        this.tileHeight = tileHeight;   
        if(loadType == MapUtil.TYPE_LOAD_NOCUT){  
            this.scrollRect    = new Rectangle(0,0,mapWidth,mapHeight);  
            this.sMaxWidth    = mapWidth -  this.sMinWidth;  
            this.sMaxHeight   = mapHeight - this.sMinHeight;  
        }else if(loadType == MapUtil.TYPE_LOAD_CUT){  
            //总tile行列大小   
            this.rows         = Math.ceil(mapHeight/tileHeight);  
            this.cols         = Math.ceil(mapWidth/tileWidth);  
            this.defaultBmpd  = new Texture(); 
        }  
        this.resetMap(visualWidth,visualHeight);  
        this.loadSmallMap();  
    }  
    //加载小地图  
    private loadSmallMap():void{  
        var item:ImageLoader = this.sourceCach.addSource("smallMap"+this.mapID,this.rootPath+"/"+this.mapID+"/small.jpg") as ImageLoader;  
        item.on(LayaEvent.COMPLETE,this,this.loadSmallComplete,[item]);  
        this.sourceCach.start();  
    }  
    /** 
     * 重置当前网页窗口的可视化大小 
     * @param int    visualWidth   可视化宽 
     * @param int    visualHeight  可视化高 
     * **/  
    public resetMap(visualWidth:number,visualHeight:number):void{  
        if(this.visualWidth != visualWidth ||  
            this.visualHeight != visualHeight){ //宽高与前面不相同才进行重置  
            this._visualWidth = Math.min(visualWidth,this.mapWidth);  
            this._visualHeight = Math.min(visualHeight,this.mapHeight); 
            //可视部分tile大小*****
            this.sMinWidth = this._visualWidth/2;  
            this.sMinHeight = this._visualHeight/2;  
            if(this.loadType == MapUtil.TYPE_LOAD_CUT){  
                //可视部分tile大小  
                // this.sMinWidth = this._visualWidth/2;  
                // this.sMinHeight = this._visualHeight/2;  
                var vRow:number = Math.min(Math.ceil(this._visualHeight/this.tileHeight)+1,this.rows);  
                var vCol:number = Math.min(Math.ceil(this._visualWidth/this.tileWidth)+1,this.cols);  
                    
                if(this.vRow != vRow || this.vCol != vCol){  
                    this.vRow        = vRow;  
                    this.vCol        = vCol;  
                    this.scrollRect   = new Rectangle(0,0,this.vCol*this.tileWidth,this.vRow*this.tileHeight);   
                }  
                this.tx = -1;  
                this.ty = -1;  
                this.fx = -1;  
                this.fy = -1;  
            }  
        }  
    }  
    /**获取当前地图相对顶点X轴(普通地图的真实顶点)**/  
    public get px():number{  
        return this.bx + this.tx;  
    }  
    /**获取当前地图相对顶点Y轴(普通地图的真实顶点)**/  
    public get py():number{  
        return this.by + this.ty;  
    }  
    /**获取可视区域的宽**/  
    public get visualWidth():number{  
        return this._visualWidth;  
    }  
    /**获取可视区域的高**/  
    public get visualHeight():number{  
        return this._visualHeight; 
    }  
    /** 
     * 滚动位图 
     * @param Number fx 跟随者X轴坐标 
     * @param Number fy 跟随者Y轴坐标 
     * **/  
    public onScroll(fx:number,fy:number):void{  
        if(this.fx != fx || this.fy != fy){  
            this.cacheAsBitmap = false;  
            this.fx     = fx;  
            this.fy     = fy;  
            if(this.loadType == MapUtil.TYPE_LOAD_CUT){  
                this.updateTXY(fx,fy);  
                fx -= this.tx;  
                fy -= this.ty;  
            }  
            this.centerMap(fx,fy);  
            this.checkLoad();  
        }else{  
            this.cacheAsBitmap = true;  
        }  
    }  
    //更新tile的顶点位置  
    private updateTXY(x:number,y:number):void{  
        this.sRow  = Math.floor((y - this.sMinHeight)/this.tileHeight);  
        this.sCol  = Math.floor((x - this.sMinWidth)/this.tileWidth);  
            
        if(this.sRow <= 0){     
            this.sRow  = 0;  
        }else if(this.sRow >= (this.rows - this.vRow)){  
            this.sRow =  this.rows - this.vRow;  
        }  
        if(this.sCol <= 0){  
            this.sCol  = 0;  
        }else if(this.sCol >= (this.cols -this.vCol)){  
            this.sCol = this.cols - this.vCol;  
        }  
            
        this.eRow  = this.sRow  + this.vRow ;  
        this.eCol  = this.sCol  + this.vCol;  
            
        if(this.eRow >= this.rows){  
            this.sMaxHeight    = this.mapHeight-this.sRow*this.tileHeight-this.sMinHeight;  
        }else{  
            this.sMaxHeight  = this.vRow*this.tileHeight-this.sMinHeight;  
        }  
        if(this.eCol  >= this.cols){  
            this.sMaxWidth  = this.mapWidth - this.sCol*this.tileWidth-this.sMinWidth;  
        }else{  
            this.sMaxWidth  = this.vCol*this.tileWidth -this.sMinWidth;  
        }  
            
        var tx:number  = this.sCol*this.tileWidth;  
        var ty:number  = this.sRow*this.tileHeight;  
            
        if(tx != this.tx || this.ty != ty){  
            this.tx    = tx;  
            this.ty    = ty;  
            this.updateAllBmpd();  
        }  
    }  
    //地图居中  
    private centerMap(fx:number,fy:number):void{  
        var centerX:number = 0;  
        var centerY:number = 0;  
            
        if(fx <= this.sMinWidth){  
            centerX  = 0;  
        }else if(fx >= this.sMaxWidth){  
            centerX =  this.sMaxWidth - this.sMinWidth;  
        }else {  
            centerX = fx - this.sMinWidth;  
        }  
            
        if(fy <= this.sMinHeight){  
            centerY = 0;  
        }else if(fy >= this.sMaxHeight){  
            centerY =  this.sMaxHeight - this.sMinHeight;  
        }else{  
            centerY = fy - this.sMinHeight;  
        }  
            
        var rect:Rectangle = this.scrollRect;  
        rect.x             = centerX;  
        rect.y             = centerY;  
            
        this.scrollRect    = rect;  
            
        this.bx = centerX;  
        this.by = centerY;  
    }  
    //检查加载地图，判断地图是否在可视范围内，是的话加入加载队列中  
    private checkLoad():void{  
        var item:ImageLoader;  
        if(this.loadType == MapUtil.TYPE_LOAD_NOCUT){  
            if(this.bmpdLoadDic.get(this.mapID+"_0_0") == undefined){  
                item = this.sourceCach.addSource(this.mapID+"_0_0",this.rootPath+"/"+this.mapID+"/big.png");  
                item.on(LayaEvent.COMPLETE,this ,this.loadComplete,[item]);  
                this.bmpdDic[item.key]  = item;  
                this.bmpdLoadDic.set(this.mapID+"_0_0",true);  
            }  
        }else if(this.loadType == MapUtil.TYPE_LOAD_CUT){  
            for(var i =this.sRow;i<this.eRow;i++){  
                for(var j = this.sCol;j < this.eCol;j++){   
                    if(this.bmpdLoadDic.get(this.mapID+"_"+i+"_"+j)  == undefined){  
                        item = this.sourceCach.addSource(this.mapID+"_"+i+"_"+j,this.rootPath+"/"+this.mapID+"/"+i+"_"+j+".jpg");  
                        item.on(LayaEvent.COMPLETE,this ,this.loadComplete,[item]);  
                        this.bmpdLoadDic.set(item.key, item);  
                        this.bmpdLoadDic.set(this.mapID+"_"+i+"_"+j,true);  
                    }  
                }  
            }  
        }  
        this.sourceCach.start();  
    }  
    //加载位图成功  
    private loadComplete(event:LayaEvent,data):void{  
        var item:ImageLoader = data;
        if(item != null){  
            if(this.bmpdDic.get(item.key) instanceof TextTure) {  
                this.bmpdDic.get(item.key).destroy(); 
            }  
            var array:Array<string> = item.key.split("_");  
            this.bmpdDic.set(item.key,item.bmpd);  
            this.updateBmpd(Number(array[1]),Number(array[2]));  
            item.on(LayaEvent.COMPLETE,this ,this.loadComplete); 
        }  
    }  
    //加载小地图成功  
    private loadSmallComplete(event:LayaEvent,data):void{  
        var item:ImageLoader = data;
        if(item != null){  
            var bmpd:Texture;  
            var matrix :Matrix = new Matrix();  
            if(this.loadType == MapUtil.TYPE_LOAD_NOCUT){  
                if(this.bmpdDic.get(this.mapID+"_0_0") == null){  
                    matrix.scale(this.mapWidth/item.bmpd.width,this.mapHeight/item.bmpd.height);  
                    bmpd  = Laya.Texture.create(item.bmpd,0,0,this.mapWidth,this.mapHeight);
                    // bmpd.draw(item.bmpd,matrix,null,null,null,false);  
                    this.bmpdDic.set(this.mapID+"_0_0",bmpd);  
                    this.updateBmpd(0,0);  
                }  
            }else if(this.loadType == MapUtil.TYPE_LOAD_CUT){  
                this.smallBmpd    = item.bmpd;  
                this.updateAllBmpd();  
            }  
            item.off(LayaEvent.COMPLETE,this,this.loadSmallComplete);  
        }  
    }  
    //滚动到边缘时需要更新整张位图  
    private updateAllBmpd():void{  
        this.graphics.clear();  
        for(var i=this.sRow;i<=this.eRow;i++){  
            for(var j=this.sCol;j<=this.eCol;j++){  
                var point:Point   = new Point((j-this.sCol)*this.tileWidth,(i-this.sRow)*this.tileHeight);  
                var bmpd:Texture;  
                if(this.bmpdDic.get(this.mapID+"_"+i+"_"+j) instanceof Texture){  
                    bmpd =  this.bmpdDic.get(this.mapID+"_"+i+"_"+j);  
                }else if(this.smallBmpd != null){  
                    var matrix :Matrix   = new Matrix();  
                    var stw  :number = Math.round(this.smallBmpd.width/this.cols);  
                    var sth  :number = Math.round(this.smallBmpd.height/this.rows);  
                    var sbmpd:Texture = Laya.Texture.createFromTexture(this.smallBmpd,j*stw,i*sth,stw,sth); 
                    matrix.scale(this.tileWidth/stw,this.tileHeight/sth);  
                    bmpd = Laya.Texture.create(sbmpd,0,0,matrix.getScaleX()*this.tileWidth,matrix.getScaleY()**this.tileHeight);
                    sbmpd.destroy();  
                    this.bmpdDic.set(this.mapID+"_"+i+"_"+j, bmpd);  
                }else{  
                    bmpd = this.defaultBmpd;  
                }  
                this.graphics.drawTexture(bmpd);  
                this.graphics.drawRect(point.x,point.y,bmpd.width,bmpd.height,"#ffffff");
            }     
        }  
        // this.graphics.endFill();  
    }  
    //更新缓冲位图  
    private updateBmpd(row:number,col:number):void{  
        var bmpd:TextTure;  
        if(this.loadType == MapUtil.TYPE_LOAD_NOCUT){  
            bmpd = this.bmpdDic.get(this.mapID+"_0_0");  
            this.graphics.drawTexture(bmpd);  
            // this.graphics.drawRect(0,0,bmpd.width,bmpd.height,"#ffffff");  
        }else if(this.loadType == MapUtil.TYPE_LOAD_CUT){  
            bmpd = this.bmpdDic.get(this.mapID+"_"+row+"_"+col);  
            this.graphics.drawTexture(bmpd);  
            // this.graphics.drawRect((col-this.sCol)*this.tileWidth,(row-this.sRow)*this.tileHeight,bmpd.width,bmpd.height,"#ffffff");  
        }  
        // this.graphics.endFill();  
    }  
    /**销毁  一般会在切换场景时需要执行此方法，用于清除上一张地图的位图缓存， 回收内存**/  
    public dispose():void{  
        //执行removeAllSource()将会删除当前加载管理中所有资源,并清除当前加载队列 
        this.sourceCach.removeAllSource(); 
        var temp; 
        for(var key in this.bmpdDic){
            temp = this.bmpdDic.get(key);
            if(temp instanceof ImageLoader){
                temp.off(LayaEvent.COMPLETE,this,this.loadComplete);  
            }
            else if(temp instanceof Texture)
            {
                (<Texture>temp).destroy();  
            } 
        }  
        if(this.defaultBmpd!= null){
            this.defaultBmpd.destroy();
            this.defaultBmpd = null;
        }  
        if(this.smallBmpd   != null ){
            this.smallBmpd.destroy();
            this.smallBmpd = null;
        }  
        this.bmpdDic     = new Dictionary();  
        this.bmpdLoadDic = new Dictionary();  
        this.tx = -1;  
        this.ty = -1;  
        this.fx = -1;  
        this.fy = -1;  
    }  
}  
