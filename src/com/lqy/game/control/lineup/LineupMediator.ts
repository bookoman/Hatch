/*
* 阵型
*/
class LineupMediator extends BaseMediator{
    private mapGridPoints:Array<Object> = [{x:1,y:0},{x:1,y:2},{x:1,y:4},{x:0,y:1},{x:0,y:3}];
    private dragIcon:IconView;
    private curSelectGrid:LineupGridMediator;
    private lineupGrids:Array<LineupGridMediator>;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.lineup.LineupViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();

        this.initLineup();
        
    }
    protected addEvents():void
    {
        this.view.listIcon.renderHandler = new Handler(this,this.listIconRender);
        this.view.listIcon.selectEnable = true;
        this.view.listIcon.selectHandler = new Handler(this, this.listIconSelect);
        this.view.listIcon.mouseHandler = new Handler(this,this.onMouseHandler);
        
    }
    protected removeEvents():void
    {
        this.view.listIcon.renderHandler = null;
        this.view.listIcon.selectHandler = null;
        this.view.listIcon.mouseHandler = null;
    }
    
    private listIconRender(cell:IconView,index:number):void
    {
        if(cell && cell.dataSource)
        {
            cell.setData(cell.dataSource);
        }
        
    }
    private onLineupGridClick(lineupGrid:LineupGridMediator):void
    {
        this.curSelectGrid = lineupGrid;
        this.lineupGrids.forEach(lineupGrid => {
            lineupGrid.setClipShadowIndex(0);
        });
        this.curSelectGrid.setClipShadowIndex(1);

    }

    private listIconSelect(index:number):void
    {
        
    }
   
    private onMouseHandler(e:Laya.Event,index:number):void
    {
        if(e.type == Laya.Event.CLICK)
        {
            var iconView:IconView = this.view.listIcon.getCell(index);
            if(iconView)
            {
                if(this.curSelectGrid)
                {
                    if(iconView.selectTick)
                    {
                        this.lineupGrids.forEach(lineupGrid => {
                            if(lineupGrid.roleID == iconView.data.roleID){
                                iconView.setSelect(false);
                                lineupGrid.revokeUpHero();
                            }
                        });
                    }
                    else
                    {
                        iconView.setSelect(true);
                        this.curSelectGrid.setUpHero(iconView.data.roleID,iconView);
                    }
                }
                else
                {
                    this.lineupGrids.forEach(lineupGrid => {
                        if(lineupGrid.roleID == iconView.data.roleID){
                            lineupGrid.revokeUpHero();
                            iconView.setSelect(false);
                        }
                    });
                    
                }
            }
        }
        else if(e.type == Laya.Event.MOUSE_UP)
        {   

        }
    }

    private initLineup():void
    {
        var upRoleVos:Array<RoleVo> = GameDataManager.ins.selfPlayerData.roleVoAry;

        this.lineupGrids = new Array();
        var lineupGridMediator:LineupGridMediator = null;
        var mapGridPoint:Object;
        var lineupID:number;
        for(var i = 0;i < 5; i++)
        {
            lineupID = i + 1;
            lineupGridMediator = new LineupGridMediator(null,this.view["grid"+i],this,this.onLineupGridClick);
            lineupGridMediator.setLineupIDLable(lineupID);
            for(var j = 0;j < upRoleVos.length;j++)
            {
                if(upRoleVos[j].lineupGrid == lineupID)
                {
                    lineupGridMediator.setUpHero(upRoleVos[j].id);
                    break;
                }
            }
            this.lineupGrids.push(lineupGridMediator);
        }

        // 使用但隐藏滚动条
        // this.view.listIcon.hScrollBarSkin = "";
        var ids:Array<string> = ["10000","10001","10002","10007","10006"];
        var ary:Array<Object> = [];
        var qulityInd:number = 0;
        var iconInd:number = 0;
        var isSelect:boolean = false;
        
        for(i = 0;i < ids.length;i++)
        {
            qulityInd++;
            iconInd++;
            if(qulityInd > 7)
                qulityInd = 1;
            if(iconInd > 9)
                iconInd = 1;
            for(j = 0;j < upRoleVos.length;j++)
            {
                if(upRoleVos[j].id == ids[i])
                {
                    isSelect = true;
                    break;
                }
            }
            ary.push({quality:qulityInd,iconName:"icon-00"+iconInd,roleID:ids[i],select:isSelect});
        }
        
        this.view.listIcon.array = ary;

    }
   

    public dispose():void
    {
        this.lineupGrids.forEach(element => {
            element.dispose();
            element = null;
        });
        this.lineupGrids = null;
        super.dispose();
    }
}