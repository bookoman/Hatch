import Loader = Laya.Loader;
/*
* name;
*/
class GameScene extends BaseScene{
    
    constructor(){
        super();
    }
    public enter():void
    {
        // super.enter();
        new GameMediator([{url:"res/atlas/main.atlas",type:Loader.ATLAS},{url:"test/img_bg.png",type:Loader.IMAGE}]);
        // new GameMediator("res/atlas/main.atlas");
    }

    public leave():void
    {
        super.leave();
    }
}