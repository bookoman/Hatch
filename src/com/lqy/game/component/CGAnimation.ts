/*
* CG动画
*/
class CGAnimation extends Sprite{
    

    private resAry:Array<string> = ["unpack/cgani/img_page1.png",
            "unpack/cgani/img_page2.png","unpack/cgani/img_page3.png","unpack/cgani/img_page4.png",
            "unpack/cgani/img_page5.png","unpack/cgani/img_page6.png","unpack/cgani/img_page7.png",
            "unpack/cgani/img_page8.png","unpack/cgani/img_page9.png","unpack/cgani/img_page10.png",
            "unpack/cgani/img_page11.png","unpack/cgani/img_page12.png","unpack/cgani/img_left.png",
            "unpack/cgani/img_right.png"];
    private fontsAry:Array<string> = [
    "在极其极其遥远的远古时代，海面平静如常......",
    "转瞬间，天空骤然色变......",
    "在一阵强烈的电磁风暴过后，一群人类突然出现在茂密的丛林中。",
    "这些人在经历了绝望、挣扎之后，被迫开始在这个时代扎根生存，他们自称为穿越者。",
    "随着远古大陆上穿越者越来越多，这些人终于安定下来，并联合起来组成了部落。穿越者的部落在远古大陆上艰难的生存着......",
    "直到......",
    "在付出了惨痛的代价后，穿越者们终于成功的驯化了部分恐龙，而且在经过了数代人的探索之后，他们更是总结出了一套完整的驯龙和育恐龙体系。",
    "在恐龙的协助下，穿越者们在异界渐渐站稳了脚跟，修建了村落，然后也渐渐形成了新的信仰和习俗。每个刚穿越而来的人，都会到村落外抓自己的第一条龙，以证明自己在部落中的价值。",
    "一个偶然的机会，几个穿越者在一个不知名的山谷后面发现了一片上古遗迹......",
    "他们在遗迹中找到了一种神秘的液体。很快人们便发现将这种液体以符号的形式涂抹在恐龙身上，能很大程度的激发恐龙身上的内在潜力！穿越者们欣喜的将这种恐龙身上的符号纹样取名为战纹！",
    "战纹的发现进一步提高了恐龙的实力，使得穿越众有能力和精力向外扩张部落的领地。部落的领地越来越大，穿越众的生活越来越好，一切都欣欣向荣的发展着向。",
    "然而好景不长，穿越者们在向东探索的时候发现了远古大陆的原住民。和平还是战争?生存还是灭亡?最终冲突还是爆发了......"
    ];
    private imgPageBg:Laya.Image;
    private imgPage:Laya.Image;
    private imgPagePanel:Laya.Panel;
    private aniArrow:Laya.Animation;
    private aniSkip:Laya.Animation;
    public sprPrinting:Sprite;
    private lblPrint:Laya.Label;
    private lblNotice:Laya.Label;
    public pageId:number = 0;
    private fontInd:number = 0;
    private fontString:string;
    private pagePlayComplete:boolean = false;
    private printFontComplete:boolean = false;
    private caller:any;
    private callBack:Function;

    constructor(){
        super();
        // SoundsManager.ins.playerMusicByEnum(MusicBGType.LOGIN_BG);

        this.width = 750;
        this.height = 1334;
        this.imgPageBg = new Laya.Image("unpack/cgani/img_page.png");
        this.imgPageBg.centerX = 0;
        this.imgPageBg.centerY = -100;
        this.addChild(this.imgPageBg);

        this.imgPagePanel = new Laya.Panel();
        this.imgPagePanel.width = 574;
        this.imgPagePanel.height = 730;
        this.imgPagePanel.centerX = -34;
        this.imgPagePanel.centerY = -80;
        this.addChild(this.imgPagePanel);
        
        this.imgPage = new Laya.Image();
        this.imgPagePanel.addChild(this.imgPage);

        this.sprPrinting = new Sprite();
        this.sprPrinting.width = 750;
        this.sprPrinting.height = 400;
        this.sprPrinting.x = GameConfig.STAGE_WIDTH - this.sprPrinting.width >> 1;
        this.sprPrinting.y = 1080;
        this.addChild(this.sprPrinting);

        this.lblPrint = new Laya.Label();
        this.lblPrint.fontSize = 30;
        this.lblPrint.font = "SimHei";
        this.lblPrint.color = "#ffffff";
        this.lblPrint.width = 600;
        this.lblPrint.height = this.sprPrinting.height;
        this.lblPrint.wordWrap = true;
        this.lblPrint.x = 75;
        this.lblPrint.leading = 10;
        this.sprPrinting.addChild(this.lblPrint);

        this.lblNotice = new Laya.Label();
        this.lblNotice.fontSize = 30;
        this.lblNotice.font = "SimHei";
        this.lblNotice.color = "#ffffff";
        this.lblNotice.width = 120;
        this.lblNotice.height = this.sprPrinting.height;
        this.lblNotice.wordWrap = true;
        this.lblNotice.x = 500;
        this.lblNotice.y = 1020;
        this.lblNotice.text = "点击跳过"
        this.addChild(this.lblNotice);

        this.aniSkip = new Laya.Animation();
        this.aniSkip.loadAnimation("res/ani/click_skip.ani");
        this.aniSkip.scale(0.8,0.8);
        this.aniSkip.x = this.lblNotice.x + this.lblNotice.width;
        this.aniSkip.y = this.lblNotice.y;
        this.addChild(this.aniSkip);
        this.aniSkip.play();
        
    }
    private static _ins:CGAnimation = null;
    public static get ins():CGAnimation
    {
        if(this._ins == null)
        {
            this._ins = new CGAnimation();
        }
        return this._ins;
    }

