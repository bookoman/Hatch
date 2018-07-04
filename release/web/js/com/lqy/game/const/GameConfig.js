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
    /**战斗初始化Y坐标 */
    GameConfig.BATTLE_INIT_Y = 0;
    /**战斗场景与场景地图偏移 */
    GameConfig.BATTLE_SCENE_OFFSET_Y = 40;
    /**主场景战斗场景高度 */
    GameConfig.BATTLE_SCENE_HEIGHT = 500;
    /**战斗每轮攻击人数 */
    GameConfig.BATTLE_TURN_ATTACK_SUM = 1;
    /**循环假战斗我方英雄参与人数 */
    GameConfig.BATTLE_LOOP_HERO_SUM = 3;
    /**挑战boss我方英雄参与人数 */
    GameConfig.BATTLE_BOSS_HERO_SUM = 5;
    /**场景缓存 */
    GameConfig.SCENE_CACHE = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    GameConfig.LINEUP_GRID_WIDTH = 240;
    /**阵型格子高 */
    GameConfig.LINEUP_GRID_HEIGHT = 100;
    /**战斗配置 */
    /**战斗时间间隔(S) */
    GameConfig.BATTLE_INTERVAL_TIME = 2;
    /**战斗跑到阵型需要时间(s) */
    GameConfig.BATTLE_RUN_TIME = 0.5;
    /**战斗攻击需要时间(s) */
    GameConfig.BATTLE_ATT_TIME = 0.3;
    /**战斗加速倍数*/
    GameConfig.BATTLE_ADDSPEED_TIMES = 1;
    /**调试视图开关 */
    GameConfig.DEBUG_VIEW_SWITCH = false;
    /**场景战斗开关 */
    GameConfig.SCENE_BATTLE_SWITCH = true;
    //**************************默认数据 */
    /**没有资源时，英雄默认资源模型ID */
    GameConfig.HERO_DEFAULT_ANI_MODELID = "baolong001";
    /**单机游戏 */
    GameConfig.SINGLE_GAME = false;
    /**挂机关卡地图key数据 */
    GameConfig.GATE_MAP_KEYS = [];
    /**雨出现时间间隔 s */
    GameConfig.RAIN_SHOW_LIMIT_TIME = 20;
    /**品质color */
    GameConfig.QUALITY_COLORS = ["#00ff00", "#003366", "#FF9933"];
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
    /**登录模块 */
    Protocol.USER_LOGIN = 1000;
    /**登录 */
    Protocol.USER_LOGIN_CMD = 1;
    /**英雄模块 */
    Protocol.HERO = 1001;
    /**获取英雄信息 */
    Protocol.HERO_GET_INFOS = 1;
    /**更新阵型 */
    Protocol.HERO_UPDATE_FORMATION = 2;
    /**关卡模块 */
    Protocol.GATE = 1002;
    /**获取玩家关卡信息 */
    Protocol.GATE_INFO = 1;
    /**返回玩家关卡信息 */
    Protocol.GATE_HANDUP_STATE = 2;
    /**切换挂机关卡 */
    Protocol.GATE_SWITCH_HANG_GATE = 3;
    /**挑战关卡 */
    Protocol.GATE_BATTLE = 4;
    /**扫荡关卡 */
    Protocol.GATE_SCAN = 5;
    return Protocol;
}());
/**http请求地址 */
var HTTPRequestUrl = /** @class */ (function () {
    function HTTPRequestUrl() {
    }
    /**测试登录 get*/
    HTTPRequestUrl.testLoginURL = "http://192.168.2.104:8080/api/testLogin.do";
    /**获取区服列表 get*/
    HTTPRequestUrl.gameServerURL = "http://192.168.2.104:8080/api/gameserver.do";
    /**进入游戏 get*/
    HTTPRequestUrl.enterGameURL = "http://192.168.2.104:8080/api/entergame.do";
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
    MapType[MapType["FAR_MAP"] = 1] = "FAR_MAP";
    MapType[MapType["BACKGROUND_MAP"] = 2] = "BACKGROUND_MAP";
    MapType[MapType["NEAR_MAP"] = 3] = "NEAR_MAP";
})(MapType || (MapType = {}));
/**角色动画枚举 */
var RoleAniIndex;
(function (RoleAniIndex) {
    // STAND = 0,INJURED,DEATH,ATTACK,MOVE,SKILL1,SKILL2,SKILL3,SKILL4
    RoleAniIndex[RoleAniIndex["ATTACK"] = 0] = "ATTACK";
    RoleAniIndex[RoleAniIndex["INJURED"] = 1] = "INJURED";
    RoleAniIndex[RoleAniIndex["DEATH"] = 2] = "DEATH";
    RoleAniIndex[RoleAniIndex["MOVE"] = 3] = "MOVE";
    RoleAniIndex[RoleAniIndex["STAND"] = 4] = "STAND";
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
/**游戏底部按钮索引 */
var GameButtomTabIndex;
(function (GameButtomTabIndex) {
    GameButtomTabIndex[GameButtomTabIndex["MAP_BATTLE"] = 0] = "MAP_BATTLE";
    GameButtomTabIndex[GameButtomTabIndex["LINEUP"] = 1] = "LINEUP";
    GameButtomTabIndex[GameButtomTabIndex["BATTLE"] = 2] = "BATTLE";
    GameButtomTabIndex[GameButtomTabIndex["HERO"] = 3] = "HERO";
    GameButtomTabIndex[GameButtomTabIndex["EQUIP"] = 4] = "EQUIP";
})(GameButtomTabIndex || (GameButtomTabIndex = {}));
/**技能释放目标 自身,我方一个,我方所有,敌方一个,敌方所有,我方一个包括自身,我方百分比血量最少,敌方百分比血量最少*/
var SkillTarget;
(function (SkillTarget) {
    /**自身*/
    SkillTarget[SkillTarget["SELF"] = 1] = "SELF";
    /**我方一个不包括自身 */
    SkillTarget[SkillTarget["WE_ONE"] = 2] = "WE_ONE";
    /**我方所有 */
    SkillTarget[SkillTarget["WE_ALL"] = 3] = "WE_ALL";
    /**敌方一个*/
    SkillTarget[SkillTarget["ENEMY_ONE"] = 4] = "ENEMY_ONE";
    /**敌方所有 */
    SkillTarget[SkillTarget["ENEMY_ALL"] = 5] = "ENEMY_ALL";
    /**我方一个包括自身*/
    SkillTarget[SkillTarget["WE_ONE_SELF"] = 6] = "WE_ONE_SELF";
    /**我方百分比血量最少 */
    SkillTarget[SkillTarget["WE_LEAST_PERCENT_BLOOD"] = 7] = "WE_LEAST_PERCENT_BLOOD";
    /**敌方百分比血量最少 */
    SkillTarget[SkillTarget["ENEMY_LEAST_PERCENT_BLOOD"] = 8] = "ENEMY_LEAST_PERCENT_BLOOD";
})(SkillTarget || (SkillTarget = {}));
/**技能效果  伤害,流血,中毒,吸血,恢复,遗忘,混乱,愤怒,增加攻击力,增加防御力,增加速度,增加血量上限,回血,解除负面效果,解除正面效果,增加免伤,减少对方治疗量*/
var SkillEffect;
(function (SkillEffect) {
    /**伤害 */
    SkillEffect[SkillEffect["HURT"] = 1] = "HURT";
    /**流血 */
    SkillEffect[SkillEffect["BLEEDING"] = 2] = "BLEEDING";
    /**中毒 */
    SkillEffect[SkillEffect["POISONING"] = 3] = "POISONING";
    /**吸血 */
    SkillEffect[SkillEffect["BLOOD_SUCKING"] = 4] = "BLOOD_SUCKING";
    /**恢复 */
    SkillEffect[SkillEffect["RECOVERY"] = 5] = "RECOVERY";
    /**遗忘 */
    SkillEffect[SkillEffect["FORGET"] = 6] = "FORGET";
    /**混乱 */
    SkillEffect[SkillEffect["CONFUSION"] = 7] = "CONFUSION";
    /**愤怒 */
    SkillEffect[SkillEffect["ANGER"] = 8] = "ANGER";
    /**增加攻击力 */
    SkillEffect[SkillEffect["ADD_ATK"] = 9] = "ADD_ATK";
    /**增加防御力 */
    SkillEffect[SkillEffect["ADD_DEF"] = 10] = "ADD_DEF";
    /**增加速度 */
    SkillEffect[SkillEffect["ADD_SPEED"] = 11] = "ADD_SPEED";
    /**增加血量上限 */
    SkillEffect[SkillEffect["ADD_BLOOD_UP_LIMIT"] = 12] = "ADD_BLOOD_UP_LIMIT";
    /**回血 */
    SkillEffect[SkillEffect["RECOVERY_BLOOD"] = 13] = "RECOVERY_BLOOD";
    /**解除负面效果 */
    SkillEffect[SkillEffect["ELIMINATE_NEGATIVE_EFFECT"] = 14] = "ELIMINATE_NEGATIVE_EFFECT";
    /**解除正面效果 */
    SkillEffect[SkillEffect["ELIMINATE_POSITIVE_EFFECT"] = 15] = "ELIMINATE_POSITIVE_EFFECT";
    /**增加免伤 */
    SkillEffect[SkillEffect["ADD_INJURY_FREE"] = 16] = "ADD_INJURY_FREE";
    /**减少对方治疗量 */
    SkillEffect[SkillEffect["REDUCE_ENEMY_TREATMENT"] = 17] = "REDUCE_ENEMY_TREATMENT";
})(SkillEffect || (SkillEffect = {}));
/**战报类型 */
var BattleReportDataType;
(function (BattleReportDataType) {
    BattleReportDataType[BattleReportDataType["HURT"] = 1] = "HURT";
    BattleReportDataType[BattleReportDataType["REWARD"] = 2] = "REWARD";
    BattleReportDataType[BattleReportDataType["BATTLE_DIE"] = 3] = "BATTLE_DIE";
})(BattleReportDataType || (BattleReportDataType = {}));
/**背景音乐枚举 */
var MusicBGType;
(function (MusicBGType) {
    MusicBGType[MusicBGType["SHAM_BATTLE"] = 0] = "SHAM_BATTLE";
    MusicBGType[MusicBGType["TURE_BATTLE"] = 1] = "TURE_BATTLE";
    MusicBGType[MusicBGType["WORLD_MAP"] = 2] = "WORLD_MAP";
    MusicBGType[MusicBGType["UI_BG"] = 3] = "UI_BG";
    MusicBGType[MusicBGType["LOGIN_BG"] = 4] = "LOGIN_BG";
})(MusicBGType || (MusicBGType = {}));
/**音效枚举 */
var SoundEffectType;
(function (SoundEffectType) {
    SoundEffectType[SoundEffectType["CLICK"] = 0] = "CLICK";
    SoundEffectType[SoundEffectType["CLOSE"] = 1] = "CLOSE";
    SoundEffectType[SoundEffectType["ERROR"] = 2] = "ERROR";
    SoundEffectType[SoundEffectType["USE_GOLD"] = 3] = "USE_GOLD";
    SoundEffectType[SoundEffectType["HARVEST"] = 4] = "HARVEST";
    SoundEffectType[SoundEffectType["SUCCESS"] = 5] = "SUCCESS";
    SoundEffectType[SoundEffectType["FAIL"] = 6] = "FAIL";
})(SoundEffectType || (SoundEffectType = {}));
//# sourceMappingURL=GameConfig.js.map