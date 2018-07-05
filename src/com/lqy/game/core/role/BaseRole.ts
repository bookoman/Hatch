import Skeleton = Laya.Skeleton; 
/*
* 角色
*/
class BaseRole extends Laya.Sprite{
    private templet:Laya.Templet = null;
    protected skeletonAni:Skeleton = null;
    public baseRoleVo:BaseRoleVo;
    public isLoaded:boolean;
    private aniCount:number = 0;
    private aniScale:number = 1;
    private LblName:Laya.Label = null;
    private roleBloodBar:RoleBloodBar = null;
    private showPriority:number = 0;
    private clipShadow:Laya.Image;

    private aniId:number;
    private loop:boolean;
    private caller:any;
    private method:Function;
    private defRole:BaseRole;
    private aniUrl:string;
    private aniWidth:number;
    private aniHeight:number;
    private showBloodBar:boolean = false;
    constructor(){
        super();

        this.clipShadow = new Laya.Image("comp/img_shadow.png");
        this.clipShadow.height = 30;
        this.clipShadow.x = -this.clipShadow.width / 2;
        this.clipShadow.y = -this.clipShadow.height / 2;
        this.clipShadow.alpha = 0.2;
        this.addChild(this.clipShadow);

        // EventManager.ins.addEvent(EventManager.TEST_CHANGE_ROLE_SCALE,this,this.testScale);
    }
    // private testScale(ary):void
    // {
    //     var roleID = ary[0];
    //     var sca = ary[1];
    //     if(this.roleVo && this.roleVo.id == roleID)
    //     {
    //         var s:number = this.roleVo.isEnemy ? 1 : -1;
    //         this.skeletonAni.scaleX = s * sca;
    //         this.skeletonAni.scaleY = sca;
    //         var bound = this.skeletonAni.getBounds(); // 加载完毕之后才能拿到有效的bounds
    //         console.log(this.roleVo.name,bound.width,bound.height);
    //     }
    // }
    public initRole(baseRoleVo:BaseRoleVo,showPriority:number,scale?:number,parentDis?:Laya.Sprite,showBloodBar?:boolean):void
    {
        

        this.baseRoleVo = baseRoleVo;
        this.showPriority = showPriority;
        this.showBloodBar = showBloodBar === undefined ? false : showBloodBar;
        if(scale)
        {
            this.aniScale = scale; 
        }
        this.isLoaded = false;

        this.templet = new Laya.Templet();
        this.templet.on(Laya.Event.COMPLETE, this, this.loadCompleted);
        this.templet.on(Laya.Event.ERROR, this, this.skeletonLoadError);

        // this.skeletonAni = new Skeleton();
        // this.skeletonAni.scale(this.aniScale,this.aniScale);
        // this.skeletonAni.scaleX = this.baseRoleVo.scale * this.aniScale;
        // this.addChild(this.skeletonAni);

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
    
    public showFloatFont(tipString:string):void
    {
        tipString = tipString === undefined ? "" : tipString;
        var floatFontTip:FloatFontTips = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.FLOAT_FONT_TIPS);
        if(floatFontTip)
        {
            floatFontTip.setAttribute(40,"#ff0000");
            floatFontTip.show(tipString,this,-30,-200,0.5,40,80,this.baseRoleVo.isEnemy);
        }
    }
    
    /**
     * 
     * @param aniID 动画id
     */
    public aniPlay(aniID:number,loop?:boolean,caller?:any,method?:Function,defRole?:BaseRole)
    {
        this.aniId = aniID;
        this.loop = loop;
        this.caller = caller;
        this.method = method;
        this.defRole = defRole;

        if(this.isLoaded)
        {   
            
            loop = loop === undefined ? true : loop; 
            aniID = aniID % this.aniCount;

             //>= aniCount默认播放第一个动画
            if(this.skeletonAni)
            {
                Laya.loader.on(/*laya.events.Event.ERROR*/"error",this,this.skeletonLoadError);
                // console.log("前........",this.baseRoleVo.name,aniID);
                this.skeletonAni.player.on(Laya.Event.COMPLETE,this,this.onPlayCompleted);
                var speedTime:number = GameDataManager.ins.isChallengeBoss ? GameConfig.BATTLE_ADDSPEED_TIMES : 1;
                this.skeletonAni.playbackRate(speedTime);
                this.skeletonAni.play(aniID,loop);

                // console.log("........"+aniID);
            }

        }
        else
        {
            Laya.timer.frameOnce(this.showPriority * 6,this,this.skeletonAniLoad,null,false);
        }
    }
    public getSkillEffectInd():number
    {
        if(this.skeletonAni)
        {
            return this.getChildIndex(this.skeletonAni);
        }
        return 0;
    }
    
