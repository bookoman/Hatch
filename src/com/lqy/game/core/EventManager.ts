
/*
* 事件管理器
*/
class EventManager{
    /**敌人跑动完成 */
    public static ENEMY_RUNTO_COMPLETE:string = "ENEMY_RUNTO_COMPLETE";
    /**英雄跑动完成 */
    public static HERO_RUNTO_COMPLETE:string = "HERO_RUNTO_COMPLETE";
    /**敌人攻击跑动完成 */
    public static ENEMY_ATT_COMPLETE:string = "ENEMY_ATT_COMPLETE";
     /**敌人攻击跑动完成 */
    public static CHALLENGE_BOSS:string = "CHALLENGE_BOSS";
     /**挑战boss准备完成 */
    public static CHALLENGE_BOSS_READY:string = "CHALLENGE_BOSS_READY";
    /**服务器连接成功 */
    public static SERVER_CONNECTED:string = "SERVER_CONNECTED";

    public static TEST_CHANGE_ROLE_SCALE:string = "TEST_CHANGE_ROLE_SCALE";
    public static TEST_LIST_SCRALE_RENDER:string = "TEST_LIST_SCRALE_RENDER";
    /**选择挑战关卡 */
    public static CHOICE_CHALLEGEN_GATE:string = "CHOICE_CHALLEGEN_GATE";
    /**战报数据更新 */
    public static REPORT_DATA_UPDATE:string = "REPORT_DATA_UPDATE";

    /**事件管理器 */
    public eventObj:Dictionary = null;
    constructor(){
        if(this.eventObj == null)
        {
            this.eventObj = new Dictionary();
        }
    }
    private static _ins:EventManager = null;
    public static get ins():EventManager
    {
        if(this._ins == null)
        {
            this._ins = new EventManager();
        }
        return this._ins;
    }
    /**添加事件 */
    public addEvent(type,protoClass,call):void
    {
        var event_handlers = this.eventObj[type]; 
        if(event_handlers === undefined)
        {
            event_handlers = [];
            this.eventObj[type] = event_handlers;
        }
        event_handlers.push({proto:protoClass,callBack:call});
    }
    /**移除事件回调，第二个参数不传表示移除所有 */
    public removeEvent(type,call):void
    {
        if(call === undefined || call === null)
        {
            delete this.eventObj[type];
        }
        else
        {
            var event_handlers = this.eventObj[type];
            if(event_handlers){
                event_handlers.splice(event_handlers.indexOf(call),1);
            }
        }
    }
    /**派发事件 */
    public dispatchEvent(type,data?:any):void
    {
        var arr = this.eventObj[type];
        for(var i in arr)
        {
            var callObj = arr[i];
            if(data)
            {
                callObj.callBack.call(callObj.proto,data);
            }
            else
            {
                callObj.callBack.call(callObj.proto);
            }
        }
    }
    /**是否存在事件 */
    public hasEvent(type)
    {
        return this.eventObj[type];
    }
}