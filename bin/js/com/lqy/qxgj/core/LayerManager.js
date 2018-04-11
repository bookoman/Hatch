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
* 层管理器
* name;
*/
var LayerManager = /** @class */ (function () {
    function LayerManager() {
        this.bgLayer = null;
        this.terrainLayer = null;
        this.playerLayer = null;
        this.uiLayer = null;
        this.tipLayer = null;
    }
    Object.defineProperty(LayerManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new LayerManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.prototype.init = function () {
        this.bgLayer = new MyLayer();
        Laya.stage.addChild(this.bgLayer);
        this.terrainLayer = new MyLayer();
        Laya.stage.addChild(this.terrainLayer);
        this.playerLayer = new MyLayer();
        Laya.stage.addChild(this.playerLayer);
        this.uiLayer = new MyLayer();
        Laya.stage.addChild(this.uiLayer);
        this.tipLayer = new MyLayer();
        Laya.stage.addChild(this.tipLayer);
    };
    /**添加到对应层 */
    LayerManager.prototype.addToLayer = function (view, layerId, isMask, isMany, isCenter) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isCenter === void 0) { isCenter = true; }
        var layer = this.getLayer(layerId);
        if (isCenter) {
            view.x = GameConfig.STAGE_WIDTH - view.width >> 1;
            view.y = GameConfig.STAGE_HEIGHT - view.height >> 1;
        }
        layer.add(view, isMask, isMany);
    };
    /**从对应层移出显示对象 */
    LayerManager.prototype.removeToLyaer = function (view, layerId, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        var layer = this.getLayer(layerId);
        layer.remove(view, isMask, isMany);
    };
    LayerManager.prototype.getLayer = function (layerId) {
        switch (layerId) {
            case LayerManager.BG_LAYER:
                return this.bgLayer;
            case LayerManager.TERRAIN_LAYER:
                return this.terrainLayer;
            case LayerManager.PLAYER_LAYER:
                return this.playerLayer;
            case LayerManager.UI_LAYER:
                return this.uiLayer;
            case LayerManager.TIP_LAYER:
                return this.tipLayer;
        }
    };
    LayerManager.BG_LAYER = 0;
    LayerManager.TERRAIN_LAYER = 1;
    LayerManager.PLAYER_LAYER = 2;
    LayerManager.UI_LAYER = 3;
    LayerManager.TIP_LAYER = 4;
    LayerManager._ins = null;
    return LayerManager;
}());
/**
 * 自定义层级
 */
var MyLayer = /** @class */ (function (_super) {
    __extends(MyLayer, _super);
    function MyLayer() {
        var _this = _super.call(this) || this;
        _this.maskCount = 0;
        _this.maskSprite = null;
        _this.viewObj = {};
        _this.curView = null;
        return _this;
    }
    MyLayer.prototype.add = function (view, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isMask) {
            if (this.maskSprite == null) {
                this.maskSprite = new Laya.Sprite();
                this.maskSprite.graphics.drawRect(0, 0, GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT, "#000000");
                this.maskSprite.alpha = 0.5;
            }
            if (!this.maskSprite.parent) {
                this.addChild(this.maskSprite);
            }
            this.maskCount++;
        }
        if (isMany) {
            var keyClass = view.constructor.name;
            if (!this.viewObj[keyClass]) {
                this.viewObj[keyClass] = [];
            }
            this.viewObj[keyClass].push(view);
        }
        else {
            if (this.curView && this.curView.parent) {
                this.curView.parent.removeChild(this.curView);
                this.curView = null;
            }
            this.curView = view;
        }
        this.addChild(view);
    };
    MyLayer.prototype.remove = function (view, isMask, isMany) {
        if (isMask === void 0) { isMask = false; }
        if (isMany === void 0) { isMany = false; }
        if (isMask) {
            this.maskCount--;
            if (this.maskCount <= 0 && this.maskSprite) {
                this.maskSprite.graphics.clear();
                if (this.maskSprite.parent) {
                    this.maskSprite.removeChild(this.maskSprite);
                    this.maskSprite = null;
                }
            }
        }
        if (isMany) {
            var keyClass = view.constructor.name;
            if (this.viewObj[keyClass]) {
                this.viewObj[keyClass].pop();
            }
        }
        else {
            if (this.curView && this.curView.constructor.name == view.constructor.name) {
                this.curView = null;
            }
        }
        if (view.parent) {
            view.parent.removeChild(view);
        }
    };
    return MyLayer;
}(Laya.Sprite));
//# sourceMappingURL=LayerManager.js.map