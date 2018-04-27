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
* 预加载场景
*/
var PreLoadScene = /** @class */ (function (_super) {
    __extends(PreLoadScene, _super);
    function PreLoadScene() {
        return _super.call(this) || this;
    }
    PreLoadScene.prototype.enter = function () {
        var resAry = [
            { url: "res/atlas/comp.atlas", type: Loader.ATLAS, size: 45, priority: 2 },
            { url: "res/outside/sound/effect/fit.wav", type: Loader.SOUND, size: 45, priority: 1 },
            { url: "res/outside/sound/bg/zhou.mp3", type: Loader.SOUND, size: 10, priority: 0 }
        ];
        Laya.loader.load(resAry, Handler.create(this, this.onLoaded), Handler.create(this, this.loadGameResProgress, null, false));
    };
    PreLoadScene.prototype.loadGameResProgress = function (value) {
        PreLoadingView.ins.setProgress(value);
    };
    PreLoadScene.prototype.onLoaded = function () {
        PreLoadingView.ins.setProgress(1);
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        // DebugViewUtil.log("浏览器宽高",Laya.Browser.width+","+Laya.Browser.height);
    };
    PreLoadScene.prototype.leave = function () {
    };
    return PreLoadScene;
}(BaseScene));
//# sourceMappingURL=PreLoadScene.js.map