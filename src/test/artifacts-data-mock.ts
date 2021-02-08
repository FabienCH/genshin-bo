import { SandsMainStatType } from '../core/domain/models/sands-artifact-data';
import { PossibleMainStats } from '../core/domain/models/main-statistics';
import { SetNames } from '../core/domain/models/sets-with-effects';
import { PossibleSubStats } from '../core/domain/models/sub-statistics';
import { GobletMainStatType } from '../core/domain/models/goblet-artifact-data';
import { CircletMainStatType } from '../core/domain/models/circlet-artifact-data';

export const defaultBuildArtifactsData = {
  flowerArtifacts: [
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
  ],
  plumeArtifacts: [
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
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.archaicPetra,
      level: 8,
      mainStatType: PossibleMainStats.percentAtk as SandsMainStatType,
      subStats: {
        [PossibleSubStats.elementalMastery]: 16,
        [PossibleSubStats.flatHp]: 538,
        [PossibleSubStats.critRate]: 3.5,
        [PossibleSubStats.energyRecharge]: 5.2,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.bloodstainedChivalry,
      level: 0,
      mainStatType: PossibleMainStats.pyroDmg as GobletMainStatType,
      subStats: {
        [PossibleSubStats.elementalMastery]: 21,
        [PossibleSubStats.percentHp]: 4.7,
        [PossibleSubStats.energyRecharge]: 4.5,
        [PossibleSubStats.flatAtk]: 19,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.gladiatorsFinale,
      level: 16,
      mainStatType: PossibleMainStats.percentAtk as CircletMainStatType,
      subStats: {
        [PossibleSubStats.flatAtk]: 53,
        [PossibleSubStats.flatDef]: 37,
        [PossibleSubStats.elementalMastery]: 19,
        [PossibleSubStats.percentDef]: 7.6,
      },
    },
  ],
};

export const defPhyDmgAtkBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      subStats: {
        [PossibleSubStats.percentAtk]: 5,
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 6,
      },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      mainStatType: PossibleMainStats.percentDef as SandsMainStatType,
      subStats: { [PossibleSubStats.flatDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      mainStatType: PossibleMainStats.physicalDmg as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.critDmg]: 3.7,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      mainStatType: PossibleMainStats.percentAtk as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.flatHp]: 60,
        [PossibleSubStats.flatAtk]: 3,
      },
    },
  ],
};

export const atkGeoDmgEmBuildArtifactsData = {
  flowerArtifacts: [
    {
      id: '0',
      subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
    },
  ],
  plumeArtifacts: [
    {
      id: '1',
      subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      mainStatType: PossibleMainStats.percentAtk as SandsMainStatType,
      subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      mainStatType: PossibleMainStats.geoDmg as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.percentDef]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      mainStatType: PossibleMainStats.elementalMastery as CircletMainStatType,
      subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.flatAtk]: 4, [PossibleSubStats.critDmg]: 3.2 },
    },
  ],
};

export const lvl134820BuildArtifactsData = {
  flowerArtifacts: [
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
  ],
  plumeArtifacts: [
    {
      id: '1',
      level: 3,
      subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
    },
  ],
  sandsArtifacts: [
    {
      id: '2',
      level: 4,
      mainStatType: PossibleMainStats.percentAtk as SandsMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      level: 8,
      mainStatType: PossibleMainStats.geoDmg as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.percentDef]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      level: 20,
      mainStatType: PossibleMainStats.elementalMastery as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.percentHp]: 5,
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
        [PossibleSubStats.flatAtk]: 5,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.percentAtk]: 3,
        [PossibleSubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
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
  ],
  sandsArtifacts: [
    {
      id: '2',
      level: 12,
      mainStatType: PossibleMainStats.percentHp as SandsMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      level: 15,
      mainStatType: PossibleMainStats.percentDef as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      level: 17,
      mainStatType: PossibleMainStats.healingBonus as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.percentHp]: 5,
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
        [PossibleSubStats.flatAtk]: 5,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.percentAtk]: 3,
        [PossibleSubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
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
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: PossibleMainStats.percentHp as SandsMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.thunderingFury,
      level: 15,
      mainStatType: PossibleMainStats.percentDef as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.gladiatorsFinale,
      level: 17,
      mainStatType: PossibleMainStats.healingBonus as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.percentHp]: 5,
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
        [PossibleSubStats.flatAtk]: 5,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.percentAtk]: 3,
        [PossibleSubStats.critDmg]: 3.2,
      },
    },
  ],
  plumeArtifacts: [
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
  ],
  sandsArtifacts: [
    {
      id: '2',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: PossibleMainStats.percentHp as SandsMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '3',
      set: SetNames.lavawalker,
      level: 15,
      mainStatType: PossibleMainStats.percentDef as GobletMainStatType,
      subStats: {
        [PossibleSubStats.critRate]: 2.5,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.flatHp]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '4',
      set: SetNames.retracingBolide,
      level: 17,
      mainStatType: PossibleMainStats.healingBonus as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.percentHp]: 5,
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
  ],
  plumeArtifacts: [
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
  ],
  sandsArtifacts: [
    {
      id: '4',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: PossibleMainStats.percentHp as SandsMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 6,
        [PossibleSubStats.elementalMastery]: 7,
        [PossibleSubStats.critRate]: 3.2,
        [PossibleSubStats.critDmg]: 2.9,
      },
    },
  ],
  gobletArtifacts: [
    {
      id: '5',
      set: SetNames.lavawalker,
      level: 15,
      mainStatType: PossibleMainStats.percentDef as GobletMainStatType,
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
      mainStatType: PossibleMainStats.cryoDmg as GobletMainStatType,
      subStats: {
        [PossibleSubStats.elementalMastery]: 4,
        [PossibleSubStats.percentHp]: 5.2,
        [PossibleSubStats.percentAtk]: 4,
        [PossibleSubStats.critDmg]: 3,
      },
    },
  ],
  circletArtifacts: [
    {
      id: '7',
      set: SetNames.retracingBolide,
      level: 17,
      mainStatType: PossibleMainStats.healingBonus as CircletMainStatType,
      subStats: {
        [PossibleSubStats.percentDef]: 4,
        [PossibleSubStats.flatAtk]: 4,
        [PossibleSubStats.critDmg]: 3.2,
        [PossibleSubStats.percentHp]: 5,
      },
    },
  ],
};
