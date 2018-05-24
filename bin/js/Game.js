var Handler = Laya.Handler;
/*
* 游戏入口
* name;
*/
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        var resAry = [
            { url: "res/atlas/comp.atlas", type: Loader.ATLAS },
            { url: "unpack/main/main.jpg", type: Loader.IMAGE },
            { url: "res/config/language.txt", type: Loader.TEXT },
            { url: "res/config/TestSample.xml", type: Loader.TEXT }
        ];
        Laya.loader.load(resAry, new Laya.Handler(this, this.onLoaded), new Laya.Handler(this, this.onLoadProgress));
    };
    Game.prototype.onLoaded = function () {
        LayerManager.ins.init();
        DebugViewUtil.init();
        LG.parse(Laya.loader.getRes("res/config/language.txt"));
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        ConfigManager.ins.parseTestSample();
    };
    /**资源加载进度 */
    Game.prototype.onLoadProgress = function (data) {
    };
    return Game;
}());
//程序入口
Laya.MiniAdpter.init();
Config.isAntialias = true; //绘图抗锯齿
Laya.init(GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT, Laya.WebGL);
Laya.Stat.show(0, 0);
Laya.stage.scaleMode = "showAll"; //showall跟showAll不一样。。。。
Laya.stage.alignH = "center";
Laya.stage.alignV = "top";
// SoundManager.useAudioMusic = false;
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));
function beginLoad() {
    //实例UI界面
    var game = new Game();
    game.init();
}
//# sourceMappingURL=Game.js.map