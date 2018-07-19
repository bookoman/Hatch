
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.bag {
    export class BagViewUI extends View {
		public bagPanel:Laya.Panel;
		public btnClose:Laya.Button;
		public atkImage:Laya.Image;
		public defImage:Laya.Image;
		public bagTitleImage:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"skin":"unpack/comp/mainbg.png"}},{"type":"Panel","props":{"y":204,"x":755,"width":734,"var":"bagPanel","height":953},"child":[{"type":"Image","props":{"skin":"unpack/comp/dibanbg.png"}},{"type":"Button","props":{"y":-9,"x":673,"visible":false,"var":"btnClose","stateNum":1,"skin":"comp/close.png"}},{"type":"Image","props":{"y":0,"x":10,"var":"atkImage","skin":"bag/xiaohao.png"}},{"type":"Image","props":{"y":121,"x":9,"var":"defImage","skin":"bag/zhuangbei.png"}},{"type":"Image","props":{"y":58,"x":100,"skin":"unpack/comp/line.png"}},{"type":"Image","props":{"y":885,"x":98,"skin":"unpack/comp/line.png"}},{"type":"Image","props":{"y":87,"x":115,"skin":"unpack/bag/itemjiatu.png"}},{"type":"Image","props":{"y":234,"x":9,"skin":"bag/zhangwen.png"}}]},{"type":"Image","props":{"y":35,"x":-224,"var":"bagTitleImage","skin":"bag/bagtitle.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bag.BagViewUI.uiView);

        }

    }
}

module ui.battle {
    export class BattleFailViewUI extends View {
		public bg:Laya.Image;
		public imgGray:Laya.Image;
		public btnGiveup:Laya.Button;
		public btnBattleAgain:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"y":161,"x":3,"skin":"unpack/battlefail/img_graybg.png"}},{"type":"Image","props":{"y":565,"x":381,"var":"imgGray","skin":"unpack/battlefail/img_grayfillter.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":532,"x":-24,"skin":"unpack/battlefail/img_bg.png"}},{"type":"Image","props":{"y":336,"x":72,"skin":"unpack/battlefail/img_fail.png"}},{"type":"Button","props":{"y":744,"x":99,"var":"btnGiveup","stateNum":1,"skin":"battlefail/btn_giveup.png"}},{"type":"Button","props":{"y":744,"x":418,"var":"btnBattleAgain","stateNum":1,"skin":"battlefail/btn_battleagain.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.battle.BattleFailViewUI.uiView);

        }

    }
}

module ui.battle {
    export class BattleReportViewUI extends View {
		public panelMask:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":375},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"unpack/main/img_reportsbg.png","sizeGrid":"30,4,4,4","height":374}},{"type":"Panel","props":{"y":68,"x":20,"width":715,"var":"panelMask","vScrollBarSkin":"comp/vscroll.png","height":200}},{"type":"Image","props":{"y":8,"x":314,"skin":"main/img_battlereport.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.battle.BattleReportViewUI.uiView);

        }

    }
}

module ui.battle {
    export class BattleSuccessViewUI extends View {
		public bg:Laya.Image;
		public imgGray:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"y":150,"x":0,"skin":"unpack/battlesuccess/img_bluebg.png"}},{"type":"Image","props":{"y":550,"x":378,"var":"imgGray","skin":"unpack/battlesuccess/img_blue.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":521,"x":-13,"skin":"unpack/battlesuccess/img_bg.png"}},{"type":"Image","props":{"y":325,"x":72,"skin":"unpack/battlesuccess/img_success.png"}},{"type":"Image","props":{"y":676,"x":134,"skin":"battlesuccess/img_rewards.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.battle.BattleSuccessViewUI.uiView);

        }

    }
}

module ui.battle {
    export class ChallengeBossViewUI extends View {
		public btnFast:Laya.Button;
		public sprRole:Laya.Sprite;
		public btnTimes:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/challengeboss/img_battlebg.png"}},{"type":"Button","props":{"y":1111,"x":277,"width":195,"visible":false,"var":"btnFast","skin":"comp/button.png","labelSize":30,"label":"快速结束","height":71}},{"type":"Sprite","props":{"var":"sprRole"}},{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/challengeboss/img_battlepre.png"}},{"type":"Button","props":{"y":1121,"x":333,"width":83,"var":"btnTimes","stateNum":1,"skin":"comp/btn_comp.png","labelSize":30,"labelFont":"SimHei","labelColors":"#46300e","labelBold":true,"label":"X1","height":60,"alpha":0.9}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.battle.ChallengeBossViewUI.uiView);

        }

    }
}

module ui.battle {
    export class MapBattleViewUI extends View {
		public btnChalleangeBoss:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/main/img_fenwei.png"}},{"type":"Button","props":{"y":891,"x":567,"width":172,"var":"btnChalleangeBoss","stateNum":1,"skin":"comp/btn_comp.png","labelSize":30,"labelFont":"SimHei","labelColors":"#46300e","labelBold":true,"label":"挑战boss","height":60,"alpha":0.9}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.battle.MapBattleViewUI.uiView);

        }

    }
}

module ui {
    export class ChoiceServerViewUI extends View {
		public bg:Laya.Image;
		public listServer:Laya.List;
		public btnBack:Laya.Button;
		public boxPreServ0:Laya.Box;
		public boxPreServ1:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"bg","skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"y":337,"x":66,"skin":"unpack/login/loginbox.png","scaleY":1.1,"scaleX":1.1}},{"type":"List","props":{"y":611,"x":112,"width":531,"var":"listServer","repeatY":4,"repeatX":2,"height":290,"centerY":89,"centerX":2},"child":[{"type":"Box","props":{"y":0,"x":0,"width":273,"name":"render","height":83},"child":[{"type":"Clip","props":{"y":-14,"x":-6,"skin":"login/img_fontbg2.png","name":"clip","clipY":1}},{"type":"Label","props":{"y":7,"x":10,"width":134,"text":"测试服务","name":"lblServName","height":29,"fontSize":22,"font":"SimHei","color":"#baf8ff","bold":false,"align":"center"}},{"type":"Image","props":{"y":-4,"x":141,"skin":"login/img_state0.png","name":"imgServState"}}]},{"type":"VScrollBar","props":{"y":0,"x":526,"width":17,"skin":"comp/vscroll.png","name":"scrollBar","height":254}}]},{"type":"Button","props":{"y":331,"x":595,"var":"btnBack","stateNum":1,"skin":"login/btn_back.png"}},{"type":"Image","props":{"y":413,"x":293,"skin":"login/img_font3.png"}},{"type":"Image","props":{"y":548,"x":313,"skin":"login/img_font.png"}},{"type":"Box","props":{"y":475,"x":112,"var":"boxPreServ0","height":38},"child":[{"type":"Clip","props":{"y":-14,"x":-6,"skin":"login/img_fontbg2.png","name":"clip","clipY":1}},{"type":"Label","props":{"y":7,"x":10,"width":134,"name":"lblServName","height":31,"fontSize":22,"font":"SimHei","color":"#baf8ff","bold":false,"align":"center"}},{"type":"Image","props":{"y":-4,"x":146,"skin":"login/img_state0.png","name":"imgServState"}}]},{"type":"Box","props":{"y":475,"x":386,"visible":false,"var":"boxPreServ1","height":38},"child":[{"type":"Clip","props":{"y":-14,"x":-6,"skin":"login/img_fontbg2.png","name":"clip","clipY":1}},{"type":"Label","props":{"y":7,"x":10,"width":134,"text":"测试","name":"lblServName","height":36,"fontSize":22,"font":"SimHei","color":"#baf8ff","bold":false,"align":"center"}},{"type":"Image","props":{"y":-4,"x":146,"skin":"login/img_state0.png","name":"imgServState"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ChoiceServerViewUI.uiView);

        }

    }
}

