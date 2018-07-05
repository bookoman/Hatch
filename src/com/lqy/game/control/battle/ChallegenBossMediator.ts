/*
* 挑战boss界面
*/
class ChallegenBossMediator extends BaseMediator{
    private heroRoles:Array<BaseRole> = null;
    private enemyRoles:Array<BaseRole> = null;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.battle.ChallengeBossViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        super.initView();
        this.initRoles();
        
        GameConfig.BATTLE_ADDSPEED_TIMES = 1;
        this.view.btnTimes.label = "X"+GameConfig.BATTLE_ADDSPEED_TIMES;
        // EventManager.ins.dispatchEvent(EventManager.TEST_LIST_SCRALE_RENDER);
    }
    protected addEvents():void
    {
        this.view.btnFast.on(Laya.Event.CLICK,this,this.onBtnFast);
        this.view.btnTimes.on(Laya.Event.CLICK,this,this.onBtnTimes);
    }

    protected removeEvents():void
    {
        this.view.btnFast.off(Laya.Event.CLICK,this,this.onBtnFast);
        this.view.btnTimes.off(Laya.Event.CLICK,this,this.onBtnTimes);
    }
    
    /**初始化地图数据 */
    public initRoles():void
    {
        BossBattleData.curLoadNum = 0;
        //英雄
        this.heroRoles = new Array();
        var playerData:PlayerData = GameDataManager.ins.selfPlayerData;
        playerData.upHeroVos.forEach(baseRoleVo => {
            baseRoleVo.initRowColPosPoint();
        });
        var baseRoleVo:BaseRoleVo;
        var hero:Hero;
        for(var i = 0;i < playerData.upHeroVos.length;i++)
        {
            baseRoleVo = playerData.upHeroVos[i];
            hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
            
            hero.initRole(baseRoleVo,i,-1,this.view.sprRole,true);
            // hero.setBlood(0);
            hero.aniPlay(RoleAniIndex.STAND);
            this.heroRoles.push(hero);
        }
        
        //显示层级排序
        this.heroRoles.sort(function(hero1,hero2):number{
            return hero1.baseRoleVo.gridY > hero2.baseRoleVo.gridY ? 1 : -1;
        })
        
        for(i = 0;i < this.heroRoles.length;i++)
        {
            this.heroRoles[i].setShowIndex(i);
        }
        //敌人
        this.enemyRoles = new Array();
        var bossData:EnemyData = GameDataManager.ins.bossData;    
        //怪物显示对象
        var enemy:Enemy;
        for(i = 0;i < bossData.masterVos.length;i++)
        {
            baseRoleVo = bossData.masterVos[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(baseRoleVo,i,1,this.view.sprRole,true);
            enemy.aniPlay(RoleAniIndex.STAND);
            this.enemyRoles.push(enemy);
        }
         //显示层级排序
        this.enemyRoles.sort(function(enemy1,enemy2):number{
            return enemy1.baseRoleVo.gridY > enemy2.baseRoleVo.gridY ? 1 : -1;
        })
        
        for(i = 0;i < this.enemyRoles.length;i++)
        {
            this.enemyRoles[i].setShowIndex(this.heroRoles.length + i); 
        }
        BossBattleData.loadSum = this.heroRoles.length + this.enemyRoles.length;
        BattleEngine.ins.challegenBoss(this.heroRoles,this.enemyRoles);
    }
    /**
     * 快速结束
     * @param e 
     */
    private onBtnFast(e):void
    {
        BattleEngine.ins.challegenBossFastEnd();
        this.dispose();
    }
    public dispose():void
    {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.SHAM_BATTLE,1000);
        /**清除角色对象 */
        if(this.heroRoles)
        {
            var lastHeros:Array<Hero> = [];
            this.heroRoles.forEach(role => {
                Laya.Tween.clearAll(role);
                role.baseRoleVo.isDeath = false;
                ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE,role);
                role.dispose();
            });
            this.heroRoles = null;
        }
        
        if(this.enemyRoles)
        {
            this.enemyRoles.forEach(role => {
                Laya.Tween.clearAll(role);
                ObjectPoolUtil.stillObject(ObjectPoolUtil.ENEMY_ROLE,role);
                role.dispose();
            });
            this.enemyRoles = null;
        }
        // BattleEngine.ins.endBattle();
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,false);
    }
    private onBtnTimes(e):void
    {
        GameConfig.BATTLE_ADDSPEED_TIMES++;
        if(GameConfig.BATTLE_ADDSPEED_TIMES > 3)
        {
            GameConfig.BATTLE_ADDSPEED_TIMES = 1;
        }
        this.view.btnTimes.label = "X"+GameConfig.BATTLE_ADDSPEED_TIMES;
        
    }
    
}