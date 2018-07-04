/*
* 帧动画
*/
class FrameAnimation{
     /** */
    public animation:Laya.Animation;
    private isLoop:boolean = false;
    private scale:number = 1;
    private isSkill:boolean = false;
    private isLoaded:boolean;
    private modelId:string;
    private caller:any;
    private callBack:Function;
    // private isAutoRemove:boolean;
    constructor(disParent:Laya.Sprite,tx:number,ty:number,isSkill?:boolean,scale?:number,isAutoRemove?:boolean){
        this.scale = scale === undefined ? 1 : scale;
        this.isSkill = isSkill === undefined ? false : isSkill;
        // this.isAutoRemove = isAutoRemove === undefined ? true : isAutoRemove;
        this.animation = new Laya.Animation;
        tx = tx === undefined ? 0 : tx;
        ty = ty === undefined ? 0 : ty;
        this.animation.pos(tx,ty);
        this.animation.scale(this.scale,this.scale);
        // if(isSkill){
        //     var ind:number = (disParent as BaseRole).getSkillEffectInd();
        //     disParent.addChildAt(this.animation,ind);
        // }
        // else{
        //     disParent.addChild(this.animation);
        // }
        disParent.addChild(this.animation);
        this.isLoaded = false;
        Laya.loader.on("error"/**Laya.Event.ERROR*/,this,this.onLoadAniError);

    }
    
    public playAni(modelId:any,isLoop?:boolean,caller?:any,callBack?:Function):void
    {
        this.isLoop = isLoop === undefined ? false : isLoop;
        
        this.modelId = modelId;
        this.caller = caller;
        this.callBack = callBack;
        //测试技能
        // if(this.isSkill == true)
        //     this.modelId = "SK_0101";

        if(this.isLoaded)
        {
            var aniUrl:string = this.isSkill == true ? "res/ani/skills/"+this.modelId+".ani" : "res/ani/"+this.modelId+".ani";
            this.animation.loadAnimation(aniUrl);
            this.animation.play();
        }
        else
        {
            if(!this.isLoop)
            {
                this.animation.on("complete"/**Laya.Event.COMPLETE*/,this,this.onOncePlayComplete);
            }
            
            this.animation.loadAtlas("res/atlas/ani/"+this.modelId+".atlas",Laya.Handler.create(this,this.onLoaded));
        }
    }
    public setXY(tx:number,ty:number):void
    {
        if(this.animation)
        {
            this.animation.pos(tx,ty);
        }
    }
    public dispose():void
    {
        Laya.loader.off("error"/**Laya.Event.ERROR*/,this,this.onLoadAniError);
        this.caller = null;
        this.callBack = null;
        // if(this.animation)
        // {
            this.animation.off("complete",this,this.onOncePlayComplete);
            this.animation.removeSelf();
            this.animation.destroy();
            this.animation = null;
        // }
        
    }
    private onLoaded():void
    {
        if(!this.isLoaded)
        {
            this.isLoaded = true;
            this.playAni(this.modelId,this.isLoop,this.caller,this.callBack);
            // var bound:Rectangle = this.animation.getBounds();
            // this.animation.pivotX = bound.width/2;
            // this.animation.pivotY = bound.height;
            // this.animation.scale(0.5,0.5);
        }
    }
    private onOncePlayComplete(e):void
    {
        if(this.caller && this.callBack)
        {
            this.callBack.call(this.caller);
        }
        // if(this.isAutoRemove)
        this.dispose();
    }
    private onLoadAniError(e):void
    {
        // console.log("。。。。。。。。。。"+ e);
        if(e.indexOf(this.modelId+".ani") != -1)
        {
            this.modelId = "SK_0101";
            var aniUrl:string = this.isSkill == true ? "res/ani/skills/"+this.modelId+".ani" : "res/ani/"+this.modelId+".ani";
            this.animation.loadAtlas("res/atlas/ani/"+this.modelId+".atlas",Laya.Handler.create(this,this.onLoaded));
        }
    }
}