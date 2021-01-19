import { Artifact } from '../domain/entities/artifact';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats, SubStatsValues } from '../domain/models/sub-statistics';
import { BuildOptimizer } from './build-optimizer';
import { PossibleCharacterStats } from '../domain/models/character-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { CircletArtifact, CircletMainStatType } from '../domain/entities/circlet-artifact';
import { GobletArtifact, GobletMainStatType } from '../domain/entities/goblet-artifact';
import { SandsArtifact, SandsMainStatType } from '../domain/entities/sands-artifact';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-mermory-characters-repository';
import { Character } from '../domain/models/character';

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let charactersRepository: InMemoryCharactersRepository;
  let flowerArtifacts: Artifact[];
  let plumeArtifacts: Artifact[];
  let sandsArtifacts: Artifact[];
  let gobletArtifacts: Artifact[];
  let circletArtifacts: Artifact[];
  let razor: Character;

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
    charactersRepository = new InMemoryCharactersRepository();
    razor = charactersRepository.getCharacter('razor', '80a');
  });

  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          subStats: {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 6,
          },
        },
      ]);

      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
        },
      ]);

      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          mainStatType: PossibleMainStats.physicalDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.critDmg]: 3.7,
          },
        },
      ]);

      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.flatHp]: 60,
            [PossibleSubStats.flatAtk]: 3,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 11951,
          [PossibleCharacterStats.atk]: 298,
          [PossibleCharacterStats.def]: 906,
          [PossibleCharacterStats.physicalDmg]: 38.7,
          [PossibleCharacterStats.critRate]: 16,
          [PossibleCharacterStats.elementalMastery]: 6,
          [PossibleCharacterStats.critDmg]: 53.7,
          [PossibleCharacterStats.energyRecharge]: 100,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          mainStatType: PossibleMainStats.geoDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.flatAtk]: 4, [PossibleSubStats.critDmg]: 3.2 },
        },
      ]);

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 12430,
          [PossibleCharacterStats.atk]: 303,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 35,
          [PossibleCharacterStats.geoDmg]: 7,
          [PossibleCharacterStats.critDmg]: 53.2,
          [PossibleCharacterStats.physicalDmg]: 30,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          level: 1,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          level: 3,
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          level: 4,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          level: 8,
          mainStatType: PossibleMainStats.geoDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          level: 20,
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 13190,
          [PossibleCharacterStats.atk]: 360,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 194,
          [PossibleCharacterStats.geoDmg]: 22.8,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          level: 7,
          subStats: {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.flatDef]: 7,
            [PossibleSubStats.critRate]: 2.7,
            [PossibleSubStats.percentAtk]: 5,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          level: 12,
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          level: 15,
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          level: 17,
          mainStatType: PossibleMainStats.healingBonus,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 391,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with gladiator and thundering sets effects', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.retracingBolide,
          level: 7,
          subStats: {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.flatDef]: 7,
            [PossibleSubStats.critRate]: 2.7,
            [PossibleSubStats.percentDef]: 4,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.thunderingFury,
          level: 12,
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.thunderingFury,
          level: 15,
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 17,
          mainStatType: PossibleMainStats.healingBonus,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 419,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1125,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.electroDmg]: 15,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with bolide and Lavawalker sets effects', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.lavawalker,
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.retracingBolide,
          level: 7,
          subStats: {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.flatDef]: 7,
            [PossibleSubStats.critRate]: 2.7,
            [PossibleSubStats.critDmg]: 3.9,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.thunderingFury,
          level: 12,
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.lavawalker,
          level: 15,
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.retracingBolide,
          level: 17,
          mainStatType: PossibleMainStats.healingBonus,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 380,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 63.2,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 30,
          [PossibleCharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 1 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '1');
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.lavawalker,
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.retracingBolide,
          level: 7,
          subStats: {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.flatDef]: 7,
            [PossibleSubStats.critRate]: 2.7,
            [PossibleSubStats.critDmg]: 3.9,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.thunderingFury,
          level: 12,
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.lavawalker,
          level: 15,
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.retracingBolide,
          level: 17,
          mainStatType: PossibleMainStats.healingBonus,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(amber, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 2244,
          [PossibleCharacterStats.atk]: 168,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 85,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 63.2,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 20 ascended Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '20a');
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 8,
          subStats: {
            [PossibleSubStats.flatAtk]: 16,
            [PossibleSubStats.percentAtk]: 4.7,
            [PossibleSubStats.critDmg]: 11.7,
            [PossibleSubStats.energyRecharge]: 4.5,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.crimsonWitchOfFlames,
          level: 8,
          subStats: {
            [PossibleSubStats.flatHp]: 478,
            [PossibleSubStats.critDmg]: 7.8,
            [PossibleSubStats.critRate]: 3.1,
            [PossibleSubStats.energyRecharge]: 5.8,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.archaicPetra,
          level: 8,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.elementalMastery]: 16,
            [PossibleSubStats.flatHp]: 538,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.energyRecharge]: 5.2,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.bloodstainedChivalry,
          level: 0,
          mainStatType: PossibleMainStats.pyroDmg,
          subStats: {
            [PossibleSubStats.elementalMastery]: 21,
            [PossibleSubStats.percentHp]: 4.7,
            [PossibleSubStats.energyRecharge]: 4.5,
            [PossibleSubStats.flatAtk]: 19,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 16,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.flatAtk]: 53,
            [PossibleSubStats.flatDef]: 37,
            [PossibleSubStats.elementalMastery]: 19,
            [PossibleSubStats.percentDef]: 7.6,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(amber, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 6112,
          [PossibleCharacterStats.atk]: 354,
          [PossibleCharacterStats.def]: 217,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 50 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '50');
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 8,
          subStats: {
            [PossibleSubStats.flatAtk]: 16,
            [PossibleSubStats.percentAtk]: 4.7,
            [PossibleSubStats.critDmg]: 11.7,
            [PossibleSubStats.energyRecharge]: 4.5,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.crimsonWitchOfFlames,
          level: 8,
          subStats: {
            [PossibleSubStats.flatHp]: 478,
            [PossibleSubStats.critDmg]: 7.8,
            [PossibleSubStats.critRate]: 3.1,
            [PossibleSubStats.energyRecharge]: 5.8,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.archaicPetra,
          level: 8,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.elementalMastery]: 16,
            [PossibleSubStats.flatHp]: 538,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.energyRecharge]: 5.2,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.bloodstainedChivalry,
          level: 0,
          mainStatType: PossibleMainStats.pyroDmg,
          subStats: {
            [PossibleSubStats.elementalMastery]: 21,
            [PossibleSubStats.percentHp]: 4.7,
            [PossibleSubStats.energyRecharge]: 4.5,
            [PossibleSubStats.flatAtk]: 19,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 16,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.flatAtk]: 53,
            [PossibleSubStats.flatDef]: 37,
            [PossibleSubStats.elementalMastery]: 19,
            [PossibleSubStats.percentDef]: 7.6,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(amber, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 8610,
          [PossibleCharacterStats.atk]: 464,
          [PossibleCharacterStats.def]: 379,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 80 ascended Razor', () => {
      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 8,
          subStats: {
            [PossibleSubStats.flatAtk]: 16,
            [PossibleSubStats.percentAtk]: 4.7,
            [PossibleSubStats.critDmg]: 11.7,
            [PossibleSubStats.energyRecharge]: 4.5,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.crimsonWitchOfFlames,
          level: 8,
          subStats: {
            [PossibleSubStats.flatHp]: 478,
            [PossibleSubStats.critDmg]: 7.8,
            [PossibleSubStats.critRate]: 3.1,
            [PossibleSubStats.energyRecharge]: 5.8,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.archaicPetra,
          level: 8,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.elementalMastery]: 16,
            [PossibleSubStats.flatHp]: 538,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.energyRecharge]: 5.2,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.bloodstainedChivalry,
          level: 0,
          mainStatType: PossibleMainStats.pyroDmg,
          subStats: {
            [PossibleSubStats.elementalMastery]: 21,
            [PossibleSubStats.percentHp]: 4.7,
            [PossibleSubStats.energyRecharge]: 4.5,
            [PossibleSubStats.flatAtk]: 19,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 16,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.flatAtk]: 53,
            [PossibleSubStats.flatDef]: 37,
            [PossibleSubStats.elementalMastery]: 19,
            [PossibleSubStats.percentDef]: 7.6,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 640,
          [PossibleCharacterStats.def]: 789,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with level 60 ascended Albedo', () => {
      const albedo = charactersRepository.getCharacter('albedo', '60a');

      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 8,
          subStats: {
            [PossibleSubStats.flatAtk]: 16,
            [PossibleSubStats.percentAtk]: 4.7,
            [PossibleSubStats.critDmg]: 11.7,
            [PossibleSubStats.energyRecharge]: 4.5,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.crimsonWitchOfFlames,
          level: 8,
          subStats: {
            [PossibleSubStats.flatHp]: 478,
            [PossibleSubStats.critDmg]: 7.8,
            [PossibleSubStats.critRate]: 3.1,
            [PossibleSubStats.energyRecharge]: 5.8,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.archaicPetra,
          level: 8,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.elementalMastery]: 16,
            [PossibleSubStats.flatHp]: 538,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.energyRecharge]: 5.2,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.bloodstainedChivalry,
          level: 0,
          mainStatType: PossibleMainStats.pyroDmg,
          subStats: {
            [PossibleSubStats.elementalMastery]: 21,
            [PossibleSubStats.percentHp]: 4.7,
            [PossibleSubStats.energyRecharge]: 4.5,
            [PossibleSubStats.flatAtk]: 19,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 16,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.flatAtk]: 53,
            [PossibleSubStats.flatDef]: 37,
            [PossibleSubStats.elementalMastery]: 19,
            [PossibleSubStats.percentDef]: 7.6,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(albedo, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 12998,
          [PossibleCharacterStats.atk]: 562,
          [PossibleCharacterStats.def]: 693,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.geoDmg]: 14.4,
        },
      ]);
    });

    it('with level 70 Fischl', () => {
      const albedo = charactersRepository.getCharacter('fischl', '70');

      flowerArtifacts = getArtifactsWithValues('flower', [
        {
          id: '0',
          set: SetNames.gladiatorsFinale,
          level: 8,
          subStats: {
            [PossibleSubStats.flatAtk]: 16,
            [PossibleSubStats.percentAtk]: 4.7,
            [PossibleSubStats.critDmg]: 11.7,
            [PossibleSubStats.energyRecharge]: 4.5,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues('plume', [
        {
          id: '1',
          set: SetNames.crimsonWitchOfFlames,
          level: 8,
          subStats: {
            [PossibleSubStats.flatHp]: 478,
            [PossibleSubStats.critDmg]: 7.8,
            [PossibleSubStats.critRate]: 3.1,
            [PossibleSubStats.energyRecharge]: 5.8,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues('sands', [
        {
          id: '2',
          set: SetNames.archaicPetra,
          level: 8,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.elementalMastery]: 16,
            [PossibleSubStats.flatHp]: 538,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.energyRecharge]: 5.2,
          },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues('goblet', [
        {
          id: '3',
          set: SetNames.bloodstainedChivalry,
          level: 0,
          mainStatType: PossibleMainStats.pyroDmg,
          subStats: {
            [PossibleSubStats.elementalMastery]: 21,
            [PossibleSubStats.percentHp]: 4.7,
            [PossibleSubStats.energyRecharge]: 4.5,
            [PossibleSubStats.flatAtk]: 19,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues('circlet', [
        {
          id: '4',
          set: SetNames.gladiatorsFinale,
          level: 16,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.flatAtk]: 53,
            [PossibleSubStats.flatDef]: 37,
            [PossibleSubStats.elementalMastery]: 19,
            [PossibleSubStats.percentDef]: 7.6,
          },
        },
      ]);
      expect(
        buildOptimizer.computeBuildsStats(albedo, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 10791,
          [PossibleCharacterStats.atk]: 611,
          [PossibleCharacterStats.def]: 531,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });
  });

  it('should compute build stats of multiple artifacts for each type', () => {
    flowerArtifacts = getArtifactsWithValues('flower', [
      {
        id: '0',
        set: SetNames.lavawalker,
        level: 2,
        subStats: {
          [PossibleSubStats.flatAtk]: 5,
          [PossibleSubStats.critRate]: 3.2,
          [PossibleSubStats.percentAtk]: 3,
          [PossibleSubStats.critDmg]: 3.2,
        },
      },
      {
        id: '1',
        set: SetNames.thunderingFury,
        level: 7,
        subStats: {
          [PossibleSubStats.energyRecharge]: 3,
          [PossibleSubStats.percentHp]: 6,
          [PossibleSubStats.critDmg]: 3.9,
          [PossibleSubStats.percentAtk]: 7,
        },
      },
    ]);

    plumeArtifacts = getArtifactsWithValues('plume', [
      {
        id: '2',
        set: SetNames.retracingBolide,
        level: 7,
        subStats: {
          [PossibleSubStats.energyRecharge]: 4,
          [PossibleSubStats.flatDef]: 7,
          [PossibleSubStats.critRate]: 2.7,
          [PossibleSubStats.critDmg]: 5,
        },
      },
      {
        id: '3',
        set: SetNames.blizzardStrayer,
        level: 12,
        subStats: {
          [PossibleSubStats.percentAtk]: 5,
          [PossibleSubStats.flatHp]: 12,
          [PossibleSubStats.flatDef]: 6,
          [PossibleSubStats.percentDef]: 8,
        },
      },
    ]);

    sandsArtifacts = getArtifactsWithValues('sands', [
      {
        id: '4',
        set: SetNames.thunderingFury,
        level: 12,
        mainStatType: PossibleMainStats.percentHp,
        subStats: {
          [PossibleSubStats.percentDef]: 6,
          [PossibleSubStats.elementalMastery]: 7,
          [PossibleSubStats.critRate]: 3.2,
          [PossibleSubStats.critDmg]: 2.9,
        },
      },
    ]);

    gobletArtifacts = getArtifactsWithValues('goblet', [
      {
        id: '5',
        set: SetNames.lavawalker,
        level: 15,
        mainStatType: PossibleMainStats.percentDef,
        subStats: {
          [PossibleSubStats.critRate]: 2.5,
          [PossibleSubStats.percentHp]: 5.2,
          [PossibleSubStats.percentAtk]: 4,
          [PossibleSubStats.flatHp]: 3,
        },
      },
      {
        id: '6',
        set: SetNames.blizzardStrayer,
        level: 8,
        mainStatType: PossibleMainStats.cryoDmg,
        subStats: {
          [PossibleSubStats.elementalMastery]: 4,
          [PossibleSubStats.percentHp]: 5.2,
          [PossibleSubStats.percentAtk]: 4,
          [PossibleSubStats.critDmg]: 3,
        },
      },
    ]);

    circletArtifacts = getArtifactsWithValues('circlet', [
      {
        id: '7',
        set: SetNames.retracingBolide,
        level: 17,
        mainStatType: PossibleMainStats.healingBonus,
        subStats: {
          [PossibleSubStats.percentDef]: 4,
          [PossibleSubStats.flatAtk]: 4,
          [PossibleSubStats.critDmg]: 3.2,
          [PossibleSubStats.percentHp]: 5,
        },
      },
    ]);

    expect(
      buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
    ).toEqual([
      {
        [PossibleCharacterStats.hp]: 16825,
        [PossibleCharacterStats.atk]: 380,
        [PossibleCharacterStats.critRate]: 16.6,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 64.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 30,
        [PossibleCharacterStats.pyroRes]: 40,
      },
      {
        [PossibleCharacterStats.hp]: 16822,
        [PossibleCharacterStats.atk]: 380,
        [PossibleCharacterStats.critRate]: 14.1,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 67.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 30,
        [PossibleCharacterStats.cryoDmg]: 22.8,
      },
      {
        [PossibleCharacterStats.hp]: 16837,
        [PossibleCharacterStats.atk]: 457,
        [PossibleCharacterStats.critRate]: 13.9,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 59.3,
        [PossibleCharacterStats.pyroRes]: 40,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
      {
        [PossibleCharacterStats.hp]: 16834,
        [PossibleCharacterStats.atk]: 457,
        [PossibleCharacterStats.critRate]: 11.4,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 62.3,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
      {
        [PossibleCharacterStats.hp]: 18509,
        [PossibleCharacterStats.atk]: 384,
        [PossibleCharacterStats.critRate]: 13.4,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 65,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
      {
        [PossibleCharacterStats.hp]: 18506,
        [PossibleCharacterStats.atk]: 384,
        [PossibleCharacterStats.critRate]: 10.9,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 68,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 22.8,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
      {
        [PossibleCharacterStats.hp]: 18521,
        [PossibleCharacterStats.atk]: 461,
        [PossibleCharacterStats.critRate]: 10.7,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 60,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
      {
        [PossibleCharacterStats.hp]: 18518,
        [PossibleCharacterStats.atk]: 461,
        [PossibleCharacterStats.critRate]: 8.2,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 63,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 30,
      },
    ]);
  });
});

function getArtifactsWithValues(
  type: string,
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
    mainStatType?: SandsMainStatType | GobletMainStatType | CircletMainStatType;
  }[],
): Artifact[] {
  return allArtifactsData.map((artifactData) => {
    const set = artifactData.set ? artifactData.set : SetNames.retracingBolide;
    const level = artifactData.level ? artifactData.level : 0;
    switch (type) {
      case 'flower':
        return new FlowerArtifact(artifactData.id, set, artifactData.subStats, level);
      case 'plume':
        return new PlumeArtifact(artifactData.id, set, artifactData.subStats, level);
      case 'sands':
        return new SandsArtifact(artifactData.id, set, artifactData.subStats, level, artifactData.mainStatType as SandsMainStatType);
      case 'goblet':
        return new GobletArtifact(artifactData.id, set, artifactData.subStats, level, artifactData.mainStatType as GobletMainStatType);
      case 'circlet':
        return new CircletArtifact(artifactData.id, set, artifactData.subStats, level, artifactData.mainStatType as CircletMainStatType);
      default:
        new Artifact(artifactData.id, set, artifactData.subStats, level, artifactData.mainStatType);
    }
  });
}
