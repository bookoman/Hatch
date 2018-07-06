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
* 装备熔炼
*/
var EquipSmeltMediator = /** @class */ (function (_super) {
    __extends(EquipSmeltMediator, _super);
    function EquipSmeltMediator(assetsUrl, view) {
        if (assetsUrl === void 0) { assetsUrl = null; }
        if (view === void 0) { view = null; }
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.aniPoss = [new Point(160, 336), new Point(160, 491), new Point(490, 184),
            new Point(490, 339), new Point(490, 501), new Point(160, 181)];
        return _this;
    }
    EquipSmeltMediator.prototype.initView = function () {
        this.view = new ui.equip.SmeltViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        // this.ronglian();
    };
    EquipSmeltMediator.prototype.addEvents = function () {
        this.view.btnClose.on(Laya.Event.CLICK, this, this.onBtnCloseClick);
        this.view.btnSmelt.on(Laya.Event.CLICK, this, this.onBtnSmeltClick);
    };
    EquipSmeltMediator.prototype.removeEvents = function () {
        this.view.btnClose.off(Laya.Event.CLICK, this, this.onBtnCloseClick);
        this.view.btnSmelt.off(Laya.Event.CLICK, this, this.onBtnSmeltClick);
    };
    EquipSmeltMediator.prototype.dispose = function () {
        if (this.view) {
            var ani;
            for (var i = 1; i <= 6; i++) {
                ani = this.view["ani" + i];
                Laya.Tween.clearAll(ani);
            }
            Laya.Tween.clearAll(this.view.ainrong);
        }
        _super.prototype.dispose.call(this);
    };
    EquipSmeltMediator.prototype.onBtnCloseClick = function (e) {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.WORLD_MAP);
        this.dispose();
    };
    EquipSmeltMediator.prototype.onBtnSmeltClick = function (e) {
        this.ronglian();
    };
    EquipSmeltMediator.prototype.ronglian = function () {
        this.initEffect();
        var rlX = 318;
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
    };
    EquipSmeltMediator.prototype.initEffect = function () {
        var ani;
        var point;
        for (var i = 1; i <= 6; i++) {
            ani = this.view["ani" + i];
            point = this.aniPoss[i - 1];
            ani.pos(point.x, point.y);
            ani.visible = true;
        }
    };
    EquipSmeltMediator.prototype.addNumber = function () {
        this.view.displyLable.text = "2000";
        this.view.smeltNum.visible = true;
        this.view.smeltNum.text = "1350";
        Tween.to(this.view.smeltNum, { y: 101, alpha: 0 }, 1000, null, Handler.create(this, function () {
            this.view.smeltNum.removeSelf();
            this.displaySmeltNum();
        }));
    };
    EquipSmeltMediator.prototype.displaySmeltNum = function () {
        this.view.displyLable.visible = true;
        this.view.displyLable.color = "#FFFFFF";
        this.view.displyLable.text = "3350";
    };
    return EquipSmeltMediator;
}(BaseMediator));
//# sourceMappingURL=EquipSmeltMediator.js.map