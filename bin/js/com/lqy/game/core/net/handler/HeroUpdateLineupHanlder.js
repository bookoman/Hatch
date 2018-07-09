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
* 英雄更新整型处理
*/
var HeroUpdateLineupHanlder = /** @class */ (function (_super) {
    __extends(HeroUpdateLineupHanlder, _super);
    function HeroUpdateLineupHanlder(caller, callback) {
        return _super.call(this, caller, callback) || this;
    }
    HeroUpdateLineupHanlder.prototype.explain = function (data) {
        var UpdateFormationResponse = WebSocketManager.ins.defineProtoClass("UpdateFormationResponse");
        var message = UpdateFormationResponse.decode(data);
        _super.prototype.explain.call(this, message);
    };
    HeroUpdateLineupHanlder.prototype.success = function (message) {
        var selfPlayerData = GameDataManager.ins.selfPlayerData;
        var heroVo;
        if (message.flag) {
            selfPlayerData.heroLineupDic.set(message.siteIdx, message.heroId);
            heroVo = selfPlayerData.addUpHeroVo(message.heroId, message.siteIdx);
        }
        else {
            selfPlayerData.heroLineupDic.remove(message.siteIdx);
            heroVo = selfPlayerData.removeUpHeroVo(message.heroId);
        }
        if (BattleEngine.ins.isLoopBattle)
            RoleManager.ins.updateLineupHeros(heroVo, message.flag);
        console.log("上阵状态：" + message.flag);
        _super.prototype.success.call(this, message.flag);
    };
    return HeroUpdateLineupHanlder;
}(SocketHanlder));
//# sourceMappingURL=HeroUpdateLineupHanlder.js.map