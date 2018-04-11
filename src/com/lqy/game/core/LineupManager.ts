/*
*阵容管理器
*/
class LineupManager{
    private lineupConfig:Object = {
        "1":"0,1,0_1,1,1_0,1,0",
        "2":"1,0,1_1,0,0_1,0,1"
    }
    constructor(){

    }
    private static _ins:LineupManager = null;
    public static get ins():LineupManager
    {
        if(this._ins == null)
        {
            this._ins = new LineupManager();
        }
        return this._ins;
    }
    /**
     * 根据配置表得到整容二维数组
     * @param id 
     */
    public getCofingByID(id:string)
    {

        var config:string = this.lineupConfig[id];

        var lineupVoAry:Array<LineupVo> = [];
        var rowAry:Array<string> = config.split("_");
        var colAry:Array<string>;
        var lineupVo:LineupVo;
        for(var i = 0;i < rowAry.length;i++)
        {
            colAry = rowAry[i].split(",");
            for(var j = 0;j < colAry.length;j++)
            {
                if(colAry[j] == "0")
                {
                    continue;
                }
                lineupVo = new LineupVo();
                lineupVo.row = i+1;
                lineupVo.col = j+1;
                lineupVo.mark = Number(colAry[j]);
                lineupVoAry.push(lineupVo);
            }
        }
        return lineupVoAry;
    }

}