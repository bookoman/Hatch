/*
* name;
*/
var DebugViewUtil = /** @class */ (function () {
    function DebugViewUtil() {
    }
    DebugViewUtil.init = function () {
        if (this.msgArray == null) {
            this.msgArray = new Array();
        }
        this.view = new ui.DebugViewUI();
        this.view.visible = GameConfig.DEBUG_VIEW_SWITCH;
        this.view.x = GameConfig.STAGE_WIDTH - this.view.width;
        this.view.y = 0;
        this.view.lblDec.text = "";
        LayerManager.ins.addToLayer(this.view, LayerManager.TIP_LAYER, false, false, false);
        this.view.btnClear.on(Laya.Event.CLICK, this, this.onBtnClear);
    };
    DebugViewUtil.onBtnClear = function (e) {
        this.msgArray = new Array();
        this.view.lblDec.text = "";
        this.view.lblDec.height = this.view.lblDec.textField.textHeight;
        this.view.imgBg.height = this.view.lblDec.height;
    };
    /**
     * 打印日志
     * @param key
     * @param msg
     */
    DebugViewUtil.log = function (key, msg) {
        msg = new Date().getUTCSeconds() + "," + key + ":" + msg + "\n";
        if (this.msgArray.length >= this.MSG_SUM_LIMIT) {
            this.msgArray.unshift();
        }
        this.view.lblDec.text += msg;
        if (this.view.imgBg.height < 1000) {
            this.view.lblDec.height = this.view.lblDec.textField.textHeight;
            this.view.imgBg.height = this.view.lblDec.height + 20;
        }
    };
    DebugViewUtil.MSG_SUM_LIMIT = 100;
    DebugViewUtil.view = null;
    DebugViewUtil.msgArray = null;
    return DebugViewUtil;
}());
//# sourceMappingURL=DebugViewUtil.js.map