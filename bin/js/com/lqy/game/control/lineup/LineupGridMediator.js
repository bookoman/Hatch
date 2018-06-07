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
/*
* 阵型格子
*/
var LineupGridMediator = /** @class */ (function (_super) {
    __extends(LineupGridMediator, _super);
    function LineupGridMediator(assetsUrl, view, caller, clickCall) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.caller = caller;
        _this.clickCall = clickCall;
        return _this;
    }
    LineupGridMediator.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    LineupGridMediator.prototype.addEvents = function () {
        this.view.on(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediator.prototype.removeEvents = function () {
        this.view.off(Laya.Event.CLICK, this, this.onViewClick);
    };
    LineupGridMediator.prototype.getView = function () {
        return this.view;
    };
    LineupGridMediator.prototype.setUpHero = function (roleID, iconView) {
        if (roleID == this.roleID) {
            return;
        }
        if (this.iconView) {
            this.iconView.setSelect(false);
        }
        this.roleID = roleID;
        this.iconView = iconView;
        if (this.uiRole == null) {
            this.uiRole = new UIRole(this.roleID);
            this.uiRole.addParent(this.view, this.view.clipShadow.width / 2, this.view.clipShadow.height / 2);
        }
        else {
            this.uiRole.updateRole(this.roleID);
        }
    };
    LineupGridMediator.prototype.revokeUpHero = function () {
        this.roleID = null;
        if (this.uiRole) {
            this.uiRole.dispose();
            this.uiRole = null;
        }
        if (this.iconView) {
            this.iconView.setSelect(false);
            this.iconView = null;
        }
    };
    /**设置阴影选中 */
    LineupGridMediator.prototype.setClipShadowIndex = function (index) {
        this.view.clipShadow.index = index;
    };
    LineupGridMediator.prototype.setLineupIDLable = function (lineupID) {
        this.view.lblLineupID.text = lineupID;
    };
    LineupGridMediator.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.uiRole) {
            this.uiRole.dispose();
            this.uiRole = null;
        }
        this.caller = null;
        this.clickCall = null;
        this.iconView = null;
    };
    LineupGridMediator.prototype.onViewClick = function (e) {
        if (this.caller && this.clickCall) {
            this.clickCall.call(this.caller, this);
        }
    };
    return LineupGridMediator;
}(BaseMediator));
//# sourceMappingURL=LineupGridMediator.js.map