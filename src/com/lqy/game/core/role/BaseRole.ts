import Skeleton = Laya.Skeleton; 
/*
* 角色
*/
class BaseRole extends Laya.Sprite{
    protected skeletonAni:Skeleton = null;
    public roleVo:RoleVo;
    private aniCount:number = 0;
    private aniScale:number = 1;
    private isLoaded:boolean = false;
    constructor(){
        super();
    }
    public initRole(roleVo:RoleVo,scale?:number):void
    {
        this.roleVo = roleVo;
        if(scale)
        {
            this.aniScale = scale; 
        }
        this.isLoaded = false;
        this.skeletonAni = new Skeleton();
        this.skeletonAni.scale(this.aniScale,this.aniScale);
        this.skeletonAni.scaleX = this.roleVo.scaleX;
        this.addChild(this.skeletonAni);
        LayerManager.ins.addToLayer(this,LayerManager.ROLE_LAYER,false,true,false);
    }
    
    private onError()
    {
        
    }
    /**
     * 
     * @param aniID 动画id
     */
    public aniPlay(aniID:number,loop?:boolean,laterTime?:number,caller?:any,method?:Function)
    {

        if(this.isLoaded)
        {   
            loop = loop ? false : true; 
            aniID = aniID % this.aniCount;
             //>= aniCount默认播放第一个动画
            if(this.skeletonAni)
            {
                this.skeletonAni.play(aniID,loop);
                if(laterTime && caller && method)
                {
                    Laya.timer.once(laterTime,caller,method);
                }
                // console.log("播放动画名字："+ this.skeletonAni.getAniNameByIndex(aniID));
            }
        }
        else
        {
            this.skeletonAni.load("res/outside/anim/role/role"+this.roleVo.id+"/"+ this.roleVo.id +".sk",new Laya.Handler(this,this.loadCompleted,[aniID]));
        }
    }
    
    private loadCompleted(ind) {
        this.isLoaded = true;
        this.aniCount = this.skeletonAni.getAnimNum();
        this.aniPlay(ind);
        // var text:Laya.Label = new Laya.Label();
        // text.x = -60;
        // text.y = -180;
        // text.fontSize = 24;
        // text.color = "#ff0000";
        // text.text = this.roleVo.name;
        // this.addChild(text);
        // console.log("播放动画名字："+this.aniCount);
    }
    /**设置显示层级 */
    public setShowIndex(ind:number):void
    {
        var layer:MyLayer = LayerManager.ins.getLayer(LayerManager.ROLE_LAYER);
        if(ind >= 0 && ind < layer.numChildren)
        {
             layer.setChildIndex(this,ind);
        }
    }

    public run():void
    {
        this.aniPlay(RoleAniIndex.MOVE);
    }
    public setVisible(bool:boolean):void
    {
        Laya.timer.once(1000,this, this.setVis,[bool]);
    }
    private setVis(bool):void
    {
        this.visible = bool;
    }
    public dispose():void
    {
        // if(this.roleVo.isEnemy)
        // {
            this.removeSelf();
            if(this.skeletonAni)
            {
                this.skeletonAni.destroy();
            }
            this.skeletonAni = null;
            // this.roleVo = null;
        // }
    }

}