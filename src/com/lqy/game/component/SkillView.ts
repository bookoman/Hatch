import Button = Laya.Button;
/*
* 技能视图
*/
class SkillView extends Laya.Sprite{
    private btns:Array<Button> = null;
    private skillVos:Array<SkillVo> = null;
    constructor(){
        super();
        this.btns = [];
        var btn:Button;
        for(var i = 0;i < 5;i++)
        {
            btn = new Button();
            btn.dataSource = i;
            btn.width = 80;
            btn.height = 30;
            btn.x = i * 90;
            btn.y = 5;
            btn.labelSize = 14;
            btn.visible = false;
            btn.on(Laya.Event.CLICK,this,this.onBtnSkillClick);
            this.addChild(btn);
            this.btns.push(btn);
        }
    }
    private onBtnSkillClick(e:Laya.Event):void
    {
        var ind:number = (e.currentTarget as Button).dataSource;
        var skillVo:SkillVo = this.skillVos[ind];
        if(skillVo)
        {
            if(skillVo.calCD > 0)
            {
                console.log("还有"+skillVo.calCD+"秒才可以使用技能");
            }
            else
            {
                skillVo.isCanUse = false;
                skillVo.calCD = skillVo.cd;
            }
        }
        
    }
    /**
     * 
     * @param ary 
     */
    public init(ary:Array<SkillVo>):void
    {
        this.skillVos = ary;
        var btn:Button;
        var skillVo:SkillVo;
        for(var i = 0;i < this.btns.length;i++)
        {
            btn = this.btns[i];
            if(i < this.skillVos.length)
            {
                skillVo = ary[i];
                btn.skin = "comp/button.png";
                btn.label = ary[i].name + ":" + skillVo.cd;
                btn.visible = true;
            }
            else
            {
                btn.visible = false;
            }
        }
    }
}