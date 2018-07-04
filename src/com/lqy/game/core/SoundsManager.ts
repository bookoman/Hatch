
import SoundChannel = Laya.SoundChannel;
import LayaSoundManager = Laya.SoundManager;
/*
* 声音管理器
*/
class SoundsManager{
    private musicsConfig:Array<any> = [
        {"url":"res/outside/sound/bg/jzd.mp3","desc":"假战斗背景"},
        {"url":"res/outside/sound/bg/zzd.mp3","desc":"真战斗背景"},
        {"url":"res/outside/sound/bg/ui-map.ogg","desc":"大地图背景"},
        {"url":"res/outside/sound/bg/ui-bjyy.mp3","desc":"UI背景"},
        {"url":"res/outside/sound/bg/ui_dl.mp3","desc":"登录背景"}
    ]
    private soundsConfig:Array<any> = [
        {"url":"res/outside/sound/effect/ui_dj.wav","desc":"点击音效"},
        {"url":"res/outside/sound/effect/ui_gb.mp3","desc":"关闭音效"},
        {"url":"res/outside/sound/effect/ui_dl.mp3","desc":"报错音效"},
        {"url":"res/outside/sound/effect/ui_gold.wav","desc":"消耗金币音效"},
        {"url":"res/outside/sound/effect/ui_dl.mp3","desc":"收获音效"},
        {"url":"res/outside/sound/effect/sl.ogg","desc":"战斗胜利音效"},
        {"url":"res/outside/sound/effect/sb.ogg","desc":"战斗失败音效"}
    ]
    private soundChannelDic:Dictionary;
    constructor(){
        this.soundChannelDic = new Dictionary();
    }
    private static _ins:SoundsManager = null;
    public static get ins():SoundsManager
    {
        if(this._ins == null)
        {
            this._ins = new SoundsManager();
        }
        return this._ins;
    }
    /**
     * 播放背景音乐
     * @param url 
     * @param loops 
     * @param complete 
     * @param startTime 
     */
    public playMusic(url:string, loops:number = 0, complete:Laya.Handler = null, startTime:number = 0):void
    {
        LayaSoundManager.playMusic(url,loops,complete,startTime);
    }
    /**
     * 播放音效
     * @param url 
     * @param loops 
     * @param complete 
     * @param soundClass 
     * @param startTime 
     */
    public playSound(url:string, loops:number = 1, complete:Laya.Handler = null, soundClass:any = null, startTime:number = 0):void
    {
        var soundChannel:SoundChannel = this.soundChannelDic.get(url);
        if(soundChannel)
        {
            this.removeChannel(soundChannel)
        }
        this.soundChannelDic.set(url,LayaSoundManager.playSound(url,loops,complete,soundClass,startTime));
    }
    /**
     * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。 
     * @param volume 
     */
    public setMusicVolume(volume:number):void
    {
        LayaSoundManager.setMusicVolume(volume);
    }
    /**
     * 设置声音音量。根据参数不同，可以分别设置指定声音（背景音乐或音效）音量或者所有音效（不包括背景音乐）音量。
     * @param volume 
     * @param url 
     */
    public setSoundVolume(volume:number, url:string = null):void
    {
        LayaSoundManager.setSoundVolume(volume,url);
    }
    /**
     * 停止所有音乐
     */
    public stopAll():void
    {
        LayaSoundManager.stopAll();
    }
    /**
     * 停止播放所有音效（不包括背景音乐）
     */
    public stopAllSound():void
    {
        LayaSoundManager.stopAllSound();
    }
    /**
     * 停止播放背景音乐
     */
    public stopMusic():void
    {
        LayaSoundManager.stopMusic();
    }
    /**
     * 移除播放的声音实例。 
     * @param channel 
     */
    public removeChannel(channel:SoundChannel):void
    {
        LayaSoundManager.removeChannel(channel);
    }

    /**播放背景音乐 */
    public playerMusicByEnum(eId:number, loops:number = 0, complete:Laya.Handler = null, startTime:number = 0):void
    {
        var config = this.musicsConfig[eId];
        this.playMusic(config.url,loops,complete,startTime);
    }
    /**播放背景音乐 */
    public playerSoundByEnum(eId:number, loops:number = 0, complete:Laya.Handler = null, startTime:number = 0):void
    {
        var config = this.soundsConfig[eId];
        this.playSound(config.url,loops,complete,startTime);
    }
}