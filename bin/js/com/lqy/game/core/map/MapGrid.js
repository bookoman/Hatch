var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var MapGrid = /** @class */ (function (_super) {
    __extends(MapGrid, _super);
    function MapGrid(px, py) {
        var _this = _super.call(this) || this;
        _this.px = px;
        _this.py = py;
        return _this;
    }
    MapGrid.prototype.drawTitle = function () {
        var diamondWF = GameConfig.LINEUP_GRID_WIDTH / 2;
        var diamondHF = GameConfig.LINEUP_GRID_HEIGHT / 2;
        this.graphics.drawPoly(0, 0, [0, -diamondHF, diamondWF, 0, 0, diamondHF, -diamondWF, 0], "#00ff00", "#ff0000");
        var text = new Laya.Label();
        text.fontSize = 24;
        text.text = this.px + "," + this.py;
        // text.text = this.op.x + "," + (this.op.y + GameConfig.MAP_INIT_Y);
        text.width = 60;
        text.height = 30;
        // text.x = diamondWF - text.width / 2;
        // text.y = diamondHF - text.height / 2;
        this.addChild(text);
        this.x = this.op.x + diamondWF;
        this.y = this.op.y + diamondHF + GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y;
        // console.log(this.x,this.y);
        LayerManager.ins.addToLayer(this, LayerManager.BG_LAYER, false, true, false);
    };
    MapGrid.prototype.clearDraw = function () {
        this.removeSelf();
    };
    return MapGrid;
}(Laya.Sprite));
//# sourceMappingURL=MapGrid.js.map