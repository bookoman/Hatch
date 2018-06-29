/*
* name;
*/
class RightFunctionButtons extends Laya.Sprite{
    private moveTime:number = 300;
    private btnW:number = 70;
    private btnH:number = 64;
    private btnPadding:number = 10;
    private upConfigs:Array<any> = [{name:"btnFarm",skin:"comp/button.png",lable:"农场"},
                                {name:"btnGraphtag",skin:"comp/button.png",lable:"图鉴"}];
    private leftConfigs:Array<any> = [{name:"btnLeft0",skin:"comp/button.png",lable:"测试0"},
                                    {name:"btnLeft1",skin:"comp/button.png",lable:"测试1"}];
    private upButtons:Array<Button>;
    private leftButtons:Array<Button>;
    private openBtn:Button;
    private isOpen:boolean = false;

    private curMediator:BaseMediator = null;
    constructor(){
        super();
        this.initComponets();
    }
    private static _ins:RightFunctionButtons = null;
    public static get ins():RightFunctionButtons
    {
        if(this._ins == null)
        {
            this._ins = new RightFunctionButtons();
        }
        return this._ins;
    }
    private initComponets():void
    {
        this.upButtons = [];
        this.leftButtons = [];
        
        var btn:Button;
        var config:any;
        for(var i = 0;i < this.upConfigs.length;i++)
        {
            config = this.upConfigs[i];
            btn = new Button(config.skin,config.lable);
            btn.name = config.name;
            btn.labelSize = 30;
            btn.width = this.btnW;
            btn.height = this.btnH;
            this.addChild(btn);
            this.upButtons.push(btn);
        }
        for(i = 0;i < this.leftConfigs.length;i++)
        {
            config = this.leftConfigs[i];
            btn = new Button(config.skin,config.lable);
            btn.name = config.name;
            btn.labelSize = 30;
            btn.width = this.btnW;
            btn.height = this.btnH;
            this.addChild(btn);
            this.leftButtons.push(btn);
        }

        this.openBtn = new Button("comp/button.png","+");
        this.openBtn.name = "openBtn";
        this.openBtn.labelSize = 30;
        this.openBtn.width = this.btnW;
        this.openBtn.height = this.btnH;
        this.addChild(this.openBtn);
        // this.openBtn.on(Laya.Event.CLICK,this,this.onOpenBtnClick);
        this.on(Laya.Event.CLICK,this,this.onViewClick);
    }
    private onViewClick(e):void
    {
        switch (e.target.name) {
            case "openBtn":
                this.onOpenBtnClick();
                break;
            case "btnFarm":
                this.onBtnFarm();
                // console.log("btnFarm");
                break;
            case "btnGraphtag":
                this.onBtnGraptag();
                // console.log("btnGraphtag");
                break;
            case "btnLeft0":
                console.log("btnLeft0");
                break;
            case "btnLeft1":
                console.log("btnLeft1");
                break;
            
        }
    }

    public show(disParent:Sprite):void
    {
        this.upButtons.forEach(btn => {
            btn.y = 0;
        });
        this.leftButtons.forEach(btn => {
            btn.x = 0;
        });
        this.openBtn.label = "+";

        this.x = GameConfig.STAGE_WIDTH - this.openBtn.width;
        this.y = GameConfig.STAGE_HEIGHT / 4 * 3;
        disParent.addChild(this);
        
    }
    public hide():void
    {
        this.removeSelf();
        this.dispose();
    }
    /**展开 */
    public open():void
    {
        var btn:Button;
        var ty:number;
        for(var i = 0;i < this.upButtons.length;i++)
        {
            btn = this.upButtons[i];
            ty = btn.y - (i + 1) * (this.btnH + this.btnPadding);
            Laya.Tween.to(btn,{y:ty},this.moveTime);
        }
        var tx:number;
        for(var i = 0;i < this.leftButtons.length;i++)
        {
            btn = this.leftButtons[i];
            tx = btn.x - (i + 1) * (this.btnW + this.btnPadding);
            Laya.Tween.to(btn,{x:tx},this.moveTime);
        }
    }
    /**关闭 */
    public close():void
    {
        var btn:Button;
        for(var i = 0;i < this.upButtons.length;i++)
        {
            btn = this.upButtons[i];
            Laya.Tween.to(btn,{y:this.openBtn.y},this.moveTime);
        }
        for(var i = 0;i < this.leftButtons.length;i++)
        {
            btn = this.leftButtons[i];
            Laya.Tween.to(btn,{x:this.openBtn.x},this.moveTime);
        }
    }
    private onOpenBtnClick():void
    {
        this.openBtn.disabled = true;
        Laya.timer.once(this.moveTime + 100,this,function():void{
            this.openBtn.disabled = false;
        })
        this.isOpen = !this.isOpen;
        var lbl:string = this.isOpen ? "-" : "+";
        if(this.isOpen)
        {
            lbl = "-";
            this.open();
        }
        else
        {
            lbl = "+";
            this.close();
        }
        this.openBtn.label = lbl;
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

    private dispose():void
    {
        if(this.curMediator)
        {
            this.curMediator.dispose();
            this.curMediator = null;
        }
    }

}