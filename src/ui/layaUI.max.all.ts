
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BattleReportViewUI extends View {
		public texaArea:Laya.TextArea;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"unpack/main/img_reportsbg.png","sizeGrid":"30,4,4,4","height":374}},{"type":"TextArea","props":{"y":57,"x":10,"width":731,"var":"texaArea","height":300}},{"type":"Label","props":{"y":15,"x":322,"width":85,"text":"战    报","height":25,"fontSize":24,"color":"#000000","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BattleReportViewUI.uiView);

        }

    }
}

module ui {
    export class ChallengeBossViewUI extends View {
		public btnFast:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Button","props":{"y":1161,"x":237,"width":285,"var":"btnFast","skin":"comp/button.png","labelSize":30,"label":"快速结束","height":110}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChallengeBossViewUI.uiView);

        }

    }
}

module ui {
    export class ChoiceQuFuUI extends View {
		public m_list:Laya.List;
		public m_label:Laya.Label;
		public btnChoiceOK:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"renderType":"render","name":"reader","height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"template/List/SimpleListBoxItemBackground.png","height":400}},{"type":"List","props":{"y":5,"x":13,"width":573,"var":"m_list","vScrollBarSkin":"template/List/vscroll.png","repeatY":20,"repeatX":1,"renderType":"render","height":287},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Label","props":{"y":20,"x":32,"width":445,"var":"m_label","text":"label","skin":"template/List/label.png","renderType":"render","height":50,"fontSize":36,"color":"#0d0d0d"}}]}]},{"type":"Button","props":{"y":346,"x":262,"width":75,"var":"btnChoiceOK","skin":"comp/button.png","labelSize":16,"labelColors":"red","label":"确定","height":33}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChoiceQuFuUI.uiView);

        }

    }
}

module ui {
    export class DebugViewUI extends View {
		public imgBg:Laya.Image;
		public lblDec:Laya.Label;
		public btnClear:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"var":"imgBg","skin":"comp/blank.png","height":60}},{"type":"Label","props":{"y":28,"x":0,"wordWrap":true,"width":500,"var":"lblDec","text":"label","leading":2,"height":24,"fontSize":16,"color":"#f4f1f1"}},{"type":"Button","props":{"y":3,"x":416,"width":75,"var":"btnClear","skin":"comp/button.png","label":"clear","height":23}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.DebugViewUI.uiView);

        }

    }
}

module ui {
    export class GameViewUI extends View {
		public btnOpen:Laya.Button;
		public btnAni:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":12,"x":0,"width":750,"skin":"unpack/main/main.jpg","height":1334}},{"type":"Button","props":{"y":76,"x":256,"width":216,"var":"btnOpen","skin":"comp/button.png","labelStrokeColor":"#f88508","labelSize":32,"label":"打开拳击声效","height":83}},{"type":"Image","props":{"y":821,"x":335,"skin":"main/logo.png"}},{"type":"Button","props":{"y":76,"x":59,"width":120,"var":"btnAni","skin":"comp/button.png","labelSize":24,"label":"playAni","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui {
    export class LoginViewUI extends View {
		public btnLogin:Laya.Button;
		public btnRegster:Laya.Button;
		public textUser:laya.display.Text;
		public btnChoice:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":28,"x":31,"text":"当前账号：","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"y":1082,"x":269,"width":211,"var":"btnLogin","skin":"comp/button.png","labelSize":38,"label":"进入游戏","height":72}},{"type":"Image","props":{"y":106,"x":38,"width":674,"skin":"unpack/login/logo.png","height":422}},{"type":"Button","props":{"y":21,"x":593,"width":140,"var":"btnRegster","skin":"comp/button.png","labelStrokeColor":"#ff0905","labelSize":30,"label":"切换账户","height":45,"alpha":0.9}},{"type":"Text","props":{"y":28,"x":181,"width":401,"var":"textUser","text":"325266_asda_10023","height":40,"fontSize":30,"color":"#e3e2e2","alpha":0.8,"align":"center"}},{"type":"Tab","props":{"y":903.5,"x":225.5,"var":"btnChoice"},"child":[{"type":"Line","props":{"y":4.5,"x":-0.5,"toY":0,"toX":300,"lineWidth":1,"lineColor":"#ff0000"}},{"type":"Line","props":{"y":74.5,"x":-0.5,"toY":0,"toX":300,"lineWidth":1,"lineColor":"#ff0000"}},{"type":"Circle","props":{"y":42.5,"x":29.5,"radius":10,"lineWidth":1,"fillColor":"#f82c2c"}},{"type":"Text","props":{"y":25.5,"x":59.5,"width":241,"text":"一区丶齐天大圣","height":41,"fontSize":30,"color":"#e3e2e2"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.LoginViewUI.uiView);

        }

    }
}

module ui.main {
    export class SkillViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":400,"height":40}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.SkillViewUI.uiView);

        }

    }
}

