/*
* 技能
*/
class Skill{
    protected skeletonAni:Skeleton = null;
    constructor(){

    }
    /**
     * 
     * @param skillId 
     * @param pos 
     * @param scale 
     */
    public playSkill(skillId:number,pos:Point,scale?:number):void
    {
        if(scale === undefined || scale === null)
        {
            scale = 1;
        }
        if(this.skeletonAni == null)
        {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.pos(pos.x,pos.y);
            this.skeletonAni.scale(scale,scale);
            this.skeletonAni.load("res/outside/anim/skill/"+skillId+"/"+ skillId +".sk");
            LayerManager.ins.addToLayer(this.skeletonAni,LayerManager.EFFECT_LAYER,false,true,false);
        }
        // this.skeletonAni.play(0,false);
        Laya.timer.once(1000,this,this.playSkillComplete);
    }

    private playSkillComplete():void
    {
        if(this.skeletonAni)
        {
            this.skeletonAni.removeSelf();
            this.skeletonAni = null;
            ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL,this);
        }
    }

}