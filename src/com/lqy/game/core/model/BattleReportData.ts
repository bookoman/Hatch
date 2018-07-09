/*
* name;
*/
class BattleReportData{
    public static REPORT_SUM_LIMIT:number = 50;
    public reportVos:Array<BattleReportVo>
    constructor(){
        this.reportVos = [];
    }
    private static _ins:BattleReportData = null;
    public static get ins():BattleReportData
    {
        if(this._ins == null)
        {
            this._ins = new BattleReportData();
        }
        return this._ins;
    }
    /**添加战报数据 */
    public addBattleReportVo(type:number,atkName:string,defName?:string,hurt?:number,rewardDatas?:Array<string>):void
    {
        if(this.reportVos.length > BattleReportData.REPORT_SUM_LIMIT)
        {
            this.reportVos.shift();
        }
        var vo:BattleReportVo = new BattleReportVo();
        vo.type = type;
        if(type == BattleReportDataType.HURT)
        {
            vo.atkName = atkName;
            vo.defName = defName;
            vo.hurt = hurt;
        }
        else if(type == BattleReportDataType.BATTLE_DIE)
        {
            vo.atkName = atkName;
            vo.defName = defName;
            vo.hurt = hurt;
        }
        else if(type == BattleReportDataType.REWARD)
        {
            // vo.rewardName = rewardName;
            // vo.rewardNum = rewardNum;
            vo.rewardDatas = rewardDatas;
        }
        this.reportVos.push(vo);
        if(GameDataManager.showModuleViewInd == GameButtomTabIndex.BATTLE){
            EventManager.ins.dispatchEvent(EventManager.REPORT_DATA_UPDATE,vo);
        }
    }
}