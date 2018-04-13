/*
* 怪物
*/
class Enemy extends BaseRole{
    constructor(){
        super();
    }
    public initRole(aniURL:string,scale?:number,roleVo?:RoleVo):void
    {
        super.initRole(aniURL,scale,roleVo);
        this.skeletonAni.transform.scaleEx(-1,1);
        
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = GameConfig.STAGE_WIDTH + GameConfig.LINEUP_GRID_WIDTH + roleVo.runWidth;
        // this.x = GameConfig.STAGE_WIDTH + roleVo.runWidth;
        this.y = this.roleVo.posPoint.y;
    }
    public run():void
    {
        Laya.Tween.to(this,{x:this.roleVo.posPoint.x,complete:new Handler(this,this.onMoveComplete)},GameConfig.BATTLE_RUN_TIME*1000);
    }
    private onMoveComplete():void
    {
        
    }
}