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
    Skill.prototype.playSkill = function (skillId, pos, scale) {
        if (scale === undefined || scale === null) {
            scale = 1;
        }
        if (this.skeletonAni == null) {
            this.skeletonAni = new Skeleton();
            this.skeletonAni.pos(pos.x, pos.y);
            this.skeletonAni.scale(scale, scale);
            this.skeletonAni.load("res/outside/anim/skill/" + skillId + "/" + skillId + ".sk");
            LayerManager.ins.addToLayer(this.skeletonAni, LayerManager.EFFECT_LAYER, false, true, false);
        }
        // this.skeletonAni.play(0,false);
        Laya.timer.once(1000, this, this.playSkillComplete, null, false);
    };
    Skill.prototype.playSkillComplete = function () {
        if (this.skeletonAni) {
            this.skeletonAni.removeSelf();
            this.skeletonAni = null;
            ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL, this);
        }
    };
    return Skill;
}());
//# sourceMappingURL=Skill.js.map