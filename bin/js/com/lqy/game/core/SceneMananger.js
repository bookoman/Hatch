/*
* 场景管理器
*/
var SceneMananger = /** @class */ (function () {
    function SceneMananger() {
        this.curScene = null;
    }
    Object.defineProperty(SceneMananger, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new SceneMananger();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**进入场景 */
    SceneMananger.prototype.enter = function (sceneId) {
        if (this.curScene) {
            this.curScene.leave();
            this.curScene = null;
        }
        switch (sceneId) {
            case SceneMananger.PRE_LOAD_SCENE:
                this.curScene = new PreLoadScene();
                break;
            case SceneMananger.LOGIN_SCENE:
                this.curScene = new LoginScene();
                break;
            case SceneMananger.GAME_SCENE:
                this.curScene = new GameScene();
                break;
        }
        this.curScene.enter();
    };
    /**离开场景 */
    SceneMananger.prototype.leave = function () {
        if (this.curScene) {
            this.curScene.leave();
            this.curScene = null;
        }
    };
    SceneMananger.PRE_LOAD_SCENE = 1;
    SceneMananger.LOGIN_SCENE = 2;
    SceneMananger.GAME_SCENE = 3;
    SceneMananger._ins = null;
    return SceneMananger;
}());
//# sourceMappingURL=SceneMananger.js.map