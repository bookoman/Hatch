import Skeleton = Laya.Skeleton; 
/*
* 角色
*/
class BaseRole{
    protected skeletonAni:Skeleton = null;
    protected lineupVo:LineupVo;
    private aniCount:number = 0;
    constructor(){
        
    }
    public initRole(aniURL?:string,scale?:number,lineupVo?:LineupVo):void
    {
        if(aniURL)
        {
            this.skeletonAni = new Skeleton();
            // this.skeletonAni.pos(100,100);
            
            this.skeletonAni.load(aniURL,new Laya.Handler(this,this.loadCompleted));
            if(scale)
            {
                this.skeletonAni.scale(scale,scale);
            }
            this.lineupVo = lineupVo;
        }
        LayerManager.ins.addToLayer(this.skeletonAni,LayerManager.ROLE_LAYER,false,true,false);

    }
    private loadCompleted() {
        this.aniCount = this.skeletonAni.getAnimNum();
        // console.log("播放动画名字："+this.aniCount);
    }
    private onError()
    {
        
    }
    /**
     * 
     * @param aniID 动画id
     */
    public play(aniID:number)
    {
        if(this.skeletonAni)
        {
            //>= aniCount默认播放第一个动画
            aniID = aniID % this.aniCount;
            this.skeletonAni.play(aniID,true);
            console.log("播放动画名字："+ this.skeletonAni.getAniNameByIndex(aniID));  
        }
    }

}