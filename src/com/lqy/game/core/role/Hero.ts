/*
* 英雄
*/
class Hero extends BaseRole{
    constructor(){
        super();
    }   
    public initRole(aniURL:string,scale?:number,lineupVo?:LineupVo):void
    {
        super.initRole(aniURL,scale,lineupVo);
        
        this.skeletonAni.pos(60 + (this.lineupVo.col - 1) * 120,480 + (this.lineupVo.row - 1) * 100);
    }
}