module ui {
    export class PreLoadViewUI extends View {
		public progressBar:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"ProgressBar","props":{"y":662,"x":96,"width":566,"var":"progressBar","skin":"comp/progress.png","height":14}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PreLoadViewUI.uiView);

        }

    }
}

module ui {
    export class SignViewUI extends View {
		public btnClose:Laya.Button;
		public inputName:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":6,"skin":"test/img_bg.png"}},{"type":"Image","props":{"y":504,"x":154,"width":441,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","height":415}},{"type":"Button","props":{"y":508,"x":566,"var":"btnClose","skin":"comp/btn_close.png"}},{"type":"TextInput","props":{"y":706,"x":304,"var":"inputName","skin":"comp/textinput.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.SignViewUI.uiView);

        }

    }
}

module ui.test {
    export class TestPageUI extends View {
		public btn:Laya.Button;
		public clip:Laya.Clip;
		public combobox:Laya.ComboBox;
		public tab:Laya.Tab;
		public list:Laya.List;
		public btnClose:Laya.Button;
		public btn2:Laya.Button;
		public check:Laya.CheckBox;
		public radio:Laya.RadioGroup;
		public box:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","height":400}},{"type":"Button","props":{"y":56,"x":41,"width":150,"var":"btn","skin":"comp/button.png","sizeGrid":"4,4,4,4","label":"点我赋值","height":37}},{"type":"Clip","props":{"y":56,"x":401,"var":"clip","skin":"comp/clip_num.png","clipX":10}},{"type":"ComboBox","props":{"y":143,"x":220,"width":200,"var":"combobox","skin":"comp/combobox.png","sizeGrid":"4,20,4,4","selectedIndex":1,"labels":"select1,select2,selecte3","height":23}},{"type":"Tab","props":{"y":96,"x":220,"var":"tab","skin":"comp/tab.png","labels":"tab1,tab2,tab3"}},{"type":"VScrollBar","props":{"y":223,"x":259,"skin":"comp/vscroll.png","height":150}},{"type":"VSlider","props":{"y":223,"x":224,"skin":"comp/vslider.png","height":150}},{"type":"List","props":{"y":68,"x":452,"width":128,"var":"list","vScrollBarSkin":"comp/vscroll.png","repeatX":1,"height":299},"child":[{"type":"Box","props":{"y":0,"x":0,"width":112,"name":"render","height":30},"child":[{"type":"Label","props":{"y":5,"x":26,"width":78,"text":"this is a list","skin":"comp/label.png","name":"label","height":20,"fontSize":14}},{"type":"Clip","props":{"y":2,"x":0,"skin":"comp/clip_num.png","name":"clip","clipX":10}}]}]},{"type":"Button","props":{"y":4,"x":563,"var":"btnClose","skin":"comp/btn_close.png","name":"close"}},{"type":"Button","props":{"y":112,"x":41,"width":150,"var":"btn2","skin":"comp/button.png","sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"label":"点我赋值","height":66}},{"type":"CheckBox","props":{"y":188,"x":220,"var":"check","skin":"comp/checkbox.png","label":"checkBox1"}},{"type":"RadioGroup","props":{"y":61,"x":220,"var":"radio","skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3"}},{"type":"Panel","props":{"y":223,"x":299,"width":127,"vScrollBarSkin":"comp/vscroll.png","height":150},"child":[{"type":"Image","props":{"skin":"comp/image.png"}}]},{"type":"CheckBox","props":{"y":188,"x":326,"skin":"comp/checkbox.png","labelColors":"#ff0000","label":"checkBox2"}},{"type":"Box","props":{"y":197,"x":41,"var":"box"},"child":[{"type":"ProgressBar","props":{"y":70,"width":150,"skin":"comp/progress.png","sizeGrid":"4,4,4,4","name":"progress","height":14}},{"type":"Label","props":{"y":103,"width":137,"text":"This is a Label","skin":"comp/label.png","name":"label","height":26,"fontSize":20}},{"type":"TextInput","props":{"y":148,"width":150,"text":"textinput","skin":"comp/textinput.png","name":"input"}},{"type":"HSlider","props":{"width":150,"skin":"comp/hslider.png","name":"slider"}},{"type":"HScrollBar","props":{"y":34,"width":150,"skin":"comp/hscroll.png","name":"scroll"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}
