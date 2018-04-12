/*
* 地图斜视网格化
* 公式一：px  = (CHIP_W >> 1) * (i - j);
*        py = (CHIP_H >> 1) * (i + j);
* 公式二：i = 0.5f * (y / (CHIP_H >> 1) + x / (CHIP_W >> 1));
*        j =  0.5f * (y / (CHIP_H >> 1) - x / (CHIP_W >> 1));
*/
class SquintAngleGrid{
    //地图宽
    private mapWid:number = 0;
    //地图高
    private mapHei:number = 0;
    //菱形宽度
    private diamondW:number = 100;
    //菱形高度
    private diamondH:number = 100;

    private mapGridAry:Array<MapGrid> = null;
    
    //初始化，设置地图网格横向纵向的数量及显示时大地图的范围
    /**
     * 
     * @param mapWid 地图宽
     * @param mapHei 地图高
     * @param mapRange 地图显示范围
     */
    constructor(mapWid:number, mapHei:number, mapRange?:Rectangle){
        
        this.mapWid = mapWid; //地图的宽
        this.mapHei = mapHei;//地图的高
        this.initGrid();
    }

    public initGrid():void
    {
        this.mapGridAry = [];
        //当paintY为CHIP_H / 2的奇数倍时,paintX需要偏移CHIP_W / 2   
        var offset = 0;  
        var startCol = 0;
        var startRow = 0;
        var mapGrid:MapGrid;
        var sp:Laya.Sprite = new Laya.Sprite();
        for (var paintY = 0; paintY <= this.mapHei + this.diamondH; paintY += this.diamondH / 2)   
        {
            for (var paintX = 0; paintX <= this.mapWid + this.diamondW; paintX += this.diamondW)   
            {  
                var gx = this.getGx(paintX + offset, paintY) + startCol;  
                var gy = this.getGy(paintX + offset, paintY) + startRow;   
                if (gy < 0 || gx < 0 || gy > 10 || gx > 10)  
                {   
                    continue;   
                }   
                mapGrid = new MapGrid(gx,gy);
                mapGrid.op = this.gridToViewPoint(gx,gy);
                
                sp.graphics.drawLine(mapGrid.op.x,mapGrid.op.y,paintX + offset, paintY,"#ff0000",1);
                
                //drawTile(g, data[gy][gx], paintX + offset, paintY);
                console.log(gx,gy);   
            }   
            offset = offset == 0 ? this.diamondW / 2 : 0;  
        }  
        sp.x = sp.width/2;
        LayerManager.ins.addToLayer(sp,LayerManager.BG_EFFECT_LAYER,false,false,false);
    }
    
    //屏幕坐标转换成游戏格子坐标  
    private getGx(x:number,y:number):number   
    {  
         return Math.round(0.5 * (y / (this.diamondH >> 1) + x / (this.diamondW >> 1)));   
    }  
      
    private getGy(x:number,y:number)   
    {  
         return  Math.round(0.5 * (y / (this.diamondH >> 1) - x / (this.diamondW >> 1)));   
    }


    public gridToViewPoint(px:number,py:number):Point
    {
        var px  = (this.diamondW >> 1) * (px - py);
        var py = (this.diamondH >> 1) * (px + py);
        return new Point(px,py);
    }

    public drawTitle(paintX,paintY):void
    {
        // this.
    }

}