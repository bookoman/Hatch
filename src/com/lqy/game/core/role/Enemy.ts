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
       
    }
}