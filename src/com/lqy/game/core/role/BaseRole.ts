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
    private LblName:Laya.Label = null;
    private roleBloodBar:RoleBloodBar = null;
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
    
    public showFloatFont(blood:number):void
    {
        var floatFontTip:FloatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if(floatFontTip)
        {
            floatFontTip.setAttribute(40,"#ff0000");
            floatFontTip.show("-"+blood,this,-50,-180,0.5,50);
        }
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
        this.initComponets();
        // console.log("播放动画名字："+this.aniCount);
    }
    private initComponets():void
    {
        //血条
        this.roleBloodBar = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ROLE_BLOOD_BAR);
        this.roleBloodBar.x = -60;
        this.roleBloodBar.y = -180;
        this.addChild(this.roleBloodBar);
        //名字
        this.LblName = new Laya.Label();
        this.LblName.x = this.roleBloodBar.x;
        this.LblName.y = this.roleBloodBar.y - 30;
        this.LblName.fontSize = 24;
        this.LblName.color = "#000000";
        this.LblName.text = this.roleVo.name;
        this.addChild(this.LblName);
    }
    public setBlood(value:number):void
    {
        this.roleBloodBar.setProgress(value);
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
            if(this.LblName)
            {
                this.LblName.removeSelf();
            }
            if(this.roleBloodBar)
            {
                this.roleBloodBar.removeSelf();
                ObjectPoolUtil.stillObject(ObjectPoolUtil.ROLE_BLOOD_BAR,this.roleBloodBar);
            }
            // this.roleVo = null;
        // }
    }

}