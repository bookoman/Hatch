/*
* name;
*/
var BaseMediator = /** @class */ (function () {
    function BaseMediator(view) {
        if (view === void 0) { view = null; }
        this.view = null;
        if (view) {
            this.view = view;
        }
        this.initView();
    }
    BaseMediator.prototype.initView = function () {
        this.addEvents();
    };
    BaseMediator.prototype.addEvents = function () {
    };
    BaseMediator.prototype.removeEvents = function () {
    };
    return BaseMediator;
}());
//# sourceMappingURL=BaseMediator.js.map