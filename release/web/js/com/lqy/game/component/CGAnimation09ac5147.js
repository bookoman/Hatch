var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* CG动画
*/
var CGAnimation = /** @class */ (function (_super) {
    __extends(CGAnimation, _super);
    function CGAnimation() {
        var _this = _super.call(this) || this;
        _this.resAry = ["unpack/cgani/img_page1.png",
            "unpack/cgani/img_page2.png", "unpack/cgani/img_page3.png", "unpack/cgani/img_page4.png",
            "unpack/cgani/img_page5.png", "unpack/cgani/img_page6.png", "unpack/cgani/img_page7.png",
            "unpack/cgani/img_page8.png", "unpack/cgani/img_page9.png", "unpack/cgani/img_page10.png",
            "unpack/cgani/img_page11.png", "unpack/cgani/img_page12.png", "unpack/cgani/img_left.png",
            "unpack/cgani/img_right.png"];
        _this.fontsAry = [
            "在极其极其遥远的远古时代，海面平静如常......",
            "转瞬间，天空骤然色变......",
            "在一阵强烈的电磁风暴过后，一群人类突然出现在茂密的丛林中。",
            "这些人在经历了绝望、挣扎之后，被迫开始在这个时代扎根生存，他们自称为穿越者。",
            "随着远古大陆上穿越者越来越多，这些人终于安定下来，并联合起来组成了部落。穿越者的部落在远古大陆上艰难的生存着......",
            "直到他们发现了恐龙......",
            "在付出了惨痛的代价后，穿越者们终于成功的驯化了部分恐龙，而且在经过了数代人的探索之后，他们更是总结出了一套完整的驯龙和育恐龙体系。",
            "在恐龙的协助下，穿越者们在异界渐渐站稳了脚跟，修建了村落，然后也渐渐形成了新的信仰和习俗。每个刚穿越而来的人，都会到村落外抓自己的第一条龙，以证明自己在部落中的价值。",
            "一个偶然的机会，几个穿越者在一个不知名的山谷后面发现了一片上古遗迹......",
            "他们在遗迹中找到了一种神秘的液体。很快人们便发现将这种液体以符号的形式涂抹在恐龙身上，能很大程度的激发恐龙身上的内在潜力！穿越者们欣喜的将这种恐龙身上的符号纹样取名为战纹！",
            "战纹的发现进一步提高了恐龙的实力，使得穿越众有能力和精力向外扩张部落的领地。部落的领地越来越大，穿越众的生活越来越好，一切都欣欣向荣的发展着向。",
            "然而好景不长，穿越者们在向东探索的时候发现了远古大陆的原住民。和平还是战争?生存还是灭亡?最终冲突还是爆发了......"
        ];
        _this.pageId = 0;
        _this.fontInd = 0;
        _this.pagePlayComplete = false;
        _this.printFontComplete = false;
        // SoundsManager.ins.playerMusicByEnum(MusicBGType.LOGIN_BG);
        _this.width = 750;
        _this.height = 1334;
        _this.imgPageBg = new Laya.Image("unpack/cgani/img_page.png");
        _this.imgPageBg.centerX = 0;
        _this.imgPageBg.centerY = -100;
        _this.addChild(_this.imgPageBg);
        _this.imgPagePanel = new Laya.Panel();
        _this.imgPagePanel.width = 574;
        _this.imgPagePanel.height = 730;
        _this.imgPagePanel.centerX = -34;
        _this.imgPagePanel.centerY = -80;
        _this.addChild(_this.imgPagePanel);
        _this.imgPage = new Laya.Image();
        _this.imgPagePanel.addChild(_this.imgPage);
        _this.sprPrinting = new Sprite();
        _this.sprPrinting.width = 750;
        _this.sprPrinting.height = 400;
        _this.sprPrinting.x = GameConfig.STAGE_WIDTH - _this.sprPrinting.width >> 1;
        _this.sprPrinting.y = 1080;
        _this.addChild(_this.sprPrinting);
        _this.lblPrint = new Laya.Label();
        _this.lblPrint.fontSize = 30;
        _this.lblPrint.font = "SimHei";
        _this.lblPrint.color = "#ffffff";
        _this.lblPrint.width = 600;
        _this.lblPrint.height = _this.sprPrinting.height;
        _this.lblPrint.wordWrap = true;
        _this.lblPrint.x = 75;
        _this.lblPrint.leading = 10;
        _this.sprPrinting.addChild(_this.lblPrint);
        _this.lblNotice = new Laya.Label();
        _this.lblNotice.fontSize = 30;
        _this.lblNotice.font = "SimHei";
        _this.lblNotice.color = "#ffffff";
        _this.lblNotice.width = 120;
        _this.lblNotice.height = _this.sprPrinting.height;
        _this.lblNotice.wordWrap = true;
        _this.lblNotice.x = 500;
        _this.lblNotice.y = 1020;
        _this.lblNotice.text = "点击跳过";
        _this.addChild(_this.lblNotice);
        _this.aniSkip = new Laya.Animation();
        _this.aniSkip.loadAnimation("res/ani/click_skip.ani");
        _this.aniSkip.scale(0.8, 0.8);
        _this.aniSkip.x = _this.lblNotice.x + _this.lblNotice.width;
        _this.aniSkip.y = _this.lblNotice.y;
        _this.addChild(_this.aniSkip);
        _this.aniSkip.play();
        return _this;
    }
    Object.defineProperty(CGAnimation, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new CGAnimation();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    CGAnimation.prototype.show = function (caller, callBack) {
        this.caller = caller;
        this.callBack = callBack;
        this.imgPage.alpha = 0;
        //显示地图界面
        // Laya.loader.load(this.resAry,Laya.Handler.create(this,this.resLoaded));
        this.on(Laya.Event.CLICK, this, this.onViewClick);
        this.resLoaded();
    };
    CGAnimation.prototype.onViewClick = function () {
        Laya.Tween.clearAll(this.imgPage);
        Laya.timer.clear(this, this.printFont);
        this.fontInd = 0;
        this.pagePlayComplete = true;
        this.printFontComplete = true;
        this.nextPage();
    };
    CGAnimation.prototype.resLoaded = function () {
        LayerManager.ins.addToLayer(this, LayerManager.TIP_LAYER, false, false, true);
        this.playAni();
    };
    CGAnimation.prototype.playAni = function () {
        this.pagePlayComplete = false;
        this.printFontComplete = false;
        this.imgPage.skin = this.resAry[this.pageId];
        if (this.pageId == this.fontsAry.length - 1) {
            this.imgPage.alpha = 1;
            this.imgPage.y += 60;
            this.imgPage.scale(0.8, 0.8);
            Laya.Tween.to(this.imgPage, { x: -150 }, 1000, null, Laya.Handler.create(this, function () {
                // Laya.Tween.to(this.imgPage,{alpha:0},2000,null,Laya.Handler.create(this,this.playComplete));
                this.aniArrow = new Laya.Animation();
                this.aniArrow.loadAnimation("res/ani/cg_ani.ani");
                this.aniArrow.scale(0.8, 0.8);
                this.aniArrow.x = 530;
                this.aniArrow.y = 340;
                this.imgPagePanel.addChild(this.aniArrow);
                this.aniArrow.play(0, false);
            }));
        }
        else {
            Laya.Tween.to(this.imgPage, { alpha: 1 }, 2000, null, Laya.Handler.create(this, function () {
                // Laya.Tween.to(this.imgPage,{alpha:0},2000,null,Laya.Handler.create(this,this.playComplete));
            }));
        }
        this.fontString = this.fontsAry[this.pageId];
        Laya.timer.loop(100, this, this.printFont);
    };
    CGAnimation.prototype.playComplete = function () {
        this.pagePlayComplete = true;
        this.nextPage();
    };
    /**打印字体 */
    CGAnimation.prototype.printFont = function () {
        this.fontInd++;
        this.lblPrint.text = "    " + this.fontString.substr(0, this.fontInd);
        if (this.fontInd > this.fontString.length) {
            Laya.timer.clear(this, this.printFont);
            this.fontInd = 0;
            this.printFontComplete = true;
            // this.nextPage();
            if (this.pageId == this.fontsAry.length - 1) {
                Laya.Tween.to(this.aniArrow, { alpha: 0 }, 3000);
            }
            Laya.Tween.to(this.imgPage, { alpha: 0 }, 3000, null, Laya.Handler.create(this, this.playComplete));
        }
    };
    CGAnimation.prototype.nextPage = function () {
        if (this.printFontComplete && this.pagePlayComplete) {
            this.pageId++;
            if (this.pageId > this.fontsAry.length - 1) {
                if (this.caller && this.callBack) {
                    this.callBack.call(this.caller);
                }
                //完成
                this.dispose();
            }
            else {
                this.playAni();
            }
        }
    };
    CGAnimation.prototype.dispose = function () {
        this.off(Laya.Event.CLICK, this, this.onViewClick);
        if (this.imgPageBg) {
            Laya.Tween.clearAll(this.imgPageBg);
            this.imgPageBg.removeSelf();
            this.imgPageBg = null;
        }
        if (this.imgPage) {
            Laya.Tween.clearAll(this.imgPage);
            this.imgPage.removeSelf();
            this.imgPage = null;
        }
        if (this.aniArrow) {
            Laya.Tween.clearAll(this.aniArrow);
            this.aniArrow.removeSelf();
            this.aniArrow.destroy();
            this.aniArrow = null;
        }
        if (this.aniSkip) {
            this.aniSkip.removeSelf();
            this.aniSkip.destroy();
            this.aniSkip = null;
        }
        if (this.lblPrint) {
            this.lblPrint.removeSelf();
            this.lblPrint = null;
        }
        if (this.lblNotice) {
            this.lblNotice.removeSelf();
            this.lblNotice = null;
        }
        if (this.sprPrinting) {
            this.sprPrinting.removeSelf();
            this.sprPrinting = null;
        }
        LayerManager.ins.removeToLayer(this, LayerManager.TIP_LAYER, false, false);
        for (var i = 0; i < this.resAry.length; i++) {
            Laya.loader.clearRes(this.resAry[i]);
        }
    };
    CGAnimation._ins = null;
    return CGAnimation;
}(Sprite));
//# sourceMappingURL=CGAnimation.js.map