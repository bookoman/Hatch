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
    GameConfig.MAP_INIT_Y = 600;
    /**战斗场景与场景地图偏移 */
    GameConfig.BATTLE_SCENE_OFFSET_Y = 40;
    /**主场景战斗场景高度 */
    GameConfig.BATTLE_SCENE_HEIGHT = 500;
    /**战斗每轮攻击人数 */
    GameConfig.BATTLE_TURN_ATTACK_SUM = 1;
    /**循环假战斗我方英雄参与人数 */
    GameConfig.BATTLE_LOOP_HERO_SUM = 3;
    /**场景缓存 */
    GameConfig.SCENE_CACHE = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    GameConfig.LINEUP_GRID_WIDTH = 240;
    /**阵型格子高 */
    GameConfig.LINEUP_GRID_HEIGHT = 100;
    /**战斗配置 */
    /**战斗时间间隔(S) */
    GameConfig.BATTLE_INTERVAL_TIME = 1;
    /**战斗跑到阵型需要时间(s) */
    GameConfig.BATTLE_RUN_TIME = 0.5;
    /**战斗攻击需要时间(s) */
    GameConfig.BATTLE_ATT_TIME = 0.3;
    /**调试视图开关 */
    GameConfig.DEBUG_VIEW_SWITCH = false;
    /**场景战斗开关 */
    GameConfig.SCENE_BATTLE_SWITCH = true;
    return GameConfig;
}());
var HTTPReqType = /** @class */ (function () {
    function HTTPReqType() {
    }
    HTTPReqType.POST = "post";
    HTTPReqType.GET = "get";
    return HTTPReqType;
}());
/**协议 */
var Protocol = /** @class */ (function () {
    function Protocol() {
    }
    Protocol.USER_LOGIN = 1000;
    Protocol.USER_LOGIN_CMD = 1;
    return Protocol;
}());
/**http请求地址 */
var HTTPRequestUrl = /** @class */ (function () {
    function HTTPRequestUrl() {
    }
    /**测试登录 get*/
    HTTPRequestUrl.testLoginURL = "http://192.168.2.126:8080/api/testLogin.do";
    /**获取区服列表 get*/
    HTTPRequestUrl.gameServerURL = "http://192.168.2.126:8080/api/gameserver.do";
    /**进入游戏 get*/
    HTTPRequestUrl.enterGameURL = "http://192.168.2.126:8080/api/entergame.do";
    return HTTPRequestUrl;
}());
/**服务器状态 */
var GameServerState = /** @class */ (function () {
    function GameServerState() {
    }
    /**
     * 正常在线
     */
    GameServerState.GameServer_State_ON = 0;
    /**
     * 火爆
     */
    GameServerState.GameServer_State_FIRE = 1;
    /**
    * 停服
    */
    GameServerState.GameServer_State_OFF = -1;
    /**
     * 停服维护
     */
    GameServerState.GameServer_State_Maintain = -2;
    return GameServerState;
}());
/**地图类型枚举 */
var MapType;
(function (MapType) {
    MapType[MapType["BACKGROUND_MAP"] = 1] = "BACKGROUND_MAP";
    MapType[MapType["NEAR_MAP"] = 2] = "NEAR_MAP";
})(MapType || (MapType = {}));
/**角色动画枚举 */
var RoleAniIndex;
(function (RoleAniIndex) {
    RoleAniIndex[RoleAniIndex["STAND"] = 0] = "STAND";
    RoleAniIndex[RoleAniIndex["INJURED"] = 1] = "INJURED";
    RoleAniIndex[RoleAniIndex["DEATH"] = 2] = "DEATH";
    RoleAniIndex[RoleAniIndex["ATTACK"] = 3] = "ATTACK";
    RoleAniIndex[RoleAniIndex["MOVE"] = 4] = "MOVE";
    RoleAniIndex[RoleAniIndex["SKILL1"] = 5] = "SKILL1";
    RoleAniIndex[RoleAniIndex["SKILL2"] = 6] = "SKILL2";
    RoleAniIndex[RoleAniIndex["SKILL3"] = 7] = "SKILL3";
    RoleAniIndex[RoleAniIndex["SKILL4"] = 8] = "SKILL4";
})(RoleAniIndex || (RoleAniIndex = {}));
/**
 * 战斗攻击阵营
 */
var BattleAttCampType;
(function (BattleAttCampType) {
    BattleAttCampType[BattleAttCampType["HERO"] = 1] = "HERO";
    BattleAttCampType[BattleAttCampType["ENEMY"] = 2] = "ENEMY";
    BattleAttCampType[BattleAttCampType["OTHER"] = 3] = "OTHER";
})(BattleAttCampType || (BattleAttCampType = {}));
//# sourceMappingURL=GameConfig.js.map