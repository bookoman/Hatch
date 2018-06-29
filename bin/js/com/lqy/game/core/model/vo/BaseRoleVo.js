/*
* 角色基础Vo
*/
var BaseRoleVo = /** @class */ (function () {
    function BaseRoleVo(isEnemy) {
        this.attFar = 0;
        /**血量 */
        this.hp = 0;
        /**等级 */
        this.level = 1;
        /**是否死亡 */
        this.isDeath = true;
        /**当前释放技能 */
        this.curSkillVo = null;
        /**当前技能主效果持续回合 */
        this.mainSkillContinuedVo = null;
        /**当前技能副果持续回合 */
        this.assiSkillContinuedVo = null;
        this.isEnemy = isEnemy;
    }
    BaseRoleVo.prototype.initBaseData = function () {
        this.mainSkillContinuedVo = new SkillContinuedVo();
        this.assiSkillContinuedVo = new SkillContinuedVo();
        this.bossBattleRoleData = new BossBattleRoleData();
        this.realAtk = this.atk + this.level * this.upAtk;
        this.realDef = this.def + this.level * this.updef;
    };
    BaseRoleVo.prototype.initBattleData = function () {
        this.mainSkillContinuedVo = new SkillContinuedVo();
        this.assiSkillContinuedVo = new SkillContinuedVo();
        this.bossBattleRoleData = new BossBattleRoleData();
        this.realAtk = this.atk + this.level * this.upAtk;
        this.realDef = this.def + this.level * this.updef;
    };
    /**初始化阵型数据 */
    BaseRoleVo.prototype.initRowColPosPoint = function () {
        var px, py;
        var gridPointAry;
        if (this.isEnemy) {
            gridPointAry = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        else {
            gridPointAry = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX, this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y += GameConfig.BATTLE_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
    };
    /**重置技能CD */
    BaseRoleVo.prototype.resetSkillCD = function () {
        this.skillVos.forEach(function (skillVo) {
            // skillVo.calCD = skillVo.cd;
            skillVo.resetCD();
        });
    };
    /**cd计时跑起来 */
    BaseRoleVo.prototype.runCD = function () {
        this.skillVos.forEach(function (skillVo) {
            skillVo.runCD();
        });
    };
    /**得到可用技能 ，自动释放技能*/
    BaseRoleVo.prototype.getCanUserSkill = function () {
        var _this = this;
        this.curSkillVo = null;
        this.skillVos.forEach(function (skillVo) {
            if (skillVo.isCanUse) {
                // console.log(this.name + "】使用了"+skillVo.name+"技能，伤害爆表");
                _this.curSkillVo = skillVo;
                _this.skillMainFormula = _this.curSkillVo.skillConfig.formula;
                _this.skillSubFomula = _this.curSkillVo.skillConfig.subFormula;
                // console.log("....",this.skillMainFormula,this.skillSubFomula);
            }
        });
        return this.curSkillVo;
    };
    /**技能效果轮CD */
    BaseRoleVo.prototype.runSkillEffectCD = function () {
        this.mainSkillContinuedVo.runEffectTurnCD();
        this.assiSkillContinuedVo.runEffectTurnCD();
    };
    /**重置技能效果CD */
    // public resetSkillEffectCD():void
    // {
    //     this.mainSkillContinuedVo.resetData();
    //     this.assiSkillContinuedVo.resetData();
    // }
    /**添加技能效果CD */
    BaseRoleVo.prototype.addSkillEffectCDs = function (skillVo) {
        this.addSkillEffectCD(skillVo, true);
        this.addSkillEffectCD(skillVo, false);
    };
    /**添加技能效果CD */
    BaseRoleVo.prototype.addSkillEffectCD = function (skillVo, isMain) {
        var skillContinuedVo = isMain ? this.mainSkillContinuedVo : this.assiSkillContinuedVo;
        var effectType = isMain ? skillVo.skillMainEffect : skillVo.skillAssistantEffect;
        if (effectType == SkillEffect.HURT)
            skillContinuedVo.hurt = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.BLEEDING)
            skillContinuedVo.bleeding = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.POISONING)
            skillContinuedVo.poisoning = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.BLOOD_SUCKING)
            skillContinuedVo.bloodSucking = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.RECOVERY)
            skillContinuedVo.recovery = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.FORGET)
            skillContinuedVo.forget = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.CONFUSION)
            skillContinuedVo.confusion = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ANGER)
            skillContinuedVo.anger = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ADD_ATK)
            skillContinuedVo.addAtk = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ADD_DEF)
            skillContinuedVo.addDef = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ADD_SPEED)
            skillContinuedVo.addSpeed = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ADD_BLOOD_UP_LIMIT)
            skillContinuedVo.addBloodUpLimit = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.RECOVERY_BLOOD)
            skillContinuedVo.recoveryBlood = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ELIMINATE_NEGATIVE_EFFECT)
            skillContinuedVo.eliminateNegativeEffect = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ELIMINATE_POSITIVE_EFFECT)
            skillContinuedVo.eliminatePositiveEffect = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.ADD_INJURY_FREE)
            skillContinuedVo.addInjuryFree = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if (effectType == SkillEffect.REDUCE_ENEMY_TREATMENT)
            skillContinuedVo.reduceEnemyTreatment = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
    };
    /**计算伤害 */
    // public calculationAttribute(atkVo:BaseRoleVo):void
    BaseRoleVo.prototype.calculationAttribute = function (atkVo, ranksAtk) {
        //技能伤害
        var curSkillVo = atkVo.curSkillVo;
        if (curSkillVo) { //计时生效效果
            //主动效果
            // if(curSkillVo.skillMainEffect == SkillEffect.HURT){
            //     this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            // }
            // else if(curSkillVo.skillMainEffect == SkillEffect.RECOVERY_BLOOD)
            // {
            //     this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            // }
            // //被动效果
            // if(curSkillVo.skillAssistantEffect == SkillEffect.HURT){
            //     this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            // }
            // else if(curSkillVo.skillAssistantEffect == SkillEffect.RECOVERY_BLOOD)
            // {
            //     this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            // }
            //主动效果
            if (this.mainSkillContinuedVo.hurt > 0)
                this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo, this, atkVo.getSkillHurt());
            if (this.mainSkillContinuedVo.addAtk > 0)
                this.bossBattleRoleData.addAtk += atkVo.getAddAtkValue(ranksAtk);
            else
                this.realAtk = this.atk + this.level * this.upAtk;
            if (this.mainSkillContinuedVo.bleeding > 0)
                this.bossBattleRoleData.bleeding += atkVo.getSkillBleeding();
            if (this.mainSkillContinuedVo.recoveryBlood > 0)
                this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo, this, atkVo.getSkillHurt());
            //副效果
            if (this.assiSkillContinuedVo.hurt > 0)
                this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo, this, atkVo.getSkillHurt());
            if (this.assiSkillContinuedVo.addAtk > 0)
                this.bossBattleRoleData.addAtk += atkVo.getAddAtkValue(ranksAtk);
            if (this.assiSkillContinuedVo.bleeding > 0)
                this.bossBattleRoleData.bleeding += atkVo.getSkillBleeding();
            if (this.assiSkillContinuedVo.recoveryBlood > 0)
                this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo, this, atkVo.getSkillHurt());
        }
        else {
            if (atkVo.isEnemy != this.isEnemy) {
                this.bossBattleRoleData.hurt = FormulaUtil.realDamageValue(atkVo, this);
            }
        }
        //战斗血量
        this.realAtk += this.bossBattleRoleData.addAtk;
        this.battleHP += this.bossBattleRoleData.recoveryBlood;
        if (this.battleHP > this.hp)
            this.battleHP = this.hp;
        this.battleHP -= this.bossBattleRoleData.hurt;
        this.isDeath = this.battleHP <= 0;
    };
    /**计算持续效果 */
    BaseRoleVo.prototype.calculationContinueEffect = function () {
        //主动效果
        if (this.mainSkillContinuedVo.addAtk <= 0 && this.assiSkillContinuedVo.addAtk <= 0) {
            this.bossBattleRoleData.addAtk = 0;
            this.realAtk = this.atk + this.level * this.upAtk;
        }
        if (this.mainSkillContinuedVo.bleeding <= 0 && this.assiSkillContinuedVo.bleeding <= 0)
            this.bossBattleRoleData.bleeding == 0;
        // if(this.mainSkillContinuedVo.hurt <= 0 && this.assiSkillContinuedVo.hurt <= 0)
        //     this.bossBattleRoleData.hurt == 0;
        if (this.mainSkillContinuedVo.recoveryBlood <= 0 && this.assiSkillContinuedVo.recoveryBlood <= 0)
            this.bossBattleRoleData.recoveryBlood = 0;
        //战斗血量
        this.realAtk += this.bossBattleRoleData.addAtk;
        this.battleHP += this.bossBattleRoleData.recoveryBlood;
        if (this.battleHP > this.hp)
            this.battleHP = this.hp;
        this.battleHP -= this.bossBattleRoleData.hurt;
        this.isDeath = this.battleHP <= 0;
    };
    /**是否显示一次效果 */
    BaseRoleVo.prototype.isShowOnceSkill = function (mainValue, assiValue, atkRoleVo) {
        var bool = false;
        if (atkRoleVo && atkRoleVo.curSkillVo && (mainValue == atkRoleVo.curSkillVo.skillContinued || assiValue == atkRoleVo.curSkillVo.skillContinued)) {
            bool = true;
        }
        return bool;
    };
    /**得到技能伤害 */
    BaseRoleVo.prototype.getSkillHurt = function () {
        var tempAry = this.skillMainFormula.split("*");
        var addString = tempAry[1];
        tempAry = addString.split("+");
        var value2 = Number(tempAry[0]);
        var value3 = Number(tempAry[1]);
        return Math.ceil(this.realAtk * value2 + value3);
    };
    /**流血值 */
    BaseRoleVo.prototype.getSkillBleeding = function () {
        var tempAry = this.skillSubFomula.split("*");
        var value1 = Number(tempAry[1]);
        return Math.ceil(this.realAtk * value1);
    };
    /**得到增加攻击力值 */
    BaseRoleVo.prototype.getAddAtkValue = function (ranksAtk) {
        var tempAry = this.skillMainFormula.split("*");
        var addString = tempAry[1];
        tempAry = addString.split("+");
        var value2 = Number(tempAry[0]);
        var value3 = Number(tempAry[1]);
        return Math.ceil(ranksAtk * value2 + value3);
    };
    return BaseRoleVo;
}());
//# sourceMappingURL=BaseRoleVo.js.map