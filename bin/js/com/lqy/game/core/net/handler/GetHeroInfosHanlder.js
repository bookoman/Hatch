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
* 得到英雄信息处理器
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
        // console.log(message.roleHeroInfo);
        var heroInfo = JSON.parse(message.roleHeroInfo);
        //保存服务器数据
        var selfPlayerData = GameDataManager.ins.selfPlayerData;
        selfPlayerData.heroVoDic = new Dictionary();
        var heroVo;
        for (var key in heroInfo.heroMap) {
            heroVo = new HeroVo();
            var info = heroInfo.heroMap[key];
            for (var key in info) {
                if (key == "heroAttr") {
                    heroVo.heroAttr = new HeroAttr();
                    var heroAttr = info[key];
                    for (var key in heroAttr) {
                        heroVo.heroAttr[key] = heroAttr[key];
                    }
                }
                else {
                    heroVo[key] = info[key];
                }
            }
            selfPlayerData.heroVoDic.set(heroVo.heroId, heroVo);
        }
        //阵型数据
        selfPlayerData.heroLineupDic = new Dictionary();
        var heroId;
        for (var key in heroInfo.heroFormation) {
            heroId = heroInfo.heroFormation[key];
            selfPlayerData.heroLineupDic.set(key, heroId);
            selfPlayerData.addUpHeroVo(heroId);
        }
        selfPlayerData.heroSum = selfPlayerData.upHeroVos.length;
        _super.prototype.success.call(this);
    };
    return GetHeroInfosHanlder;
}(SocketHanlder));
//# sourceMappingURL=GetHeroInfosHanlder.js.map