/*
* 阵型格子备份
*/
class LineupGridMediatorBackups extends BaseMediator{
    private skeletonAni:Skeleton = null;
    private isLoaded:boolean = false;
    private aniCount:number = 0;
    public roleID:string;
    private caller:any;
    private clickCall:Function;
    constructor(assetsUrl?:any,view?:any,caller?:any,clickCall?:Function){
        super(assetsUrl,view);
        this.caller = caller;
        this.clickCall = clickCall;
    }
    protected initView():void
    {
        super.initView();
    }
    protected addEvents():void
    {
        // this.view.on(Laya.Event.CLICK,this,this.onSkeletonAniClick);
        this.view.on(Laya.Event.CLICK,this,this.onViewClick);
    }
    protected removeEvents():void
    {
        // this.view.off(Laya.Event.CLICK,this,this.onSkeletonAniClick);
        this.view.off(Laya.Event.CLICK,this,this.onViewClick);
    }
    
    public getView():ui.lineup.LineupGridViewUI
    {
        return this.view;
    }
    public setUpHero(roleID:string):void
    {
        if(roleID == this.roleID)
        {
            return;
        }
        this.roleID = roleID;
        if(this.skeletonAni == null)
        {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.scale(-1,1);
            this.skeletonAni.pos(this.view.clipShadow.width/2,this.view.clipShadow.height/2);
            this.view.addChild(this.skeletonAni);
        }
        this.isLoaded = false;
        this.aniPlay(RoleAniIndex.STAND);
    }

    public revokeUpHero(roleID:string):void
    {

    }
    public setClipShadowIndex(index:number):void
    {
        this.view.clipShadow.index = index;
    }
    private onViewClick(e):void
    {
        if(this.caller && this.clickCall)
        {
            this.clickCall.call(this.caller,this);
        }
    }
    
    
    // private onSkeletonAniClick(e):void
    // {
    //     this.aniPlay(RoleAniIndex.ATTACK,true,this,function():void{
    //         this.aniPlay(RoleAniIndex.STAND,true);
    //     });
    // }
    
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
                var url:string = "res/outside/anim/role/role"+this.roleID+"/"+ this.roleID +".sk";
                if(this.roleID == "20005")
                {
                    url = "res/outside/anim/role/role"+this.roleID+"/alien-pro.sk";
                }
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