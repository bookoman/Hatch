/*
* name;
*/
class LoginScene extends BaseScene{
    constructor(){
        super();
    }
    public enter():void
    {
        new LoginMediator();
    }

    public leave():void
    {
        
    }
}