/*
* 技能
*/
class Skill{
    // protected skeletonAni:Skeleton = null;
    private frameAni:FrameAnimation = null;
    constructor(){
        
    }
    public playSkill(skillModelId:string,parentDis:any,tx?:number,ty?:number,scale?:number):void
    {
        this.frameAni = new FrameAnimation(parentDis,tx,ty,true,scale);
        this.frameAni.playAni(skillModelId,false,this,this.playSkillComplete);
    }
    private playSkillComplete():void
    {
        ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL,this);
    }
    // /**
    //  * 
    //  * @param skillModelId 
    //  * @param pos 
    //  * @param scale 
    //  */
    // public playSkill(skillModelId:string,parentDis:any,pos?:Point,scale?:number):void
    // {
    //     if(scale === undefined || scale === null)
    //     {
    //         scale = 1;
    //     }
    //     if(this.skeletonAni == null)
    //     {
    //         this.skeletonAni = new Skeleton();
    //         if(pos)
    //         {
    //             this.skeletonAni.pos(pos.x,pos.y);
    //         }
    //         this.skeletonAni.scale(scale,scale);
    //         this.skeletonAni.load("res/outside/anim/skill/"+skillModelId+"/"+ skillModelId +".sk",Laya.Handler.create(this,this.resLoaded));
    //         // LayerManager.ins.addToLayer(this.skeletonAni,LayerManager.EFFECT_LAYER,false,true,false);
    //         parentDis.addChild(this.skeletonAni);
    //     }
    // }
    // private resLoaded():void
    // {
    //     this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
    //     this.skeletonAni.play(0,true);
    //     this.skeletonAni.player.on(Laya.Event.COMPLETE,this,this.playSkillComplete);
    // }
    
    // private playSkillComplete():void
    // {
    //     if(this.skeletonAni)
    //     {
    //         this.skeletonAni.player.off(Laya.Event.COMPLETE,this,this.playSkillComplete);
    //         this.skeletonAni.removeSelf();
    //         this.skeletonAni = null;
    //         ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL,this);
    //     }
    // }

}