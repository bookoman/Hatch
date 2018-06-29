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
    /**得到真打怪物 */
    public getMastersAry():Array<string>
    {

        return this.masters.split(";");
    }
    /**随机怪物key */
    public getRandowHandUpMasters(masterCount?:number,isTureBattle?:boolean):Array<string>
    {
        isTureBattle = isTureBattle === undefined ? false : isTureBattle;
        var tempAry:Array<string> = this.getMastersAry();
        if(isTureBattle)
        {
            tempAry = this.getMastersAry();
        }
        else
        {
            tempAry = this.getHangUpMastersAry();
        }
        var masterKeys:Array<string> = [];
        var percents:Array<number> = [];
        for(var i = 0;i < tempAry.length;i++)
        {
            var ary:Array<string> = tempAry[i].split(",");
            masterKeys[i] = ary[0];
            percents[i] = Number(ary[1]);
        }
        var sumCount:number = masterCount === undefined ? this.masterCount : masterCount;
        var randomMasterKeys:Array<string> = [];
        for(var count = 0;count < sumCount;count++)
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
    /**得到奖励 */
    public getRandowRewards():Array<string>
    {
        var tempAry:Array<string> = this.randomRewards.split(";");
        var masterKeys:Array<string> = [];
        var percents:Array<number> = [];
        var numAry:Array<number> = [];
        for(var i = 0;i < tempAry.length;i++)
        {
            var ary:Array<string> = tempAry[i].split(",");
            
            masterKeys[i] = ary[0];
            if(ary.length == 4){
                percents[i] = Number(ary[3]);
                numAry[i] = Number(ary[2]);
            }
            else
            {
                percents[i] = Number(ary[2]);
                numAry[i] = Number(ary[1]);
            }
        }
        var rewardCount:number = Math.ceil(Math.random() * 4);
        var randomMasterKeys:Array<any> = [];
        for(var count = 0;count < rewardCount;count++)
        {
            var len:number = percents.length;
            var sum:number = 0;
            percents.forEach(percent => {
                sum += percent;
            });
            var n:number = Math.random() * sum;
            var m:number = 0;
            var randomKey:string;
            var num:number;
            for(i = 0;i < percents.length;i++)
            {
                if(m <= n && n < m + percents[i])
                {
                    randomKey = masterKeys[i];
                    num = Math.ceil(numAry[i] * Math.random());
                    randomMasterKeys.push([randomKey,num]);
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