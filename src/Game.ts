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
            {url:"res/atlas/comp.atlas",type:Loader.ATLAS},
            {url:"unpack/login/logo.png",type:Loader.IMAGE}
            ];
        Laya.loader.load(resAry,new Laya.Handler(this,this.onLoaded),new Laya.Handler(this,this.onLoadProgress));

        ClientSender.httpTestLoginReq("it3389","111111",this,this.testLoginHanlder);
        
    }
    private testLoginHanlder(data:any):void
    {
        console.log(data);
    }
    private onLoaded():void
    {
        LayerManager.ins.init();
        DebugViewUtil.init();
        SceneMananger.ins.enter(SceneMananger.LOGIN_SCENE);
        
    }
    /**资源加载进度 */
    protected onLoadProgress(data):void
    {

    }
}
//程序入口
Laya.MiniAdpter.init();
Config.isAntialias = true;//绘图抗锯齿
Laya.init(GameConfig.STAGE_WIDTH, GameConfig.STAGE_HEIGHT,Laya.WebGL);
Laya.Stat.show(0,0);
Laya.stage.scaleMode = "showAll";//showall跟showAll不一样。。。。
Laya.stage.alignH = "center";
Laya.stage.alignV = "top";
// SoundManager.useAudioMusic = false;

//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad));
function beginLoad(){    
    //实例UI界面
    var game:Game = new Game();
    game.init();
}
    