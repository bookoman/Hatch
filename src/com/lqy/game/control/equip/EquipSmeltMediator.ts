/*
* 装备熔炼
*/
class EquipSmeltMediator extends BaseMediator{
    private aniPoss:Array<Point> = [new Point(160,336),new Point(160,491),new Point(490,184),
                                new Point(490,339),new Point(490,501),new Point(160,181)]
    constructor(assetsUrl = null,view = null){
        super(assetsUrl,view);
    }
    protected initView():void
    {  
        this.view = new ui.equip.SmeltViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        super.initView();
        // this.ronglian();
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK,this,this.onBtnCloseClick);
        this.view.btnSmelt.on(Laya.Event.CLICK,this,this.onBtnSmeltClick);
    }
    protected removeEvents():void
    {
        this.view.btnClose.off(Laya.Event.CLICK,this,this.onBtnCloseClick);
        this.view.btnSmelt.off(Laya.Event.CLICK,this,this.onBtnSmeltClick);
    }

    public dispose():void
    {
        if(this.view)
        {
            var ani:Laya.Animation;
            for(var i = 1;i <= 6; i++)
            {
                ani = this.view["ani"+i];
                Laya.Tween.clearAll(ani);
            }
            Laya.Tween.clearAll(this.view.ainrong);
            Laya.Tween.clearAll(this.view.smeltNum);
        }
        super.dispose();
    }

    private onBtnCloseClick(e):void
    {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP);
        this.dispose();
    }
    private onBtnSmeltClick(e):void
    {
        this.ronglian();
    }
    private ronglian(): void {

        this.initEffect();

        var rlX = 318
        var rlY = 308;

        Tween.to(this.view.ani1, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani1.removeSelf();
            this.view.ani1.visible = false;
        }));
        Tween.to(this.view.ani2, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani2.removeSelf();
            this.view.ani2.visible = false;
        }));
        Tween.to(this.view.ani3, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani3.removeSelf();
            this.view.ani3.visible = false;
        }));
        Tween.to(this.view.ani4, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani4.removeSelf();
            this.view.ani4.visible = false;
        }));
        Tween.to(this.view.ani5, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani5.removeSelf();
            this.view.ani5.visible = false;
        }));
        Tween.to(this.view.ani6, { x: rlX, y: rlY }, 500, null, Handler.create(this, function () {
            // this.view.ani6.removeSelf();
            this.view.ani6.visible = false;
            this.view.ainrong.visible = true;
            this.view.ainrong.on(Laya.Event.COMPLETE, this, function () {
                // this.view.ainrong.removeSelf();
                this.view.ainrong.visible = false;
                this.addNumber();
            });
            this.view.ainrong.play(0, false);
        }));


    }
    
    private initEffect():void
    {
        
        var ani:Laya.Animation;
        var point:Point;
        for(var i = 1;i <= 6; i++)
        {
            ani = this.view["ani"+i];
            point = this.aniPoss[i - 1];
            ani.pos(point.x,point.y);
            ani.visible = true;
        }
    }

    private addNumber():void
    {
        this.view.displyLable.text = "2000";
        this.view.smeltNum.visible = true;
        this.view.smeltNum.text = "1350";
        Tween.to(this.view.smeltNum, { y: 101, alpha: 0 }, 1000, null, Handler.create(this, function () {
            this.view.smeltNum.removeSelf();
            this.displaySmeltNum();
        }));
    }
    public displaySmeltNum() {
        this.view.displyLable.visible = true;
        this.view.displyLable.color = "#FFFFFF";
        this.view.displyLable.text = "3350";
    }

}