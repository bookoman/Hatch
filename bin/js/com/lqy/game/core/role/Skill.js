/*
* 技能
*/
var Skill = /** @class */ (function () {
    function Skill() {
        // protected skeletonAni:Skeleton = null;
        this.frameAni = null;
    }
    Skill.prototype.playSkill = function (skillModelId, parentDis, tx, ty, scale) {
        this.frameAni = new FrameAnimation(parentDis, tx, ty, true, scale);
        this.frameAni.playAni(skillModelId, false, this, this.playSkillComplete);
    };
    Skill.prototype.playSkillComplete = function () {
        ObjectPoolUtil.stillObject(ObjectPoolUtil.SKILL, this);
    };
    return Skill;
}());
//# sourceMappingURL=Skill.js.map