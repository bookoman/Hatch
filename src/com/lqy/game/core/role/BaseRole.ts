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
    private showPriority:number = 0;
    constructor(){
        super();
    }
    public initRole(roleVo:RoleVo,showPriority:number,scale?:number,parentDis?:Laya.Sprite):void
    {
        this.roleVo = roleVo;
        this.showPriority = showPriority;
        if(scale)
        {
            this.aniScale = scale; 
        }
        this.isLoaded = false;
        this.skeletonAni = new Skeleton();
        this.skeletonAni.scale(this.aniScale,this.aniScale);
        this.skeletonAni.scaleX = this.roleVo.scaleX * this.aniScale;
        this.addChild(this.skeletonAni);
        if(parentDis)
        {
            parentDis.addChild(this);
        }
        else
        {
            LayerManager.ins.addToLayer(this,LayerManager.ROLE_LAYER,false,true,false);
        }
        this.visible = true;
    }
    
    public showFloatFont(blood:number):void
    {
        var floatFontTip:FloatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if(floatFontTip)
        {
            floatFontTip.setAttribute(40,"#ff0000");
            floatFontTip.show("-"+blood,this,-50,-180,1.0,80);
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
            loop = loop === undefined ? true : false; 
            aniID = aniID % this.aniCount;
             //>= aniCount默认播放第一个动画
            if(this.skeletonAni)
            {
                this.skeletonAni.play(aniID,loop,false);
                if(laterTime && caller && method)
                {
                    Laya.timer.once(laterTime,caller,method,null,false);
                }
                // if(this.roleVo.name == "蓝狼"){
                //     console.log("播放动画名字："+ this.skeletonAni.getAniNameByIndex(aniID),this.visible);
                // }
            }
        }
        else
        {
            //分帧加载
            Laya.timer.frameOnce(this.showPriority * 6,this,this.skeletonAniLoad,[aniID,loop]);
        }
    }
    private skeletonAniLoad(aniID,loop):void
    {
        this.skeletonAni.load("res/outside/anim/role/role"+this.roleVo.id+"/"+ this.roleVo.id +".sk",new Laya.Handler(this,this.loadCompleted,[aniID,loop]));
    }
    
    private loadCompleted(ind,loop) {
        if(!this.isLoaded)
        {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(ind,loop);
            this.initComponets();
            // console.log("播放动画名字："+this.aniCount);
        }
    }
    private initComponets():void
    {
        //血条
        this.roleBloodBar = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ROLE_BLOOD_BAR);
        this.roleBloodBar.scaleX = 0.5;
        this.roleBloodBar.x = -60;
        this.roleBloodBar.y = -180;
        this.roleBloodBar.init();
        this.addChild(this.roleBloodBar);
        //名字
        this.LblName = new Laya.Label();
        this.LblName.width = 114;
        this.LblName.x = this.roleBloodBar.x;
        this.LblName.y = this.roleBloodBar.y - 30;
        this.LblName.fontSize = 24;
        this.LblName.color = "#00FF99";
        this.LblName.align = "center";
        this.LblName.text = this.roleVo.name;
        this.addChild(this.LblName);
    }
    public setBlood(value:number):void
    {
        if(this.roleBloodBar)
        {
            this.roleBloodBar.setProgress(value);
        }
    }
    /**设置显示层级 */
    public setShowIndex(ind:number):void
    {
        if(this.parent && ind >= 0){
            this.parent.setChildIndex(this,ind);
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
        //延迟回调判断，复活就设置隐藏
        if(this.roleVo && this.roleVo.isDeath)
        {
            this.visible = bool;
        }
    }
    public dispose():void
    {
        this.parent.setChildIndex(this,0);
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
        this.roleVo = null;
    }
    public moveByMap(speed:number):void
    {

    }

}