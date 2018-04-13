/*
* 游戏配置
*/
class GameConfig{
    /**舞台大小 */
    public static STAGE_WIDTH:number = 750;
    public static STAGE_HEIGHT:number = 1334;
    /**地图配置信息 */
    // public static MAP_GRID_WIDTH:number = 25;
    // public static MAP_GRID_HEIGHT:number = 25;
    // public static MAP_BLOCK_WIDTH:number = 200;
    // public static MAP_BLOCK_HEIGHT:number = 200;
    // public static MAP_NEAR_TYPE:number = 1;
    /**场景地图出事化Y坐标 */
    public static MAP_INIT_Y:number = 400;
    /**战斗场景与场景地图偏移 */
    public static BATTLE_SCENE_OFFSET_Y = 40;
    /**战斗场景高度 */
    public static BATTLE_SCENE_HEIGHT:number = 300;
    
    /**场景缓存 */
    public static SCENE_CACHE:number = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    public static LINEUP_GRID_WIDTH:number = 105;
    /**阵型格子高 */
    public static LINEUP_GRID_HEIGHT:number = 100;


    /**战斗配置 */
    /**战斗时间间隔(S) */
    public static BATTLE_INTERVAL_TIME:number = 10;
    /**战斗跑到阵型需要时间(s) */
    public static BATTLE_RUN_TIME:number = 0.5;

    
}
/**地图类型枚举 */
enum MapType
{
    BACKGROUND_MAP = 1,NEAR_MAP
}