/*
* 英雄
*/
class Hero extends BaseRole{
    constructor(){
        super();
    }   
    public initRole(roleVo:RoleVo,showPriority:number,scale?:number,parentDis?:Laya.Sprite):void
    {
        super.initRole(roleVo,showPriority,scale,parentDis);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = roleVo.posPoint.x;
        this.y = roleVo.posPoint.y;
        
    }

   
    
}