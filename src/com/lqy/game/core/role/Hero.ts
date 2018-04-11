/*
* 英雄
*/
class Hero extends BaseRole{
    constructor(){
        super();
    }   
    public initRole(aniURL:string,scale?:number,roleVo?:RoleVo):void
    {
        super.initRole(aniURL,scale,roleVo);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
    }
}