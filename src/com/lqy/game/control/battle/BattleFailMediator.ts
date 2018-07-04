/*
* 战斗失败界面
*/
class BattleFailMediator extends BaseMediator{
    private angle:number = 0;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.battle.BattleFailViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.TIP_LAYER,false,true,true);

        super.initView();
        SoundsManager.ins.setMusicVolume(0.1);
        SoundsManager.ins.playerSoundByEnum(SoundEffectType.FAIL,1,Laya.Handler.create(this,this.soundPlayComplete));
    }
    private soundPlayComplete():void
    {
        SoundsManager.ins.setMusicVolume(1);
    }
    protected addEvents():void
    {
        this.view.bg.on(Laya.Event.CLICK,this,this.onMaskClick);
        
        this.view.btnGiveup.on(Laya.Event.CLICK,this,this.onBtnGiveupClick);
        this.view.btnBattleAgain.on(Laya.Event.CLICK,this,this.onBtnBattleAgain);

        Laya.timer.loop(20,this,this.rotateGray);
    }
    protected removeEvents():void
    {
        this.view.bg.off(Laya.Event.CLICK,this,this.onMaskClick);

        this.view.btnGiveup.off(Laya.Event.CLICK,this,this.onBtnGiveupClick);
        this.view.btnBattleAgain.off(Laya.Event.CLICK,this,this.onBtnBattleAgain);

        Laya.timer.clear(this,this.rotateGray);
    }

    private onMaskClick(e):void
    {
        this.dispose();
    }
    private onBtnGiveupClick(e):void
    {
        this.dispose();
    }
    private onBtnBattleAgain(e):void
    {

    }
    
    private rotateGray():void
    {
        this.angle++;
        if(this.angle > 360)
            this.angle = 0;
        if(this.view)
            this.view.imgGray.rotation = this.angle;
    }
    public dispose():void
    {
        super.dispose();
    }
}