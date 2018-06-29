/*
* 图集动画
*/
class AtlasAnimation{
    /** */
    private animation:Laya.Animation;
    private isLoaded:boolean;
    constructor(){
        this.animation = new Laya.Animation;
        this.isLoaded = false;
    }
    public playAni(modelId:string):void
    {
        if(this.isLoaded)
        {
            
        }
        else
        {
            this.animation.loadAtlas("res/atlas/role.atlas",Laya.Handler.create(this,this.onLoaded));
        }
    }
    private onLoaded():void
    {
        this.isLoaded = true;

    }
}