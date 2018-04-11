var Handler = Laya.Handler;
/*
* 游戏入口
* name;
*/
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        Laya.loader.load("res/atlas/comp.atlas", Handler.create(this, this.onLoaded));
        console.log("...............");
    };
    Game.prototype.onLoaded = function () {
        LayerManager.ins.init();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
    };
    return Game;
}());
//程序入口
Laya.init(GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT);
Laya.Stat.show(0, 0);
Laya.stage.scaleMode = "showall";
Laya.stage.alignH = "center";
Laya.stage.alignV = "top";
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));
function beginLoad() {
    //实例UI界面
    var game = new Game();
    game.init();
}
//# sourceMappingURL=Game.js.map