module ui.comp {
    export class IconViewUI extends View {
		public clipBG:Laya.Clip;
		public imgIcon:Laya.Image;
		public imgTick:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":115,"height":115},"child":[{"type":"Clip","props":{"y":-2,"x":-5,"var":"clipBG","skin":"comp/q_1.png","clipY":1}},{"type":"Image","props":{"y":9,"x":9,"width":95,"var":"imgIcon","height":96}},{"type":"Image","props":{"y":25,"x":-4,"visible":false,"var":"imgTick","skin":"comp/img_select.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.comp.IconViewUI.uiView);

        }

    }
}

module ui.comp {
    export class SkillIconUI extends View {
		public imgBg:Laya.Image;
		public imgIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":0,"height":0},"child":[{"type":"Image","props":{"x":0,"width":100,"var":"imgBg","skin":"comp/blank.png","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"imgIcon","skin":"comp/blank.png","height":100}},{"type":"Label","props":{"y":72,"x":26,"text":"龙啸九天","color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.comp.SkillIconUI.uiView);

        }

    }
}

module ui {
    export class CreateRoleViewUI extends View {
		public imgMan:Laya.Image;
		public imgGirl:Laya.Image;
		public btnRandom:Laya.Button;
		public btnSure:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"comp/blank.png","height":1334},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"height":1334,"fillColor":"#ffffff"}},{"type":"Rect","props":{"y":200,"x":56,"width":300,"lineWidth":1,"height":600,"fillColor":"#d1cbcb"}},{"type":"Rect","props":{"y":200,"x":400,"width":300,"lineWidth":1,"height":600,"fillColor":"#d1cbcb"}}]},{"type":"Image","props":{"y":934,"x":227,"width":66,"var":"imgMan","skin":"comp/blank.png","height":65},"child":[{"type":"Text","props":{"y":17,"x":19,"width":30,"text":"男","height":30,"fontSize":30,"color":"#000000","bold":true}}]},{"type":"Image","props":{"y":934,"x":458,"width":66,"var":"imgGirl","skin":"comp/blank.png","height":65},"child":[{"type":"Text","props":{"y":17,"x":19,"width":30,"text":"女","height":30,"fontSize":30,"color":"#000000","bold":true}}]},{"type":"Image","props":{"y":1058,"x":250,"width":234,"skin":"comp/blank.png","height":40},"child":[{"type":"Label","props":{"y":3,"x":-5,"width":235,"valign":"middle","text":"label","height":35,"fontSize":30,"font":"SimHei","color":"#000000","align":"center"}}]},{"type":"Button","props":{"y":1061,"x":497,"width":46,"var":"btnRandom","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"随","height":38}},{"type":"Button","props":{"y":1150,"x":288,"width":167,"var":"btnSure","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"确定","height":38}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.CreateRoleViewUI.uiView);

        }

    }
}

module ui {
    export class DebugViewUI extends View {
		public imgBg:Laya.Image;
		public lblDec:Laya.Label;
		public btnClear:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"var":"imgBg","skin":"comp/blank.png","height":60}},{"type":"Label","props":{"y":42,"x":85,"wordWrap":true,"width":500,"var":"lblDec","text":"label","leading":2,"height":24,"fontSize":16,"color":"#f4f1f1"}},{"type":"Button","props":{"y":3,"x":362,"width":75,"var":"btnClear","skin":"comp/button.png","label":"clear","height":23}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.DebugViewUI.uiView);

        }

    }
}

module ui {
    export class EnterGameViewUI extends View {
		public btnLogin:Laya.Button;
		public btnRegster:Laya.Button;
		public btnChoice:Laya.Button;
		public lblServName:laya.display.Text;
		public imgServState:Laya.Image;
		public btnSelect:Laya.Button;
		public serverListView:ui.ChoiceServerViewUI;

        public static  uiView:any ={"type":"View","props":{"width":750,"skin":"login/img_state0.png","height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/login/loginbg.png"}},{"type":"Button","props":{"y":718,"x":235,"var":"btnLogin","stateNum":1,"skin":"login/btn_startgame.png","labelSize":38}},{"type":"Image","props":{"y":106,"x":38,"width":674,"visible":false,"skin":"unpack/login/logo.png","height":422}},{"type":"Button","props":{"y":42,"x":593,"width":140,"var":"btnRegster","stateNum":1,"skin":"comp/btn_comp.png","labelSize":24,"labelFont":"SimHei","labelColors":"#46300e","labelBold":true,"label":"切换账户","height":45,"alpha":0.9}},{"type":"Button","props":{"y":600,"x":214,"width":303,"var":"btnChoice","height":63},"child":[{"type":"Image","props":{"y":-3,"x":3,"skin":"login/img_fontbg3.png"}},{"type":"Text","props":{"y":14,"x":13,"width":254,"var":"lblServName","text":"一区丶齐天大圣","height":41,"fontSize":30,"font":"SimHei","color":"#baf8ff","bold":true,"align":"center"}},{"type":"Image","props":{"y":14,"x":250,"var":"imgServState","skin":"login/img_state0.png"}}]},{"type":"Button","props":{"y":608,"x":535,"var":"btnSelect","stateNum":1,"skin":"login/btn_select.png"}},{"type":"ChoiceServerView","props":{"y":0,"x":0,"visible":false,"var":"serverListView","runtime":"ui.ChoiceServerViewUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.ChoiceServerViewUI",ui.ChoiceServerViewUI);

            super.createChildren();
            this.createView(ui.EnterGameViewUI.uiView);

        }

    }
}

