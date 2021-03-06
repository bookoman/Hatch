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
    /**战斗初始化Y坐标 */
    public static BATTLE_INIT_Y:number = 0;
    /**战斗场景与场景地图偏移 */
    public static BATTLE_SCENE_OFFSET_Y = 40;
    /**主场景战斗场景高度 */
    public static BATTLE_SCENE_HEIGHT:number = 500;
    /**战斗每轮攻击人数 */
    public static BATTLE_TURN_ATTACK_SUM:number = 1;
    /**循环假战斗我方英雄参与人数 */
    public static BATTLE_LOOP_HERO_SUM:number = 3;
    /**挑战boss我方英雄参与人数 */
    public static BATTLE_BOSS_HERO_SUM:number = 5;
    
    /**场景缓存 */
    public static SCENE_CACHE:number = 1;
    /**阵型配置 */
    /**阵型格子宽 */
    public static LINEUP_GRID_WIDTH:number = 240;
    /**阵型格子高 */
    public static LINEUP_GRID_HEIGHT:number = 100;


    /**战斗配置 */
    /**战斗时间间隔(S) */
    public static BATTLE_INTERVAL_TIME:number = 2;
    /**战斗跑到阵型需要时间(s) */
    public static BATTLE_RUN_TIME:number = 0.5;
    /**战斗攻击需要时间(s) */
    public static BATTLE_ATT_TIME:number = 0.3;
    /**战斗加速倍数*/
    public static BATTLE_ADDSPEED_TIMES:number = 1;

    /**调试视图开关 */
    public static DEBUG_VIEW_SWITCH:boolean = false;
    /**场景战斗开关 */
    public static SCENE_BATTLE_SWITCH:Boolean = true;

    //**************************默认数据 */
    /**没有资源时，英雄默认资源模型ID */
    public static HERO_DEFAULT_ANI_MODELID:string = "baolong001";

    /**单机游戏 */
    public static SINGLE_GAME:boolean = true;
    /**挂机关卡地图key数据 */
    public static GATE_MAP_KEYS:Array<string> = [];
    
    /**雨出现时间间隔 s */
    public static RAIN_SHOW_LIMIT_TIME:number = 20;

    /**品质color */
    public static QUALITY_COLORS:Array<string> = ["#00ff00","#003366","#FF9933"];
    /**是否显示CG动画 */
    public static isShowCG:boolean = false;



    //****单机测试数据 */
    /**登录信息 */
    public static loginAuthentication:string = '{"authentication": "taoken888888888888","data":"xielong"}';
    /**服务器信息 */
    public static serverInfos:string = '{"data": [{"guid": 1,"name": "龙翔于天","ip": "127.0.0.1","port": 9080,"state": 0,"createTime": 20000},'
    + '{"guid": 1,"name": "龙归大海","ip": "127.0.0.1","port": 9080,"state": 0,"createTime": 20000}],'
	+ '"lastInGameServers":{"guid": 1,"name": "龙归大海","ip": "127.0.0.1","port": 9080,"state": 0,"createTime": 20000}}';
    /**关卡信息 */
    public static gatesInfos:string = '{"hangGateKey":"G_1-1","gateInfoMap":{"G_1-1":{"gateKey":"G_1-1","gateMapKey":"GM_1000","passGate":10000,"passTime":10000},'
    +'"G_1-2":{"gateKey":"G_1-2","gateMapKey":"GM_1000","passGate":10000,"passTime":10000}}}';
    /**上阵信息 */
    public static heroInfos:string = '{"0": "10000","1": "100001"}';
}

class HTTPReqType{
    public static POST:string = "post";
    public static GET:string = "get";
}

/**协议 */
class Protocol{
    // /**登录模块 */
    // public static USER_LOGIN:number = 1000;
    // /**登录 */
    // public static USER_LOGIN_CMD:number = 1;

    // /**英雄模块 */
    // public static HERO:number = 1001;
    // /**获取英雄信息 */
    // public static HERO_GET_INFOS:number = 1;
    // /**更新阵型 */
    // public static HERO_UPDATE_FORMATION:number = 2;

    // /**关卡模块 */
    // public static GATE:number = 1002;
    // /**获取玩家关卡信息 */
    // public static GATE_INFO:number = 1;
    // /**返回玩家关卡信息 */
    // public static GATE_HANDUP_STATE:number = 2;
    // /**切换挂机关卡 */
    // public static GATE_SWITCH_HANG_GATE:number = 3;
    // /**挑战关卡 */
    // public static GATE_BATTLE:number = 4;
    // /**扫荡关卡 */
    // public static GATE_SCAN:number = 5;


