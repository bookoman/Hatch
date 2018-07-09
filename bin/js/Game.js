var Handler = Laya.Handler;
var ResourceVersion = Laya.ResourceVersion;
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
            { url: "res/atlas/ani/click.atlas", type: Loader.ATLAS },
            { url: "res/atlas/login.atlas", type: Loader.ATLAS },
            { url: "unpack/login/loginbg.png", type: Loader.IMAGE },
            { url: "unpack/login/loginbox.png", type: Loader.IMAGE },
            { url: "unpack/login/logo.png", type: Loader.IMAGE },
            { url: "res/config/language.txt", type: Loader.TEXT }
        ];
        Laya.loader.load(resAry, new Laya.Handler(this, this.onLoaded), new Laya.Handler(this, this.onLoadProgress));
    };
    Game.prototype.onLoaded = function () {
        LayerManager.ins.init();
        DebugViewUtil.init();
        LG.parse(Laya.loader.getRes("res/config/language.txt"));
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        Laya.stage.on(Laya.Event.CLICK, this, this.mouseClickStage);
        // var ani:FrameAnimation = new FrameAnimation(Laya.stage,GameConfig.STAGE_WIDTH/2,GameConfig.STAGE_HEIGHT/2,true);
        // ani.playAni("SK_0101",true);
    };
    Game.prototype.mouseClickStage = function (e) {
        // console.log(e.target,e.target.name);
        if (e.target instanceof Laya.Button) {
            if (e.target.name == "btnClose")
                SoundsManager.ins.playerSoundByEnum(SoundEffectType.CLOSE, 1);
            else
                SoundsManager.ins.playerSoundByEnum(SoundEffectType.CLICK, 1);
        }
        AnimationManager.ins.addMouseClickEffect();
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
// Laya.Stat.show(0,0);
Laya.stage.scaleMode = "showAll"; //showall跟showAll不一样。。。。
Laya.stage.alignH = "center";
Laya.stage.alignV = "top";
// SoundManager.useAudioMusic = false;
//设置版本控制类型为使用文件名映射的方式
ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));
function beginLoad() {
    //实例UI界面
    var game = new Game();
    game.init();
}
//# sourceMappingURL=Game.js.map