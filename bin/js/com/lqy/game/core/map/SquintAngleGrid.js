/*
* 地图斜视网格化
* 公式一：px  = (CHIP_W >> 1) * (i - j);
*        py = (CHIP_H >> 1) * (i + j);
* 公式二：i = 0.5f * (y / (CHIP_H >> 1) + x / (CHIP_W >> 1));
*        j =  0.5f * (y / (CHIP_H >> 1) - x / (CHIP_W >> 1));
*/
var SquintAngleGrid = /** @class */ (function () {
    //初始化，设置地图网格横向纵向的数量及显示时大地图的范围
    /**
     *
     * @param mapWid 地图宽
     * @param mapHei 地图高
     * @param mapRange 地图显示范围
     */
    function SquintAngleGrid(mapWid, mapHei, mapRange) {
        //地图宽
        this.mapWid = 0;
        //地图高
        this.mapHei = 0;
        //菱形宽度
        this.diamondW = 100;
        //菱形高度
        this.diamondH = 100;
        this.mapGridAry = null;
        this.mapWid = mapWid; //地图的宽
        this.mapHei = mapHei; //地图的高
        this.initGrid();
    }
    SquintAngleGrid.prototype.initGrid = function () {
        this.mapGridAry = [];
        //当paintY为CHIP_H / 2的奇数倍时,paintX需要偏移CHIP_W / 2   
        var offset = 0;
        var startCol = 0;
        var startRow = 0;
        var mapGrid;
        var sp = new Laya.Sprite();
        for (var paintY = 0; paintY <= this.mapHei + this.diamondH; paintY += this.diamondH / 2) {
            for (var paintX = 0; paintX <= this.mapWid + this.diamondW; paintX += this.diamondW) {
                var gx = this.getGx(paintX + offset, paintY) + startCol;
                var gy = this.getGy(paintX + offset, paintY) + startRow;
                if (gy < 0 || gx < 0 || gy > 10 || gx > 10) {
                    continue;
                }
                mapGrid = new MapGrid(gx, gy);
                mapGrid.op = this.gridToViewPoint(gx, gy);
                sp.graphics.drawLine(mapGrid.op.x, mapGrid.op.y, paintX + offset, paintY, "#ff0000", 1);
                //drawTile(g, data[gy][gx], paintX + offset, paintY);
                console.log(gx, gy);
            }
            offset = offset == 0 ? this.diamondW / 2 : 0;
        }
        sp.x = sp.width / 2;
        LayerManager.ins.addToLayer(sp, LayerManager.BG_EFFECT_LAYER, false, false, false);
    };
    //屏幕坐标转换成游戏格子坐标  
    SquintAngleGrid.prototype.getGx = function (x, y) {
        return Math.round(0.5 * (y / (this.diamondH >> 1) + x / (this.diamondW >> 1)));
    };
    SquintAngleGrid.prototype.getGy = function (x, y) {
        return Math.round(0.5 * (y / (this.diamondH >> 1) - x / (this.diamondW >> 1)));
    };
    SquintAngleGrid.prototype.gridToViewPoint = function (px, py) {
        var px = (this.diamondW >> 1) * (px - py);
        var py = (this.diamondH >> 1) * (px + py);
        return new Point(px, py);
    };
    SquintAngleGrid.prototype.drawTitle = function (paintX, paintY) {
        // this.
    };
    return SquintAngleGrid;
}());
//# sourceMappingURL=SquintAngleGrid.js.map