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
            { url: "res/atlas/comp.atlas", type: Loader.ATLAS, size: 50, priority: 1 }
            // {url:"res/atlas/main.atlas",type:Loader.ATLAS,size:50,priority:1}
        ];
        Laya.loader.load(resAry, Handler.create(this, this.onLoaded), Handler.create(this, this.loadProgress));
    };
    Game.prototype.loadProgress = function (value) {
        // setLoadingView(Math.floor(value * 100));
    };
    Game.prototype.onLoaded = function () {
        LayerManager.ins.init();
        DebugViewUtil.init();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        DebugViewUtil.log("浏览器宽高", Laya.Browser.width + "," + Laya.Browser.height);
    };
    return Game;
}());
//程序入口
Laya.MiniAdpter.init();
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