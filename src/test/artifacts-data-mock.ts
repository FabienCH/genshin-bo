import { SandsMainStatType } from '../core/domain/models/sands-artifact-data';
import { MainStats } from '../core/domain/models/main-statistics';
import { SetNames } from '../core/domain/models/sets-with-effects';
import { SubStats } from '../core/domain/models/sub-statistics';
import { GobletMainStatType } from '../core/domain/models/goblet-artifact-data';
import { CircletMainStatType } from '../core/domain/models/circlet-artifact-data';

export const defaultBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      set: SetNames.gladiatorsFinale,
      level: 8,
      subStats: {
        [SubStats.flatAtk]: 16,
        [SubStats.percentAtk]: 4.7,
        [SubStats.critDmg]: 11.7,
        [SubStats.energyRecharge]: 4.5,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      set: SetNames.crimsonWitchOfFlames,
      level: 8,
      subStats: {
        [SubStats.flatHp]: 478,
        [SubStats.critDmg]: 7.8,
        [SubStats.critRate]: 3.1,
        [SubStats.energyRecharge]: 5.8,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.archaicPetra,
      level: 8,
      mainStatType: MainStats.percentAtk as SandsMainStatType,
      subStats: {
        [SubStats.elementalMastery]: 16,
        [SubStats.flatHp]: 538,
        [SubStats.critRate]: 3.5,
        [SubStats.energyRecharge]: 5.2,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.bloodstainedChivalry,
      level: 0,
      mainStatType: MainStats.pyroDmg as GobletMainStatType,
      subStats: {
        [SubStats.elementalMastery]: 21,
        [SubStats.percentHp]: 4.7,
        [SubStats.energyRecharge]: 4.5,
        [SubStats.flatAtk]: 19,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.gladiatorsFinale,
      level: 16,
      mainStatType: MainStats.percentAtk as CircletMainStatType,
      subStats: {
        [SubStats.flatAtk]: 53,
        [SubStats.flatDef]: 37,
        [SubStats.elementalMastery]: 19,
        [SubStats.percentDef]: 7.6,
      },
    },
  ],
};

export const defPhyDmgAtkBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      subStats: {
        [SubStats.percentAtk]: 5,
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 6,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      mainStatType: MainStats.percentDef as SandsMainStatType,
      subStats: { [SubStats.flatDef]: 6, [SubStats.flatHp]: 40, [SubStats.critRate]: 2.5 },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      mainStatType: MainStats.physicalDmg as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentDef]: 4,
        [SubStats.critDmg]: 3.7,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      mainStatType: MainStats.percentAtk as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.critRate]: 2.5,
        [SubStats.flatHp]: 60,
        [SubStats.flatAtk]: 3,
      },
    },
  ],
};

export const atkGeoDmgEmBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      subStats: { [SubStats.flatAtk]: 5, [SubStats.critRate]: 3.2, [SubStats.percentAtk]: 3 },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      subStats: { [SubStats.energyRecharge]: 3, [SubStats.flatDef]: 7, [SubStats.critRate]: 2.7 },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      mainStatType: MainStats.percentAtk as SandsMainStatType,
      subStats: { [SubStats.percentDef]: 6, [SubStats.elementalMastery]: 7, [SubStats.critRate]: 3.2 },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      mainStatType: MainStats.geoDmg as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.percentDef]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      mainStatType: MainStats.elementalMastery as CircletMainStatType,
      subStats: { [SubStats.percentDef]: 4, [SubStats.flatAtk]: 4, [SubStats.critDmg]: 3.2 },
    },
  ],
};

export const lvl134820BuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      level: 1,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      level: 3,
      subStats: { [SubStats.energyRecharge]: 3, [SubStats.flatDef]: 7, [SubStats.critRate]: 2.7 },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      level: 4,
      mainStatType: MainStats.percentAtk as SandsMainStatType,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      level: 8,
      mainStatType: MainStats.geoDmg as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.percentDef]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      level: 20,
      mainStatType: MainStats.elementalMastery as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
  ],
};

export const lvl27121517BuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      level: 2,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      level: 7,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.percentAtk]: 5,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      level: 12,
      mainStatType: MainStats.percentHp as SandsMainStatType,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      level: 15,
      mainStatType: MainStats.percentDef as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      level: 17,
      mainStatType: MainStats.healingBonus as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
  ],
};

export const gladiatorThunderingBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      set: SetNames.gladiatorsFinale,
      level: 2,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      set: SetNames.retracingBolide,
      level: 7,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.percentDef]: 4,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: MainStats.percentHp as SandsMainStatType,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.thunderingFury,
      level: 15,
      mainStatType: MainStats.percentDef as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.gladiatorsFinale,
      level: 17,
      mainStatType: MainStats.healingBonus as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
  ],
};

export const bolideLavawalkerBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      set: SetNames.lavawalker,
      level: 2,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      set: SetNames.retracingBolide,
      level: 7,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.critDmg]: 3.9,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: MainStats.percentHp as SandsMainStatType,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.lavawalker,
      level: 15,
      mainStatType: MainStats.percentDef as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.retracingBolide,
      level: 17,
      mainStatType: MainStats.healingBonus as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
  ],
};

export const multipleArtifactsBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      set: SetNames.lavawalker,
      level: 2,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
    {
      id: '1',
      set: SetNames.thunderingFury,
      level: 7,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.percentHp]: 6,
        [SubStats.critDmg]: 3.9,
        [SubStats.percentAtk]: 7,
      },
    },
  ],
  plumeArtifacts: [
    {
      id: '2',
      set: SetNames.retracingBolide,
      level: 7,
      subStats: {
        [SubStats.energyRecharge]: 4,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.critDmg]: 5,
      },
    },
    {
      id: '3',
      set: SetNames.blizzardStrayer,
      level: 12,
      subStats: {
        [SubStats.percentAtk]: 5,
        [SubStats.flatHp]: 12,
        [SubStats.flatDef]: 6,
        [SubStats.percentDef]: 8,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '4',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: MainStats.percentHp as SandsMainStatType,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '5',
      set: SetNames.lavawalker,
      level: 15,
      mainStatType: MainStats.percentDef as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.flatHp]: 3,
      },
    },
    {
      id: '6',
      set: SetNames.blizzardStrayer,
      level: 8,
      mainStatType: MainStats.cryoDmg as GobletMainStatType,
      subStats: {
        [SubStats.elementalMastery]: 4,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.critDmg]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '7',
      set: SetNames.retracingBolide,
      level: 17,
      mainStatType: MainStats.healingBonus as CircletMainStatType,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
  ],
};
