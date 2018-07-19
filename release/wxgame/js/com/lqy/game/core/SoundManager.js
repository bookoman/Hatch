/*
* 声音管理器
*/
var SoundManager = /** @class */ (function () {
    function SoundManager() {
    }
    Object.defineProperty(SoundManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new SoundManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.soundPlay = function () {
    };
    SoundManager.prototype.soundParse = function () {
    };
    SoundManager._ins = null;
    return SoundManager;
}());
//# sourceMappingURL=SoundManager.js.map