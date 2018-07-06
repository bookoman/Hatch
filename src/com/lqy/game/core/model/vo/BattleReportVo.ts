/*
* 战斗数据管理
*/
class BattleReportVo{
    public type:number;
    public atkName:string;
    public defName:string;
    public hurt:number;
    public rewardDatas:Array<string>;
    constructor(){
        
    }
    /**
     * 战报字符串
     */
    public getReportDataHtml():string
    {
        var html:string = "";
        switch (this.type) {
            case BattleReportDataType.HURT:
                html = "<font style='fontSize:24;color:#009900'>["+this.atkName+"]</font>"
                + "<font style='fontSize:24;color:#000000'> 攻击 </font>"
                + "<font style='fontSize:24;color:#009900'>["+this.defName+"]</font>"
                + "<font style='fontSize:24;color:#000000'> 造成了 </font>"
                + "<font style='fontSize:24;color:#ff0000'>" + this.hurt+"</font>"
                + "<font style='fontSize:24;color:#000000'> 点伤害 </font>";
                return html;
            case BattleReportDataType.BATTLE_DIE:
                html = "<font style='fontSize:24;color:#009900'>["+this.atkName+"]</font>"
                + "<font style='fontSize:24;color:#000000'> 最后一击打出 </font>"
                + "<font style='fontSize:24;color:#ff0000'>" + this.hurt+"</font>"
                + "<font style='fontSize:24;color:#000000'> 点伤害，成功击败了</font>"
                + "<font style='fontSize:24;color:#009900'>["+this.defName+"]</font>";
                return html;
            case BattleReportDataType.REWARD:
                html = "<font style='fontSize:24;color:#000000'> 战斗结束，获得奖励 </font>";
                
                var itemKey:string;
                var itemNum:number;
                var ind:number = Math.ceil(Math.random() * GameConfig.QUALITY_COLORS.length) - 1;
                ind = 2;
                var qualityColor:string = GameConfig.QUALITY_COLORS[ind];
                for(var i = 0;i < this.rewardDatas.length;i++)
                {

                    itemKey = this.rewardDatas[i][0];
                    itemNum = Number(this.rewardDatas[i][1]);
                    var itemConfig:ItemSampleConfig = ConfigManager.ins.getItemSampleConfig(itemKey);
                    if(!itemConfig)
                        continue;
                    html += "<font style='fontSize:24;color:"+qualityColor+"'>["+itemConfig.itemName+"]</font>" + "<font style='fontSize:24;color:#ff0000'>X" + itemNum;
                    if(i < this.rewardDatas.length - 1)
                        html += ";</font>";
                    else
                        html += "</font>";
                }
                return html;
        }
        return html;
    }

}