module ui.equip {
    export class SmeltViewUI extends View {
		public smeltTitle:Laya.Image;
		public smeltPanel:Laya.Panel;
		public displylable:Laya.Label;
		public ani1:Laya.Animation;
		public ani2:Laya.Animation;
		public ani3:Laya.Animation;
		public ani4:Laya.Animation;
		public ani5:Laya.Animation;
		public ani6:Laya.Animation;
		public btnSmelt:Laya.Image;
		public ainrong:Laya.Animation;
		public smeltNum:Laya.Label;
		public displyLable:Laya.Label;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/smelt/smeltbg.png"}},{"type":"Image","props":{"y":69,"x":6,"var":"smeltTitle","skin":"smelt/smelt.png"}},{"type":"Panel","props":{"y":343,"x":66,"width":652,"var":"smeltPanel","name":"smeltPanel","height":667},"child":[{"type":"Image","props":{"y":647,"x":2,"skin":"unpack/smelt/slidimg.png"}},{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/smelt/boximg.png"}},{"type":"Image","props":{"y":132,"x":104,"skin":"unpack/comp/zhuangbeijiatu.png"}},{"type":"Image","props":{"y":32,"x":30,"skin":"smelt/lablenum.png"}},{"type":"Label","props":{"y":306,"x":318,"var":"displylable","text":"当前熔炼","fontSize":30,"color":"#e5f2f3","bold":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Animation","props":{"y":336,"x":160,"width":1,"visible":false,"var":"ani1","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani1","height":1,"autoPlay":true}},{"type":"Animation","props":{"y":491,"x":160,"visible":false,"var":"ani2","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani2","autoPlay":true}},{"type":"Animation","props":{"y":184,"x":490,"visible":false,"var":"ani3","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani3","autoPlay":true}},{"type":"Animation","props":{"y":339,"x":490,"visible":false,"var":"ani4","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani4","autoPlay":true}},{"type":"Animation","props":{"y":501,"x":490,"visible":false,"var":"ani5","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani5","autoPlay":true}},{"type":"Animation","props":{"y":181,"x":160,"visible":false,"var":"ani6","source":"res/ani/fuse.ani","scaleY":1.8,"scaleX":1.8,"name":"ani6","autoPlay":true}}]},{"type":"Image","props":{"y":254,"x":67,"skin":"smelt/daozhao.png"}},{"type":"Image","props":{"y":351,"x":60,"skin":"unpack/smelt/slidimg.png"}},{"type":"Image","props":{"y":267,"x":325,"skin":"smelt/skillbth.png"}},{"type":"Image","props":{"y":1031,"x":193,"skin":"smelt/autoselect.png"}},{"type":"Image","props":{"y":1033,"x":443,"var":"btnSmelt","skin":"smelt/smeltbth.png"}},{"type":"Animation","props":{"y":668,"x":386,"visible":false,"var":"ainrong","source":"res/ani/ronglian1.ani","name":"ainrong","autoPlay":false}},{"type":"Label","props":{"y":671,"x":348,"visible":false,"var":"smeltNum","text":"1350","name":"smeltNum","fontSize":30,"color":"#74ef13","bold":true}},{"type":"Label","props":{"y":671,"x":348,"visible":true,"var":"displyLable","text":"2000","name":"displyLable","fontSize":30,"color":"#74ef13","bold":true}},{"type":"Button","props":{"y":19,"x":688,"var":"btnClose","stateNum":1,"skin":"comp/close.png","name":"btnClose"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.equip.SmeltViewUI.uiView);

        }

    }
}

