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
* name;
*/
var RightFunctionButtons = /** @class */ (function (_super) {
    __extends(RightFunctionButtons, _super);
    function RightFunctionButtons() {
        var _this = _super.call(this) || this;
        _this.moveTime = 300;
        _this.btnW = 130;
        _this.btnH = 130;
        _this.btnPadding = 10;
        _this.upConfigs = [{ name: "btnFarm", skin: "main/btn_farm.png", lable: "农场" },
            { name: "btnGraphtag", skin: "main/btn_graphtag.png", lable: "图鉴" }];
        _this.leftConfigs = [{ name: "btnSmelt", skin: "main/btn_smelt.png", lable: "熔炼" }];
        _this.isOpen = false;
        _this.curMediator = null;
        _this.initComponets();
        return _this;
    }
    Object.defineProperty(RightFunctionButtons, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new RightFunctionButtons();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    RightFunctionButtons.prototype.initComponets = function () {
        this.upButtons = [];
        this.leftButtons = [];
        var btn;
        var config;
        for (var i = 0; i < this.upConfigs.length; i++) {
            config = this.upConfigs[i];
            btn = new Button(config.skin);
            btn.stateNum = 1;
            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
            btn.name = config.name;
            btn.labelSize = 30;
            btn.alpha = 0;
            btn.width = this.btnW;
            btn.height = this.btnH;
            this.addChild(btn);
            this.upButtons.push(btn);
        }
        for (i = 0; i < this.leftConfigs.length; i++) {
            config = this.leftConfigs[i];
            btn = new Button(config.skin);
            btn.stateNum = 1;
            btn.anchorX = 0.5;
            btn.anchorY = 0.5;
            btn.name = config.name;
            btn.labelSize = 30;
            btn.alpha = 0;
            btn.width = this.btnW;
            btn.height = this.btnH;
            this.addChild(btn);
            this.leftButtons.push(btn);
        }
        this.openBtn = new Button("main/btn_open.png");
        this.openBtn.name = "openBtn";
        this.openBtn.labelSize = 30;
        this.openBtn.stateNum = 1;
        this.openBtn.anchorX = 0.5;
        this.openBtn.anchorY = 0.5;
        this.addChild(this.openBtn);
        // this.openBtn.on(Laya.Event.CLICK,this,this.onOpenBtnClick);
        this.on(Laya.Event.CLICK, this, this.onViewClick);
    };
    RightFunctionButtons.prototype.onViewClick = function (e) {
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
            case "btnSmelt":
                this.onBtnSmelt();
                console.log("btnSmelt");
                break;
            case "btnLeft1":
                console.log("btnLeft1");
                break;
        }
    };
    RightFunctionButtons.prototype.show = function (disParent) {
        this.upButtons.forEach(function (btn) {
            btn.y = 0;
            btn.alpha = 0;
        });
        this.leftButtons.forEach(function (btn) {
            btn.x = 0;
            btn.alpha = 0;
        });
        // this.openBtn.label = "+";
        this.x = GameConfig.STAGE_WIDTH - this.openBtn.width;
        this.y = GameConfig.STAGE_HEIGHT / 4 * 3;
        disParent.addChild(this);
    };
    RightFunctionButtons.prototype.hide = function () {
        this.removeSelf();
        this.dispose();
    };
    /**展开 */
    RightFunctionButtons.prototype.open = function () {
        var btn;
        var ty;
        for (var i = 0; i < this.upButtons.length; i++) {
            btn = this.upButtons[i];
            ty = btn.y - (i + 1) * (this.btnH + this.btnPadding);
            Laya.Tween.to(btn, { y: ty, alpha: 1 }, this.moveTime, Laya.Ease.backOut);
        }
        var tx;
        for (var i = 0; i < this.leftButtons.length; i++) {
            btn = this.leftButtons[i];
            tx = btn.x - (i + 1) * (this.btnW + this.btnPadding);
            Laya.Tween.to(btn, { x: tx, alpha: 1 }, this.moveTime, Laya.Ease.backOut);
        }
    };
    /**关闭 */
    RightFunctionButtons.prototype.close = function () {
        var btn;
        for (var i = 0; i < this.upButtons.length; i++) {
            btn = this.upButtons[i];
            Laya.Tween.to(btn, { y: this.openBtn.y, alpha: 0 }, this.moveTime);
        }
        for (var i = 0; i < this.leftButtons.length; i++) {
            btn = this.leftButtons[i];
            Laya.Tween.to(btn, { x: this.openBtn.x, alpha: 0 }, this.moveTime);
        }
    };
    RightFunctionButtons.prototype.onOpenBtnClick = function () {
        this.openBtn.disabled = true;
        Laya.timer.once(this.moveTime + 100, this, function () {
            this.openBtn.disabled = false;
        });
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.open();
        }
        else {
            this.close();
        }
        // var lbl:string = this.isOpen ? "-" : "+";
        // if(this.isOpen)
        // {
        //     lbl = "-";
        //     this.open();
        // }
        // else
        // {
        //     lbl = "+";
        //     this.close();
        // }
        // this.openBtn.label = lbl;
    };
    RightFunctionButtons.prototype.onBtnGraptag = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry = [
            { url: "unpack/graphtag/grahtagjiatu.png", type: Loader.IMAGE },
            { url: "res/atlas/graphtag.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new GraphtagMediator(resAry);
    };
    RightFunctionButtons.prototype.onBtnFarm = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry = [
            { url: "unpack/farm/bg.png", type: Loader.IMAGE },
            { url: "unpack/farm/bgzhongzhi.png", type: Loader.IMAGE },
            { url: "unpack/farm/caijimap.png", type: Loader.IMAGE },
            { url: "unpack/farm/huawen.png", type: Loader.IMAGE },
            { url: "res/atlas/farm.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new FarmMediator(resAry);
    };
    RightFunctionButtons.prototype.onBtnSmelt = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
        //显示地图界面
        var resAry = [
            { url: "unpack/smelt/smeltbg.png", type: Loader.IMAGE },
            { url: "unpack/smelt/boximg.png", type: Loader.IMAGE },
            { url: "unpack/smelt/slidimg.png", type: Loader.IMAGE },
            { url: "unpack/comp/zhuangbeijiatu.png", type: Loader.IMAGE },
            { url: "res/atlas/ani/fuse.atlas", type: Loader.ATLAS },
            { url: "res/atlas/ani/ronglian.atlas", type: Loader.ATLAS },
            { url: "res/atlas/smelt.atlas", type: Loader.ATLAS }
        ];
        this.curMediator = new EquipSmeltMediator(resAry);
    };
    RightFunctionButtons.prototype.dispose = function () {
        if (this.curMediator) {
            this.curMediator.dispose();
            this.curMediator = null;
        }
    };
    RightFunctionButtons._ins = null;
    return RightFunctionButtons;
}(Laya.Sprite));
//# sourceMappingURL=RightFunctionButtons.js.map