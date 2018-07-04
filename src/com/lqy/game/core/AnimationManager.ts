/*
* 动画管理器
*/
class AnimationManager{
    /**雨特效 */
    private rainFrameAni:FrameAnimation = null;
    /**鼠标点击效果 */
    private mouseClickAni:Laya.Animation;
    constructor(){

    }
    private static _ins:AnimationManager = null;
    public static get ins():AnimationManager
    {
        if(this._ins == null)
        {
            this._ins = new AnimationManager();
        }
        return this._ins;
    }
    //******************弹框动画 */
    /**
     * 舞台中央弹框由小到大
     * @param view 
     * @param time 
     */
    public popCenterLittleToBig(view:any,time:number = 100):void
    {
        view.scaleX = 0;
        view.scaleY = 0;
        view.x = GameConfig.STAGE_WIDTH / 2;
        view.y = GameConfig.STAGE_HEIGHT / 2;
        var tx:number = GameConfig.STAGE_WIDTH - view.width >> 1;
        var ty:number = GameConfig.STAGE_HEIGHT - view.height >> 1;
        Laya.Tween.to(view,{scaleX:1,scaleY:1,x:tx,y:ty},time);
    }
    /**
     * 添加战场雨点特效
     * @param showTime 
     */
    public addBattleRainEffect(showTime:number):void
    {
        if(showTime <= 0)
        {
            return;
        }
        this.removeBattleRainEffect();
        var layer:MyLayer = LayerManager.ins.getLayer(LayerManager.BG_EFFECT_LAYER);
        this.rainFrameAni = new FrameAnimation(layer,GameConfig.STAGE_WIDTH/2,GameConfig.STAGE_HEIGHT/2);
        this.rainFrameAni.playAni("rain_01",true);
        Laya.timer.once(showTime * 1000,this,this.removeBattleRainEffect);
    }
    /**移除战场雨点特效 */
    public removeBattleRainEffect():void
    {
        if(this.rainFrameAni)
        {
            Laya.timer.clearAll(this.rainFrameAni);
            this.rainFrameAni.dispose();
            this.rainFrameAni = null;
        }
    }
    /**添加鼠标点击特效 */
    public addMouseClickEffect():void
    {
        var layer:MyLayer = LayerManager.ins.getLayer(LayerManager.TIP_LAYER);
        if(this.mouseClickAni == null)
        {
            this.mouseClickAni = new Laya.Animation();
            this.mouseClickAni.loadAnimation("res/ani/click.ani");
            this.mouseClickAni.on("complete"/**Laya.Event.COMPLETE*/,this,function(e):void{
                this.mouseClickAni.removeSelf();
            });
        }
        this.mouseClickAni.pos(layer.mouseX,layer.mouseY);
        layer.addChild(this.mouseClickAni);
        this.mouseClickAni.play()

    }



    
}