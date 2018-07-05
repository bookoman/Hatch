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
* 农场
*/
var FarmMediator = /** @class */ (function (_super) {
    __extends(FarmMediator, _super);
    function FarmMediator(assetsUrl, view, caller) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.lastMoveX = 0;
        _this.mouseDownX = 0;
        _this.mouseUpX = 0;
        return _this;
    }
    FarmMediator.prototype.initView = function () {
        this.view = new ui.farm.FarmViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        //var spr:Sprite;
        //spr.mouseEnabled
        //入场动画
    };
    FarmMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onCloseBtnClick);
        this.view.panlePlant.on(Laya.Event.MOUSE_DOWN, this, this.onViewMouseEvent);
        this.view.panlePlant.on(Laya.Event.MOUSE_UP, this, this.onViewMouseEvent);
    };
    FarmMediator.prototype.removeEvents = function () {
        this.view.btnClose.off(Laya.Event.CLICK, this, this.onCloseBtnClick);
        this.view.panlePlant.off(Laya.Event.MOUSE_DOWN, this, this.onViewMouseEvent);
        this.view.panlePlant.off(Laya.Event.MOUSE_UP, this, this.onViewMouseEvent);
    };
    FarmMediator.prototype.onCloseBtnClick = function (e) {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP);
        this.dispose();
        // console.log(e.target);
    };
    FarmMediator.prototype.dispose = function () {
        if (this.view) {
        }
        _super.prototype.dispose.call(this);
    };
    FarmMediator.prototype.onViewMouseEvent = function (e) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.lastMoveX = this.view.panlePlant.mouseX;
            this.mouseDownX = this.view.panlePlant.mouseX;
            this.view.panlePlant.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            // console.log("mouseDwon：",this.view.panlePlant.mouseX);
            // this.onBtnEnter(null);
        }
        else if (e.type == Laya.Event.MOUSE_UP) {
            this.mouseUpX = this.view.panlePlant.mouseX;
            this.view.panlePlant.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            //缓缓移动效果
            var tweenX = 0;
            if (this.distanceX > 0) {
                tweenX = this.view.panlePlant.x + 50;
            }
            else if (this.distanceX < 0) {
                tweenX = this.view.panlePlant.x - 50;
            }
            if (tweenX > 0 || tweenX < -(this.view.panlePlant.width - GameConfig.STAGE_WIDTH)) {
                return;
            }
            if (tweenX != 0) {
                Laya.Tween.to(this.view.panlePlant, { x: tweenX }, 200, Laya.Ease.backOut);
            }
            // console.log("mouseUp：",this.view.panlePlant.mouseX);
        }
    };
    FarmMediator.prototype.onMouseMove = function (e) {
        this.distanceX = 0;
        var tx = this.view.panlePlant.x;
        if (this.lastMoveX != this.view.panlePlant.mouseX) {
            this.distanceX = this.view.panlePlant.mouseX - this.lastMoveX;
            tx += this.distanceX;
        }
        if (tx > 0 || tx < -(this.view.panlePlant.width - GameConfig.STAGE_WIDTH)) {
            this.distanceX = 0;
            return;
        }
        this.view.panlePlant.x = tx;
        this.lastMoveX = this.view.panlePlant.mouseX;
    };
    return FarmMediator;
}(BaseMediator));
//# sourceMappingURL=FarmMediator.js.map