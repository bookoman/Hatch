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
        BattleReportViewUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "unpack/main/img_reportsbg.png", "sizeGrid": "30,4,4,4", "height": 374 } }, { "type": "TextArea", "props": { "y": 57, "x": 10, "width": 731, "var": "texaArea", "height": 300 } }, { "type": "Label", "props": { "y": 15, "x": 322, "width": 85, "text": "战    报", "height": 25, "fontSize": 24, "color": "#000000", "bold": true, "align": "center" } }] };
        return BattleReportViewUI;
    }(View));
    ui.BattleReportViewUI = BattleReportViewUI;
})(ui || (ui = {}));
(function (ui) {
    var ChallengeBossViewUI = /** @class */ (function (_super) {
        __extends(ChallengeBossViewUI, _super);
        function ChallengeBossViewUI() {
            return _super.call(this) || this;
        }
        ChallengeBossViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ChallengeBossViewUI.uiView);
        };
        ChallengeBossViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/challengeboss/bg.png" } }, { "type": "Button", "props": { "y": 1131, "x": 235, "width": 285, "var": "btnFast", "skin": "comp/button.png", "labelSize": 30, "label": "快速结束", "height": 110 } }] };
        return ChallengeBossViewUI;
    }(View));
    ui.ChallengeBossViewUI = ChallengeBossViewUI;
})(ui || (ui = {}));
(function (ui) {
    var ChoiceServerViewUI = /** @class */ (function (_super) {
        __extends(ChoiceServerViewUI, _super);
        function ChoiceServerViewUI() {
            return _super.call(this) || this;
        }
        ChoiceServerViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ChoiceServerViewUI.uiView);
        };
        ChoiceServerViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "var": "bg", "skin": "comp/blank.png", "height": 1334 } }, { "type": "List", "props": { "width": 547, "var": "listServer", "spaceY": 5, "repeatY": 10, "height": 470, "centerY": 0, "centerX": 0 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Clip", "props": { "width": 522, "skin": "comp/clip_selectBox.png", "name": "clip", "height": 38, "clipY": 2 } }, { "type": "Label", "props": { "y": 2, "x": 10, "width": 247, "text": "测试服务器1", "name": "lblServName", "height": 36, "fontSize": 30, "color": "#000000" } }, { "type": "Label", "props": { "y": 2, "x": 286, "width": 166, "text": "拥挤", "name": "lblServState", "height": 36, "fontSize": 30, "color": "#d7100c" } }] }, { "type": "VScrollBar", "props": { "y": 0, "x": 526, "width": 17, "skin": "comp/vscroll.png", "name": "scrollBar", "height": 423 } }] }] };
        return ChoiceServerViewUI;
    }(View));
    ui.ChoiceServerViewUI = ChoiceServerViewUI;
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
    var EnterGameViewUI = /** @class */ (function (_super) {
        __extends(EnterGameViewUI, _super);
        function EnterGameViewUI() {
            return _super.call(this) || this;
        }
        EnterGameViewUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            View.regComponent("ui.ChoiceServerViewUI", ui.ChoiceServerViewUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.EnterGameViewUI.uiView);
        };
        EnterGameViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Label", "props": { "y": 28, "x": 31, "text": "当前账号：", "fontSize": 30, "color": "#ffffff" } }, { "type": "Button", "props": { "y": 1082, "x": 269, "width": 211, "var": "btnLogin", "skin": "comp/button.png", "labelSize": 38, "label": "进入游戏", "height": 72 } }, { "type": "Image", "props": { "y": 106, "x": 38, "width": 674, "skin": "unpack/login/logo.png", "height": 422 } }, { "type": "Button", "props": { "y": 21, "x": 593, "width": 140, "var": "btnRegster", "skin": "comp/button.png", "labelStrokeColor": "#ff0905", "labelSize": 30, "label": "切换账户", "height": 45, "alpha": 0.9 } }, { "type": "Text", "props": { "y": 28, "x": 181, "width": 401, "var": "textUser", "text": "325266_asda_10023", "height": 40, "fontSize": 30, "color": "#e3e2e2", "alpha": 0.8, "align": "center" } }, { "type": "Button", "props": { "y": 954, "x": 229, "width": 303, "var": "btnChoice", "height": 63 }, "child": [{ "type": "Line", "props": { "y": 0, "x": 0, "toY": 0, "toX": 300, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Line", "props": { "y": 60, "x": 0, "toY": 0, "toX": 300, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Circle", "props": { "y": 30, "x": 10, "radius": 10, "lineWidth": 1, "fillColor": "#f82c2c" } }, { "type": "Text", "props": { "y": 12, "x": 40, "width": 254, "var": "lblServName", "text": "一区丶齐天大圣", "height": 41, "fontSize": 30, "color": "#e3e2e2" } }] }, { "type": "ChoiceServerView", "props": { "y": 0, "x": 0, "visible": false, "var": "serverListView", "runtime": "ui.ChoiceServerViewUI" } }] };
        return EnterGameViewUI;
    }(View));
    ui.EnterGameViewUI = EnterGameViewUI;
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
        GameViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": 76, "x": 410, "width": 216, "var": "btnOpen", "skin": "comp/button.png", "labelStrokeColor": "#f88508", "labelSize": 32, "label": "打开拳击声效", "height": 83 } }, { "type": "Button", "props": { "y": 72, "x": 113, "width": 243, "var": "btnChalleangeBoss", "skin": "comp/button.png", "labelSize": 24, "label": "挑战boss", "height": 88 } }] };
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
        LoginViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "unpack/main/main.jpg", "height": 1334 } }, { "type": "Box", "props": { "y": 576, "x": 148, "width": 496, "height": 317 }, "child": [{ "type": "Image", "props": { "width": 496, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 361, "centerY": 0, "centerX": 0 } }, { "type": "TextInput", "props": { "y": 73, "x": 187, "width": 216, "var": "inputAccount", "text": "xielong", "skin": "comp/textinput.png", "height": 36, "fontSize": 30 } }, { "type": "Label", "props": { "y": 72, "x": 95, "width": 100, "text": "帐号：", "height": 38, "fontSize": 30, "color": "#000000" } }, { "type": "TextInput", "props": { "y": 141, "x": 187, "width": 216, "var": "inputPwd", "type": "password", "text": "123456", "skin": "comp/textinput.png", "height": 36, "fontSize": 30 } }, { "type": "Label", "props": { "y": 140, "x": 95, "width": 100, "text": "密码：", "height": 38, "fontSize": 30 } }, { "type": "Button", "props": { "y": 209, "x": 158, "width": 211, "var": "btnLogin", "skin": "comp/button.png", "labelSize": 38, "label": "登  录", "height": 72 } }] }] };
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
        SignViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 6, "skin": "test/img_bg.png" } }, { "type": "Image", "props": { "y": 504, "x": 154, "width": 441, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 415 } }, { "type": "Button", "props": { "y": 508, "x": 566, "var": "btnClose", "skin": "comp/btn_close.png" } }, { "type": "TextInput", "props": { "y": 706, "x": 304, "var": "inputName", "skin": "comp/textinput.png" } }] };
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