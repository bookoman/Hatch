/*
* 声音管理器
*/
class SoundManager{
    constructor(){

    }
    private static _ins:SoundManager = null;
    public static get ins():SoundManager
    {
        if(this._ins == null)
        {
            this._ins = new SoundManager();
        }
        return this._ins;
    }

    public soundPlay():void
    {

    }
    public soundParse():void
    {
        
    }
}