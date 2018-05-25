/*
* 技能
*/
var Skill = /** @class */ (function () {
    function Skill() {
        this.skeletonAni = null;
    }
    /**
     *
     * @param skillId
     * @param pos
     * @param scale
     */
    Skill.prototype.playSkill = function (skillId, parentDis, pos, scale) {
        if (scale === undefined || scale === null) {
            scale = 1;
        }
        if (this.skeletonAni == null) {
            this.skeletonAni = new Skeleton();
            if (pos) {
                this.skeletonAni.pos(pos.x, pos.y);
            }
            this.skeletonAni.scale(scale, scale);
            this.skeletonAni.load("res/outside/anim/skill/" + skillId + "/" + skillId + ".sk", Laya.Handler.create(this, this.resLoaded));
            // LayerManager.ins.addToLayer(this.skeletonAni,LayerManager.EFFECT_LAYER,false,true,false);
            parentDis.addChild(this.skeletonAni);
        }
    };
    Skill.prototype.resLoaded = function () {
        this.skeletonAni.playbackRate(GameConfig.BATTLE_ADDSPEED_TIMES);
        this.skeletonAni.play(0, true);
        this.skeletonAni.player.on(Laya.Event.COMPLETE, this, this.playSkillComplete);
    };
    Skill.prototype.playSkillComplete = function () {
        if (this.skeletonAni) {
            this.skeletonAni.player.off(Laya.Event.COMPLETE, this, this.playSkillComplete);
            this.skeletonAni.removeSelf();
            this.skeletonAni = null;
            ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL, this);
        }
    };
    return Skill;
}());
//# sourceMappingURL=Skill.js.map