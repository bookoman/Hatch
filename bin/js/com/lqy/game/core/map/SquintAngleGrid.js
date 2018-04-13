/*
* 地图斜视网格化
* 公式一：logic.x  = ( stage.x / TileWidth ) - ( logic.y & 1 ) * ( TileWidth / 2 );
*        logic.y = ( 2 * stage.y ) / TileHeigth;
* 公式二：stage.x = logic.x * TileWidth + ( logic.y & 1) * ( TileWidth / 2 );
*        stage.y = logic.y * TileHeigth / 2;
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
        this.mapGridAry = null;
        this.mapWid = mapWid; //地图的宽
        this.mapHei = mapHei; //地图的高
        this.diamondW = GameConfig.LINEUP_GRID_WIDTH;
        this.diamondH = GameConfig.LINEUP_GRID_HEIGHT;
        // this.initGrid();
    }
    SquintAngleGrid.prototype.initGrid = function () {
        this.mapGridAry = [];
        //格子坐标计算
        var gridXNum = Math.floor(this.mapWid / GameConfig.LINEUP_GRID_WIDTH);
        var gridYNum = Math.floor(this.mapHei / GameConfig.LINEUP_GRID_HEIGHT);
        //格子y方向个数计算公式，y = n + (n - 1)
        gridYNum = gridYNum + gridYNum - 1;
        var grid;
        for (var y = 0; y < gridYNum; y++) {
            for (var x = 0; x < gridXNum; x++) {
                grid = new MapGrid(x, y);
                grid.op = this.gridToViewPoint(x, y);
                //绘制格子
                grid.drawTitle();
            }
        }
        this.mapGridAry.length;
    };
    //屏幕坐标转换成游戏格子坐标  
    /**
     *
     * @param x 舞台坐标x
     * @param y 舞台坐标y
     */
    SquintAngleGrid.prototype.getGx = function (x, y) {
        return (x / GameConfig.LINEUP_GRID_WIDTH) - (y & 1) * (GameConfig.LINEUP_GRID_WIDTH / 2);
    };
    /**
     *
     * @param x 舞台坐标x
     * @param y 舞台坐标y
     */
    SquintAngleGrid.prototype.getGy = function (x, y) {
        return (2 * y) / GameConfig.LINEUP_GRID_HEIGHT;
    };
    /**
     * 根据格子坐标得到舞台坐标（格子中心点）
     * @param gx
     * @param gy
     */
    SquintAngleGrid.prototype.gridToViewPoint = function (gx, gy) {
        var px = gx * GameConfig.LINEUP_GRID_WIDTH + (gy & 1) * (GameConfig.LINEUP_GRID_WIDTH / 2);
        var py = gy * GameConfig.LINEUP_GRID_HEIGHT / 2;
        return new Point(px, py);
    };
    return SquintAngleGrid;
}());
//# sourceMappingURL=SquintAngleGrid.js.map