    //新协议
    public static USER_REGISTER_REQ:number = 202102;
    /**登录请求 */
    public static USER_LOGIN_REQ:number = 202103;
    /**登录返回 */
    public static USER_LOGIN_RESP:number = 202201;
    /**服务器列表 */
    public static SERVER_LIST_RESP:number = 202203;

}
/**登录服务器信息 */
class LoginServerInfo{
    public static IP:string = "192.168.2.104";
    public static PORT:number = 1000;
}
/**http请求地址 */
class HTTPRequestUrl{
    /**测试登录 get*/
    public static testLoginURL:string = "http://192.168.2.126:8080/api/testLogin.do";
    /**获取区服列表 get*/
    public static gameServerURL:string = "http://192.168.2.126:8080/api/gameserver.do";
    /**进入游戏 get*/
    public static enterGameURL:string = "http://192.168.2.126:8080/api/entergame.do";

}

/**服务器状态 */
class GameServerState{

    /**
     * 流畅
     */
    public static  GameServer_State_ON = 0;
    /**
     * 拥挤
     */
    public static  GameServer_State_Croding = 1;
    /**
     * 火爆
     */
    public static GameServer_State_FIRE = 2;
     /**
     * 停服
     */
    public static GameServer_State_OFF = -1;
     
}

/**地图类型枚举 */
enum MapType
{
    FAR_MAP = 1,BACKGROUND_MAP,NEAR_MAP
}
/**角色动画枚举 */
enum RoleAniIndex
{
    // STAND = 0,INJURED,DEATH,ATTACK,MOVE,SKILL1,SKILL2,SKILL3,SKILL4
    ATTACK = 0,INJURED,DEATH,MOVE,STAND
}
/**
 * 战斗攻击阵营
 */
enum BattleAttCampType
{
    HERO = 1,ENEMY,OTHER
}
/**游戏底部按钮索引 */
enum GameButtomTabIndex
{
    MAP_BATTLE = 0,LINEUP,BATTLE,HERO,EQUIP
}
/**技能释放目标 自身,我方一个,我方所有,敌方一个,敌方所有,我方一个包括自身,我方百分比血量最少,敌方百分比血量最少*/
enum SkillTarget{
    /**自身*/
    SELF = 1,
    /**我方一个不包括自身 */
    WE_ONE,
    /**我方所有 */
    WE_ALL,
    /**敌方一个*/
    ENEMY_ONE,
    /**敌方所有 */
    ENEMY_ALL,
    /**我方一个包括自身*/
    WE_ONE_SELF,
    /**我方百分比血量最少 */
    WE_LEAST_PERCENT_BLOOD,
    /**敌方百分比血量最少 */
    ENEMY_LEAST_PERCENT_BLOOD
}
/**技能效果  伤害,流血,中毒,吸血,恢复,遗忘,混乱,愤怒,增加攻击力,增加防御力,增加速度,增加血量上限,回血,解除负面效果,解除正面效果,增加免伤,减少对方治疗量*/
enum SkillEffect{
    /**伤害 */
    HURT=1,
    /**流血 */
    BLEEDING,
    /**中毒 */
    POISONING,
    /**吸血 */
    BLOOD_SUCKING,
    /**恢复 */
    RECOVERY,
    /**遗忘 */
    FORGET,
    /**混乱 */
    CONFUSION,
    /**愤怒 */
    ANGER,
    /**增加攻击力 */
    ADD_ATK,
    /**增加防御力 */
    ADD_DEF,
    /**增加速度 */
    ADD_SPEED,
    /**增加血量上限 */
    ADD_BLOOD_UP_LIMIT,
    /**回血 */
    RECOVERY_BLOOD,
    /**解除负面效果 */
    ELIMINATE_NEGATIVE_EFFECT,
    /**解除正面效果 */
    ELIMINATE_POSITIVE_EFFECT,
    /**增加免伤 */
    ADD_INJURY_FREE,
    /**减少对方治疗量 */
    REDUCE_ENEMY_TREATMENT
}
/**战报类型 */
enum BattleReportDataType{
    HURT = 1,REWARD,BATTLE_DIE
}
/**背景音乐枚举 */
enum MusicBGType{
    SHAM_BATTLE = 0,TURE_BATTLE,WORLD_MAP,UI_BG,LOGIN_BG
}
/**音效枚举 */
enum SoundEffectType{
    CLICK = 0,CLOSE,ERROR,USE_GOLD,HARVEST,SUCCESS,FAIL
}
