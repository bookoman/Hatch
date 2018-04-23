/*
* 菱形格子地图工具
*/
var MapGridUtil = /** @class */ (function () {
    //初始化，设置地图网格横向纵向的数量及显示时大地图的范围
    /**
     *
     * @param mapWid 地图宽
     * @param mapHei 地图高
     * @param mapRange 地图显示范围
     */
    function MapGridUtil(mapWid, mapHei, mapRange) {
        //地图宽
        this.m_mapWid = 0;
        //地图高
        this.m_mapHei = 0;
        this.m_orgX = 0;
        this.m_orgY = 0;
        this.m_xincX = 0;
        this.m_xincY = 0;
        this.m_yincX = 0;
        this.m_yincY = 0;
        this.m_mapWid = mapWid; //地图的宽
        this.m_mapHei = mapHei; //地图的高
        var count = mapWid + mapHei;
        // this.m_orgX = mapRange.left + mapRange.width / count;
        // this.m_orgY = mapRange.top + mapWid * mapRange.height / count;
        this.m_orgX = mapRange.x + mapRange.width / count;
        this.m_orgY = mapRange.y + mapWid * mapRange.height / count;
        this.m_xincX = mapRange.width / count;
        this.m_xincY = -mapRange.height / count;
        this.m_yincX = mapRange.width / count;
        this.m_yincY = mapRange.height / count;
    }
    //重设地图原点位置的偏移（用于地图滑动）
    MapGridUtil.prototype.setOrgin = function (xpos, ypos) {
        this.m_orgX = xpos;
        this.m_orgY = ypos;
    };
    //地图网格坐标转换到屏幕显示坐标（用于提供给描画用）
    MapGridUtil.prototype.gridToView = function (xpos, ypos) {
        var pos = new Point();
        pos.x = this.m_orgX + this.m_xincX * xpos + this.m_yincX * ypos;
        pos.y = this.m_orgY + this.m_xincY * xpos + this.m_yincY * ypos;
        return pos;
    };
    //屏幕坐标转换到地图网格坐标（比如在即时战略中用于确定鼠标点击的是哪一块）
    MapGridUtil.prototype.viewToGrid = function (xpos, ypos) {
        var pos = new Point();
        var coordX = xpos - this.m_orgX;
        var coordY = ypos - this.m_orgY;
        pos.x = (coordX * this.m_yincY - coordY * this.m_yincX) / (this.m_xincX * this.m_yincY - this.m_xincY * this.m_yincX);
        pos.y = (coordX - this.m_xincX * pos.x) / this.m_yincX;
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        return pos;
    };
    //判断网格坐标是否在地图范围内
    MapGridUtil.prototype.legalGridCoord = function (xpos, ypos) {
        if (xpos < 0 || ypos < 0 || xpos >= this.m_mapWid || ypos >= this.m_mapHei) {
            return false;
        }
        return true;
    };
    //判断屏幕坐标是否在地图范围内
    MapGridUtil.prototype.legalViewCoord = function (xpos, ypos) {
        var pos = this.viewToGrid(xpos, ypos);
        return this.legalGridCoord(pos.x, pos.y);
    };
    //格式化屏幕坐标，即返回最接近该坐标的一个格子的标准屏幕坐标（通常用于在地图中拖动建筑物对齐网格用）
    MapGridUtil.prototype.formatViewPos = function (xpos, ypos) {
        var pos = this.viewToGrid(xpos, ypos);
        if (this.legalGridCoord(pos.x, pos.y)) {
            pos = this.gridToView(pos.x, pos.y);
        }
        else {
            pos.x = xpos;
            pos.y = ypos;
        }
        return pos;
    };
    return MapGridUtil;
}());
//# sourceMappingURL=MapGridUtil.js.map