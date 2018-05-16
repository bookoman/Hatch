/*
* name;
*/
class LoginScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        new LoginMediator([{url:"res/atlas/comp.atlas",type:Loader.ATLAS},{url:"unpack/login/logo.png",type:Loader.IMAGE}]);
    }

    public leave():void
    {
        
    }
}