module ui.farm {
    export class FarmViewUI extends View {
		public farmPanel:Laya.Panel;
		public bg:Laya.Image;
		public panlePlant:Laya.Panel;
		public zhongzhiList:Laya.List;
		public zhongzhiBg:Laya.Image;
		public ZhongZhiIcon:Laya.Image;
		public zhongzhiName:Laya.Label;
		public shengyuCount:Laya.Label;
		public wumai:Laya.Image;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":750,"var":"farmPanel","height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"unpack/farm/bg.png"}},{"type":"Image","props":{"y":1197,"x":29,"skin":"unpack/farm/huawen.png"}},{"type":"Panel","props":{"y":159,"x":-32,"width":1383,"var":"panlePlant","height":671},"child":[{"type":"Image","props":{"y":12,"x":-265,"skin":"unpack/farm/caijimap.png"}}]},{"type":"Image","props":{"y":37,"x":-1,"skin":"farm/tip-zhongzi.png"}},{"type":"Panel","props":{"y":827,"x":24,"width":703,"height":354},"child":[{"type":"Image","props":{"y":20,"x":0,"skin":"unpack/farm/bgzhongzhi.png"}},{"type":"Image","props":{"y":21,"x":-16,"skin":"farm/tip-zhongzhi.png"}},{"type":"List","props":{"width":491,"var":"zhongzhiList","spaceY":10,"spaceX":10,"selectEnable":false,"repeatY":1,"repeatX":3,"renderType":"render","name":"zhongzhiList","height":210,"centerY":16,"centerX":9},"child":[{"type":"VScrollBar","props":{"y":10,"x":-48,"width":1,"name":"scrollBar","height":227}},{"type":"VBox","props":{"x":2,"width":152,"top":10,"space":15,"renderType":"render","bottom":5,"align":"center"},"child":[{"type":"Panel","props":{"y":-51,"x":-28,"width":104,"height":102,"anchorY":0,"anchorX":0},"child":[{"type":"Image","props":{"y":51,"x":52,"width":104,"var":"zhongzhiBg","skin":"farm/frame.png","name":"zhongzhiBg","height":102,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":53,"x":50,"var":"ZhongZhiIcon","skin":"farm/bigmogu.png","name":"ZhongZhiIcon","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":59,"x":-29,"var":"zhongzhiName","text":"毒蘑菇花花","name":"zhongzhiName","fontSize":20,"color":"#f2d778","bold":true,"align":"center"}},{"type":"Label","props":{"y":59,"x":-53,"text":"已使用：（2/3）","name":"zhongzhiName","fontSize":20,"color":"#563610","bold":true,"align":"center"}}]}]}]},{"type":"Panel","props":{"y":783,"x":428,"width":290,"height":38},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"farm/bgnumber.png"}},{"type":"Button","props":{"y":1,"x":255,"stateNum":1,"skin":"farm/jia.png"}},{"type":"Label","props":{"y":6,"x":187,"var":"shengyuCount","text":"3","name":"shengyuCount","fontSize":25,"color":"#f6ed94","bold":true}},{"type":"Image","props":{"y":2,"x":8,"skin":"farm/chishu.png"}}]},{"type":"Image","props":{"y":-298,"x":-1420,"width":2182,"var":"wumai","skin":"worldmap/wumai.png","height":823}}]},{"type":"Button","props":{"y":41,"x":649,"var":"btnClose","stateNum":1,"skin":"comp/close.png","name":"btnClose"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.farm.FarmViewUI.uiView);

        }

    }
}

module ui {
    export class GameViewUI extends View {
		public btnOpen:Laya.Button;
		public btnMap:Laya.Button;
		public btnHero:Laya.Button;
		public btnLineup:Laya.Button;
		public btnBag:Laya.Button;
		public btnBattle:Laya.Button;
		public viewAniScale:ui.test.TestAniScaleViewUI;

        public static  uiView:any ={"type":"View","props":{"width":750,"mouseThrough":true,"height":1334},"child":[{"type":"Button","props":{"y":17,"x":706,"width":34,"visible":false,"var":"btnOpen","stateNum":1,"skin":"main/laba.png","sizeGrid":"-10,0,-6,-14","labelStrokeColor":"#f88508","labelSize":32,"height":31,"alpha":0.6}},{"type":"Tab","props":{"y":1235,"x":0,"width":746,"height":124},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/main/img_btnbg.png"}},{"type":"Button","props":{"y":98,"x":94,"var":"btnMap","stateNum":1,"skin":"main/btn_map.png","scaleY":0.9,"scaleX":0.9,"pivotY":130,"pivotX":76,"labelSize":40}},{"type":"Button","props":{"y":98,"x":545,"var":"btnHero","stateNum":1,"skin":"main/btn_hero.png","scaleY":0.9,"scaleX":0.9,"pivotY":130,"pivotX":76,"labelSize":40}},{"type":"Button","props":{"y":98,"x":227,"var":"btnLineup","stateNum":1,"skin":"main/btn_lineup.png","scaleY":0.9,"scaleX":0.9,"pivotY":130,"pivotX":76,"labelSize":40}},{"type":"Button","props":{"y":98,"x":673,"var":"btnBag","stateNum":1,"skin":"main/btn_bag.png","scaleY":0.9,"scaleX":0.9,"pivotY":130,"pivotX":76,"labelSize":40}},{"type":"Button","props":{"y":100,"x":377,"var":"btnBattle","stateNum":1,"skin":"main/btn_battle.png","pivotY":130,"pivotX":76,"labelSize":40}}]},{"type":"TestAniScaleView","props":{"y":1,"x":253,"visible":false,"var":"viewAniScale","runtime":"ui.test.TestAniScaleViewUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.test.TestAniScaleViewUI",ui.test.TestAniScaleViewUI);

            super.createChildren();
            this.createView(ui.GameViewUI.uiView);

        }

    }
}

module ui.graphtag {
    export class GraphtagViewUI extends View {
		public graphtagPanel:Laya.Panel;
		public btnClose:Laya.Button;
		public atkImage:Laya.Image;
		public defImage:Laya.Image;
		public graptitleImage:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"skin":"unpack/comp/mainbg.png"}},{"type":"Panel","props":{"y":204,"x":755,"width":734,"var":"graphtagPanel","height":953},"child":[{"type":"Image","props":{"skin":"unpack/comp/dibanbg.png"}},{"type":"Button","props":{"y":-9,"x":676,"var":"btnClose","stateNum":1,"skin":"comp/close.png","name":"btnClose"}},{"type":"Image","props":{"y":0,"x":10,"var":"atkImage","skin":"graphtag/atk.png"}},{"type":"Image","props":{"y":121,"x":9,"var":"defImage","skin":"graphtag/checkDef.png"}},{"type":"Image","props":{"y":58,"x":100,"skin":"unpack/comp/line.png"}},{"type":"Image","props":{"y":885,"x":98,"skin":"unpack/comp/line.png"}},{"type":"Image","props":{"y":87,"x":85,"skin":"unpack/graphtag/grahtagjiatu.png"}}]},{"type":"Image","props":{"y":35,"x":-227,"var":"graptitleImage","skin":"graphtag/graptitle.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.graphtag.GraphtagViewUI.uiView);

        }

    }
}

module ui {
    export class HeroViewUI extends View {
		public clipShadow:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/main/roleBg.png"}},{"type":"Clip","props":{"y":357,"x":149,"width":134,"var":"clipShadow","skin":"main/clip_shadow.png","index":0,"height":43,"clipY":2}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HeroViewUI.uiView);

        }

    }
}

module ui.lineup {
    export class LineupGridViewUI extends View {
		public clipShadow:Laya.Clip;
		public lblLineupID:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Clip","props":{"y":0,"x":6,"width":161,"var":"clipShadow","skin":"main/clip_shadow.png","index":0,"height":54,"clipY":2}},{"type":"Label","props":{"y":49,"x":0,"width":178,"var":"lblLineupID","text":"霸王龙 【真】","height":32,"fontSize":20,"color":"#f4eb1a","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.lineup.LineupGridViewUI.uiView);

        }

    }
}

module ui.lineup {
    export class LineupViewUI extends View {
		public listIcon:Laya.List;
		public grid0:ui.lineup.LineupGridViewUI;
		public grid1:ui.lineup.LineupGridViewUI;
		public grid2:ui.lineup.LineupGridViewUI;
		public grid3:ui.lineup.LineupGridViewUI;
		public grid4:ui.lineup.LineupGridViewUI;

        public static  uiView:any ={"type":"View","props":{"width":750,"renderType":"render","height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/lineup/bg.png"}},{"type":"Image","props":{"y":522,"x":-4,"skin":"unpack/lineup/juese_bg.png"}},{"type":"List","props":{"y":967,"x":23,"width":716,"var":"listIcon","repeatY":2,"repeatX":6,"height":234},"child":[{"type":"VScrollBar","props":{"y":4,"x":698,"width":17,"visible":false,"skin":"comp/vscroll.png","name":"scrollBar","height":188}},{"type":"IconView","props":{"y":1,"x":2,"runtime":"IconView","name":"render"}}]},{"type":"LineupGridView","props":{"y":645,"x":287,"var":"grid0","runtime":"ui.lineup.LineupGridViewUI"}},{"type":"LineupGridView","props":{"y":743,"x":412,"var":"grid1","runtime":"ui.lineup.LineupGridViewUI"}},{"type":"LineupGridView","props":{"y":841,"x":536,"var":"grid2","runtime":"ui.lineup.LineupGridViewUI"}},{"type":"LineupGridView","props":{"y":711,"x":84,"var":"grid3","runtime":"ui.lineup.LineupGridViewUI"}},{"type":"LineupGridView","props":{"y":817,"x":168,"var":"grid4","runtime":"ui.lineup.LineupGridViewUI"}},{"type":"Image","props":{"y":26,"x":23,"skin":"unpack/main/skill_bg02.png"}},{"type":"Image","props":{"y":48,"x":45,"skin":"main/skill_bg01.png"}},{"type":"Button","props":{"y":373,"x":23,"width":131,"stateNum":1,"skin":"comp/btn_base.png","height":51}},{"type":"Button","props":{"y":373,"x":193,"width":131,"stateNum":1,"skin":"comp/btn_skill.png","height":51}},{"type":"Button","props":{"y":373,"x":362,"width":131,"stateNum":1,"skin":"comp/btn_evolve.png","height":51}},{"type":"Button","props":{"y":275,"x":505,"width":131,"stateNum":1,"skin":"comp/btn_resetskill.png","height":52}},{"type":"Image","props":{"y":962,"x":0,"width":750,"skin":"unpack/main/skill_bk.png","height":245}},{"type":"Image","props":{"y":930,"x":20,"skin":"unpack/main/skill_ht.png"}},{"type":"SkillGridView","props":{"y":84,"x":82,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"SkillGridView","props":{"y":218,"x":82,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"SkillGridView","props":{"y":218,"x":201,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"SkillGridView","props":{"y":84,"x":319,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"SkillGridView","props":{"y":84,"x":201,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"SkillGridView","props":{"y":218,"x":319,"runtime":"ui.lineup.SkillGridViewUI"}},{"type":"Label","props":{"y":50,"x":441,"width":258,"text":"技能 XXX","height":32,"fontSize":28,"color":"#5a5757","bold":true,"align":"center"}},{"type":"Text","props":{"y":91,"x":441,"wordWrap":true,"width":258,"text":"我知道我很吊。但是我不说...到底那里吊，我也不知道","leading":12,"height":176,"fontSize":18,"color":"#716464","bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("IconView",IconView);
			View.regComponent("ui.lineup.LineupGridViewUI",ui.lineup.LineupGridViewUI);
			View.regComponent("ui.lineup.SkillGridViewUI",ui.lineup.SkillGridViewUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.lineup.LineupViewUI.uiView);

        }

    }
}

module ui.lineup {
    export class SkillGridViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":150,"height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"width":79,"skin":"comp/skill_bg003.png","height":80}},{"type":"Label","props":{"y":82,"x":0,"width":79,"text":"技能 xxx","height":20,"fontSize":20,"color":"#000000","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.lineup.SkillGridViewUI.uiView);

        }

    }
}

module ui {
    export class LoginViewUI extends View {
		public logoImg:Laya.Image;
		public boxLogin:Laya.Box;
		public btnLogin:Laya.Button;
		public inputAccount:Laya.TextInput;
		public inputPwd:Laya.TextInput;
		public btnForgetPwd:Laya.Button;
		public btnRegister:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/login/loginbg.png"}},{"type":"Image","props":{"y":-271,"x":28,"visible":false,"var":"logoImg","skin":"unpack/login/logo.png"}},{"type":"Box","props":{"y":1355,"x":105,"var":"boxLogin"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/login/loginbox.png"}},{"type":"Image","props":{"y":155,"x":79,"skin":"login/img_fontbg.png"}},{"type":"Image","props":{"y":106,"x":104,"skin":"login/img_account.png"}},{"type":"Image","props":{"y":202,"x":104,"skin":"login/img_font4.png"}},{"type":"Button","props":{"y":277,"x":372,"var":"btnLogin","stateNum":1,"skin":"login/btn_login.png"}},{"type":"TextInput","props":{"y":104,"x":189,"width":284,"var":"inputAccount","text":"xielong","height":42,"fontSize":28,"bold":true}},{"type":"TextInput","props":{"y":193,"x":192,"wordWrap":false,"width":281,"var":"inputPwd","type":"password","text":"123456","height":42,"fontSize":28,"bold":true}},{"type":"Button","props":{"y":321,"x":103,"var":"btnForgetPwd","stateNum":1,"skin":"login/btn_forgetpwd.png"}},{"type":"Button","props":{"y":387,"x":210,"var":"btnRegister","stateNum":1,"skin":"login/btn_register.png"}},{"type":"Button","props":{"y":443,"x":105,"stateNum":1,"skin":"login/btn_qq.png"}},{"type":"Button","props":{"y":443,"x":207,"stateNum":1,"skin":"login/btn_wx.png"}},{"type":"Button","props":{"y":443,"x":308,"stateNum":1,"skin":"login/btn_persion.png"}},{"type":"Button","props":{"y":443,"x":410,"stateNum":1,"skin":"login/btn_add.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoginViewUI.uiView);

        }

    }
}

module ui.main {
    export class ModuleLoadViewUI extends View {
		public panelLoad:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Panel","props":{"width":240,"var":"panelLoad","height":260,"centerY":-50,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.ModuleLoadViewUI.uiView);

        }

    }
}

module ui.main {
    export class PreLoadViewUI extends View {
		public boxLoading:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Box","props":{"y":0,"x":2,"width":750,"var":"boxLoading","height":1334}},{"type":"Particle2D","props":{"y":507,"x":302,"url":"res/ani/yezhi_1.part","name":"yezhi"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Particle2D",laya.particle.Particle2D);

            super.createChildren();
            this.createView(ui.main.PreLoadViewUI.uiView);

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

module ui.map {
    export class GateListViewUI extends View {
		public imgMapBlock:Laya.Image;
		public listGate:Laya.List;
		public imgMapName:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":690,"height":830},"child":[{"type":"Image","props":{"y":-6,"x":-18,"skin":"unpack/worldmap/img_gatebg.png"}},{"type":"Image","props":{"y":-104,"x":-48,"var":"imgMapBlock","skin":"worldmap/img_map.png"}},{"type":"List","props":{"y":209,"x":24,"width":639,"var":"listGate","spaceY":20,"repeatY":4,"layoutEnabled":true,"height":602},"child":[{"type":"Box","props":{"y":0,"x":0,"width":627,"name":"render","height":114},"child":[{"type":"Image","props":{"skin":"unpack/worldmap/img_listbg.png","name":"bg"}},{"type":"Label","props":{"y":18,"x":125,"width":188,"text":"关卡","name":"lblName","height":29,"fontSize":26,"color":"0x000000","bold":true}},{"type":"Image","props":{"y":9,"x":17,"width":95,"name":"imgIcon","height":96}},{"type":"Label","props":{"y":48,"x":138,"width":188,"text":"推荐等级：","name":"lblLevel","height":29,"fontSize":20,"color":"#b05454","bold":true}},{"type":"Image","props":{"y":67,"x":138,"width":46,"skin":"worldmap/img_reward.png","name":"imgReward","height":40}},{"type":"Label","props":{"y":76,"x":186,"width":99,"text":"宝箱：1","name":"lblReadNum","height":29,"fontSize":20,"color":"#99743d","bold":true}},{"type":"Button","props":{"y":27,"x":441,"stateNum":1,"skin":"worldmap/btn_swap.png","name":"btnSweep"}},{"type":"Button","props":{"y":27,"x":440,"stateNum":1,"skin":"worldmap/btn_chanllege.png","name":"btnChanllege"}},{"type":"Image","props":{"y":38,"x":397,"skin":"worldmap/img_notice.png","name":"img_notice"}},{"type":"Image","props":{"y":20,"x":295,"skin":"worldmap/img_hundup.png","name":"img_hand"}}]},{"type":"VScrollBar","props":{"y":0,"x":622,"width":17,"skin":"comp/vscroll.png","name":"scrollBar","height":551}}]},{"type":"Image","props":{"y":20,"x":318,"var":"imgMapName","skin":"worldmap/img_lbl0.png"}},{"type":"Text","props":{"y":96,"x":211,"wordWrap":true,"width":436,"text":"每当你打开一扇门，其它的门就随之关闭，自始至终，你都只有一条路可走。 ","leading":12,"height":97,"fontSize":20,"color":"#342727","bold":true,"align":"left"}},{"type":"Text","props":{"y":159,"x":215,"wordWrap":true,"width":432,"text":"——《龙族》","leading":12,"height":34,"fontSize":20,"color":"#342727","bold":true,"align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.map.GateListViewUI.uiView);

        }

    }
}

module ui.map {
    export class MapWorldViewUI extends View {
		public panelBlock:Laya.Box;
		public imgNoOpen:Laya.Image;
		public imgBlock3:Laya.Image;
		public imgBlock6:Laya.Image;
		public imgBlock4:Laya.Image;
		public imgBlock5:Laya.Image;
		public imgBlock2:Laya.Image;
		public imgBlock1:Laya.Image;
		public imgBlock0:Laya.Image;
		public imgBlock7:Laya.Image;
		public imgBlock8:Laya.Image;
		public imgBlock9:Laya.Image;
		public imgBlock10:Laya.Image;
		public imgBlock11:Laya.Image;
		public imgBlock12:Laya.Image;
		public imgBlock13:Laya.Image;
		public wumaiImage:Laya.Image;
		public yun1:Laya.Image;
		public yun2:Laya.Image;
		public yun3:Laya.Image;
		public yun4:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"panelBlock","name":"panelBlock"},"child":[{"type":"Image","props":{"y":0,"x":2326,"skin":"unpack/worldmap/bg2.jpg"}},{"type":"Image","props":{"y":0,"x":0,"skin":"unpack/worldmap/bg1.jpg"}},{"type":"Image","props":{"y":23,"x":1810,"var":"imgNoOpen","skin":"unpack/worldmap/nopen.png"}},{"type":"Image","props":{"y":501,"x":510,"var":"imgBlock3","skin":"unpack/worldmap/p4.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"187,216.20930232558146,58.02325581395348,112.74418604651157,41,-5,344,20,519.2558139534883,60.20930232558135,581.9069767441861,157.23255813953483,500.62790697674427,286.720930232558,334.76744186046506,353.0465116279071","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":90,"x":981,"var":"imgBlock6","skin":"unpack/worldmap/p7.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"295.9069767441863,192.9302325581396,179.44186046511652,209.25581395348837,16.372093023255502,162.74418604651166,155.30232558139528,12.186046511627893,240.90697674418607,19.046511627906995,335.44186046511595,63.06976744186045,369.32558139534876,127.23255813953492","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":160,"x":237,"var":"imgBlock4","skin":"unpack/worldmap/p5.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"282.6184789440603,332.2740414833438,134.69641734758017,184.53488372093022,37.95725958516667,51.60967944688872,273.3488372093022,31.41860465116278,449.29289754871155,105.26901319924582,506.1627906976745,248.76744186046506,497.93023255813966,343.39534883720927","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":70,"x":558,"var":"imgBlock5","skin":"unpack/worldmap/p6.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"211.65116279069775,428.51162790697674,158.88372093023247,240.32558139534882,-4.04651162790708,94.72093023255815,123.53488372093022,30.441860465116292,578.7674418604652,231.81395348837205,561.7906976744187,434.7674418604651,477.1627906976744,488.6511627906977","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":624,"x":225,"var":"imgBlock2","skin":"unpack/worldmap/p3.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"372.5348837209302,241.84973166368513,148.7209302325582,254.48837209302326,12.162790697674382,111.48837209302326,177.19856887298744,109.15384615384608,325.6744186046511,14.821109123434667,432.69230769230774,79.84615384615381,696.232558139535,302.81395348837214","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":854,"x":329,"var":"imgBlock1","skin":"unpack/worldmap/p2.png"},"child":[{"type":"Poly","props":{"y":2,"x":7,"renderType":"hit","points":"97.85514673886769,97.78958565005087,81.34685490499442,73.36493738819343,86.84719334719335,21.20997920997911,159.78143886283414,8.067084078712014,206.20732002127346,24.422061596480262,188.931489629164,72.16380602427114,141.99758255572198,105.41715418459603","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":854,"x":416,"var":"imgBlock0","skin":"unpack/worldmap/p1.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"117.18353236957893,406.58956631049614,107.50500410965526,266.1213073538654,10.508050089445419,141.34704830053658,114.50089445438289,29.771019677996378,206.2066189624329,8.888193202146681,475.8932940095731,97.65652951699462,483.2241454334478,180.3023255813954","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":93,"x":864,"var":"imgBlock7","skin":"unpack/worldmap/p8.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"243.61359570661898,760.1762075134167,93.3130590339893,835.8023255813952,22.202146690518703,782.3631484794274,134.20930232558158,699.241502683363,287.2075134168156,229.04830053667257,512.5778175313059,100.92486583184248,583.6663685152057,132.1440071556351,610.3273703041143,383.0769230769231,526.5205724508048,661.474060822898,370.9856887298747,766.2119856887296","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":838,"x":932,"var":"imgBlock8","skin":"unpack/worldmap/p9.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"240.6279069767442,300.74418604651123,88.27906976744191,270.3953488372092,33.09302325581393,171.5348837209301,14.232558139534945,93.23255813953472,231.6345065996229,11.647705845380528,422,76.27906976744191,477.32558139534876,204.7209302325581","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":642,"x":1268,"var":"imgBlock9","skin":"unpack/worldmap/p10.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"105.74418604651163,279.8139534883719,13.860465116278988,205.27906976744168,188.90697674418584,120.37209302325584,104.93023255813944,56.02325581395348,166.8953488372092,1.15116279069764,345.2558139534883,104.18604651162798,368.0232558139537,246.5813953488372","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":40,"x":1298,"var":"imgBlock10","skin":"unpack/worldmap/p11.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"690.8837209302326,391.6162790697675,545.2790697674416,342.6046511627905,288.0276555625393,444.3739786297925,170.3023255813955,322.6976744186046,30.7001885606536,34.71590194846004,585.5,24.406976744186068,1189.4418604651162,683.2558139534885,1130.8139534883726,746.581395348837,888.5581395348836,647.4302325581394,714.1395348837211,512.5465116279069","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":450,"x":1407,"var":"imgBlock11","skin":"unpack/worldmap/p12.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"256.5116279069771,407.9651162790698,203.4186046511624,275.16279069767415,32.46511627907,172.72093023255798,12.162790697674382,106.41860465116281,79.34883720930259,9.511627906976685,215.73255813953483,47.66279069767438,254.5581395348836,162.32558139534888,400.5813953488371,253.5581395348837,415.34883720930225,333.82558139534876,432.2558139534883,456.45348837209303","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":555,"x":1810,"var":"imgBlock12","skin":"unpack/worldmap/p13.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"180.16279069767432,354.2325581395346,48.7441860465118,330.860465116279,12.162790697674382,148.2790697674418,137.48837209302326,107.18604651162786,178.52325581395348,19.755813953488314,528.9767441860461,197.20930232558146,681.9767441860461,318.6744186046511,525.5581395348836,368.6162790697674,381.04651162790697,372.9418604651163,274.0697674418607,289.2209302325581","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Image","props":{"y":377,"x":1622,"var":"imgBlock13","skin":"unpack/worldmap/p14.png"},"child":[{"type":"Poly","props":{"y":0,"x":0,"renderType":"hit","points":"201.0930232558141,312.3720930232556,78.9767441860464,265.7441860465116,30.76744186046517,155.25581395348837,56.09302325581427,58.3488372093023,208.7558139534883,10.453488372093034,340.60465116279033,78.60465116279073,333.1395348837211,246.58139534883708","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]}]}]},{"type":"Image","props":{"y":446,"x":-775,"width":3078,"var":"wumaiImage","skin":"worldmap/wumai.png","name":"wumaiImage","height":1204,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-263,"x":-370,"width":1623,"var":"yun1","skin":"unpack/worldmap/yun1.png","height":959}},{"type":"Image","props":{"y":805,"x":-1009,"width":1597,"var":"yun2","skin":"unpack/worldmap/yun2.png","height":711}},{"type":"Image","props":{"y":180,"x":-1068,"width":1599,"var":"yun3","skin":"unpack/worldmap/yun3.png","height":1027}},{"type":"Image","props":{"y":711,"x":13,"width":1032,"var":"yun4","skin":"unpack/worldmap/yun4.png","height":824}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.map.MapWorldViewUI.uiView);

        }

    }
}

module ui.skill {
    export class RoleSkillAdvanceViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"y":180,"x":15,"width":700,"height":954,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":700,"lineWidth":1,"height":954,"fillColor":"#ffffff"}},{"type":"Label","props":{"y":43,"x":187,"text":"技能进阶效果旋转","fontSize":40,"font":"SimHei","color":"#000000","bold":true}}]},{"type":"Box","props":{"y":393,"x":37,"name":"render"},"child":[{"type":"Image","props":{"width":650,"height":130},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":650,"lineWidth":1,"height":130,"fillColor":"#ffffff"}}]},{"type":"SkillIcon","props":{"y":3,"x":15,"runtime":"ui.comp.SkillIconUI"}},{"type":"Label","props":{"y":104,"x":25,"text":"等级：8","name":"lblLv","fontSize":24,"font":"SimHei"}},{"type":"Label","props":{"y":6,"x":136,"width":486,"text":"描述","name":"lblDesc","height":115,"fontSize":24,"font":"SimHei","color":"#000000"}}]},{"type":"Button","props":{"y":999,"x":294,"width":167,"skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"确定","height":43}},{"type":"List","props":{"y":594,"x":37,"spaceY":10,"repeatY":2},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"width":650,"height":130},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":650,"lineWidth":1,"height":130,"fillColor":"#ffffff"}}]},{"type":"SkillIcon","props":{"y":3,"x":15,"runtime":"ui.comp.SkillIconUI"}},{"type":"Label","props":{"y":104,"x":25,"text":"等级：8","name":"lblLv","fontSize":24,"font":"SimHei"}},{"type":"Label","props":{"y":6,"x":136,"width":399,"text":"描述","name":"lblDesc","height":115,"fontSize":24,"font":"SimHei"}},{"type":"Button","props":{"y":51,"x":546,"width":89,"skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"学习","height":43}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.comp.SkillIconUI",ui.comp.SkillIconUI);

            super.createChildren();
            this.createView(ui.skill.RoleSkillAdvanceViewUI.uiView);

        }

    }
}

module ui.skill {
    export class RoleSkillSelectViewUI extends View {
		public btnSure:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"width":700,"height":954,"centerY":0,"centerX":0},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":700,"lineWidth":1,"height":954,"fillColor":"#ffffff"}},{"type":"Label","props":{"y":42,"x":255,"text":"技能选择","fontSize":40,"font":"SimHei","color":"#000000","bold":true}}]},{"type":"List","props":{"y":314,"x":47,"spaceY":10,"repeatY":5},"child":[{"type":"Box","props":{"name":"render"},"child":[{"type":"Image","props":{"width":650,"height":130},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":650,"lineWidth":1,"height":130,"fillColor":"#ffffff"}}]},{"type":"SkillIcon","props":{"y":3,"x":15,"runtime":"ui.comp.SkillIconUI"}},{"type":"Label","props":{"y":104,"x":25,"text":"等级：8","name":"lblLv","fontSize":24,"font":"SimHei"}},{"type":"Label","props":{"y":6,"x":136,"width":486,"text":"描述","name":"lblDesc","height":115,"fontSize":24,"font":"SimHei"}}]}]},{"type":"Button","props":{"y":1056,"x":280,"width":167,"var":"btnSure","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"确定","height":43}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.comp.SkillIconUI",ui.comp.SkillIconUI);

            super.createChildren();
            this.createView(ui.skill.RoleSkillSelectViewUI.uiView);

        }

    }
}

module ui.skill {
    export class RoleTalentSkillViewUI extends View {
		public tabAttr:Laya.Tab;
		public lblLastTalent:Laya.Label;
		public btnReset:Laya.Button;
		public btnSure:Laya.Button;
		public btnUpSkill:Laya.Button;
		public boxTips:Laya.Box;
		public lblLv:Laya.Label;
		public lblDesc:Laya.Label;
		public btnAdvance:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"width":750,"height":1334},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"height":1334,"fillColor":"#ffffff"}},{"type":"Label","props":{"y":23,"x":285,"text":"本源天赋","fontSize":40,"font":"SimHei","color":"#000000","bold":true}}]},{"type":"Tab","props":{"y":88,"x":66,"width":285,"var":"tabAttr","skin":"comp/tab.png","selectedIndex":0,"labels":"火,地,风,水","labelSize":24,"height":26}},{"type":"Label","props":{"y":141,"x":282,"var":"lblLastTalent","text":"剩余天赋点数：8","fontSize":24,"font":"SimHei","color":"#000000\\"}},{"type":"Button","props":{"y":132,"x":484,"width":167,"var":"btnReset","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"重置","height":43}},{"type":"SkillIcon","props":{"y":282,"x":124,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":282,"x":542,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":454,"x":542,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":627,"x":542,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":799,"x":542,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":454,"x":124,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":627,"x":124,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":799,"x":124,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":454,"x":332,"runtime":"ui.comp.SkillIconUI"}},{"type":"SkillIcon","props":{"y":627,"x":332,"runtime":"ui.comp.SkillIconUI"}},{"type":"Button","props":{"y":1215,"x":166,"width":167,"var":"btnSure","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"确定","height":43}},{"type":"Button","props":{"y":1215,"x":428,"width":167,"var":"btnUpSkill","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"出战技能","height":43}},{"type":"Box","props":{"y":994,"x":58,"var":"boxTips"},"child":[{"type":"SkillIcon","props":{"runtime":"ui.comp.SkillIconUI"}},{"type":"Label","props":{"y":120,"x":10,"var":"lblLv","text":"等级：8","fontSize":24,"font":"SimHei"}},{"type":"Label","props":{"y":2,"x":122,"width":365,"var":"lblDesc","text":"描述","height":135,"fontSize":24,"font":"SimHei"},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":369,"lineWidth":1,"height":146,"fillColor":"#2574d9"}}]},{"type":"Button","props":{"y":47,"x":503,"width":167,"var":"btnAdvance","skin":"comp/button.png","labelSize":30,"labelFont":"SimHei","label":"进阶","height":43}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.comp.SkillIconUI",ui.comp.SkillIconUI);

            super.createChildren();
            this.createView(ui.skill.RoleTalentSkillViewUI.uiView);

        }

    }
}

module ui.skill {
    export class RoleUpSkillItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":650,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":650,"height":120},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":650,"lineWidth":1,"height":120,"fillColor":"#ffffff"}}]},{"type":"Image","props":{"y":13,"x":13,"width":100,"skin":"comp/blank.png","height":100},"child":[{"type":"Text","props":{"y":35,"x":17,"text":"探险","fontSize":30,"font":"SimHei","color":"#ffffff"}}]},{"type":"List","props":{"y":11,"x":142,"width":470,"spaceX":25,"repeatX":4,"name":"render","height":100},"child":[{"type":"SkillIcon","props":{"name":"render","runtime":"ui.comp.SkillIconUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.comp.SkillIconUI",ui.comp.SkillIconUI);

            super.createChildren();
            this.createView(ui.skill.RoleUpSkillItemUI.uiView);

        }

    }
}

