/*
* 角色基础Vo
*/
class BaseRoleVo{
    /**角色id */
    public roleId:string;
    /**缩放比例 */
    public scale:number;
    /**配置表key */
    public key:string;
    /**模型资源id */
    public modelId:string;
    /**名字 */
    public name:string;
    /**攻击死亡次数 */
    public dieAttTimes:number;
    /**攻击 */
    public atk:number;
    /**防御 */
    public def:number;
    /**攻击速度 */
    public speed:number;
    
    public skillVos:Array<SkillVo>;

    public attFar:number = 0;
    /**血量 */
    public hp:number = 0;
    
    /**计算属性 */
    /**阵型格子 */
    public lineupGrid:number;
    public gridX:number;
    public gridY:number;
    /**角色坐标，现实对象底下中心点 */
    public posPoint:Point;
    /**是否是敌人 */
    public isEnemy:boolean;
    /**等级 */
    public level:number = 1;
    /**成长攻击 */
    public upAtk:number;
    /**成长防御 */
    public updef:number;
    /**暴击概率 */
    public doubleAtk:number;
    /**暴击伤害 */
    public hurt:number;
    /**韧性 */
    public tenacity:number;
    
    //战斗数据
    public battleHP:number;
    public battleDieAttTimes;
    /**真实攻击力 */
    public realAtk:number;
    /**真实防御 */
    public realDef:number;
    /**是否死亡 */
    public isDeath:boolean = true;
    public isAtted:boolean;
    /**玩家可以攻击的敌人 */
    public attEnemyVos:Array<BaseRoleVo>;
    /**技能攻击多个敌人 */
    public skillAttEnemyVos:Array<BaseRoleVo>;
    /**当前释放技能 */
    public curSkillVo:SkillVo = null;
    /**当前技能主效果持续回合 */
    public mainSkillContinuedVo:SkillContinuedVo = null;
    /**当前技能副果持续回合 */
    public assiSkillContinuedVo:SkillContinuedVo = null;        
    /**当前受到伤害数据 */
    public bossBattleRoleData:BossBattleRoleData;
    /**技能主效果公式 */
    public skillMainFormula:string;
    /**技能副效果公式 */
    public skillSubFomula:string;

    constructor(isEnemy:boolean){
        this.isEnemy = isEnemy;
    }
   
    public initBaseData():void
    {
        this.mainSkillContinuedVo = new SkillContinuedVo();
        this.assiSkillContinuedVo = new SkillContinuedVo();
        this.bossBattleRoleData = new BossBattleRoleData();

        this.realAtk = this.atk + this.level * this.upAtk;
        this.realDef = this.def + this.level * this.updef;
    }

    public initBattleData():void
    {
        this.mainSkillContinuedVo = new SkillContinuedVo();
        this.assiSkillContinuedVo = new SkillContinuedVo();
        this.bossBattleRoleData = new BossBattleRoleData();

        this.realAtk = this.atk + this.level * this.upAtk;
        this.realDef = this.def + this.level * this.updef;
    }

