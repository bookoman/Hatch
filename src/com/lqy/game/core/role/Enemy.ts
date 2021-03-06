/*
* 怪物
*/
class Enemy extends BaseRole{
    constructor(){
        super();
    }
    public initRole(baseRoleVo:BaseRoleVo,showPriority:number,scale?:number,parentDis?:Laya.Sprite,showBloodBar?:boolean):void
    {
        super.initRole(baseRoleVo,showPriority,scale,parentDis,showBloodBar);
        
        // this.x = GameConfig.STAGE_WIDTH + GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        this.x = this.baseRoleVo.posPoint.x + (parentDis ? 0 : GameConfig.STAGE_WIDTH / 2);
        this.y = this.baseRoleVo.posPoint.y;
    }
    // public run():void
    // {
    //     this.aniPlay(RoleAniIndex.STAND);
    //     // super.run();
    //     Laya.Tween.to(this,{x:this.roleVo.posPoint.x,complete:new Handler(this,this.onMoveComplete)},GameConfig.BATTLE_RUN_TIME*1000);
    // }
    // private onMoveComplete():void
    // {
    //     console.log("敌人到达战场...");
    //     EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
    //     this.aniPlay(RoleAniIndex.STAND);
    // }
    /**跟随地图移动 */
    public moveByMap(speed:number):void
    {
        if(this.baseRoleVo && this.x > this.baseRoleVo.posPoint.x)
        {
            this.x -= speed;
            if(this.x <= this.baseRoleVo.posPoint.x)
            {
                EventManager.ins.dispatchEvent(EventManager.ENEMY_RUNTO_COMPLETE);
            }
        }
    }
}