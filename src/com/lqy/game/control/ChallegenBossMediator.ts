/*
* 挑战boss界面
*/
class ChallegenBossMediator extends BaseMediator{
    private roleLayer:Laya.Sprite;
    private heroRoles:Array<BaseRole> = null;
    private enemyRoles:Array<BaseRole> = null;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.ChallengeBossViewUI();
        this.roleLayer = new Laya.Sprite();
        this.view.addChild(this.roleLayer);
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();
        this.initRoles();
    }
    protected addEvents():void
    {
        this.view.btnFast.on(Laya.Event.CLICK,this,this.onBtnFast);
    }

    protected removeEvents():void
    {
        this.view.btnFast.off(Laya.Event.CLICK,this,this.onBtnFast);
    }
    /**初始化地图数据 */
    public initRoles():void
    {
        //英雄
        this.heroRoles = new Array();
        var playerData:PlayerData = GameDataManager.ins.selfPlayerData;
        playerData.roleVoAry.forEach(roleVo => {
            roleVo.initRowColPosPoint();
        });
        var roleVo:RoleVo;
        var hero:Hero;
        for(var i = 0;i < playerData.roleVoAry.length;i++)
        {
            roleVo = playerData.roleVoAry[i];
            hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
            hero.initRole(roleVo,i,1,this.roleLayer);
            // hero.setBlood(0);
            this.heroRoles.push(hero);
            hero.aniPlay(RoleAniIndex.STAND);
        }
        this.heroRoles.forEach(heroView =>{
            heroView.setShowIndex(heroView.roleVo.lineupGrid - 1);
        });
        //敌人
        this.enemyRoles = new Array();
        var bossData:EnemyData = GameDataManager.ins.bossData;    
        //怪物显示对象
        var enemy:Enemy;
        for(i = 0;i < bossData.roleVoAry.length;i++)
        {
            roleVo = bossData.roleVoAry[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(roleVo,i,1,this.roleLayer);
            this.enemyRoles.push(enemy);
            enemy.aniPlay(RoleAniIndex.STAND);
        }
        this.enemyRoles.forEach(enemyView =>{
            enemyView.setShowIndex(this.heroRoles.length + enemyView.roleVo.lineupGrid-1);
        });

        BattleEngine.ins.challegenBoss(this.heroRoles,this.enemyRoles);
    }
    
    private onBtnFast(e):void
    {
        BattleEngine.ins.challegenBossFastEnd();
        this.dispose();
    }
    public dispose():void
    {
        /**清除角色对象 */
        if(this.heroRoles)
        {
            var lastHeros:Array<Hero> = [];
            this.heroRoles.forEach(role => {
                Laya.Tween.clearAll(role);
                role.roleVo.isDeath = false;
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

    
}