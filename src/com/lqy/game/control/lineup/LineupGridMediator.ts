/*
* 阵型格子
*/
class LineupGridMediator extends BaseMediator{
    private skeletonAni:Skeleton = null;
    private isLoaded:boolean = false;
    private aniCount:number = 0;
    public roleID:string;
    private caller:any;
    private clickCall:Function;
    private iconView:IconView;
    private mapGridPoint:Object;
    constructor(assetsUrl?:any,view?:any,caller?:any,clickCall?:Function,mapGridPoint?:Object){
        super(assetsUrl,view);
        this.caller = caller;
        this.clickCall = clickCall;
        this.mapGridPoint = mapGridPoint;
    }
    protected initView():void
    {
        super.initView();
    }
    protected addEvents():void
    {
        this.view.on(Laya.Event.CLICK,this,this.onViewClick);
    }
    protected removeEvents():void
    {
        this.view.off(Laya.Event.CLICK,this,this.onViewClick);
    }
    
    public getView():ui.lineup.LineupGridViewUI
    {
        return this.view;
    }
    public setUpHero(roleID:string,iconView?:IconView):void
    {
        if(roleID == this.roleID)
        {
            return;
        }
        if(this.iconView)
        {
            this.iconView.setSelect(false);
        }
        this.roleID = roleID;
        this.iconView = iconView;
        this.isLoaded = false;
        if(this.skeletonAni == null)
        {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.scale(-1,1);
            this.skeletonAni.pos(this.view.clipShadow.width/2,this.view.clipShadow.height/2);
        }
        this.view.addChild(this.skeletonAni);
        this.aniPlay(RoleAniIndex.STAND);
    }

    public revokeUpHero():void
    {
        this.roleID = null;
        if(this.skeletonAni && this.skeletonAni.parent)
        {
            this.skeletonAni.parent.removeChild(this.skeletonAni);
        }
        if(this.iconView)
        {
            this.iconView.setSelect(false);
            this.iconView = null;
        }
    }
    /**设置阴影选中 */
    public setClipShadowIndex(index:number):void
    {
        this.view.clipShadow.index = index;
    }
    public setLineupIDLable(lineupID:number):void
    {
        this.view.lblLineupID.text = lineupID;
    }

    public dispose():void
    {
        super.dispose();
        if(this.skeletonAni)
        {
            if(this.skeletonAni.parent)
            {
                this.skeletonAni.parent.removeChild(this.skeletonAni);
            }
            this.skeletonAni.destroy();
            this.skeletonAni = null;
        }
        this.caller = null;
        this.clickCall = null;
        this.iconView = null;
    }
   
    private onViewClick(e):void
    {
        if(this.caller && this.clickCall)
        {
            this.clickCall.call(this.caller,this);
        }
    }
    
     /**
     * 
     * @param aniID 动画id
     */
    private aniPlay(aniID:number,loop?:boolean,caller?:any,method?:Function)
    {
        if(this.isLoaded)
        {   
            /**测试自己龙动作 */
            if(this.roleID == "20005")
            {
                if(aniID == RoleAniIndex.ATTACK)
                    aniID = NewRoleAniIndex.ATTACK;
                else if(aniID == RoleAniIndex.INJURED)
                    aniID = NewRoleAniIndex.INJURED;
                else if(aniID == RoleAniIndex.DEATH)
                    aniID = NewRoleAniIndex.DEATH;
                else if(aniID == RoleAniIndex.MOVE)
                    aniID = NewRoleAniIndex.MOVE;
                else if(aniID == RoleAniIndex.STAND)
                    aniID = NewRoleAniIndex.STAND;
            }
            loop = loop === undefined ? true : loop; 
            aniID = aniID % this.aniCount;

             //>= aniCount默认播放第一个动画
            if(this.skeletonAni)
            {
                
                this.skeletonAni.player.on(Laya.Event.COMPLETE,this,this.onPlayCompleted,[caller,method]);
                this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
                this.skeletonAni.play(aniID,loop);
            }

        }
        else
        {
            if(this.roleID)
            {
                var roleVo:RoleVo = ConfigManager.ins.getRoleVoByID(this.roleID);
                var url:string = "res/outside/anim/role/"+roleVo.modelId+"/"+ roleVo.modelId +".sk";
                this.skeletonAni.load(url,Laya.Handler.create(this,this.loadCompleted,[aniID,loop,caller,method]));
            }
        }
    }
    /**播放一次动画回调 */
    private onPlayCompleted(caller,method):void
    {
        this.skeletonAni.player.off(Laya.Event.COMPLETE,this,this.onPlayCompleted);
        if(caller && method)
        {
            // console.log(this.roleVo.name);
            this.skeletonAni.paused();
            method.call(caller);
        }
    }

    private loadCompleted(aniID,loop,caller,method) {
        
        if(!this.isLoaded)
        {
            this.isLoaded = true;
            this.aniCount = this.skeletonAni.getAnimNum();
            this.aniPlay(aniID,loop,caller,method);
        }
    }

    

}