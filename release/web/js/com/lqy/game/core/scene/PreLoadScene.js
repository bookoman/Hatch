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
            // {url:"res/atlas/comp.atlas",type:Loader.ATLAS,size:45,priority:2},
            { url: "res/outside/sound/effect/fit.wav", type: Loader.SOUND, size: 20, priority: 1 },
            { url: "res/outside/sound/bg/jzd.mp3", type: Loader.SOUND, size: 10, priority: 1 },
            { url: "res/outside/sound/bg/zzd.mp3", type: Loader.SOUND, size: 10, priority: 1 },
            { url: "res/atlas/worldmap.atlas", type: Loader.ATLAS, size: 10, priority: 1 },
            { url: "res/atlas/main.atlas", type: Loader.ATLAS, size: 10, priority: 1 },
            { url: "unpack/login/logo.png", type: Loader.IMAGE },
            { url: "unpack/comp/dibanbg.png", type: Loader.IMAGE },
            { url: "unpack/comp/line.png", type: Loader.IMAGE },
            { url: "unpack/comp/mainbg.png", type: Loader.IMAGE },
            { url: "res/atlas/ani/click_skip.atlas", type: Loader.ATLAS },
            { url: "unpack/cgani/img_page1.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page2.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page3.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page4.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page5.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page6.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page7.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page8.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page9.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page10.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page11.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_page12.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_left.png", type: Loader.IMAGE },
            { url: "unpack/cgani/img_right.png", type: Loader.IMAGE },
            { url: "res/config/GateMapSample.xml", type: Loader.TEXT },
            { url: "res/config/GateSample.xml", type: Loader.TEXT },
            { url: "res/config/HeroSkillSample.xml", type: Loader.TEXT },
            { url: "res/config/QualitySample.xml", type: Loader.TEXT },
            { url: "res/config/HeroLevelSample.xml", type: Loader.TEXT },
            { url: "res/config/HeroSample.xml", type: Loader.TEXT },
            { url: "res/config/HeroTypeSample.xml", type: Loader.TEXT },
            { url: "res/config/QualityScoreSample.xml", type: Loader.TEXT },
            { url: "res/config/MasterHeroSample.xml", type: Loader.TEXT },
            { url: "res/config/ItemSample.xml", type: Loader.TEXT },
            //地图板块
            { url: "unpack/worldmap/p1.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p2.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p3.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p4.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p5.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p6.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p7.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p8.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p9.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p10.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p11.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p12.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p13.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/p14.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/bg1.jpg", type: Loader.IMAGE },
            { url: "unpack/worldmap/bg2.jpg", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_gatebg.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_listbg.png", type: Loader.IMAGE },
            { url: "unpack/worldmap/img_listgraybg.png", type: Loader.IMAGE },
            { url: "res/atlas/worldmap.atlas", type: Loader.ATLAS }
        ];
        Laya.loader.load(resAry, Handler.create(this, this.onLoaded), Handler.create(this, this.loadGameResProgress, null, false));
        PreLoadingView.ins.setCallBack(this, this.loadedComplete);
    };
    PreLoadScene.prototype.loadGameResProgress = function (value) {
        PreLoadingView.ins.setProgress(value);
    };
    PreLoadScene.prototype.loadedComplete = function () {
        if (GameConfig.isShowCG)
            CGAnimation.ins.show(this, this.enterGame);
        else
            this.enterGame();
    };
    PreLoadScene.prototype.enterGame = function () {
        ConfigManager.ins.parsePreLoadConfigs();
        SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
    };
    PreLoadScene.prototype.onLoaded = function () {
        PreLoadingView.ins.setProgress(1);
        // ConfigManager.ins.parsePreLoadConfigs();
        // SceneMananger.ins.enter(SceneMananger.GAME_SCENE);
        // DebugViewUtil.log("浏览器宽高",Laya.Browser.width+","+Laya.Browser.height);
    };
    PreLoadScene.prototype.leave = function () {
    };
    return PreLoadScene;
}(BaseScene));
//# sourceMappingURL=PreLoadScene.js.map