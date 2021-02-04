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
  let defaultFlowerArtifacts: FlowerArtifact[];
  let defaultPlumeArtifacts: PlumeArtifact[];
  let defaultSandsArtifacts: SandsArtifact[];
  let defaultGobletArtifacts: GobletArtifact[];
  let defaultCircletArtifacts: CircletArtifact[];
  let razor: Character;

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
    charactersRepository = new InMemoryCharactersRepository();
    razor = charactersRepository.getCharacter('razor', '80a', { name: 'snowTombedStarsilver', level: '90' });
    defaultFlowerArtifacts = getFlowerArtifactsWithValues([
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
    defaultPlumeArtifacts = getPlumeArtifactsWithValues([
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
    defaultSandsArtifacts = getSandsArtifactsWithValues([
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
    defaultGobletArtifacts = getGobletArtifactsWithValues([
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
    defaultCircletArtifacts = getCircletArtifactsWithValues([
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
  });

  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
        {
          id: '0',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ]);
      const plumeArtifacts = getPlumeArtifactsWithValues([
        {
          id: '1',
          subStats: {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 6,
          },
        },
      ]);

      const sandsArtifacts = getSandsArtifactsWithValues([
        {
          id: '2',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
        },
      ]);

      const gobletArtifacts = getGobletArtifactsWithValues([
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

      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 931,
          [PossibleCharacterStats.def]: 906,
          [PossibleCharacterStats.physicalDmg]: 73.2,
          [PossibleCharacterStats.critRate]: 16,
          [PossibleCharacterStats.elementalMastery]: 6,
          [PossibleCharacterStats.critDmg]: 53.7,
          [PossibleCharacterStats.energyRecharge]: 100,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
        {
          id: '0',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
        },
      ]);
      const plumeArtifacts = getPlumeArtifactsWithValues([
        {
          id: '1',
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      const sandsArtifacts = getSandsArtifactsWithValues([
        {
          id: '2',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
        },
      ]);
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 947,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 35,
          [PossibleCharacterStats.geoDmg]: 7,
          [PossibleCharacterStats.critDmg]: 53.2,
          [PossibleCharacterStats.physicalDmg]: 64.5,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
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
      const plumeArtifacts = getPlumeArtifactsWithValues([
        {
          id: '1',
          level: 3,
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      const sandsArtifacts = getSandsArtifactsWithValues([
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
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 1048,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 194,
          [PossibleCharacterStats.geoDmg]: 22.8,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
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
      const plumeArtifacts = getPlumeArtifactsWithValues([
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
      const sandsArtifacts = getSandsArtifactsWithValues([
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
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 1024,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with gladiator and thundering sets effects', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
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
      const plumeArtifacts = getPlumeArtifactsWithValues([
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
      const sandsArtifacts = getSandsArtifactsWithValues([
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
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 1126,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1125,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.electroDmg]: 15,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with bolide and Lavawalker sets effects', () => {
      const flowerArtifacts = getFlowerArtifactsWithValues([
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
      const plumeArtifacts = getPlumeArtifactsWithValues([
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
      const sandsArtifacts = getSandsArtifactsWithValues([
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
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 985,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 63.2,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
          [PossibleCharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 1 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '1', { name: 'rust', level: '1' });
      const flowerArtifacts = getFlowerArtifactsWithValues([
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
      const plumeArtifacts = getPlumeArtifactsWithValues([
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
      const sandsArtifacts = getSandsArtifactsWithValues([
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
      const gobletArtifacts = getGobletArtifactsWithValues([
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
      const circletArtifacts = getCircletArtifactsWithValues([
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
          [PossibleCharacterStats.atk]: 219,
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
      const amber = charactersRepository.getCharacter('amber', '20a', { name: 'rust', level: '40' });

      expect(
        buildOptimizer.computeBuildsStats(
          amber,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 6112,
          [PossibleCharacterStats.atk]: 794,
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
      const amber = charactersRepository.getCharacter('amber', '50', { name: 'rust', level: '60a' });

      expect(
        buildOptimizer.computeBuildsStats(
          amber,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 8610,
          [PossibleCharacterStats.atk]: 1279,
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
      expect(
        buildOptimizer.computeBuildsStats(
          razor,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 1680,
          [PossibleCharacterStats.def]: 789,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with level 60 ascended Albedo', () => {
      const albedo = charactersRepository.getCharacter('albedo', '60a', { name: 'darkIronSword', level: '70' });

      expect(
        buildOptimizer.computeBuildsStats(
          albedo,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 12998,
          [PossibleCharacterStats.atk]: 1132,
          [PossibleCharacterStats.def]: 693,
          [PossibleCharacterStats.elementalMastery]: 172,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.geoDmg]: 14.4,
        },
      ]);
    });

    it('with level 70 Fischl', () => {
      const fischl = charactersRepository.getCharacter('fischl', '70', { name: 'favoniusWarbow', level: '70a' });

      expect(
        buildOptimizer.computeBuildsStats(
          fischl,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 10791,
          [PossibleCharacterStats.atk]: 1343,
          [PossibleCharacterStats.def]: 531,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 170.5,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 1 Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '1' });

      expect(
        buildOptimizer.computeBuildsStats(
          razorWithProto,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 736,
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

    it('with level 40 ascended Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '40a' });

      expect(
        buildOptimizer.computeBuildsStats(
          razorWithProto,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 1177,
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
  });

  it('should compute build stats of multiple artifacts for each type', () => {
    const flowerArtifacts = getFlowerArtifactsWithValues([
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

    const plumeArtifacts = getPlumeArtifactsWithValues([
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

    const sandsArtifacts = getSandsArtifactsWithValues([
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

    const gobletArtifacts = getGobletArtifactsWithValues([
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

    const circletArtifacts = getCircletArtifactsWithValues([
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
        [PossibleCharacterStats.atk]: 985,
        [PossibleCharacterStats.critRate]: 16.6,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 64.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 64.5,
        [PossibleCharacterStats.pyroRes]: 40,
      },
      {
        [PossibleCharacterStats.hp]: 16822,
        [PossibleCharacterStats.atk]: 985,
        [PossibleCharacterStats.critRate]: 14.1,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 67.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 64.5,
        [PossibleCharacterStats.cryoDmg]: 22.8,
      },
      {
        [PossibleCharacterStats.hp]: 16837,
        [PossibleCharacterStats.atk]: 1090,
        [PossibleCharacterStats.critRate]: 13.9,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 59.3,
        [PossibleCharacterStats.pyroRes]: 40,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 16834,
        [PossibleCharacterStats.atk]: 1090,
        [PossibleCharacterStats.critRate]: 11.4,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 62.3,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18509,
        [PossibleCharacterStats.atk]: 1011,
        [PossibleCharacterStats.critRate]: 13.4,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 65,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18506,
        [PossibleCharacterStats.atk]: 1011,
        [PossibleCharacterStats.critRate]: 10.9,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 68,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 22.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18521,
        [PossibleCharacterStats.atk]: 1116,
        [PossibleCharacterStats.critRate]: 10.7,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 60,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18518,
        [PossibleCharacterStats.atk]: 1116,
        [PossibleCharacterStats.critRate]: 8.2,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 63,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
    ]);
  });
});

describe('BuildOptimizer.filterArtifacts', () => {
  let buildOptimizer: BuildOptimizer;

  const allFlowerArtifacts: FlowerArtifact[] = getFlowerArtifactsWithValues([
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
      level: 8,
      subStats: {
        [PossibleSubStats.energyRecharge]: 3,
        [PossibleSubStats.percentHp]: 6,
        [PossibleSubStats.critDmg]: 3.9,
        [PossibleSubStats.percentAtk]: 7,
      },
    },
  ]);

  const allPlumeArtifacts: PlumeArtifact[] = getPlumeArtifactsWithValues([
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

  const allSandsArtifacts: SandsArtifact[] = getSandsArtifactsWithValues([
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
    {
      id: '5',
      set: SetNames.bloodstainedChivalry,
      level: 16,
      mainStatType: PossibleMainStats.percentAtk,
      subStats: {
        [PossibleSubStats.energyRecharge]: 6,
        [PossibleSubStats.flatAtk]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.flatDef]: 2.9,
      },
    },
    {
      id: '6',
      set: SetNames.retracingBolide,
      level: 8,
      mainStatType: PossibleMainStats.elementalMastery,
      subStats: {
        [PossibleSubStats.flatHp]: 6,
        [PossibleSubStats.critDmg]: 7,
        [PossibleSubStats.percentDef]: 3.2,
        [PossibleSubStats.percentAtk]: 2.9,
      },
    },
  ]);

  const allGobletArtifacts: GobletArtifact[] = getGobletArtifactsWithValues([
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
      id: '5',
      set: SetNames.archaicPetra,
      level: 12,
      mainStatType: PossibleMainStats.percentDef,
      subStats: {
        [PossibleSubStats.critDmg]: 2.5,
        [PossibleSubStats.energyRecharge]: 5.2,
        [PossibleSubStats.percentHp]: 4,
        [PossibleSubStats.flatDef]: 3,
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
    {
      id: '6',
      set: SetNames.wanderersTroupe,
      level: 4,
      mainStatType: PossibleMainStats.physicalDmg,
      subStats: {
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.percentDef]: 5.2,
        [PossibleSubStats.energyRecharge]: 4,
        [PossibleSubStats.critRate]: 3,
      },
    },
  ]);

  const allCircletArtifacts: CircletArtifact[] = getCircletArtifactsWithValues([
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
    {
      id: '7',
      set: SetNames.gladiatorsFinale,
      level: 12,
      mainStatType: PossibleMainStats.critRate,
      subStats: {
        [PossibleSubStats.flatHp]: 4,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.energyRecharge]: 5,
      },
    },
    {
      id: '7',
      set: SetNames.retracingBolide,
      level: 14,
      mainStatType: PossibleMainStats.critRate,
      subStats: {
        [PossibleSubStats.energyRecharge]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.flatHp]: 5,
      },
    },
  ]);

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer(allFlowerArtifacts, allPlumeArtifacts, allSandsArtifacts, allGobletArtifacts, allCircletArtifacts);
  });

  describe('filter artifacts by main stat should set possible builds', () => {
    it('with sand having elementalMastery', () => {
      buildOptimizer.filterArtifacts({ sandsMain: PossibleMainStats.elementalMastery });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(48);
    });

    it('with goblet having cryoDmg', () => {
      buildOptimizer.filterArtifacts({ gobletMain: PossibleMainStats.cryoDmg });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(36);
    });

    it('with circlet having critRate', () => {
      buildOptimizer.filterArtifacts({ circletMain: PossibleMainStats.critRate });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(96);
    });

    it('with sand, goblet and circlet artifacts', () => {
      buildOptimizer.filterArtifacts({
        sandsMain: PossibleMainStats.percentAtk,
        gobletMain: PossibleMainStats.percentDef,
        circletMain: PossibleMainStats.healingBonus,
      });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(8);
    });
  });

  describe('filter artifacts by min level should set possible builds', () => {
    it('with artifacts higher or equal to 8', () => {
      buildOptimizer.filterArtifacts(null, 8);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(27);
    });
    it('with artifacts higher or equal to 12', () => {
      buildOptimizer.filterArtifacts(null, 12);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(0);
    });
  });

  describe('filter artifacts by focused stats should set possible builds', () => {
    it('with artifacts that have percent atk', () => {
      buildOptimizer.filterArtifacts(null, null, [PossibleSubStats.percentAtk]);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(8);
    });
    it('with artifacts that have at least flat hp or elemental mastery', () => {
      buildOptimizer.filterArtifacts(null, null, [PossibleSubStats.flatHp, PossibleSubStats.elementalMastery]);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(16);
    });
  });

  it('with artifacts that have healing bonus in circlet, level 8 and at least flat hp or elemental mastery', () => {
    buildOptimizer.filterArtifacts(
      { sandsMain: PossibleMainStats.percentHp, gobletMain: PossibleMainStats.percentDef, circletMain: PossibleMainStats.healingBonus },
      8,
      [PossibleSubStats.flatHp, PossibleSubStats.elementalMastery],
    );
    expect(buildOptimizer.getPossibleBuilds()).toEqual(2);
  });
});

function getSet(artifactSet: SetNames): SetNames {
  return artifactSet ? artifactSet : SetNames.retracingBolide;
}

function getLevel(artifactLevel: number): number {
  return artifactLevel ? artifactLevel : 0;
}

function getFlowerArtifactsWithValues(
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
  }[],
): FlowerArtifact[] {
  return allArtifactsData.map(
    (artifactData) => new FlowerArtifact(artifactData.id, getSet(artifactData.set), artifactData.subStats, getLevel(artifactData.level)),
  );
}

function getPlumeArtifactsWithValues(
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
  }[],
): PlumeArtifact[] {
  return allArtifactsData.map(
    (artifactData) => new PlumeArtifact(artifactData.id, getSet(artifactData.set), artifactData.subStats, getLevel(artifactData.level)),
  );
}

function getSandsArtifactsWithValues(
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
    mainStatType: SandsMainStatType;
  }[],
): SandsArtifact[] {
  return allArtifactsData.map(
    (artifactData) =>
      new SandsArtifact(
        artifactData.id,
        getSet(artifactData.set),
        artifactData.subStats,
        getLevel(artifactData.level),
        artifactData.mainStatType,
      ),
  );
}

function getGobletArtifactsWithValues(
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
    mainStatType: GobletMainStatType;
  }[],
): GobletArtifact[] {
  return allArtifactsData.map(
    (artifactData) =>
      new GobletArtifact(
        artifactData.id,
        getSet(artifactData.set),
        artifactData.subStats,
        getLevel(artifactData.level),
        artifactData.mainStatType,
      ),
  );
}

function getCircletArtifactsWithValues(
  allArtifactsData: {
    id: string;
    set?: SetNames;
    level?: number;
    subStats: SubStatsValues;
    mainStatType: CircletMainStatType;
  }[],
): CircletArtifact[] {
  return allArtifactsData.map(
    (artifactData) =>
      new CircletArtifact(
        artifactData.id,
        getSet(artifactData.set),
        artifactData.subStats,
        getLevel(artifactData.level),
        artifactData.mainStatType,
      ),
  );
}
