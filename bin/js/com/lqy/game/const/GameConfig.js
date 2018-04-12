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
    /**阵型配置 */
    /**英雄阵型初始化点 */
    GameConfig.HERO_POINT = new Laya.Point(60, 480);
    /**怪物阵型初始化点 */
    GameConfig.ENEMY_POINT = new Laya.Point(460, 480);
    /**行格子数 */
    GameConfig.LINEUP_ROWGRID_NUM = 3;
    /**列格子数 */
    GameConfig.LINEUP_COLGRID_NUM = 3;
    /**阵型格子宽 */
    GameConfig.LINEUP_GRID_WIDTH = 100;
    /**阵型格子高 */
    GameConfig.LINEUP_GRID_HEIGHT = 100;
    /**战斗配置 */
    /**战斗时间间隔(S) */
    GameConfig.BATTLE_INTERVAL_TIME = 10;
    /**战斗跑到阵型需要时间(s) */
    GameConfig.BATTLE_RUN_TIME = 1;
    return GameConfig;
}());
/**地图类型枚举 */
var MapType;
(function (MapType) {
    MapType[MapType["BACKGROUND_MAP"] = 1] = "BACKGROUND_MAP";
    MapType[MapType["NEAR_MAP"] = 2] = "NEAR_MAP";
})(MapType || (MapType = {}));
//# sourceMappingURL=GameConfig.js.map