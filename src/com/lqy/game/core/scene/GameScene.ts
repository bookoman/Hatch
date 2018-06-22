import Loader = Laya.Loader;
/*
* 游戏场景
*/
class GameScene extends BaseScene{
    
    constructor(){
        super();
    }
    public enter():void
    {
        // super.enter();
        new GameMediator();
        // new GameMediator("res/atlas/main.atlas");
        
    }

    public leave():void
    {
        super.leave();
    }
}