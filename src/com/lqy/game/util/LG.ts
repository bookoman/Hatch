/*
* 语言包
*/
class LG{
    private static dic:Dictionary = null;
    constructor(){
       
    }
    public static parse(data):void
    {
        if(this.dic == null)
        {
            this.dic = new Dictionary();
        }
        var list = String(data).split("\r\n");
        for(var i = 0; i < list.length; i ++)
        {
            var s:string = list[i];
            if(s.indexOf("#") == 0)
                continue;
            s = s.replace(/\\r/g,"\r");
            s = s.replace(/\\n/g,"\n");
            var index = s.indexOf(":");
            if(index != -1)
            {
                var name:string = s.substring(0,index);
                var value:string = s.substr(index + 1);
                value = value.split("##")[0];
                this.dic[name] = StringUtil.trimRight(value);
            }
        }
    }

     /**
     * 替换占位符
     * @param key int或String类型，int是为了兼容旧的语言配置
     * @param rest
     * @return String
     */
    public static getTXT(translationId:string,args):void
    {
        var reg=new RegExp("\\{(\\d+)\\}");

        var input = this[translationId]  ? this[translationId] : translationId+"";
        var obj = reg.exec(input);
        while(obj && args.length > 0)
        {
            
            var id = parseInt(obj[1]);
            var str = String(args[id]);
            
            if(id >= 0 && id < args.length)
            {
                var idx = str.indexOf("$")
                if(idx>-1){
                    str = str.slice(0,idx) + "$" + str.slice(idx);
                }
                input =input.replace(reg,str);
            }
            else
            {
                input = input.replace(reg,"{}");
            }
            obj = reg.exec(input);
        }
        return input;
    }
}