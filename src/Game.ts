var Handler = Laya.Handler;

/*
* 游戏入口
* name;
*/
class Game{
    constructor(){

    }
    public init():void
    {
        var resAry:Array<Object> = [
            {url:"res/atlas/comp.atlas",type:Loader.ATLAS,size:50,priority:1},
            {url:"res/atlas/main.atlas",type:Loader.ATLAS,size:50,priority:1}
        ];
        Laya.loader.load(resAry, Handler.create(this,this.onLoaded),Handler.create(this,this.loadProgress));
    }
    private loadProgress(value):void
    {
        setLoadingView(Math.floor(value * 100));
    }
    public onLoaded(): void
    {
        setLoadingView(100);
        LayerManager.ins.init();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
    }

}

//程序入口
Laya.init(GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT,Laya.WebGL);
Laya.Stat.show(0,0);
Laya.stage.scaleMode = "showall";
Laya.stage.alignH = "center";
Laya.stage.alignV = "top";

//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));
function beginLoad(){
    //实例UI界面
    var game:Game = new Game();
    game.init();
}
