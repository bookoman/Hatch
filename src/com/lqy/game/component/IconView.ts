/*
* 图标
*/
class IconView extends ui.comp.IconViewUI{
    public data:any;
    
    constructor(){
        super();
    }
    public setData(data:any):void
    {
        this.data = data;
        this.clipBG.skin = "comp/clip_qulity"+data.quality+".png";
        this.imgIcon.skin = "res/outside/icons/heros/"+data.iconName +".png";
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
        this.clipBG.index = 1;
        this.scale(1.2,1.2);
    }
    private onMouseUP(e):void
    {
        this.clipBG.index = 0;
        this.scale(1,1);
    }
    
}
