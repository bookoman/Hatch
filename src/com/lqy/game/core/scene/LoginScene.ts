/*
* name;
*/
class LoginScene extends BaseScene{
    private loginMediator:LoginMediator = null;
    constructor(){
        super();
    }
    public enter():void
    {
        this.loginMediator = new LoginMediator();
    }

    public leave():void
    {
        if(this.loginMediator)
        {
            this.loginMediator.dispose();
        this.loginMediator = null;
        }
    }
}