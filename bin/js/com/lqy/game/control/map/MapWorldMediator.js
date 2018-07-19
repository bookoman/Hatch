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
* 世界地图
*/
var MapWorldMediator = /** @class */ (function (_super) {
    __extends(MapWorldMediator, _super);
    function MapWorldMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.lastMoveX = 0;
        _this.mouseDownX = 0;
        _this.mouseUpX = 0;
        _this.distanceX = 0;
        return _this;
    }
    MapWorldMediator.prototype.initView = function () {
        this.grayFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ]);
        this.blackFilter = new Laya.ColorFilter([
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
        ]);
        // this.glowFilter = new Laya.GlowFilter("#000000", 100, 0, 0);
        this.view = new ui.map.MapWorldViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, false, true);
        var imgBlock;
        for (var i = 0; i < GameConfig.GATE_MAP_KEYS.length; i++) {
            imgBlock = this.view["imgBlock" + i];
            imgBlock.name = GameConfig.GATE_MAP_KEYS[i];
            this.setBlockGray(imgBlock);
            this.view["imgBlock" + i].on(Laya.Event.CLICK, this, this.onBlockClick);
        }
        this.imgBlockFloat = new LayaImage();
        this.imgBlockFloat.visible = false;
        this.view.panelBlock.addChild(this.imgBlockFloat);
        this.view.visible = true;
        _super.prototype.initView.call(this);
        this.worldmapEffect();
        RightFunctionButtons.ins.show(this.view);
    };
    MapWorldMediator.prototype.addEvents = function () {
        this.view.panelBlock.on(Laya.Event.MOUSE_DOWN, this, this.onViewMouseEvent);
        this.view.panelBlock.on(Laya.Event.MOUSE_UP, this, this.onViewMouseEvent);
        // console.log(imgBlock.mouseEnabled,imgBlock.mouseThrough);
    };
    MapWorldMediator.prototype.removeEvents = function () {
        this.view.panelBlock.off(Laya.Event.MOUSE_DOWN, this.onViewMouseEvent);
        this.view.panelBlock.off(Laya.Event.MOUSE_UP, this.onViewMouseEvent);
        for (var i = 0; i < GameConfig.GATE_MAP_KEYS.length; i++) {
            this.view["imgBlock" + i].off(Laya.Event.CLICK, this, this.onBlockClick);
        }
    };
    /**云雾特效 */
    MapWorldMediator.prototype.worldmapEffect = function () {
        Tween.to(this.view.yun1, { x: -326, y: -927, alpha: 0 }, 3000, null, Laya.Handler.create(this, this.yunMoveComplete, [this.view.yun1]), 1000);
        Tween.to(this.view.yun2, { x: -1497, y: 1377, alpha: 0 }, 3000, null, Laya.Handler.create(this, this.yunMoveComplete, [this.view.yun2]), 1000);
        Tween.to(this.view.yun3, { x: -2004, y: 116, alpha: 0 }, 3000, null, Laya.Handler.create(this, this.yunMoveComplete, [this.view.yun3]), 1000);
        Tween.to(this.view.yun4, { x: 2165, y: 1031, alpha: 0 }, 3000, null, Laya.Handler.create(this, this.yunMoveComplete, [this.view.yun4]), 1000);
        Tween.to(this.view.wumaiImage, { x: 1500, alpha: 0 }, 3500, null, Laya.Handler.create(this, this.yunMoveComplete, [this.view.wumaiImage]), 0);
        Tween.to(this.view.panelBlock, { x: -240, y: 0, scaleX: 1.0, scaleY: 1.0 }, 1000, null, null, 1000);
        //选中当前打的地图板块
        this.view.imgBlock0.filters = [this.blackFilter];
        this.imgBlockFloat.skin = this.view.imgBlock0.skin;
        this.imgBlockFloat.x = this.view.imgBlock0.x - 20;
        this.imgBlockFloat.y = this.view.imgBlock0.y - 20;
        this.imgBlockFloat.visible = true;
        this.view.imgNoOpen.filters = [this.grayFilter];
    };
    MapWorldMediator.prototype.yunMoveComplete = function (disImg) {
        if (disImg) {
            Laya.Tween.clearAll(disImg);
            disImg.removeSelf();
        }
    };
    /**进入地图假战斗 */
    MapWorldMediator.prototype.enterMapBattle = function () {
    };
    /**
     *
     * @param imgBlock
     * @param bool
     */
    MapWorldMediator.prototype.setBlockGray = function (imgBlock) {
        var bool = GameDataManager.ins.getGateMapIsOpen(imgBlock.name);
        imgBlock.filters = bool == false ? [this.grayFilter] : null;
    };
    MapWorldMediator.prototype.onBlockClick = function (e) {
        if (Math.abs(this.mouseDownX - this.mouseUpX) > 10) {
            return;
        }
        if (!GameDataManager.ins.getGateMapIsOpen(e.target.name)) {
            TipsManager.ins.showFloatMsg("关卡未开启，请通关上一地图所有关卡", 30, "#ff0000", this.view, this.view.width / 2, this.view.height / 2, 1, 0, 100);
            return;
        }
        this.imgBlockFloat.visible = false;
        var imgBlock;
        for (var i = 0; i < GameConfig.GATE_MAP_KEYS.length; i++) {
            imgBlock = this.view["imgBlock" + i];
            if (imgBlock) {
                if (GameDataManager.ins.getGateMapIsOpen(imgBlock.name)) {
                    imgBlock.filters = null;
                }
                else {
                    imgBlock.filters = [this.grayFilter];
                }
            }
        }
        imgBlock = e.target;
        imgBlock.filters = [this.blackFilter];
        this.imgBlockFloat.skin = imgBlock.skin;
        this.imgBlockFloat.x = imgBlock.x;
        this.imgBlockFloat.y = imgBlock.y;
        this.imgBlockFloat.visible = true;
        Laya.Tween.to(this.imgBlockFloat, { x: imgBlock.x - 10, y: imgBlock.y - 10 }, 100, Laya.Ease.backOut, Laya.Handler.create(this, this.openGateListView, [imgBlock.name]));
    };
    MapWorldMediator.prototype.openGateListView = function (blockName) {
        this.gateListMediator = new GateListMediator();
        this.gateListMediator.setData(blockName);
    };
    MapWorldMediator.prototype.onViewMouseEvent = function (e) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.lastMoveX = this.view.panelBlock.mouseX;
            this.mouseDownX = this.view.panelBlock.mouseX;
            this.view.panelBlock.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            // console.log("mouseDwon：",this.view.panelBlock.mouseX);
            // this.onBtnEnter(null);
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
            this.mouseUpX = this.view.panelBlock.mouseX;
            this.view.panelBlock.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            if (Math.abs(this.mouseDownX - this.mouseUpX) < 10) {
                return;
            }
            //缓缓移动效果
            var tweenX = 0;
            if (this.distanceX > 0) {
                tweenX = this.view.panelBlock.x + 50;
            }
            else if (this.distanceX < 0) {
                tweenX = this.view.panelBlock.x - 50;
            }
            if (tweenX > 0 || tweenX < -(this.view.panelBlock.width - GameConfig.STAGE_WIDTH)) {
                return;
            }
            if (tweenX != 0) {
                Laya.Tween.to(this.view.panelBlock, { x: tweenX }, 200, Laya.Ease.backOut);
            }
            // console.log("mouseUp：",this.view.panelBlock.mouseX);
        }
    };
    MapWorldMediator.prototype.onMouseMove = function (e) {
        this.distanceX = 0;
        var tx = this.view.panelBlock.x;
        if (this.lastMoveX != this.view.panelBlock.mouseX) {
            this.distanceX = this.view.panelBlock.mouseX - this.lastMoveX;
            tx += this.distanceX;
        }
        if (tx > 0 || tx < -(this.view.panelBlock.width - GameConfig.STAGE_WIDTH)) {
            this.distanceX = 0;
            return;
        }
        this.view.panelBlock.x = tx;
        this.lastMoveX = this.view.panelBlock.mouseX;
    };
    MapWorldMediator.prototype.dispose = function () {
        if (this.view) {
            this.view.imgNoOpen.filters = null;
        }
        RightFunctionButtons.ins.hide();
        if (this.gateListMediator) {
            this.gateListMediator.dispose();
            this.gateListMediator = null;
        }
        _super.prototype.dispose.call(this);
    };
    return MapWorldMediator;
}(BaseMediator));
//# sourceMappingURL=MapWorldMediator.js.map