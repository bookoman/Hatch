/*
* 游戏配置
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    /**舞台大小 */
    GameConfig.STAGE_WIDTH = 750;
    GameConfig.STAGE_HEIGHT = 1334;
    /**地图配置信息 */
    GameConfig.MAP_GRID_WIDTH = 25;
    GameConfig.MAP_GRID_HEIGHT = 25;
    GameConfig.MAP_BLOCK_WIDTH = 200;
    GameConfig.MAP_BLOCK_HEIGHT = 200;
    GameConfig.MAP_NEAR_TYPE = 1;
    /**场景缓存 */
    GameConfig.SCENE_CACHE = 1;
    return GameConfig;
}());
/**地图类型枚举 */
var MapType;
(function (MapType) {
    MapType[MapType["BACKGROUND_MAP"] = 1] = "BACKGROUND_MAP";
    MapType[MapType["NEAR_MAP"] = 2] = "NEAR_MAP";
})(MapType || (MapType = {}));
//# sourceMappingURL=GameConfig.js.map