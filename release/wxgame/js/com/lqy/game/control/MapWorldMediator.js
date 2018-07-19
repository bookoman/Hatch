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
    function MapWorldMediator(assetsUrl, view, caller) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.lastMoveX = 0;
        //颜色滤镜矩阵,灰色
        _this.grayFilter = new Laya.ColorFilter([
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0,
        ]);
        //发光滤镜#0099FF
        _this.glowFilter = new Laya.GlowFilter("#00FF00", 100, 0, 0);
        _this.mapBattleMediator = caller;
        return _this;
    }
    MapWorldMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    MapWorldMediator.prototype.addEvents = function () {
        this.view.panelBlock.on(Laya.Event.MOUSE_DOWN, this, this.onViewMouseEvent);
        this.view.panelBlock.on(Laya.Event.MOUSE_UP, this, this.onViewMouseEvent);
        var imgBlock;
        for (var i = 0; i < 7; i++) {
            imgBlock = this.view["imgBlock" + i];
            this.view["imgBlock" + i].on(Laya.Event.CLICK, this, this.onBlockClick);
        }
        // console.log(imgBlock.mouseEnabled,imgBlock.mouseThrough);
    };
    MapWorldMediator.prototype.removeEvents = function () {
        this.view.panelBlock.off(Laya.Event.MOUSE_DOWN, this.onViewMouseEvent);
        this.view.panelBlock.off(Laya.Event.MOUSE_UP, this.onViewMouseEvent);
        for (var i = 0; i < 7; i++) {
            this.view["imgBlock" + i].off(Laya.Event.CLICK, this, this.onBlockClick);
        }
    };
    MapWorldMediator.prototype.onBlockClick = function (e) {
        var imgBlock;
        for (var i = 0; i < 7; i++) {
            imgBlock = this.view["imgBlock" + i];
            imgBlock.filters = null;
        }
        imgBlock = e.target;
        imgBlock.filters = [this.glowFilter];
    };
    MapWorldMediator.prototype.onViewMouseEvent = function (e) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.lastMoveX = this.view.panelBlock.mouseX;
            this.view.panelBlock.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            console.log("mouseDwon：", this.view.panelBlock.mouseX);
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
            this.view.panelBlock.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
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
                Laya.Tween.to(this.view.panelBlock, { x: tweenX }, 200, Laya.Ease.circIn);
            }
            console.log("mouseUp：", this.view.panelBlock.mouseX);
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
    MapWorldMediator.prototype.onBtnEnter = function (e) {
        GameDataManager.ins.hundUpChapterData = 1;
        if (this.mapBattleMediator) {
            this.mapBattleMediator.enterMapBattle();
        }
        this.dispose();
    };
    MapWorldMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.mapBattleMediator = null;
    };
    return MapWorldMediator;
}(BaseMediator));
//# sourceMappingURL=MapWorldMediator.js.map