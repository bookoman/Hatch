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
    public static MAP_INIT_Y:number = 600;
    /**战斗场景与场景地图偏移 */
    public static BATTLE_SCENE_OFFSET_Y = 40;
    /**战斗场景高度 */
    public static BATTLE_SCENE_HEIGHT:number = 500;
    /**战斗每轮攻击人数 */
    public static BATTLE_TURN_ATTACK_SUM:number = 1;
    
    /**场景缓存 */
    public static SCENE_CACHE:number = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    public static LINEUP_GRID_WIDTH:number = 180;
    /**阵型格子高 */
    public static LINEUP_GRID_HEIGHT:number = 100;


    /**战斗配置 */
    /**战斗时间间隔(S) */
    public static BATTLE_INTERVAL_TIME:number = 2;
    /**战斗跑到阵型需要时间(s) */
    public static BATTLE_RUN_TIME:number = 0.5;
    /**战斗攻击需要时间(s) */
    public static BATTLE_ATT_TIME:number = 0.3;

    /**调试视图开关 */
    public static DEBUG_VIEW_SWITCH:boolean = true;



    
}
/**地图类型枚举 */
enum MapType
{
    BACKGROUND_MAP = 1,NEAR_MAP
}
/**角色动画枚举 */
enum RoleAniIndex
{
    STAND = 0,INJURED,DEATH,ATTACK,MOVE,SKILL1,SKILL2,SKILL3,SKILL4
}
/**
 * 战斗攻击阵营
 */
enum BattleAttCampType
{
    HERO = 1,ENEMY,OTHER
}