    /**播放一次动画回调 */
    private onPlayCompleted():void
    {
        // console.log("后........",this.baseRoleVo.name,this.aniId);
        if(this.aniId == RoleAniIndex.ATTACK && GameDataManager.showModuleViewInd == GameButtomTabIndex.BATTLE)
        {
            SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
        }

        this.skeletonAni.player.off(Laya.Event.COMPLETE,this,this.onPlayCompleted);
        if(this.caller && this.method)
        {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            this.method.call(this.caller,[this,this.defRole]);
        }
    }

    private skeletonAniLoad():void
    {
        //分帧加载
        if(this.baseRoleVo)
        {
            this.aniUrl = "res/outside/spine/role/"+this.baseRoleVo.modelId+"/"+ this.baseRoleVo.modelId +".sk";
            // this.aniUrl = "res/outside/anim/role/sanjiaolong001/sanjiaolong001.sk";
            // this.skeletonAni.load(this.aniUrl,Laya.Handler.create(this,this.loadCompleted));
            this.templet.loadAni(this.aniUrl);
            
        }
    }
    
    private loadCompleted() {
        
        // var bound = this.skeletonAni.getBounds(); // 加载完毕之后才能拿到有效的bounds
        // console.log(this.roleVo.id,bound.width,bound.height);
        if(!this.isLoaded)
        {
            this.skeletonAni = this.templet.buildArmature(2);
            this.skeletonAni.scale(this.aniScale * this.baseRoleVo.scale,this.baseRoleVo.scale);
            this.addChild(this.skeletonAni);

            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(this.aniId,this.loop,this.caller,this.method);
            // Laya.timer.once(100,this,this.initComponets);
            if(this.showBloodBar){
                this.initComponets();
            }
        }
    }
    private initComponets():void
    {
        // var bound:Rectangle = this.skeletonAni.getSelfBounds();
        // this.aniWidth = bound.width + Math.abs(bound.x);
        // this.aniHeight = bound.height + Math.abs(bound.y);
        // console.log(this.baseRoleVo.name,bound);
        //血条
        // this.roleBloodBar = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ROLE_BLOOD_BAR);
        this.roleBloodBar = new RoleBloodBar();
        this.roleBloodBar.visible = true;
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
        this.LblName.text = this.baseRoleVo.name;
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
        // Laya.timer.once(1000 / GameConfig.BATTLE_ADDSPEED_TIMES,this, this.setVis,[bool]);
        Laya.timer.once(1000,this, this.setVis,[bool]);
    }
    private setVis(bool):void
    {
        //延迟回调判断，复活就设置隐藏
        if(this.baseRoleVo && this.baseRoleVo.isDeath)
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
            Laya.loader.clearRes(this.skeletonAni.url);
            this.skeletonAni.destroy();
        }
        this.skeletonAni = null;
        if(this.LblName)
        {
            this.LblName.removeSelf();
            this.LblName = null;
        }
        if(this.roleBloodBar)
        {
            this.roleBloodBar.removeSelf();
            this.roleBloodBar = null;
            // ObjectPoolUtil.stillObject(ObjectPoolUtil.ROLE_BLOOD_BAR,this.roleBloodBar);
        }
        this.baseRoleVo = null;
    }
    public moveByMap(speed:number):void
    {

    }
    /**加载出错用默认资源 */
    private skeletonLoadError(url:string):void
    {
        if(url.indexOf(this.aniUrl) != -1)
        {
            if(this.templet)
            {
                //释放老资源
                this.templet.off(Laya.Event.COMPLETE, this, this.loadCompleted);
                this.templet.off(Laya.Event.ERROR, this, this.skeletonLoadError);
                this.templet.dispose();
                this.templet = null;
            }
            this.templet = new Laya.Templet();
            this.templet.on(Laya.Event.COMPLETE, this, this.loadCompleted);
            this.templet.on(Laya.Event.ERROR, this, this.skeletonLoadError);

            this.aniUrl = "res/outside/anim/role/"+GameConfig.HERO_DEFAULT_ANI_MODELID+"/"+ GameConfig.HERO_DEFAULT_ANI_MODELID +".sk";
            this.templet.loadAni(this.aniUrl);
            // this.skeletonAni.load(url,Laya.Handler.create(this,this.loadCompleted));
        }
    }

}