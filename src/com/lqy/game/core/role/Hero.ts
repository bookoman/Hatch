/*
* 英雄
*/
class Hero extends BaseRole{
    constructor(){
        super();
    }   
    public initRole(roleVo:RoleVo,scale?:number):void
    {
        super.initRole(roleVo,scale);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = roleVo.posPoint.x;
        this.y = roleVo.posPoint.y;
        
    }
    
}