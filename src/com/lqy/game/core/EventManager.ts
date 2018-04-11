/*
* 事件管理器
*/
class EventManager{
    /**事件管理器 */
    public eventObj:Dictionary = null;
    constructor(){
        if(this.eventObj == null)
        {
            this.eventObj = new Dictionary();
        }
    }
    private static _ins:EventManager = null;
    private static get ins():EventManager
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
    public dispatchEvent(type,data):void
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