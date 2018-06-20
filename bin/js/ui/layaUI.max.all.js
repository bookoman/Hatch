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
        BattleReportViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 375 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "unpack/main/img_reportsbg.png", "sizeGrid": "30,4,4,4", "height": 374 } }, { "type": "TextArea", "props": { "y": 57, "x": 10, "width": 731, "var": "texaArea", "height": 300 } }, { "type": "Label", "props": { "y": 15, "x": 322, "width": 85, "text": "战    报", "height": 25, "fontSize": 24, "color": "#000000", "bold": true, "align": "center" } }] };
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
        ChallengeBossViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/challengeboss/bg.png" } }, { "type": "Button", "props": { "y": 1111, "x": 277, "width": 195, "var": "btnFast", "skin": "comp/button.png", "labelSize": 30, "label": "快速结束", "height": 71 } }] };
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
    var comp;
    (function (comp) {
        var IconViewUI = /** @class */ (function (_super) {
            __extends(IconViewUI, _super);
            function IconViewUI() {
                return _super.call(this) || this;
            }
            IconViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.comp.IconViewUI.uiView);
            };
            IconViewUI.uiView = { "type": "View", "props": { "width": 115, "height": 115 }, "child": [{ "type": "Clip", "props": { "y": 2, "x": 2, "width": 110, "var": "clipBG", "skin": "comp/clip_qulity1.png", "height": 110, "clipY": 2 } }, { "type": "Image", "props": { "y": 10, "x": 10, "width": 95, "var": "imgIcon", "height": 96 } }, { "type": "Image", "props": { "y": 27, "x": 14, "visible": false, "var": "imgTick", "skin": "comp/img_tick.png" } }] };
            return IconViewUI;
        }(View));
        comp.IconViewUI = IconViewUI;
    })(comp = ui.comp || (ui.comp = {}));
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
        DebugViewUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "var": "imgBg", "skin": "comp/blank.png", "height": 60 } }, { "type": "Label", "props": { "y": 42, "x": 85, "wordWrap": true, "width": 500, "var": "lblDec", "text": "label", "leading": 2, "height": 24, "fontSize": 16, "color": "#f4f1f1" } }, { "type": "Button", "props": { "y": 3, "x": 362, "width": 75, "var": "btnClear", "skin": "comp/button.png", "label": "clear", "height": 23 } }] };
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
    var EquipViewUI = /** @class */ (function (_super) {
        __extends(EquipViewUI, _super);
        function EquipViewUI() {
            return _super.call(this) || this;
        }
        EquipViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.EquipViewUI.uiView);
        };
        EquipViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "unpack/main/龙与猎人-角色.png", "height": 1334 } }] };
        return EquipViewUI;
    }(View));
    ui.EquipViewUI = EquipViewUI;
})(ui || (ui = {}));
(function (ui) {
    var GameViewUI = /** @class */ (function (_super) {
        __extends(GameViewUI, _super);
        function GameViewUI() {
            return _super.call(this) || this;
        }
        GameViewUI.prototype.createChildren = function () {
            View.regComponent("ui.test.TestAniScaleViewUI", ui.test.TestAniScaleViewUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameViewUI.uiView);
        };
        GameViewUI.uiView = { "type": "View", "props": { "width": 750, "mouseThrough": true, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": 17, "x": 706, "width": 34, "var": "btnOpen", "stateNum": 1, "skin": "main/laba.png", "sizeGrid": "-10,0,-6,-14", "labelStrokeColor": "#f88508", "labelSize": 32, "height": 31, "alpha": 0.6 } }, { "type": "Image", "props": { "y": 1215, "x": 0, "width": 750, "skin": "unpack/main/diban.png", "height": 119 } }, { "type": "Image", "props": { "y": 1320, "x": 0, "width": 750, "skin": "main/img_blood.png", "height": 14 } }, { "type": "Tab", "props": { "y": 1214, "x": 2, "width": 746, "height": 124 }, "child": [{ "type": "Button", "props": { "y": -7, "x": -1, "width": 145, "var": "btnMap", "stateNum": 1, "skin": "main/huic.png", "labelSize": 40, "height": 102 } }, { "type": "Button", "props": { "y": 0, "x": 435, "width": 148, "var": "btnHero", "stateNum": 1, "skin": "main/juese.png", "labelSize": 40, "height": 100 } }, { "type": "Button", "props": { "y": -1, "x": 145, "width": 148, "var": "btnLineup", "stateNum": 1, "skin": "main/tansuo.png", "labelSize": 40, "height": 100 } }, { "type": "Button", "props": { "y": -1, "x": 590, "width": 148, "var": "btnEquip", "stateNum": 1, "skin": "main/bag.png", "labelSize": 40, "height": 100 } }, { "type": "Button", "props": { "y": 0, "x": 292, "width": 148, "var": "btnBattle", "stateNum": 1, "skin": "main/zuoz.png", "labelSize": 40, "height": 100 } }] }, { "type": "TestAniScaleView", "props": { "y": 1, "x": 253, "visible": false, "var": "viewAniScale", "runtime": "ui.test.TestAniScaleViewUI" } }] };
        return GameViewUI;
    }(View));
    ui.GameViewUI = GameViewUI;
})(ui || (ui = {}));
(function (ui) {
    var HeroViewUI = /** @class */ (function (_super) {
        __extends(HeroViewUI, _super);
        function HeroViewUI() {
            return _super.call(this) || this;
        }
        HeroViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HeroViewUI.uiView);
        };
        HeroViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/main/roleBg.png" } }, { "type": "Clip", "props": { "y": 357, "x": 149, "width": 134, "var": "clipShadow", "skin": "main/clip_shadow.png", "index": 0, "height": 43, "clipY": 2 } }] };
        return HeroViewUI;
    }(View));
    ui.HeroViewUI = HeroViewUI;
})(ui || (ui = {}));
(function (ui) {
    var HomeViewUI = /** @class */ (function (_super) {
        __extends(HomeViewUI, _super);
        function HomeViewUI() {
            return _super.call(this) || this;
        }
        HomeViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HomeViewUI.uiView);
        };
        HomeViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/lineup/龙与猎人-上阵.png" } }] };
        return HomeViewUI;
    }(View));
    ui.HomeViewUI = HomeViewUI;
})(ui || (ui = {}));
(function (ui) {
    var lineup;
    (function (lineup) {
        var LineupGridViewUI = /** @class */ (function (_super) {
            __extends(LineupGridViewUI, _super);
            function LineupGridViewUI() {
                return _super.call(this) || this;
            }
            LineupGridViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.lineup.LineupGridViewUI.uiView);
            };
            LineupGridViewUI.uiView = { "type": "View", "props": {}, "child": [{ "type": "Clip", "props": { "y": 0, "x": 6, "width": 161, "var": "clipShadow", "skin": "main/clip_shadow.png", "index": 0, "height": 54, "clipY": 2 } }, { "type": "Label", "props": { "y": 49, "x": 0, "width": 178, "var": "lblLineupID", "text": "霸王龙 【真】", "height": 32, "fontSize": 20, "color": "#f4eb1a", "bold": true, "align": "center" } }] };
            return LineupGridViewUI;
        }(View));
        lineup.LineupGridViewUI = LineupGridViewUI;
    })(lineup = ui.lineup || (ui.lineup = {}));
})(ui || (ui = {}));
(function (ui) {
    var lineup;
    (function (lineup) {
        var LineupViewUI = /** @class */ (function (_super) {
            __extends(LineupViewUI, _super);
            function LineupViewUI() {
                return _super.call(this) || this;
            }
            LineupViewUI.prototype.createChildren = function () {
                View.regComponent("IconView", IconView);
                View.regComponent("ui.lineup.LineupGridViewUI", ui.lineup.LineupGridViewUI);
                View.regComponent("ui.lineup.SkillGridViewUI", ui.lineup.SkillGridViewUI);
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.lineup.LineupViewUI.uiView);
            };
            LineupViewUI.uiView = { "type": "View", "props": { "width": 750, "renderType": "render", "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/lineup/bg.png" } }, { "type": "Image", "props": { "y": 522, "x": -4, "skin": "unpack/lineup/juese_bg.png" } }, { "type": "List", "props": { "y": 967, "x": 23, "width": 716, "var": "listIcon", "repeatY": 2, "repeatX": 6, "height": 234 }, "child": [{ "type": "VScrollBar", "props": { "y": 4, "x": 698, "width": 17, "visible": false, "skin": "comp/vscroll.png", "name": "scrollBar", "height": 188 } }, { "type": "IconView", "props": { "y": 1, "x": 2, "runtime": "IconView", "name": "render" } }] }, { "type": "LineupGridView", "props": { "y": 645, "x": 287, "var": "grid0", "runtime": "ui.lineup.LineupGridViewUI" } }, { "type": "LineupGridView", "props": { "y": 743, "x": 412, "var": "grid1", "runtime": "ui.lineup.LineupGridViewUI" } }, { "type": "LineupGridView", "props": { "y": 841, "x": 536, "var": "grid2", "runtime": "ui.lineup.LineupGridViewUI" } }, { "type": "LineupGridView", "props": { "y": 711, "x": 84, "var": "grid3", "runtime": "ui.lineup.LineupGridViewUI" } }, { "type": "LineupGridView", "props": { "y": 817, "x": 168, "var": "grid4", "runtime": "ui.lineup.LineupGridViewUI" } }, { "type": "Image", "props": { "y": 26, "x": 23, "skin": "main/skill_bg02.png" } }, { "type": "Image", "props": { "y": 48, "x": 45, "skin": "main/skill_bg01.png" } }, { "type": "Button", "props": { "y": 373, "x": 23, "width": 131, "stateNum": 1, "skin": "comp/btn_base.png", "height": 51 } }, { "type": "Button", "props": { "y": 373, "x": 193, "width": 131, "stateNum": 1, "skin": "comp/btn_skill.png", "height": 51 } }, { "type": "Button", "props": { "y": 373, "x": 362, "width": 131, "stateNum": 1, "skin": "comp/btn_evolve.png", "height": 51 } }, { "type": "Button", "props": { "y": 275, "x": 505, "width": 131, "stateNum": 1, "skin": "comp/btn_resetskill.png", "height": 52 } }, { "type": "Image", "props": { "y": 962, "x": 0, "width": 750, "skin": "comp/skill_bk.png", "height": 245 } }, { "type": "Image", "props": { "y": 930, "x": 20, "skin": "comp/skill_ht.png" } }, { "type": "SkillGridView", "props": { "y": 84, "x": 82, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "SkillGridView", "props": { "y": 218, "x": 82, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "SkillGridView", "props": { "y": 218, "x": 201, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "SkillGridView", "props": { "y": 84, "x": 319, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "SkillGridView", "props": { "y": 84, "x": 201, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "SkillGridView", "props": { "y": 218, "x": 319, "runtime": "ui.lineup.SkillGridViewUI" } }, { "type": "Label", "props": { "y": 50, "x": 441, "width": 258, "text": "技能 XXX", "height": 32, "fontSize": 28, "color": "#5a5757", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 91, "x": 441, "wordWrap": true, "width": 258, "text": "我知道我很吊。但是我不说...到底那里吊，我也不知道", "leading": 12, "height": 176, "fontSize": 18, "color": "#716464", "bold": true, "align": "left" } }] };
            return LineupViewUI;
        }(View));
        lineup.LineupViewUI = LineupViewUI;
    })(lineup = ui.lineup || (ui.lineup = {}));
})(ui || (ui = {}));
(function (ui) {
    var lineup;
    (function (lineup) {
        var SkillGridViewUI = /** @class */ (function (_super) {
            __extends(SkillGridViewUI, _super);
            function SkillGridViewUI() {
                return _super.call(this) || this;
            }
            SkillGridViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.lineup.SkillGridViewUI.uiView);
            };
            SkillGridViewUI.uiView = { "type": "View", "props": { "width": 150, "height": 150 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 79, "skin": "comp/skill_bg003.png", "height": 80 } }, { "type": "Label", "props": { "y": 82, "x": 0, "width": 79, "text": "技能 xxx", "height": 20, "fontSize": 20, "color": "#000000", "align": "center" } }] };
            return SkillGridViewUI;
        }(View));
        lineup.SkillGridViewUI = SkillGridViewUI;
    })(lineup = ui.lineup || (ui.lineup = {}));
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
        LoginViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "unpack/main/main.jpg", "height": 1334 } }, { "type": "Box", "props": { "y": 576, "x": 127, "width": 496, "height": 317 }, "child": [{ "type": "Image", "props": { "width": 496, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 361, "centerY": 0, "centerX": 0 } }, { "type": "TextInput", "props": { "y": 73, "x": 187, "width": 216, "var": "inputAccount", "text": "xielong2", "skin": "comp/textinput.png", "height": 36, "fontSize": 30 } }, { "type": "Label", "props": { "y": 72, "x": 95, "width": 100, "text": "帐号：", "height": 38, "fontSize": 30, "color": "#000000" } }, { "type": "TextInput", "props": { "y": 141, "x": 187, "width": 216, "var": "inputPwd", "type": "password", "text": "123456", "skin": "comp/textinput.png", "height": 36, "fontSize": 30 } }, { "type": "Label", "props": { "y": 140, "x": 95, "width": 100, "text": "密码：", "height": 38, "fontSize": 30 } }, { "type": "Button", "props": { "y": 209, "x": 158, "width": 211, "var": "btnLogin", "skin": "comp/button.png", "labelSize": 38, "label": "登  录", "height": 72 } }] }] };
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
    var map;
    (function (map) {
        var GateListViewUI = /** @class */ (function (_super) {
            __extends(GateListViewUI, _super);
            function GateListViewUI() {
                return _super.call(this) || this;
            }
            GateListViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.map.GateListViewUI.uiView);
            };
            GateListViewUI.uiView = { "type": "View", "props": { "width": 690, "height": 830 }, "child": [{ "type": "Image", "props": { "y": -6, "x": -18, "skin": "unpack/worldmap/img_gatebg.png" } }, { "type": "Image", "props": { "y": -59, "x": 48, "var": "imgMapBlock", "skin": "worldmap/img_map.png" } }, { "type": "List", "props": { "y": 200, "x": 36, "var": "listGate", "spaceY": 20, "repeatY": 4 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Image", "props": { "skin": "unpack/worldmap/img_listbg.png", "name": "bg" } }, { "type": "Label", "props": { "y": 18, "x": 125, "width": 188, "text": "关卡", "name": "lblName", "height": 29, "fontSize": 26, "color": "0x000000", "bold": true } }, { "type": "Image", "props": { "y": 9, "x": 17, "width": 95, "name": "imgIcon", "height": 96 } }, { "type": "Label", "props": { "y": 48, "x": 138, "width": 188, "text": "推荐等级：", "name": "lblLevel", "height": 29, "fontSize": 20, "color": "#b05454", "bold": true } }, { "type": "Image", "props": { "y": 67, "x": 138, "width": 46, "skin": "worldmap/img_reward.png", "name": "imgReward", "height": 40 } }, { "type": "Label", "props": { "y": 76, "x": 186, "width": 99, "text": "宝箱：1", "name": "lblReadNum", "height": 29, "fontSize": 20, "color": "#99743d", "bold": true } }, { "type": "Button", "props": { "y": 27, "x": 441, "stateNum": 1, "skin": "worldmap/btn_swap.png", "name": "btnSweep" } }, { "type": "Button", "props": { "y": 27, "x": 440, "stateNum": 1, "skin": "worldmap/btn_chanllege.png", "name": "btnChanllege" } }, { "type": "Image", "props": { "y": 38, "x": 397, "skin": "worldmap/img_notice.png", "name": "img_notice" } }, { "type": "Image", "props": { "y": 20, "x": 295, "skin": "worldmap/img_hundup.png", "name": "img_hand" } }] }, { "type": "VScrollBar", "props": { "y": 10, "x": 622, "width": 17, "skin": "comp/vscroll.png", "name": "scrollBar", "height": 557 } }] }, { "type": "Image", "props": { "y": 134, "x": 397, "var": "imgMapName", "skin": "worldmap/img_lbl0.png" } }] };
            return GateListViewUI;
        }(View));
        map.GateListViewUI = GateListViewUI;
    })(map = ui.map || (ui.map = {}));
})(ui || (ui = {}));
(function (ui) {
    var map;
    (function (map) {
        var MapBattleViewUI = /** @class */ (function (_super) {
            __extends(MapBattleViewUI, _super);
            function MapBattleViewUI() {
                return _super.call(this) || this;
            }
            MapBattleViewUI.prototype.createChildren = function () {
                View.regComponent("ui.map.MapWorldViewUI", ui.map.MapWorldViewUI);
                _super.prototype.createChildren.call(this);
                this.createView(ui.map.MapBattleViewUI.uiView);
            };
            MapBattleViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": 837, "x": 496, "width": 243, "var": "btnChalleangeBoss", "skin": "comp/button.png", "labelSize": 24, "label": "挑战boss", "height": 88 } }, { "type": "MapWorldView", "props": { "y": 0, "x": 0, "visible": false, "var": "mapWordView", "runtime": "ui.map.MapWorldViewUI" } }] };
            return MapBattleViewUI;
        }(View));
        map.MapBattleViewUI = MapBattleViewUI;
    })(map = ui.map || (ui.map = {}));
})(ui || (ui = {}));
(function (ui) {
    var map;
    (function (map) {
        var MapWorldViewUI = /** @class */ (function (_super) {
            __extends(MapWorldViewUI, _super);
            function MapWorldViewUI() {
                return _super.call(this) || this;
            }
            MapWorldViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.map.MapWorldViewUI.uiView);
            };
            MapWorldViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Panel", "props": { "y": -100, "x": 0, "width": 1699, "var": "panelBlock", "height": 1351 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/worldmap/bg.png" } }, { "type": "Image", "props": { "y": -13, "x": 537, "var": "imgBlock3", "skin": "unpack/worldmap/p7.png" }, "child": [{ "type": "Poly", "props": { "y": 13, "x": 54, "renderType": "hit", "points": "-13,479,-35,136,41,-5,344,20,396,223,754,227,689,503,265,767", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 194, "x": 1222, "var": "imgBlock6", "skin": "unpack/worldmap/p2.png" }, "child": [{ "type": "Poly", "props": { "y": 11, "x": -197, "renderType": "hit", "points": "368,572,212,486,228,186,346,68,513,33,668,84,667,697", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 595, "x": 683, "var": "imgBlock4", "skin": "unpack/worldmap/p1.png" }, "child": [{ "type": "Poly", "props": { "y": 110, "x": 164, "renderType": "hit", "points": "6,328,-178,245,-110,121,178,-43,375,-87,555,179,277,362", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 891, "x": 1210, "var": "imgBlock5", "skin": "unpack/worldmap/p3.png" }, "child": [{ "type": "Poly", "props": { "y": 41, "x": 79, "renderType": "hit", "points": "7,382,-76,238,-18,11,184,-37,409,-24,399,265,326,384", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 102, "x": 28, "var": "imgBlock2", "skin": "unpack/worldmap/p5.png" }, "child": [{ "type": "Poly", "props": { "y": 61, "x": 31, "renderType": "hit", "points": "533,566,65,301,-39,58,106,-37,328,-35,450,51,566,447", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 531, "x": 136, "var": "imgBlock1", "skin": "unpack/worldmap/p4.png" }, "child": [{ "type": "Poly", "props": { "y": 37, "x": 46, "renderType": "hit", "points": "61,304,-41,204,-6.5,17,171.5,20.5,242,60.5,465,283,342,371", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }, { "type": "Image", "props": { "y": 893, "x": 67, "var": "imgBlock0", "skin": "unpack/worldmap/p6.png" }, "child": [{ "type": "Poly", "props": { "y": 50, "x": 73, "renderType": "hit", "points": "-71,424,-28,289,-39,32,184,-37,385.5,-3.5,622,60,675,421", "lineWidth": 1, "lineColor": "#ff0000", "fillColor": "#00ffff" } }] }] }] };
            return MapWorldViewUI;
        }(View));
        map.MapWorldViewUI = MapWorldViewUI;
    })(map = ui.map || (ui.map = {}));
})(ui || (ui = {}));
(function (ui) {
    var MapViewUI = /** @class */ (function (_super) {
        __extends(MapViewUI, _super);
        function MapViewUI() {
            return _super.call(this) || this;
        }
        MapViewUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MapViewUI.uiView);
        };
        MapViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "unpack/lineup/龙与猎人-上阵.png" } }] };
        return MapViewUI;
    }(View));
    ui.MapViewUI = MapViewUI;
})(ui || (ui = {}));
(function (ui) {
    var PreLoadViewUI = /** @class */ (function (_super) {
        __extends(PreLoadViewUI, _super);
        function PreLoadViewUI() {
            return _super.call(this) || this;
        }
        PreLoadViewUI.prototype.createChildren = function () {
            View.regComponent("Particle2D", laya.particle.Particle2D);
            _super.prototype.createChildren.call(this);
            this.createView(ui.PreLoadViewUI.uiView);
        };
        PreLoadViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 2, "width": 750, "var": "boxLoading", "height": 1334 } }, { "type": "Particle2D", "props": { "y": 507, "x": 302, "url": "ani/yezhi_1.part", "name": "yezhi" } }] };
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
        SignViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 504, "x": 154, "width": 441, "skin": "comp/bg.png", "sizeGrid": "30,4,4,4", "height": 415 } }, { "type": "Button", "props": { "y": 508, "x": 566, "var": "btnClose", "skin": "comp/btn_close.png" } }, { "type": "Label", "props": { "y": 505, "x": 353, "text": "注册", "strokeColor": "#000000", "fontSize": 22 } }, { "type": "TextInput", "props": { "y": 590, "x": 330, "width": 225, "var": "inputName", "strokeColor": "#190101", "stroke": 0, "skin": "comp/textinput.png", "height": 43 } }, { "type": "TextInput", "props": { "y": 661, "x": 330, "width": 225, "strokeColor": "#190101", "stroke": 0, "skin": "comp/textinput.png", "height": 43 } }, { "type": "Button", "props": { "y": 830, "x": 257, "width": 100, "var": "btnRecharge", "skin": "comp/button.png", "labelSize": 20, "label": "注册", "height": 32 } }, { "type": "Button", "props": { "y": 830, "x": 414, "width": 100, "var": "btnRechargeExit", "skin": "comp/button.png", "labelSize": 20, "label": "取消", "height": 32 } }, { "type": "Label", "props": { "y": 595, "x": 216, "text": "帐号", "fontSize": 32 } }, { "type": "Label", "props": { "y": 666, "x": 216, "text": "密码", "fontSize": 32 } }, { "type": "TextInput", "props": { "y": 731, "x": 330, "width": 225, "strokeColor": "#190101", "stroke": 0, "skin": "comp/textinput.png", "height": 43 } }, { "type": "Label", "props": { "y": 736, "x": 216, "text": "密码", "fontSize": 32 } }] };
        return SignViewUI;
    }(View));
    ui.SignViewUI = SignViewUI;
})(ui || (ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var TestAniScaleViewUI = /** @class */ (function (_super) {
            __extends(TestAniScaleViewUI, _super);
            function TestAniScaleViewUI() {
                return _super.call(this) || this;
            }
            TestAniScaleViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.test.TestAniScaleViewUI.uiView);
            };
            TestAniScaleViewUI.uiView = { "type": "View", "props": { "width": 0, "height": 0 }, "child": [{ "type": "List", "props": { "y": 0, "x": 0, "width": 495, "var": "listAniScale", "repeatY": 6, "height": 342 }, "child": [{ "type": "Box", "props": { "y": 0, "x": -2, "width": 370, "name": "render", "height": 57 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 366, "skin": "unpack/main/diban.png", "height": 57 } }, { "type": "Label", "props": { "y": 21, "x": 99, "width": 69, "text": "scale:", "height": 33, "fontSize": 24 } }, { "type": "TextInput", "props": { "y": 16, "x": 184, "width": 49, "text": "0.5", "skin": "comp/textinput.png", "name": "inputScale", "height": 32, "fontSize": 24 } }, { "type": "Button", "props": { "y": 13, "x": 263, "width": 91, "skin": "comp/button.png", "name": "btnTest", "labelSize": 24, "label": "测试", "height": 38 } }, { "type": "Label", "props": { "y": 18, "x": 2, "width": 94, "name": "lblRoleName", "height": 33, "fontSize": 24, "color": "#f11814" } }] }, { "type": "VScrollBar", "props": { "y": 12, "x": 367, "width": 17, "skin": "comp/vscroll.png", "name": "scrollBar", "height": 312 } }] }] };
            return TestAniScaleViewUI;
        }(View));
        test.TestAniScaleViewUI = TestAniScaleViewUI;
    })(test = ui.test || (ui.test = {}));
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