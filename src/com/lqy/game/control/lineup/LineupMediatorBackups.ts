/*
* 阵型备份
*/
class LineupMediatorBackups extends BaseMediator{
   private dragIcon:IconView;
    private dragTime:number = 0;
    private lastMoveY:number = 0;
    private lineupGrids:Array<LineupGridMediator>;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();

        this.lineupGrids = new Array();
        var lineupGridMediator:LineupGridMediator = null;
        for(var i = 0;i < 6; i++)
        {
            lineupGridMediator = new LineupGridMediator(null,this.view["grid"+i]);
            this.lineupGrids.push(lineupGridMediator);
        }

        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var ids:Array<string> = ["10000","10001","10002","10003","10004"];
        var ary:Array<Object> = [];
        var qulityInd:number = 0;
        var iconInd:number = 0;
        var idInd:number = -1;
        for(i = 0;i < 20;i++)
        {
            qulityInd++;
            iconInd++;
            idInd++;
            if(qulityInd > 7)
                qulityInd = 1;
            if(iconInd > 9)
                iconInd = 1;
            if(idInd > ids.length)
            {
                idInd = 0;
            }
            
            ary.push({quality:qulityInd,iconName:"icon-00"+iconInd,roleID:ids[idInd]});
        }
        this.view.listIcon.array = ary;
    }
    protected addEvents():void
    {
        this.view.listIcon.renderHandler = new Handler(this,this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this,this.onMouseHandler);
        this.view.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        this.view.on(Laya.Event.MOUSE_UP,this,this.onViewMouseUp); 
        
    }
    protected removeEvents():void
    {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
        this.view.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
        this.view.off(Laya.Event.MOUSE_UP,this,this.onViewMouseUp); 
    }
    private listIconRender(cell:IconView,index:number):void
    {
        if(cell && cell.dataSource)
        {
            cell.setData(cell.dataSource);
        }
        
    }

    private listIconSelect(index:number):void
    {
        
    }
   
    private onMouseHandler(e:Laya.Event,index:number):void
    {
        if(e.type == Laya.Event.MOUSE_DOWN)
        {
            this.dragTime = 0;
            this.lastMoveY = this.view.mouseY;
            Laya.timer.loop(1000,this,this.calDragIconTime,[index]);
        }
        else if(e.type == Laya.Event.MOUSE_UP)
        {
            this.dragTime = 0;
            Laya.timer.clear(this,this.calDragIconTime);
        }
    }
    private calDragIconTime(index:number):void
    {
        this.dragTime++;
        if(this.dragTime >= 1)
        {
            var cell:IconView = this.view.listIcon.getCell(index);
            if(cell)
            {
                if(this.dragIcon)
                {
                    this.dragIcon.dispose();
                    this.dragIcon = null;
                }
                this.dragIcon = new IconView();
                this.dragIcon.setData(cell.data);
                this.dragIcon.x = this.view.mouseX - this.dragIcon.width / 2;
                this.dragIcon.y = this.view.mouseY - this.dragIcon.height / 2;
                this.view.addChild(this.dragIcon);
            }
            Laya.timer.clear(this,this.calDragIconTime);
            //禁止滚动
            var scroll:any = (this.view.listIcon as Laya.List).scrollBar;
            Laya.timer.clear(scroll,scroll.loop);
            // scroll.off(/*laya.events.Event.CHANGE*/"change",this.view.listIcon,this.view.listIcon.onScrollBarChange);
            // scroll.slider.off(/*laya.events.Event.CHANGE*/"change",scroll,scroll.onSliderChange);
        }
    }
    private onViewMouseUp(e):void
    {
        if(this.dragIcon)
        {
            this.dragUpLineup(this.dragIcon.data.roleID);

            this.dragIcon.dispose();
            this.dragIcon = null;
            //启动滚动事件
            var scroll:any = (this.view.listIcon as Laya.List).scrollBar;
            Laya.timer.frameLoop(1,scroll,scroll.loop);
            // scroll.on(/*laya.events.Event.CHANGE*/"change",this.view.listIcon,this.view.listIcon.onScrollBarChange);
            // scroll.slider.on(/*laya.events.Event.CHANGE*/"change",scroll,scroll.onSliderChange);

            
        }
        
    }
    
    private onMouseMove(e):void
    {
        if(this.dragIcon)
        {
            this.dragIcon.x = this.view.mouseX - this.dragIcon.width / 2;
            this.dragIcon.y = this.view.mouseY - this.dragIcon.height / 2;

        }
        //判断Y移动距离大于固定值才移除计时time
        if(this.lastMoveY != this.view.mouseY && Math.abs(this.view.mouseY - this.lastMoveY) > 20)
        {
            DebugViewUtil.log("移除：",this.lastMoveY + ","+ this.view.mouseY);
            this.lastMoveY = this.view.mouseY;
            this.dragTime = 0;
            Laya.timer.clear(this,this.calDragIconTime);
        }
        
        
    }
    /**拖拽上阵型 */
    private dragUpLineup(roleId:string):void
    {
        var lineupGridMediator:LineupGridMediator = null;
        var gridView:ui.lineup.LineupGridViewUI = null;
        for(var i = 0;i <this.lineupGrids.length;i++)
        {
            lineupGridMediator = this.lineupGrids[i];
            gridView = lineupGridMediator.getView();
            if(this.view.mouseX > gridView.x && this.view.mouseX < gridView.x + gridView.clipShadow.width  
            && this.view.mouseY > gridView.y - 40 && this.view.mouseY < gridView.y + gridView.clipShadow.height)
            {
                lineupGridMediator.setUpHero(roleId);
                break;
            }
        }
        
       
    }

    public dispose():void
    {
        super.dispose();
    }
}