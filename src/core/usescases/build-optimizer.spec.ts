import { Artifact } from '../domain/entities/artifact';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats, SubStats } from '../domain/models/sub-statistics';
import { BuildOptimizer } from './build-optimizer';
import { possibleBuildStats } from '../domain/models/available-statistics';
import { ArtifactTypes } from '../domain/models/artifact-types';
import { SetNames } from '../domain/models/sets-with-effects';

xdescribe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let flowerArtifacts: Artifact[];
  let plumeArtifacts: Artifact[];
  let sandsArtifacts: Artifact[];
  let gobletArtifacts: Artifact[];
  let circletArtifacts: Artifact[];
  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
  });

  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
          subStats: { [PossibleSubStats.percentAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 6 },
        },
      ]);

      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
        },
      ]);

      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
          mainStatType: PossibleMainStats.physicalDmg,
          subStats: { [PossibleSubStats.critRate]: 2.5, [PossibleSubStats.percentDef]: 4, [PossibleSubStats.critDmg]: 3.7 },
        },
      ]);

      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.flatHp]: 60,
            [PossibleSubStats.flatAtk]: 3,
          },
        },
      ]);
      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 817,
            [possibleBuildStats.flatAtk]: 55,
            [possibleBuildStats.percentAtk]: 12,
            [possibleBuildStats.percentDef]: 28.7,
            [possibleBuildStats.physicalDmg]: 8.7,
            [possibleBuildStats.flatDef]: 6,
            [possibleBuildStats.critRate]: 11,
            [possibleBuildStats.elementalMastery]: 6,
            [possibleBuildStats.critDmg]: 3.7,
          },
        ],
      );
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
        },
      ]);
      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
          mainStatType: PossibleMainStats.geoDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
      ]);
      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.flatAtk]: 4, [PossibleSubStats.critDmg]: 3.2 },
        },
      ]);

      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 717,
            [possibleBuildStats.flatAtk]: 56,
            [possibleBuildStats.critRate]: 11.6,
            [possibleBuildStats.energyRecharge]: 3,
            [possibleBuildStats.flatDef]: 7,
            [possibleBuildStats.percentDef]: 13,
            [possibleBuildStats.percentHp]: 5.2,
            [possibleBuildStats.percentAtk]: 14,
            [possibleBuildStats.elementalMastery]: 35,
            [possibleBuildStats.geoDmg]: 7,
            [possibleBuildStats.critDmg]: 3.2,
          },
        ],
      );
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
          level: 1,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
          level: 3,
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
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
      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
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
      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
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
      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 920,
            [possibleBuildStats.flatAtk]: 95,
            [possibleBuildStats.critRate]: 11.6,
            [possibleBuildStats.energyRecharge]: 3,
            [possibleBuildStats.flatDef]: 7,
            [possibleBuildStats.percentDef]: 13,
            [possibleBuildStats.percentHp]: 10.2,
            [possibleBuildStats.percentAtk]: 21.9,
            [possibleBuildStats.elementalMastery]: 194,
            [possibleBuildStats.geoDmg]: 22.8,
            [possibleBuildStats.critDmg]: 9.3,
          },
        ],
      );
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
      ]);
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
          level: 7,
          subStats: {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.flatDef]: 7,
            [PossibleSubStats.critRate]: 2.7,
            [PossibleSubStats.percentAtk]: 5,
          },
        },
      ]);
      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
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
      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
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
      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
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
      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 1126,
            [possibleBuildStats.flatAtk]: 148,
            [possibleBuildStats.critRate]: 11.6,
            [possibleBuildStats.energyRecharge]: 3,
            [possibleBuildStats.flatDef]: 7,
            [possibleBuildStats.percentDef]: 55.9,
            [possibleBuildStats.percentHp]: 41,
            [possibleBuildStats.percentAtk]: 12,
            [possibleBuildStats.elementalMastery]: 7,
            [possibleBuildStats.healingBonus]: 31.3,
            [possibleBuildStats.critDmg]: 9.3,
          },
        ],
      );
    });

    it('with gladiator and thundering sets effects', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
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
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
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
      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
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
      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
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
      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
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
      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 1126,
            [possibleBuildStats.flatAtk]: 148,
            [possibleBuildStats.critRate]: 11.6,
            [possibleBuildStats.energyRecharge]: 3,
            [possibleBuildStats.flatDef]: 7,
            [possibleBuildStats.percentDef]: 59.9,
            [possibleBuildStats.percentHp]: 41,
            [possibleBuildStats.percentAtk]: 25,
            [possibleBuildStats.elementalMastery]: 7,
            [possibleBuildStats.healingBonus]: 31.3,
            [possibleBuildStats.critDmg]: 9.3,
            [possibleBuildStats.electroDmg]: 15,
          },
        ],
      );
    });

    it('with bolide and Lavawalker sets effects', () => {
      flowerArtifacts = getArtifactsWithValues([
        {
          id: '0',
          type: 'flower',
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
      plumeArtifacts = getArtifactsWithValues([
        {
          id: '1',
          type: 'plume',
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
      sandsArtifacts = getArtifactsWithValues([
        {
          id: '2',
          type: 'sands',
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
      gobletArtifacts = getArtifactsWithValues([
        {
          id: '3',
          type: 'goblet',
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
      circletArtifacts = getArtifactsWithValues([
        {
          id: '4',
          type: 'circlet',
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
      expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual(
        [
          {
            [possibleBuildStats.flatHp]: 1126,
            [possibleBuildStats.flatAtk]: 148,
            [possibleBuildStats.critRate]: 11.6,
            [possibleBuildStats.energyRecharge]: 3,
            [possibleBuildStats.flatDef]: 7,
            [possibleBuildStats.percentDef]: 55.9,
            [possibleBuildStats.percentHp]: 41,
            [possibleBuildStats.percentAtk]: 7,
            [possibleBuildStats.elementalMastery]: 7,
            [possibleBuildStats.healingBonus]: 31.3,
            [possibleBuildStats.critDmg]: 13.2,
            [possibleBuildStats.powerfulShield]: 35,
            [possibleBuildStats.pyroRes]: 40,
          },
        ],
      );
    });
  });

  it('should compute build stats of multiple artifacts for each type', () => {
    flowerArtifacts = getArtifactsWithValues([
      {
        id: '0',
        type: 'flower',
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
        type: 'flower',
        set: SetNames.thunderingFury,
        level: 7,
        subStats: {
          [PossibleSubStats.energyRecharge]: 3,
          [PossibleSubStats.flatHp]: 6,
          [PossibleSubStats.critDmg]: 3.9,
          [PossibleSubStats.percentAtk]: 7,
        },
      },
    ]);

    plumeArtifacts = getArtifactsWithValues([
      {
        id: '2',
        type: 'plume',
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
        type: 'plume',
        set: SetNames.blizzardStrayer,
        level: 12,
        subStats: {
          [PossibleSubStats.percentAtk]: 5,
          [PossibleSubStats.flatHp]: 12,
          [PossibleSubStats.flatDef]: 6,
          [PossibleSubStats.flatAtk]: 8,
        },
      },
    ]);

    sandsArtifacts = getArtifactsWithValues([
      {
        id: '4',
        type: 'sands',
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

    gobletArtifacts = getArtifactsWithValues([
      {
        id: '5',
        type: 'goblet',
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
        type: 'goblet',
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

    circletArtifacts = getArtifactsWithValues([
      {
        id: '7',
        type: 'circlet',
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

    expect(buildOptimizer.computeBuildsStats(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts)).toEqual([
      {
        [possibleBuildStats.flatHp]: 1126,
        [possibleBuildStats.flatAtk]: 148,
        [possibleBuildStats.critRate]: 11.6,
        [possibleBuildStats.energyRecharge]: 4,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 55.9,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 7,
        [possibleBuildStats.elementalMastery]: 7,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 14.3,
        [possibleBuildStats.powerfulShield]: 35,
        [possibleBuildStats.pyroRes]: 40,
      },
      {
        [possibleBuildStats.flatHp]: 1123,
        [possibleBuildStats.flatAtk]: 148,
        [possibleBuildStats.critRate]: 9.1,
        [possibleBuildStats.energyRecharge]: 4,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 7,
        [possibleBuildStats.elementalMastery]: 11,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 17.3,
        [possibleBuildStats.powerfulShield]: 35,
        [possibleBuildStats.cryoDmg]: 22.8,
      },
      {
        [possibleBuildStats.flatHp]: 1138,
        [possibleBuildStats.flatAtk]: 222,
        [possibleBuildStats.critRate]: 8.9,
        [possibleBuildStats.flatDef]: 6,
        [possibleBuildStats.percentDef]: 55.9,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 12,
        [possibleBuildStats.elementalMastery]: 7,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 9.3,
        [possibleBuildStats.pyroRes]: 40,
      },
      {
        [possibleBuildStats.flatHp]: 1135,
        [possibleBuildStats.flatAtk]: 222,
        [possibleBuildStats.critRate]: 6.4,
        [possibleBuildStats.flatDef]: 6,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 12,
        [possibleBuildStats.elementalMastery]: 11,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 12.3,
        [possibleBuildStats.cryoDmg]: 37.8,
      },
      {
        [possibleBuildStats.flatHp]: 2148,
        [possibleBuildStats.flatAtk]: 143,
        [possibleBuildStats.critRate]: 8.4,
        [possibleBuildStats.energyRecharge]: 7,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 55.9,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 11,
        [possibleBuildStats.elementalMastery]: 7,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 15,
        [possibleBuildStats.powerfulShield]: 35,
        [possibleBuildStats.electroDmg]: 15,
      },
      {
        [possibleBuildStats.flatHp]: 2145,
        [possibleBuildStats.flatAtk]: 143,
        [possibleBuildStats.critRate]: 5.9,
        [possibleBuildStats.energyRecharge]: 7,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 11,
        [possibleBuildStats.elementalMastery]: 11,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 18,
        [possibleBuildStats.powerfulShield]: 35,
        [possibleBuildStats.electroDmg]: 15,
        [possibleBuildStats.cryoDmg]: 22.8,
      },
      {
        [possibleBuildStats.flatHp]: 2160,
        [possibleBuildStats.flatAtk]: 217,
        [possibleBuildStats.critRate]: 5.7,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 6,
        [possibleBuildStats.percentDef]: 55.9,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 16,
        [possibleBuildStats.elementalMastery]: 7,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 10,
        [possibleBuildStats.electroDmg]: 15,
      },
      {
        [possibleBuildStats.flatHp]: 2157,
        [possibleBuildStats.flatAtk]: 217,
        [possibleBuildStats.critRate]: 3.2,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 6,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 16,
        [possibleBuildStats.elementalMastery]: 11,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 13,
        [possibleBuildStats.electroDmg]: 15,
        [possibleBuildStats.cryoDmg]: 37.8,
      },
    ]);
  });
});

function getArtifactsWithValues(
  allArtifactsData: {
    id: string;
    type: ArtifactTypes;
    set?: SetNames;
    level?: number;
    subStats: SubStats;
    mainStatType?: PossibleMainStats;
  }[],
): Artifact[] {
  return allArtifactsData.map(
    (artifactData) =>
      new Artifact(
        artifactData.id,
        artifactData.type,
        artifactData.set,
        artifactData.subStats,
        artifactData.level,
        artifactData.mainStatType,
      ),
  );
}
