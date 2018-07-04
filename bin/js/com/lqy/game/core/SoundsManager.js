var SoundChannel = Laya.SoundChannel;
var LayaSoundManager = Laya.SoundManager;
/*
* 声音管理器
*/
var SoundsManager = /** @class */ (function () {
    function SoundsManager() {
        this.musicsConfig = [
            { "url": "res/outside/sound/bg/jzd.mp3", "desc": "假战斗背景" },
            { "url": "res/outside/sound/bg/zzd.mp3", "desc": "真战斗背景" },
            { "url": "res/outside/sound/bg/ui-map.ogg", "desc": "大地图背景" },
            { "url": "res/outside/sound/bg/ui-bjyy.mp3", "desc": "UI背景" },
            { "url": "res/outside/sound/bg/ui_dl.mp3", "desc": "登录背景" }
        ];
        this.soundsConfig = [
            { "url": "res/outside/sound/effect/ui_dj.wav", "desc": "点击音效" },
            { "url": "res/outside/sound/effect/ui_gb.mp3", "desc": "关闭音效" },
            { "url": "res/outside/sound/effect/ui_dl.mp3", "desc": "报错音效" },
            { "url": "res/outside/sound/effect/ui_gold.wav", "desc": "消耗金币音效" },
            { "url": "res/outside/sound/effect/ui_dl.mp3", "desc": "收获音效" },
            { "url": "res/outside/sound/effect/sl.ogg", "desc": "战斗胜利音效" },
            { "url": "res/outside/sound/effect/sb.ogg", "desc": "战斗失败音效" }
        ];
        this.soundChannelDic = new Dictionary();
    }
    Object.defineProperty(SoundsManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new SoundsManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放背景音乐
     * @param url
     * @param loops
     * @param complete
     * @param startTime
     */
    SoundsManager.prototype.playMusic = function (url, loops, complete, startTime) {
        if (loops === void 0) { loops = 0; }
        if (complete === void 0) { complete = null; }
        if (startTime === void 0) { startTime = 0; }
        LayaSoundManager.playMusic(url, loops, complete, startTime);
    };
    /**
     * 播放音效
     * @param url
     * @param loops
     * @param complete
     * @param soundClass
     * @param startTime
     */
    SoundsManager.prototype.playSound = function (url, loops, complete, soundClass, startTime) {
        if (loops === void 0) { loops = 1; }
        if (complete === void 0) { complete = null; }
        if (soundClass === void 0) { soundClass = null; }
        if (startTime === void 0) { startTime = 0; }
        var soundChannel = this.soundChannelDic.get(url);
        if (soundChannel) {
            this.removeChannel(soundChannel);
        }
        this.soundChannelDic.set(url, LayaSoundManager.playSound(url, loops, complete, soundClass, startTime));
    };
    /**
     * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
     * @param volume
     */
    SoundsManager.prototype.setMusicVolume = function (volume) {
        LayaSoundManager.setMusicVolume(volume);
    };
    /**
     * 设置声音音量。根据参数不同，可以分别设置指定声音（背景音乐或音效）音量或者所有音效（不包括背景音乐）音量。
     * @param volume
     * @param url
     */
    SoundsManager.prototype.setSoundVolume = function (volume, url) {
        if (url === void 0) { url = null; }
        LayaSoundManager.setSoundVolume(volume, url);
    };
    /**
     * 停止所有音乐
     */
    SoundsManager.prototype.stopAll = function () {
        LayaSoundManager.stopAll();
    };
    /**
     * 停止播放所有音效（不包括背景音乐）
     */
    SoundsManager.prototype.stopAllSound = function () {
        LayaSoundManager.stopAllSound();
    };
    /**
     * 停止播放背景音乐
     */
    SoundsManager.prototype.stopMusic = function () {
        LayaSoundManager.stopMusic();
    };
    /**
     * 移除播放的声音实例。
     * @param channel
     */
    SoundsManager.prototype.removeChannel = function (channel) {
        LayaSoundManager.removeChannel(channel);
    };
    /**播放背景音乐 */
    SoundsManager.prototype.playerMusicByEnum = function (eId, loops, complete, startTime) {
        if (loops === void 0) { loops = 0; }
        if (complete === void 0) { complete = null; }
        if (startTime === void 0) { startTime = 0; }
        var config = this.musicsConfig[eId];
        this.playMusic(config.url, loops, complete, startTime);
    };
    /**播放背景音乐 */
    SoundsManager.prototype.playerSoundByEnum = function (eId, loops, complete, startTime) {
        if (loops === void 0) { loops = 0; }
        if (complete === void 0) { complete = null; }
        if (startTime === void 0) { startTime = 0; }
        var config = this.soundsConfig[eId];
        this.playSound(config.url, loops, complete, startTime);
    };
    SoundsManager._ins = null;
    return SoundsManager;
}());
//# sourceMappingURL=SoundsManager.js.map