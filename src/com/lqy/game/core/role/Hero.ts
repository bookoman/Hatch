/*
* 英雄
*/
class Hero extends BaseRole{
    
    constructor(){
        super();
    }   
    public initRole(baseRoleVo:BaseRoleVo,showPriority:number,scale?:number,parentDis?:Laya.Sprite):void
    {
        super.initRole(baseRoleVo,showPriority,scale,parentDis);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = baseRoleVo.posPoint.x;
        this.y = baseRoleVo.posPoint.y;
        
    }

   
    
}