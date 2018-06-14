/*
* 预加载场景
*/
class PreLoadScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        var resAry:Array<Object> = [
            // {url:"res/atlas/comp.atlas",type:Loader.ATLAS,size:45,priority:2},
            {url:"res/outside/sound/effect/fit.wav",type:Loader.SOUND,size:20,priority:1},
            {url:"res/outside/sound/bg/zhou.mp3",type:Loader.SOUND,size:10,priority:1},
            {url:["unpack/login/logo.png","unpack/main/main.jpg","unpack/main/role.jpg"],type:Loader.IMAGE,size:25,priority:1},
            {url:"res/config/GateMapSample.xml",type:Loader.TEXT},
            {url:"res/config/GateSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroSkillSample.xml",type:Loader.TEXT},
            {url:"res/config/QualitySample.xml",type:Loader.TEXT},
            {url:"res/config/HeroLevelSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroTypeSample.xml",type:Loader.TEXT},
            {url:"res/config/QualityScoreSample.xml",type:Loader.TEXT},
            {url:"res/config/MasterHeroSample.xml",type:Loader.TEXT}
        ];
        Laya.loader.load(resAry, Handler.create(this,this.onLoaded),Handler.create(this,this.loadGameResProgress,null,false));
    }
    private loadGameResProgress(value):void
    {
        PreLoadingView.ins.setProgress(value);
    }
    public onLoaded(): void
    {
        PreLoadingView.ins.setProgress(1);
        ConfigManager.ins.parsePreLoadConfigs();
        SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
        // DebugViewUtil.log("浏览器宽高",Laya.Browser.width+","+Laya.Browser.height);
    }

    public leave():void
    {
        
    }
}