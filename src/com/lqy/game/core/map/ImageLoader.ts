import Texture = Laya.Texture;
/*
* 地图块加载
*/
class ImageLoader extends Laya.EventDispatcher{
    private url:string;
    public key:string;
    public bmpd:Texture;
    constructor(mapID:string,url:string){
        super();
        this.url = url;
        this.key = mapID;
    }
    public load():void
    {
        Laya.loader.load(this.url,new Handler(this,this.loadCompleted),null,Loader.IMAGE);
    }

    private loadCompleted(data):void
    {
        this.bmpd = data;
        this.event(LayaEvent.COMPLETE,this);
    }
    

}