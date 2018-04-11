/*
* 怪物
*/
class Monster extends BaseRole{
    constructor(){
        super();
    }
    public initRole(aniURL:string,scale?:number,lineupVo?:LineupVo):void
    {
        super.initRole(aniURL,scale,lineupVo);
        this.skeletonAni.transform.scaleEx(-1,1);
        this.skeletonAni.pos(460 + (this.lineupVo.col - 1) * 120,480 + (this.lineupVo.row-1) * 100);
    }
}