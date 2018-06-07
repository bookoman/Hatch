/*
* UI界面角色模型
*/
class UIRole{
    private skeletonAni:Skeleton = null;
    private isLoaded:boolean = false;
    private aniCount:number = 0;
    public roleID:string;
    private disParent;
    constructor(roleID:string){
        this.roleID = roleID;
        this.isLoaded = false;

        this.skeletonAni = new Skeleton();
    }
    public addParent(parent,rx:number,ry:number,sx?:number,sy?:number):void
    {
        this.disParent = parent;
        if(sx === undefined)
            sx = -1;
        if(sy === undefined)
            sy = 1;
        this.skeletonAni.scale(sx,sy);
        this.skeletonAni.pos(rx,ry);
        this.disParent.addChild(this.skeletonAni);
        this.aniPlay(RoleAniIndex.STAND);
    }
    /**销毁 */
    public dispose():void
    {
        if(this.skeletonAni)
        {
            if(this.skeletonAni.parent)
            {
                this.skeletonAni.parent.removeChild(this.skeletonAni);
            }
            this.skeletonAni.destroy();
            this.skeletonAni = null;
        }
        this.disParent = null;
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
            if(this.roleID == "10006")
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