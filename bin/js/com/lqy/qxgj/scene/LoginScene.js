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
var LoginScene = /** @class */ (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        return _super.call(this) || this;
    }
    LoginScene.prototype.enter = function () {
        var loginMediator = new LoginMediator();
        loginMediator.show();
    };
    LoginScene.prototype.leave = function () {
    };
    return LoginScene;
}(BaseScene));
//# sourceMappingURL=LoginScene.js.map