var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Button = Laya.Button;
/*
* 技能视图
*/
var SkillView = /** @class */ (function (_super) {
    __extends(SkillView, _super);
    function SkillView() {
        var _this = _super.call(this) || this;
        _this.btns = null;
        _this.skillVos = null;
        _this.btns = [];
        var btn;
        for (var i = 0; i < 5; i++) {
            btn = new Button();
            btn.dataSource = i;
            btn.width = 80;
            btn.height = 30;
            btn.x = i * 90;
            btn.y = 5;
            btn.labelSize = 14;
            btn.visible = false;
            btn.on(Laya.Event.CLICK, _this, _this.onBtnSkillClick);
            _this.addChild(btn);
            _this.btns.push(btn);
        }
        return _this;
    }
    SkillView.prototype.onBtnSkillClick = function (e) {
        var ind = e.currentTarget.dataSource;
        var skillVo = this.skillVos[ind];
        if (skillVo) {
            if (skillVo.calCD > 0) {
                console.log("还有" + skillVo.calCD + "秒才可以使用技能");
            }
            else {
                skillVo.isUsed = false;
                skillVo.calCD = skillVo.cd;
            }
        }
    };
    /**
     *
     * @param ary
     */
    SkillView.prototype.init = function (ary) {
        this.skillVos = ary;
        var btn;
        var skillVo;
        for (var i = 0; i < this.btns.length; i++) {
            btn = this.btns[i];
            if (i < this.skillVos.length) {
                skillVo = ary[i];
                btn.skin = "comp/button.png";
                btn.label = ary[i].name + ":" + skillVo.cd;
                btn.visible = true;
            }
            else {
                btn.visible = false;
            }
        }
    };
    return SkillView;
}(Laya.Sprite));
//# sourceMappingURL=SkillView.js.map