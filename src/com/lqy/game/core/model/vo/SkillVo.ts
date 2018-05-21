/*
* 技能Vo
*/
class SkillVo{
    public id:string;
    public name:string;
    public cd:number;

    //计算数据
    public calCD:number = -1;
    /**CD完成是否使用该技能 */
    public isCanUse:boolean;
    
    constructor(){

    }
    /**cd计时跑起来 */
    public runCD():void
    {
        if(this.calCD != -1)
        {
            if(this.isCanUse)
            {
                this.calCD = this.cd;
            }
            else
            {
                this.calCD--;
                if(this.calCD <= 0)
                {
                    this.calCD = 0;
                    this.isCanUse = true;
                }
            }
            // console.log(this.name + "cd时间："+this.calCD);
        }
    }
}