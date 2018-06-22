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
            {url:"res/atlas/worldmap.atlas",type:Loader.ATLAS,size:10,priority:1},
            {url:"res/atlas/main.atlas",type:Loader.ATLAS,size:10,priority:1},
            {url:"unpack/login/logo.png",type:Loader.IMAGE},
            {url:"unpack/main/main.jpg",type:Loader.IMAGE},
            {url:"unpack/main/role.jpg",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p1.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p2.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p3.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p4.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p5.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p6.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/p7.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/bg.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/img_gatebg.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/img_listbg.png",type:Loader.IMAGE},
            // {url:"unpack/worldmap/img_listgraybg.png",type:Loader.IMAGE},
            {url:"res/config/GateMapSample.xml",type:Loader.TEXT},
            {url:"res/config/GateSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroSkillSample.xml",type:Loader.TEXT},
            {url:"res/config/QualitySample.xml",type:Loader.TEXT},
            {url:"res/config/HeroLevelSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroSample.xml",type:Loader.TEXT},
            {url:"res/config/HeroTypeSample.xml",type:Loader.TEXT},
            {url:"res/config/QualityScoreSample.xml",type:Loader.TEXT},
            {url:"res/config/MasterHeroSample.xml",type:Loader.TEXT},
            {url:"res/config/ItemSample.xml",type:Loader.TEXT}
        ];
        Laya.loader.load(resAry, Handler.create(this,this.onLoaded),Handler.create(this,this.loadGameResProgress,null,false));
        PreLoadingView.ins.setCallBack(this,this.loadedComplete);
    }
    private loadGameResProgress(value):void
    {
        PreLoadingView.ins.setProgress(value);
    }
    private loadedComplete():void
    {
        ConfigManager.ins.parsePreLoadConfigs();
        SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
    }
    public onLoaded(): void
    {
        PreLoadingView.ins.setProgress(1);
        // ConfigManager.ins.parsePreLoadConfigs();
        // SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
        // DebugViewUtil.log("浏览器宽高",Laya.Browser.width+","+Laya.Browser.height);
    }

    public leave():void
    {
        
    }
}