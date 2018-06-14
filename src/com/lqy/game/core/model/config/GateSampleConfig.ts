/*
* 关卡地图配置表
*/
class GateSampleConfig{
    public key:string;
    public gateName:string;
    public nextGateKey:string;
    public mapId:string;
    public level:number;
    public atkCount:number;
    public atkns:string;
    /**关卡随机配置 */
    public hangUpMasters:string = "Master_10001,600;Master_10033,900;Master_10041,900;Master_10049,400;Master_10057,900;Master_10065,1000;Master_10073,1100";
    public masterCount:number = 3;
    public masters:string;
    public randomRewards:string;
    public randomCount:number;
    public rewards:string;
    public firstRewards:string;
    /**随机生成怪物key */
    public gateRandomKeys:Array<string>;


    constructor(){

    }
    /**得到挂机地图随机怪物权重 */
    public getHangUpMastersAry():Array<string>
    {
        return this.hangUpMasters.split(";");
    }
    /**随机怪物key */
    public getRandowHandUpMasters():Array<string>
    {
        var gateSmaleConfig:GateSampleConfig = new GateSampleConfig();
        var tempAry:Array<string> = gateSmaleConfig.getHangUpMastersAry();
        var masterKeys:Array<string> = [];
        var percents:Array<number> = [];
        for(var i = 0;i < tempAry.length;i++)
        {
            var ary:Array<string> = tempAry[i].split(",");
            masterKeys[i] = ary[0];
            percents[i] = Number(ary[1]);
        }

        var randomMasterKeys:Array<string> = [];
        for(var count = 0;count < this.masterCount;count++)
        {
            var len:number = percents.length;
            var sum:number = 0;
            percents.forEach(percent => {
                sum += percent;
            });
            var n:number = Math.random() * sum;
            var m:number = 0;
            var randomKey:string;
            for(i = 0;i < percents.length;i++)
            {
                if(m <= n&& n < m + percents[i])
                {
                    randomKey = masterKeys[i];
                    randomMasterKeys.push(randomKey);
                    masterKeys.splice(i,1);
                    percents.splice(i,1);
                    break;
                }
                m += percents[i];
            }
        }
        // console.log("......"+ randomMasterKeys);
        return randomMasterKeys;
    }
}