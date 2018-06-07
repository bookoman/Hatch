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
var GetHeroInfosHanlder = /** @class */ (function (_super) {
    __extends(GetHeroInfosHanlder, _super);
    function GetHeroInfosHanlder(caller, callback) {
        if (callback === void 0) { callback = null; }
        return _super.call(this, caller, callback) || this;
    }
    GetHeroInfosHanlder.prototype.explain = function (data) {
        var HeroInfoResponse = WebSocketManager.ins.defineProtoClass("HeroInfoResponse");
        var message = HeroInfoResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    /**处理数据 */
    GetHeroInfosHanlder.prototype.success = function (message) {
        console.log(message.roleHeroInfo);
        var heroInfo = JSON.parse(message.roleHeroInfo);
        _super.prototype.success.call(this, message);
    };
    return GetHeroInfosHanlder;
}(SocketHanlder));
//# sourceMappingURL=GetHeroInfosHanlder.js.map