module ui.skill {
    export class RoleUpSkillViewUI extends View {
		public imgMask:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"imgMask","skin":"comp/blank.png","height":1334}},{"type":"Image","props":{"y":125,"x":29,"width":700,"height":954},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":700,"lineWidth":1,"height":954,"fillColor":"#ffffff"}},{"type":"Label","props":{"y":42,"x":255,"text":"出战技能","fontSize":40,"font":"SimHei","color":"#000000","bold":true}}]},{"type":"List","props":{"y":268,"x":56,"repeatY":6},"child":[{"type":"RoleUpSkillItem","props":{"name":"render","runtime":"ui.skill.RoleUpSkillItemUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.skill.RoleUpSkillItemUI",ui.skill.RoleUpSkillItemUI);

            super.createChildren();
            this.createView(ui.skill.RoleUpSkillViewUI.uiView);

        }

    }
}

module ui.test {
    export class TestAniScaleViewUI extends View {
		public listAniScale:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":0,"height":0},"child":[{"type":"List","props":{"y":0,"x":0,"width":495,"var":"listAniScale","repeatY":6,"height":342},"child":[{"type":"Box","props":{"y":0,"x":-2,"width":370,"name":"render","height":57},"child":[{"type":"Image","props":{"y":0,"x":0,"width":366,"skin":"unpack/main/diban.png","height":57}},{"type":"Label","props":{"y":21,"x":99,"width":69,"text":"scale:","height":33,"fontSize":24}},{"type":"TextInput","props":{"y":16,"x":184,"width":49,"text":"0.5","skin":"comp/textinput.png","name":"inputScale","height":32,"fontSize":24}},{"type":"Button","props":{"y":13,"x":263,"width":91,"skin":"comp/button.png","name":"btnTest","labelSize":24,"label":"测试","height":38}},{"type":"Label","props":{"y":18,"x":2,"width":94,"name":"lblRoleName","height":33,"fontSize":24,"color":"#f11814"}}]},{"type":"VScrollBar","props":{"y":12,"x":367,"width":17,"skin":"comp/vscroll.png","name":"scrollBar","height":312}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestAniScaleViewUI.uiView);

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