    /**初始化阵型数据 */
    public initRowColPosPoint():void
    {
        var px,py;
        var gridPointAry;
        if(this.isEnemy)
        {
            gridPointAry = MapManager.ins.getEnemyMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        else
        {
            gridPointAry = MapManager.ins.getHeroMapBalltGridPoint(this.lineupGrid);
            this.gridX = gridPointAry[0];
            this.gridY = gridPointAry[1];
        }
        // console.log(this.id,this.gridX,this.gridY,px,py);
        this.posPoint = MapManager.ins.squintAngleGrid.gridToViewPoint(this.gridX,this.gridY);
        //偏移格子半个宽高
        this.posPoint.x += GameConfig.LINEUP_GRID_WIDTH / 2;
        this.posPoint.y += GameConfig.BATTLE_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y + GameConfig.LINEUP_GRID_HEIGHT / 2;
    }
    /**重置技能CD */
    public resetSkillCD():void
    {
        this.skillVos.forEach(skillVo => {
            // skillVo.calCD = skillVo.cd;
            skillVo.resetCD();
        });
    }
    /**cd计时跑起来 */
    public runCD():void
    {
        this.skillVos.forEach(skillVo => {
            skillVo.runCD();
        });
    }
    
    /**得到可用技能 ，自动释放技能*/
    public getCanUserSkill():SkillVo
    {   
        this.curSkillVo = null;
        this.skillVos.forEach(skillVo => {
            if(skillVo.isCanUse)
            {
                // console.log(this.name + "】使用了"+skillVo.name+"技能，伤害爆表");
                this.curSkillVo =  skillVo;
                this.skillMainFormula = this.curSkillVo.skillConfig.formula;
                this.skillSubFomula = this.curSkillVo.skillConfig.subFormula;
                // console.log("....",this.skillMainFormula,this.skillSubFomula);
            }
        });
        return this.curSkillVo;
    }   
    /**技能效果轮CD */
    public runSkillEffectCD():void
    {
        this.mainSkillContinuedVo.runEffectTurnCD();
        this.assiSkillContinuedVo.runEffectTurnCD();
    }
    /**重置技能效果CD */
    // public resetSkillEffectCD():void
    // {
    //     this.mainSkillContinuedVo.resetData();
    //     this.assiSkillContinuedVo.resetData();
    // }
    /**添加技能效果CD */
    public addSkillEffectCDs(skillVo:SkillVo):void
    {
        this.addSkillEffectCD(skillVo,true);
        this.addSkillEffectCD(skillVo,false);
    }
    /**添加技能效果CD */
    private addSkillEffectCD(skillVo:SkillVo,isMain:boolean):void
    {
        var skillContinuedVo:SkillContinuedVo = isMain ? this.mainSkillContinuedVo : this.assiSkillContinuedVo;
        var effectType:number = isMain ? skillVo.skillMainEffect : skillVo.skillAssistantEffect;
        if(effectType == SkillEffect.HURT)
            skillContinuedVo.hurt = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.BLEEDING)
            skillContinuedVo.bleeding = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.POISONING)
            skillContinuedVo.poisoning = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.BLOOD_SUCKING)
            skillContinuedVo.bloodSucking = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.RECOVERY)
            skillContinuedVo.recovery = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.FORGET)
            skillContinuedVo.forget = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.CONFUSION)
            skillContinuedVo.confusion = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ANGER)
            skillContinuedVo.anger = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ADD_ATK)
            skillContinuedVo.addAtk = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ADD_DEF)
            skillContinuedVo.addDef = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ADD_SPEED)
            skillContinuedVo.addSpeed = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ADD_BLOOD_UP_LIMIT)
            skillContinuedVo.addBloodUpLimit = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.RECOVERY_BLOOD)
            skillContinuedVo.recoveryBlood = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ELIMINATE_NEGATIVE_EFFECT)
            skillContinuedVo.eliminateNegativeEffect = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ELIMINATE_POSITIVE_EFFECT)
            skillContinuedVo.eliminatePositiveEffect = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.ADD_INJURY_FREE)
            skillContinuedVo.addInjuryFree = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
        else if(effectType == SkillEffect.REDUCE_ENEMY_TREATMENT)
            skillContinuedVo.reduceEnemyTreatment = skillVo.skillContinued == -1 ? 1 : skillVo.skillContinued;
    }
    /**计算伤害 */
    // public calculationAttribute(atkVo:BaseRoleVo):void
    public calculationAttribute(atkVo:BaseRoleVo,ranksAtk?:number):void
    {
        //技能伤害
        var curSkillVo:SkillVo = atkVo.curSkillVo;
        if(curSkillVo)
        {   //计时生效效果
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
            if(this.mainSkillContinuedVo.hurt > 0)
                this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            if(this.mainSkillContinuedVo.addAtk > 0)
                this.bossBattleRoleData.addAtk += atkVo.getAddAtkValue(ranksAtk);
            else
                this.realAtk = this.atk + this.level * this.upAtk;
            if(this.mainSkillContinuedVo.bleeding > 0)
                this.bossBattleRoleData.bleeding += atkVo.getSkillBleeding();
            
            if(this.mainSkillContinuedVo.recoveryBlood > 0)
                this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            //副效果
            if(this.assiSkillContinuedVo.hurt > 0)
                this.bossBattleRoleData.hurt += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
            if(this.assiSkillContinuedVo.addAtk > 0)
                this.bossBattleRoleData.addAtk += atkVo.getAddAtkValue(ranksAtk);
            if(this.assiSkillContinuedVo.bleeding > 0)
                this.bossBattleRoleData.bleeding += atkVo.getSkillBleeding();
           
            if(this.assiSkillContinuedVo.recoveryBlood > 0)
                this.bossBattleRoleData.recoveryBlood += FormulaUtil.realDamageValue(atkVo,this,atkVo.getSkillHurt());
        }
        else
        {
            if(atkVo.isEnemy != this.isEnemy)
            {
                this.bossBattleRoleData.hurt = FormulaUtil.realDamageValue(atkVo,this);
            }
        }
        //战斗血量
        this.realAtk += this.bossBattleRoleData.addAtk;
        this.battleHP += this.bossBattleRoleData.recoveryBlood;
        if(this.battleHP > this.hp)
            this.battleHP = this.hp;
        this.battleHP -= this.bossBattleRoleData.hurt;
        this.isDeath = this.battleHP <= 0;
        
    }
    /**计算持续效果 */
    public calculationContinueEffect():void
    {
        //主动效果
        if(this.mainSkillContinuedVo.addAtk <= 0 && this.assiSkillContinuedVo.addAtk <= 0){
            this.bossBattleRoleData.addAtk = 0;
            this.realAtk = this.atk + this.level * this.upAtk;
        }
        if(this.mainSkillContinuedVo.bleeding <= 0 && this.assiSkillContinuedVo.bleeding <= 0)
            this.bossBattleRoleData.bleeding == 0;
        // if(this.mainSkillContinuedVo.hurt <= 0 && this.assiSkillContinuedVo.hurt <= 0)
        //     this.bossBattleRoleData.hurt == 0;
        if(this.mainSkillContinuedVo.recoveryBlood <= 0 && this.assiSkillContinuedVo.recoveryBlood <= 0)
            this.bossBattleRoleData.recoveryBlood = 0;

        //战斗血量
        this.realAtk += this.bossBattleRoleData.addAtk;
        this.battleHP += this.bossBattleRoleData.recoveryBlood;
        if(this.battleHP > this.hp)
            this.battleHP = this.hp;

        this.battleHP -= this.bossBattleRoleData.hurt;
        this.isDeath = this.battleHP <= 0;
        
    }
    /**是否显示一次效果 */
    public isShowOnceSkill(mainValue:number,assiValue:number,atkRoleVo:BaseRoleVo):boolean
    {
        var bool:boolean = false;
        if(atkRoleVo && atkRoleVo.curSkillVo && (mainValue == atkRoleVo.curSkillVo.skillContinued || assiValue == atkRoleVo.curSkillVo.skillContinued))
        {
            bool = true;
        }
        return bool;
    }

    /**得到技能伤害 */
    public getSkillHurt():number
    {
        var tempAry:Array<string> = this.skillMainFormula.split("*");
        var addString:string = tempAry[1];
        tempAry = addString.split("+");
        var value2:number = Number(tempAry[0]);
        var value3:number = Number(tempAry[1]);
        return Math.ceil(this.realAtk * value2 + value3);
    }
    
    /**流血值 */
    public getSkillBleeding():number
    {
        var tempAry:Array<string> = this.skillSubFomula.split("*");
        var value1:number = Number(tempAry[1]);
        return Math.ceil(this.realAtk * value1);
    }
    /**得到增加攻击力值 */
    public getAddAtkValue(ranksAtk:number):number
    {
        var tempAry:Array<string> = this.skillMainFormula.split("*");
        var addString:string = tempAry[1];
        tempAry = addString.split("+");
        var value2:number = Number(tempAry[0]);
        var value3:number = Number(tempAry[1]);
        return Math.ceil(ranksAtk * value2 + value3);
    }
}