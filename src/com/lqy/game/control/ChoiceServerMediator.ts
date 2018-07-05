import Label = Laya.Label;
import Box = Laya.Box;
 /**
 * 服务器选择列表
 */
class ChoiceServerMediator extends BaseMediator{
    private caller:any;
    public choiceCallBack:Function;
    constructor(assetsUrl = null,view = null,caller?:any,choiceCallBack?:Function){
        super(assetsUrl,view);
        this.caller = caller;
        this.choiceCallBack = choiceCallBack;
    }

    protected initView():void{
        super.initView();
        this.view.listServer.array = GameDataManager.ins.serverList;
        (this.view.listServer as Laya.List).scrollBar.visible = false;
        if(GameDataManager.ins.curServerInfo)
        {
            this.view.boxPreServ0.getChildByName("lblServName").text = GameDataManager.ins.curServerInfo.name;
        }
    }

    protected addEvents():void{
        this.view.listServer.selectEnable = true;
        this.view.listServer.selectHandler = new Handler(this, this.onSelect);
        this.view.listServer.renderHandler = new Handler(this, this.updateItem);
        this.view.bg.on(Laya.Event.CLICK,this,this.onMouseClick);
        this.view.btnBack.on(Laya.Event.CLICK,this,this.onMouseClick);
    }

    protected removeEvents():void{
        this.view.listServer.selectHandler = null;
        this.view.listServer.renderHandler = null;
        this.view.bg.off(Laya.Event.CLICK,this,this.onMouseClick);
        this.view.btnBack.off(Laya.Event.CLICK,this,this.onMouseClick);
    }
    private onMouseClick(e:Laya.Event):void
    {
        this.hide();
    }

    private updateItem(cell:Box, index: number): void {

        var tempLbl:Label = cell.getChildByName("lblServName") as Label;
        if(tempLbl)
        {
            tempLbl.text = (cell.dataSource as ServerInfoVo).name;
        }
        var imgState:Laya.Image = cell.getChildByName("imgServState") as Laya.Image;
        if(imgState)
        {
            var sevState:number = cell.dataSource.state;
            if(sevState > 2)
                sevState = 2;
            imgState.skin = "login/img_state"+sevState+".png";
        }
    }

    private onSelect(index: number): void {
        // console.log("当前选择的索引：" + index);
        var cell:Box = this.view.listServer.getCell(index);
        if(cell)
        {
            (cell.getChildByName("clip") as Laya.Clip).index = 0;
        }
        GameDataManager.ins.choiceServerInfo(index);
        if(this.caller && this.choiceCallBack)
        {
            this.choiceCallBack.call(this.caller);
        }
        this.hide();
    }

    public show():void
    {
        this.view.visible = true;
    }
    public hide():void
    {
        this.view.visible = false;
    }
        
    public dispose():void
    {
        super.dispose();
    }

    private onBtnChoiceOK():void{
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,false);
    }
}