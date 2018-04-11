/*
* 配置表管理器
*/
class ConfigManager{

    private languageMap:Object = {};
    private static _ins:ConfigManager = null;

    public static get ins():ConfigManager
    {
        if(this._ins == null)
        {
            this._ins = new ConfigManager();
        }
        return this._ins;
    }
    constructor(){
        
    }

}