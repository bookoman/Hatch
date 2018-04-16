/*
* 怪物
*/
class Enemy extends BaseRole{
    constructor(){
        super();
    }
    public initRole(roleVo:RoleVo,scale?:number):void
    {
        super.initRole(roleVo,scale);
        
        this.x = GameConfig.STAGE_WIDTH + GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        this.y = this.roleVo.posPoint.y;
    }
    public run():void
    {
        // this.aniPlay(RoleAniIndex.MOVE);
        super.run();
        Laya.Tween.to(this,{x:this.roleVo.posPoint.x,complete:new Handler(this,this.onMoveComplete)},GameConfig.BATTLE_RUN_TIME*1000);
    }
    private onMoveComplete():void
    {
        console.log("敌人到达战场...");
        EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
        this.aniPlay(RoleAniIndex.STAND);
    }
}