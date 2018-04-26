var SoundChannel = Laya.SoundChannel;
var LayaSoundManager = Laya.SoundManager;
/*
* 声音管理器
*/
var SoundsManager = /** @class */ (function () {
    function SoundsManager() {
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
    SoundsManager._ins = null;
    return SoundsManager;
}());
//# sourceMappingURL=SoundsManager.js.map