    public show(caller:any,callBack:Function):void
    {
        this.caller = caller;
        this.callBack = callBack;
        this.imgPage.alpha = 0;
        //显示地图界面
        // Laya.loader.load(this.resAry,Laya.Handler.create(this,this.resLoaded));
        this.on(Laya.Event.CLICK,this,this.onViewClick);
        this.resLoaded();
    }
    private onViewClick():void
    {
        Laya.Tween.clearAll(this.imgPage);
        Laya.timer.clear(this,this.printFont);
        this.fontInd = 0;
        this.pagePlayComplete = true;
        this.printFontComplete = true;
        this.nextPage();
    }
    private resLoaded():void
    {
        LayerManager.ins.addToLayer(this,LayerManager.TIP_LAYER,false,false,true);
        this.playAni();
    }
    
    private playAni():void
    {
        this.pagePlayComplete = false;
        this.printFontComplete = false;

        this.imgPage.skin = this.resAry[this.pageId];
        if(this.pageId == this.fontsAry.length - 1)
        {
            this.imgPage.alpha = 1;
            this.imgPage.y += 60;
            this.imgPage.scale(0.8,0.8);
            Laya.Tween.to(this.imgPage,{x:-150},1000,null,Laya.Handler.create(this,function():void{
                // Laya.Tween.to(this.imgPage,{alpha:0},2000,null,Laya.Handler.create(this,this.playComplete));
                this.aniArrow = new Laya.Animation();
                this.aniArrow.loadAnimation("res/ani/cg_ani.ani");
                this.aniArrow.scale(0.8,0.8);
                this.aniArrow.x = 530;
                this.aniArrow.y = 340;
                this.imgPagePanel.addChild(this.aniArrow);
                this.aniArrow.play(0,false);
            }));
        }
        else
        {
            Laya.Tween.to(this.imgPage,{alpha:1},2000,null,Laya.Handler.create(this,function():void{
                // Laya.Tween.to(this.imgPage,{alpha:0},2000,null,Laya.Handler.create(this,this.playComplete));
            }));
        }

        this.fontString = this.fontsAry[this.pageId];
        Laya.timer.loop(100,this,this.printFont);
    }
    private playComplete():void
    {
        this.pagePlayComplete = true;
        this.nextPage();
    }
    
    /**打印字体 */
    private printFont():void
    {
        this.fontInd++;
        this.lblPrint.text = "    " + this.fontString.substr(0,this.fontInd);
        if(this.fontInd > this.fontString.length)
        {
            Laya.timer.clear(this,this.printFont);
            this.fontInd = 0;
            this.printFontComplete = true;
            // this.nextPage();
            if(this.pageId == this.fontsAry.length - 1){
                Laya.Tween.to(this.aniArrow,{alpha:0},2000);
            }
            Laya.Tween.to(this.imgPage,{alpha:0},2000,null,Laya.Handler.create(this,this.playComplete));
        }
    }
    private nextPage():void
    {

        if(this.printFontComplete && this.pagePlayComplete)
        {
            this.pageId++;
            if(this.pageId > this.fontsAry.length - 1)
            {
                if(this.caller && this.callBack)
                {
                    this.callBack.call(this.caller);
                }
                //完成
                this.dispose();
            }
            else
            {
                this.playAni();
            }
        }
    }
    private dispose():void
    {
        this.off(Laya.Event.CLICK,this,this.onViewClick);
        if(this.imgPageBg)
        {
            Laya.Tween.clearAll(this.imgPageBg);
            this.imgPageBg.removeSelf();
            this.imgPageBg = null;
        }
        if(this.imgPage)
        {
            Laya.Tween.clearAll(this.imgPage);
            this.imgPage.removeSelf();
            this.imgPage = null;
        }
        if(this.aniArrow)
        {
            Laya.Tween.clearAll(this.aniArrow);
            this.aniArrow.removeSelf();
            this.aniArrow.destroy();
            this.aniArrow = null;
        }
        if(this.aniSkip)
        {
            this.aniSkip.removeSelf();
            this.aniSkip.destroy();
            this.aniSkip = null;
        }
        if(this.lblPrint)
        {
            this.lblPrint.removeSelf();
            this.lblPrint = null;
        }
        if(this.lblNotice)
        {
            this.lblNotice.removeSelf();
            this.lblNotice = null;
        }
        if(this.sprPrinting)
        {
            this.sprPrinting.removeSelf();
            this.sprPrinting = null;
        }
        LayerManager.ins.removeToLayer(this,LayerManager.TIP_LAYER,false,false);

        for(var i = 0;i < this.resAry.length;i++)
        {
            Laya.loader.clearRes(this.resAry[i]);  
        }
    }
    
}