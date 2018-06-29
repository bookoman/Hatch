/*
* name;
*/
class RightFunctionButtons extends Laya.Sprite{
    private 
    constructor(){
        super();
    }
    private static _ins:RightFunctionButtons = null;
    public static get ins():RightFunctionButtons
    {
        if(this._ins == null)
        {
            this._ins = new RightFunctionButtons();
        }
        return this._ins;
    }
    public initComponets():void
    {
        
    }

}