/*
* 动画管理器
*/
class AnimationManager{
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

    
}