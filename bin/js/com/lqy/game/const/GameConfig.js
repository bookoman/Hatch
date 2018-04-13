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
    // public static MAP_GRID_WIDTH:number = 25;
    // public static MAP_GRID_HEIGHT:number = 25;
    // public static MAP_BLOCK_WIDTH:number = 200;
    // public static MAP_BLOCK_HEIGHT:number = 200;
    // public static MAP_NEAR_TYPE:number = 1;
    /**场景地图出事化Y坐标 */
    GameConfig.MAP_INIT_Y = 400;
    /**战斗场景与场景地图偏移 */
    GameConfig.BATTLE_SCENE_OFFSET_Y = 40;
    /**战斗场景高度 */
    GameConfig.BATTLE_SCENE_HEIGHT = 300;
    /**场景缓存 */
    GameConfig.SCENE_CACHE = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    GameConfig.LINEUP_GRID_WIDTH = 105;
    /**阵型格子高 */
    GameConfig.LINEUP_GRID_HEIGHT = 100;
    /**战斗配置 */
    /**战斗时间间隔(S) */
    GameConfig.BATTLE_INTERVAL_TIME = 10;
    /**战斗跑到阵型需要时间(s) */
    GameConfig.BATTLE_RUN_TIME = 0.5;
    return GameConfig;
}());
/**地图类型枚举 */
var MapType;
(function (MapType) {
    MapType[MapType["BACKGROUND_MAP"] = 1] = "BACKGROUND_MAP";
    MapType[MapType["NEAR_MAP"] = 2] = "NEAR_MAP";
})(MapType || (MapType = {}));
//# sourceMappingURL=GameConfig.js.map