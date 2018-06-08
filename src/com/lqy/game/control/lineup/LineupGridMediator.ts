/*
* 阵型格子
*/
class LineupGridMediator extends BaseMediator{
    public heroId:string;
    public lineupId:number;
    private uiRole:UIRole;
    private caller:any;
    private clickCall:Function;
    private iconView:IconView;
    constructor(assetsUrl?:any,view?:any,caller?:any,clickCall?:Function){
        super(assetsUrl,view);
        this.caller = caller;
        this.clickCall = clickCall;
    }
    protected initView():void
    {
        super.initView();
    }
    protected addEvents():void
    {
        this.view.on(Laya.Event.CLICK,this,this.onViewClick);
    }
    protected removeEvents():void
    {
        this.view.off(Laya.Event.CLICK,this,this.onViewClick);
    }
    
    public getView():ui.lineup.LineupGridViewUI
    {
        return this.view;
    }
    public setUpHero(heroId:string,iconView?:IconView):void
    {
        if(heroId == this.heroId)
        {
            return;
        }
        if(this.iconView)
        {
            this.iconView.setSelect(false);
        }
        this.heroId = heroId;
        this.iconView = iconView;
        var heroVo:HeroVo = GameDataManager.ins.getHeroVoByHeroId(this.heroId);
        if(this.uiRole == null)
        {
            this.uiRole = new UIRole(heroVo.heroKey);
            this.uiRole.addParent(this.view,this.view.clipShadow.width/2,this.view.clipShadow.height/2);
        }
        else
        {
            this.uiRole.updateRole(heroVo.heroKey);
        }
    }

    public revokeUpHero():void
    {
        this.heroId = null;
        if(this.uiRole)
        {
            this.uiRole.dispose();
            this.uiRole = null;
        }
        if(this.iconView)
        {
            this.iconView.setSelect(false);
            this.iconView = null;
        }
    }
    /**设置阴影选中 */
    public setClipShadowIndex(index:number):void
    {
        this.view.clipShadow.index = index;
    }
    public setLineupIDLable(lineupID:number):void
    {
        this.view.lblLineupID.text = lineupID;
    }

    public dispose():void
    {
        super.dispose();
        if(this.uiRole)
        {
            this.uiRole.dispose();
            this.uiRole = null;
        }
        this.caller = null;
        this.clickCall = null;
        this.iconView = null;
    }
   
    private onViewClick(e):void
    {
        if(this.caller && this.clickCall)
        {
            this.clickCall.call(this.caller,this);
        }
    }

    

}