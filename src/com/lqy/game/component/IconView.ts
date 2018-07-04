/*
* 图标
*/
class IconView extends ui.comp.IconViewUI{
    public heroId:string;
    public lineupId:number;
    public selectTick:boolean = false;
    constructor(){
        super();
    }
    public setData(data:any):void
    {
        this.heroId = data.heroId;
        this.lineupId = data.lineupId;

        this.clipBG.skin = "comp/clip_qulity"+data.quality+".png";
        this.clipBG.skin = "comp/q_"+data.quality+".png";
        this.imgIcon.skin = "res/outside/icons/heros/"+data.iconName +".png";
        if(data.select)
        {
            this.setSelect(true);
            data.select = false;
        }
    }
     /**设置选中 */
    public setSelect(bool?:boolean):void
    {
        if(bool === undefined)
        {
            this.selectTick = !this.selectTick;
        }
        else
        {
            this.selectTick = bool;
        }
        this.imgTick.visible = this.selectTick;
        
    }
    public dispose():void
    {
        this.removeEvents();
        this.removeSelf();
    }

    private addEvents():void
    {
        this.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onMouseUP);
    }
    public removeEvents():void
    {
        this.off(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onMouseUP);
    }

    private onMouseDown(e):void
    {
        // this.clipBG.index = 1;
        this.scale(1.2,1.2);
    }
    private onMouseUP(e):void
    {
        // this.clipBG.index = 0;
        this.scale(1,1);
    }
    
}
