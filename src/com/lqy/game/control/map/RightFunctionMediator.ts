/*
* 地图右边功能视图
*/
class RightFunctionMediator extends BaseMediator{
    private curMediator:BaseMediator = null;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        Laya.Tween.to(this.view,{x:this.view.x - this.view.width},500);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnGraphtag.on(Laya.Event.CLICK,this,this.onBtnGraptag);
        this.view.btnFarm.on(Laya.Event.CLICK,this,this.onBtnFarm);
    }
    protected removeEvents():void
    {
        this.view.btnGraphtag.off(Laya.Event.CLICK,this,this.onBtnGraptag);
        this.view.btnFarm.off(Laya.Event.CLICK,this,this.onBtnFarm);
    }
    private onBtnGraptag():void
    {
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry:Array<Object> = [
            {url:"unpack/graphtag/grahtagjiatu.png",type:Loader.IMAGE},
            {url:"res/atlas/graphtag.atlas",type:Loader.ATLAS}
        ];
        this.curMediator = new GraphtagMediator(resAry);
    }
    private onBtnFarm():void
    {
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry:Array<Object> = [
            {url:"unpack/farm/bg.png",type:Loader.IMAGE},
            {url:"unpack/farm/bgzhongzhi.png",type:Loader.IMAGE},
            {url:"unpack/farm/caijimap.png",type:Loader.IMAGE},
            {url:"unpack/farm/huawen.png",type:Loader.IMAGE},
            {url:"res/atlas/farm.atlas",type:Loader.ATLAS}
        ];
        this.curMediator = new FarmMediator(resAry);
    }
    public dispose():void
    {
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        super.dispose();
    }
}