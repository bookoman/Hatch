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
var Loader = Laya.Loader;
/*
* name;
*/
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.enter = function () {
        // super.enter();
        new GameMediator([{ url: "res/atlas/main.atlas", type: Loader.ATLAS }]);
        // new GameMediator("res/atlas/main.atlas");
    };
    GameScene.prototype.leave = function () {
        _super.prototype.leave.call(this);
    };
    return GameScene;
}(BaseScene));
//# sourceMappingURL=GameScene.js.map