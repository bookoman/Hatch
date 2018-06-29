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
* name;
*/
var RightFunctionButtons = /** @class */ (function (_super) {
    __extends(RightFunctionButtons, _super);
    function RightFunctionButtons() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RightFunctionButtons, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new RightFunctionButtons();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    RightFunctionButtons.prototype.initComponets = function () {
    };
    RightFunctionButtons._ins = null;
    return RightFunctionButtons;
}(Laya.Sprite));
//# sourceMappingURL=RightFunctionButtons.js.map