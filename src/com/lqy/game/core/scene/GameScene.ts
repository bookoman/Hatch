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
        new GameMediator([{url:"res/atlas/main.atlas",type:Loader.ATLAS}]);
        // new GameMediator("res/atlas/main.atlas");
    }

    public leave():void
    {
        super.leave();
    }
}