/*
* 游戏配置
*/
class GameConfig{
    /**舞台大小 */
    public static STAGE_WIDTH:number = 750;
    public static STAGE_HEIGHT:number = 1334;
    /**地图配置信息 */
    public static MAP_GRID_WIDTH:number = 25;
    public static MAP_GRID_HEIGHT:number = 25;
    public static MAP_BLOCK_WIDTH:number = 200;
    public static MAP_BLOCK_HEIGHT:number = 200;
    public static MAP_NEAR_TYPE:number = 1;
    
    /**场景缓存 */
    public static SCENE_CACHE:number = 1;
    
}
/**地图类型枚举 */
enum MapType
{
    BACKGROUND_MAP = 1,NEAR_MAP
}