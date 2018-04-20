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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var BattleReportViewUI = /** @class */ (function (_super) {
        __extends(BattleReportViewUI, _super);
        function BattleReportViewUI() {
            return _super.call(this) || this;
        }
        BattleReportViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.BattleReportViewUI.uiView);
        };
        BattleReportViewUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/img_reportbg.png", "sizeGrid": "30,4,4,4", "height": 374 } }, { "type": "TextArea", "props": { "y": 57, "x": 10, "width": 731, "var": "texaArea", "height": 300 } }, { "type": "Label", "props": { "y": 15, "x": 322, "width": 85, "text": "战    报", "height": 25, "fontSize": 24, "color": "#000000", "bold": true, "align": "center" } }] };
        return BattleReportViewUI;
    }(View));
    ui.BattleReportViewUI = BattleReportViewUI;
})(ui || (ui = {}));
(function (ui) {
    var DebugViewUI = /** @class */ (function (_super) {
        __extends(DebugViewUI, _super);
        function DebugViewUI() {
            return _super.call(this) || this;
        }
        DebugViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.DebugViewUI.uiView);
        };
        DebugViewUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "var": "imgBg", "skin": "comp/blank.png", "height": 60 } }, { "type": "Label", "props": { "y": 28, "x": 0, "wordWrap": true, "width": 500, "var": "lblDec", "text": "label", "leading": 2, "height": 24, "fontSize": 16, "color": "#f4f1f1" } }, { "type": "Button", "props": { "y": 3, "x": 416, "width": 75, "var": "btnClear", "skin": "comp/button.png", "label": "clear", "height": 23 } }] };
        return DebugViewUI;
    }(View));
    ui.DebugViewUI = DebugViewUI;
})(ui || (ui = {}));
(function (ui) {
    var GameViewUI = /** @class */ (function (_super) {
        __extends(GameViewUI, _super);
        function GameViewUI() {
            return _super.call(this) || this;
        }
        GameViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/img_tzdb.png", "height": 1334 } }, { "type": "Button", "props": { "y": 102, "x": 268, "width": 216, "var": "btnOpen", "skin": "comp/button.png", "labelSize": 24, "label": "打开", "height": 83 } }, { "type": "Image", "props": { "y": 75, "x": 569, "skin": "main/logo.png" } }, { "type": "Button", "props": { "y": 76, "x": 59, "width": 120, "var": "btnAni", "skin": "comp/button.png", "labelSize": 24, "label": "playAni", "height": 60 } }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
(function (ui) {
    var LoginViewUI = /** @class */ (function (_super) {
        __extends(LoginViewUI, _super);
        function LoginViewUI() {
            return _super.call(this) || this;
        }
        LoginViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoginViewUI.uiView);
        };
        LoginViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 496, "x": 174, "width": 413, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 353 } }, { "type": "TextInput", "props": { "y": 617, "x": 337, "width": 176, "var": "lblAccount", "skin": "comp/textinput.png", "height": 29, "fontSize": 24 } }, { "type": "Label", "props": { "y": 619, "x": 242, "text": "账号：", "fontSize": 24 } }, { "type": "TextInput", "props": { "y": 668, "x": 337, "width": 176, "var": "lblPwd", "skin": "comp/textinput.png", "height": 29, "fontSize": 24 } }, { "type": "Label", "props": { "y": 670, "x": 242, "text": "密码：", "fontSize": 24 } }, { "type": "Button", "props": { "y": 758, "x": 325, "width": 125, "var": "btnLogin", "skin": "comp/button.png", "labelSize": 24, "label": "登录", "height": 51 } }] };
        return LoginViewUI;
    }(View));
    ui.LoginViewUI = LoginViewUI;
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var SkillViewUI = /** @class */ (function (_super) {
            __extends(SkillViewUI, _super);
            function SkillViewUI() {
                return _super.call(this) || this;
            }
            SkillViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.SkillViewUI.uiView);
            };
            SkillViewUI.uiView = { "type": "View", "props": { "width": 400, "height": 40 } };
            return SkillViewUI;
        }(View));
        main.SkillViewUI = SkillViewUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var PreLoadViewUI = /** @class */ (function (_super) {
        __extends(PreLoadViewUI, _super);
        function PreLoadViewUI() {
            return _super.call(this) || this;
        }
        PreLoadViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.PreLoadViewUI.uiView);
        };
        PreLoadViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "ProgressBar", "props": { "y": 662, "x": 96, "width": 566, "var": "progressBar", "skin": "comp/progress.png", "height": 14 } }] };
        return PreLoadViewUI;
    }(View));
    ui.PreLoadViewUI = PreLoadViewUI;
})(ui || (ui = {}));
(function (ui) {
    var SignViewUI = /** @class */ (function (_super) {
        __extends(SignViewUI, _super);
        function SignViewUI() {
            return _super.call(this) || this;
        }
        SignViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.SignViewUI.uiView);
        };
        SignViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "test/img_bg.png" } }, { "type": "Image", "props": { "y": 504, "x": 160, "width": 441, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 415 } }, { "type": "Button", "props": { "y": 508, "x": 566, "var": "btnClose", "skin": "comp/btn_close.png" } }, { "type": "TextInput", "props": { "y": 706, "x": 304, "var": "inputName", "skin": "comp/textinput.png" } }] };
        return SignViewUI;
    }(View));
    ui.SignViewUI = SignViewUI;
})(ui || (ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var TestPageUI = /** @class */ (function (_super) {
            __extends(TestPageUI, _super);
            function TestPageUI() {
                return _super.call(this) || this;
            }
            TestPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.TestPageUI.uiView);
            };
            TestPageUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 400 } }, { "type": "Button", "props": { "y": 56, "x": 41, "width": 150, "var": "btn", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "label": "点我赋值", "height": 37 } }, { "type": "Clip", "props": { "y": 56, "x": 401, "var": "clip", "skin": "comp/clip_num.png", "clipX": 10 } }, { "type": "ComboBox", "props": { "y": 143, "x": 220, "width": 200, "var": "combobox", "skin": "comp/combobox.png", "sizeGrid": "4,20,4,4", "selectedIndex": 1, "labels": "select1,select2,selecte3", "height": 23 } }, { "type": "Tab", "props": { "y": 96, "x": 220, "var": "tab", "skin": "comp/tab.png", "labels": "tab1,tab2,tab3" } }, { "type": "VScrollBar", "props": { "y": 223, "x": 259, "skin": "comp/vscroll.png", "height": 150 } }, { "type": "VSlider", "props": { "y": 223, "x": 224, "skin": "comp/vslider.png", "height": 150 } }, { "type": "List", "props": { "y": 68, "x": 452, "width": 128, "var": "list", "vScrollBarSkin": "comp/vscroll.png", "repeatX": 1, "height": 299 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 112, "name": "render", "height": 30 }, "child": [{ "type": "Label", "props": { "y": 5, "x": 26, "width": 78, "text": "this is a list", "skin": "comp/label.png", "name": "label", "height": 20, "fontSize": 14 } }, { "type": "Clip", "props": { "y": 2, "x": 0, "skin": "comp/clip_num.png", "name": "clip", "clipX": 10 } }] }] }, { "type": "Button", "props": { "y": 4, "x": 563, "var": "btnClose", "skin": "comp/btn_close.png", "name": "close" } }, { "type": "Button", "props": { "y": 112, "x": 41, "width": 150, "var": "btn2", "skin": "comp/button.png", "sizeGrid": "4,4,4,4", "labelSize": 30, "labelBold": true, "label": "点我赋值", "height": 66 } }, { "type": "CheckBox", "props": { "y": 188, "x": 220, "var": "check", "skin": "comp/checkbox.png", "label": "checkBox1" } }, { "type": "RadioGroup", "props": { "y": 61, "x": 220, "var": "radio", "skin": "comp/radiogroup.png", "labels": "radio1,radio2,radio3" } }, { "type": "Panel", "props": { "y": 223, "x": 299, "width": 127, "vScrollBarSkin": "comp/vscroll.png", "height": 150 }, "child": [{ "type": "Image", "props": { "skin": "comp/image.png" } }] }, { "type": "CheckBox", "props": { "y": 188, "x": 326, "skin": "comp/checkbox.png", "labelColors": "#ff0000", "label": "checkBox2" } }, { "type": "Box", "props": { "y": 197, "x": 41, "var": "box" }, "child": [{ "type": "ProgressBar", "props": { "y": 70, "width": 150, "skin": "comp/progress.png", "sizeGrid": "4,4,4,4", "name": "progress", "height": 14 } }, { "type": "Label", "props": { "y": 103, "width": 137, "text": "This is a Label", "skin": "comp/label.png", "name": "label", "height": 26, "fontSize": 20 } }, { "type": "TextInput", "props": { "y": 148, "width": 150, "text": "textinput", "skin": "comp/textinput.png", "name": "input" } }, { "type": "HSlider", "props": { "width": 150, "skin": "comp/hslider.png", "name": "slider" } }, { "type": "HScrollBar", "props": { "y": 34, "width": 150, "skin": "comp/hscroll.png", "name": "scroll" } }] }] };
            return TestPageUI;
        }(View));
        test.TestPageUI = TestPageUI;
    })(test = ui.test || (ui.test = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map