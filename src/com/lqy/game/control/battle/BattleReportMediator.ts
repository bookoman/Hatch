import LayaHTMLDivElement = Laya.HTMLDivElement;
/*
* 战报视图
*/
class BattleReportMediator extends BaseMediator{
    private maskHeight:number;
    private linePadding:number = 5;
    private items:Array<LayaHTMLDivElement>;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }

    protected initView():void
    {
        this.view = new ui.battle.BattleReportViewUI();
        (this.view.panelMask as Laya.Panel).vScrollBar.visible = false;
        this.view.x = 0;
        this.view.y = 960;
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,false);
        super.initView();

        this.items = [];
        this.maskHeight = this.view.panelMask.height;
       
    }
    protected addEvents():void
    {
        EventManager.ins.addEvent(EventManager.REPORT_DATA_UPDATE,this,this.reportDataUpdate);
    }

    protected removeEvents():void
    {
        EventManager.ins.removeEvent(EventManager.REPORT_DATA_UPDATE,this);
    }
    /**更新所有战报 */
    public allReportDataUpdate():void
    {
        BattleReportData.ins.reportVos.forEach(vo => {
            this.reportDataUpdate(vo);
        });
    }
    /**清除战报视图 */
    public clearReportView():void
    {
        this.view.panelMask.removeChildren();
        this.items.splice(0,this.items.length);
    }
    /**更新视图 */
    public reportDataUpdate(vo:BattleReportVo):void
    {
        var item:LayaHTMLDivElement;
        if(this.items.length > BattleReportData.REPORT_SUM_LIMIT)
        {
            item = this.items.shift();
            item.removeSelf();
            for(var i = 0;i < this.items.length;i++)
            {
                item = this.items[i];    
                if(i > 0)
                    item.y = this.items[i - 1].y + this.items[i - 1].contextHeight + 5;
                else
                    item.y = 0;
            }
            
        }
        
        var preItemHeight = 0;
        var ty:number = 0;
        if(this.items.length > 0)
        {
            var preItem:LayaHTMLDivElement = this.items[this.items.length - 1];
            preItemHeight = preItem.contextHeight + this.linePadding;
            ty = preItem.y +  preItemHeight  + this.linePadding;
        }
        item = new LayaHTMLDivElement();
        item.innerHTML = vo.getReportDataHtml();
        item.width = this.view.panelMask.width;
        item.y = ty;
        this.view.panelMask.addChild(item);
        this.items.push(item);
        //自动滚动视图
        if(item.y > this.maskHeight)
        {
            (this.view.panelMask as Laya.Panel).scrollTo(0,item.y + item.contextHeight - this.maskHeight);
        }
        
    }
    public setVisible(bool:boolean):void
    {
        this.view.visible = bool;
    }

    public dispose():void
    {
        this.view.panelMask.removeChildren();
        this.items.splice(0,this.items.length);
        this.items = null;
        super.dispose();
    }
    
}