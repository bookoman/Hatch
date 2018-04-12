import Skeleton = Laya.Skeleton; 
/*
* 角色
*/
class BaseRole extends Laya.Sprite{
    protected skeletonAni:Skeleton = null;
    protected roleVo:RoleVo;
    private aniCount:number = 0;
    constructor(){
        super();
    }
    public initRole(aniURL?:string,scale?:number,roleVo?:RoleVo):void
    {
        if(aniURL)
        {
            this.roleVo = roleVo;
            this.skeletonAni = new Skeleton();
            this.skeletonAni.load(aniURL,new Laya.Handler(this,this.loadCompleted));
            if(scale)
            {
                this.skeletonAni.scale(scale,scale);
            }
            this.addChild(this.skeletonAni);
        }
        LayerManager.ins.addToLayer(this,LayerManager.ROLE_LAYER,false,true,false);

    }
    private loadCompleted() {
        this.aniCount = this.skeletonAni.getAnimNum();
        // var text:Laya.Label = new Laya.Label();
        // text.x = -60;
        // text.y = -180;
        // text.fontSize = 24;
        // text.color = "#ff0000";
        // text.text = this.roleVo.name;
        // this.addChild(text);
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

    public run():void
    {
        
        
    }

}