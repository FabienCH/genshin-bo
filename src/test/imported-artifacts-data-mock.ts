import { ArtifactType } from '../core/domain/entities/artifact';
import { OcrArtifactData } from '../core/domain/models/artifact-data';
import { MainStats } from '../core/domain/models/main-statistics';
import { SetNames } from '../core/domain/models/sets-with-effects';
import { SubStats } from '../core/domain/models/sub-statistics';

export const ocrArtifactDataMock: OcrArtifactData[] = [
  {
    type: ArtifactType.circlet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.critRate,
    mainStatValue: 31.1,
    subStats: {
      [SubStats.flatHp]: 508,
      [SubStats.critDmg]: 13.2,
      [SubStats.percentDef]: 19.0,
      [SubStats.energyRecharge]: 9.1,
    },
  },
  {
    type: ArtifactType.flower,
    set: SetNames.gladiatorsFinale,
    level: 16,
    mainStatType: MainStats.flatHp,
    mainStatValue: 3967,
    subStats: {
      [SubStats.critDmg]: 14.0,
      [SubStats.flatDef]: 32,
      [SubStats.percentAtk]: 8.2,
      [SubStats.elementalMastery]: 42,
    },
  },
];

export const properlyImportedArtifactMock: OcrArtifactData[] = [
  {
    type: ArtifactType.circlet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.critRate,
    mainStatValue: 31.1,
    subStats: {
      [SubStats.flatHp]: 508,
      [SubStats.critDmg]: 13.2,
      [SubStats.percentDef]: 19.0,
      [SubStats.energyRecharge]: 9.1,
    },
  },
  {
    type: ArtifactType.flower,
    set: SetNames.gladiatorsFinale,
    level: 16,
    mainStatType: MainStats.flatHp,
    mainStatValue: 3967,
    subStats: {
      [SubStats.critDmg]: 14.0,
      [SubStats.flatDef]: 32,
      [SubStats.percentAtk]: 8.2,
      [SubStats.elementalMastery]: 42,
    },
  },
  {
    type: ArtifactType.plume,
    set: SetNames.maidenBeloved,
    level: 20,
    mainStatType: MainStats.flatAtk,
    mainStatValue: 311,
    subStats: {
      [SubStats.energyRecharge]: 4.5,
      [SubStats.percentAtk]: 26.8,
      [SubStats.flatHp]: 538,
      [SubStats.flatDef]: 21,
    },
  },
  {
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.geoDmg,
    mainStatValue: 46.6,
    subStats: {
      [SubStats.critDmg]: 13.2,
      [SubStats.critRate]: 8.9,
      [SubStats.flatHp]: 598,
      [SubStats.flatAtk]: 35,
    },
  },
  {
    type: ArtifactType.goblet,
    set: SetNames.gladiatorsFinale,
    level: 4,
    mainStatType: MainStats.physicalDmg,
    mainStatValue: 18.6,
    subStats: {
      [SubStats.critDmg]: 7.0,
      [SubStats.percentHp]: 4.7,
      [SubStats.flatAtk]: 18,
      [SubStats.elementalMastery]: 23,
    },
  },
  {
    type: ArtifactType.sands,
    set: SetNames.gladiatorsFinale,
    level: 12,
    mainStatType: MainStats.percentAtk,
    mainStatValue: 30.8,
    subStats: {
      [SubStats.critDmg]: 14.0,
      [SubStats.critRate]: 3.9,
      [SubStats.flatHp]: 239,
      [SubStats.flatDef]: 44,
    },
  },
  {
    type: ArtifactType.flower,
    set: SetNames.crimsonWitchOfFlames,
    level: 0,
    mainStatType: MainStats.flatHp,
    mainStatValue: 717,
    subStats: {
      [SubStats.flatDef]: 19,
      [SubStats.percentAtk]: 5.8,
      [SubStats.percentDef]: 5.8,
    },
  },
];

export const misrecognizedMainImportedArtifactMock: OcrArtifactData[] = [
  {
    type: ArtifactType.circlet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.critRate,
    mainStatValue: 31.1,
    subStats: {
      [SubStats.flatHp]: 508,
      [SubStats.critDmg]: 13.2,
      [SubStats.percentDef]: 19.0,
      [SubStats.energyRecharge]: 9.1,
    },
  },
  {
    type: ArtifactType.flower,
    set: SetNames.crimsonWitchOfFlames,
    level: 0,
    mainStatType: MainStats.flatHp,
    mainStatValue: 711,
    subStats: {
      [SubStats.flatDef]: 19,
      [SubStats.percentAtk]: 5.8,
      [SubStats.percentDef]: 5.8,
    },
  },
  {
    type: ArtifactType.plume,
    set: SetNames.maidenBeloved,
    level: 20,
    mainStatType: MainStats.flatAtk,
    mainStatValue: 317,
    subStats: {
      [SubStats.energyRecharge]: 4.5,
      [SubStats.percentAtk]: 26.8,
      [SubStats.flatHp]: 538,
      [SubStats.flatDef]: 21,
    },
  },
  {
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.geoDmg,
    mainStatValue: 46.0,
    subStats: {
      [SubStats.critDmg]: 13.2,
      [SubStats.critRate]: 8.9,
      [SubStats.flatHp]: 598,
      [SubStats.flatAtk]: 35,
    },
  },
  {
    type: ArtifactType.sands,
    set: SetNames.gladiatorsFinale,
    level: 8,
    mainStatType: MainStats.percentAtk,
    mainStatValue: 22.8,
    subStats: {
      [SubStats.percentDef]: 5.8,
      [SubStats.flatHp]: 239,
      [SubStats.critRate]: 5.4,
      [SubStats.flatAtk]: 14,
    },
  },
];

export const misrecognizedSubsImportedArtifactMock: OcrArtifactData[] = [
  {
    type: ArtifactType.goblet,
    set: SetNames.archaicPetra,
    level: 20,
    mainStatType: MainStats.geoDmg,
    mainStatValue: 46.6,
    subStats: {
      [SubStats.elementalMastery]: 58,
      [SubStats.energyRecharge]: 5.2,
      [SubStats.critDmg]: 20.2,
      [SubStats.flatHp]: 269,
    },
  },
  {
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.geoDmg,
    mainStatValue: 46.6,
    subStats: {
      [SubStats.critDmg]: 13.2,
      [SubStats.critRate]: 8.9,
      [SubStats.flatHp]: 598,
      [SubStats.flatAtk]: 35,
    },
  },
  {
    type: ArtifactType.circlet,
    set: SetNames.bloodstainedChivalry,
    level: 16,
    mainStatType: MainStats.percentAtk,
    mainStatValue: 38.7,
    subStats: {
      [SubStats.energyRecharge]: 15.5,
      [SubStats.flatAtk]: 33,
      [SubStats.flatDef]: 21,
      [SubStats.percentHp]: 4.1,
    },
  },
  {
    type: ArtifactType.plume,
    set: SetNames.maidenBeloved,
    level: 20,
    mainStatType: MainStats.flatAtk,
    mainStatValue: 311,
    subStats: {
      [SubStats.energyRecharge]: 4.5,
      [SubStats.percentAtk]: 26.8,
      [SubStats.flatHp]: 538,
      [SubStats.flatDef]: 21,
    },
  },
  {
    type: ArtifactType.sands,
    set: SetNames.bloodstainedChivalry,
    level: 0,
    mainStatType: MainStats.percentAtk,
    mainStatValue: 7.0,
    subStats: {
      [SubStats.flatHp]: 269,
      [SubStats.critDmg]: 7.0,
      [SubStats.flatAtk]: 16,
      [SubStats.percentHp]: 5.8,
    },
  },
  {
    type: ArtifactType.goblet,
    set: SetNames.bloodstainedChivalry,
    level: 0,
    mainStatType: MainStats.percentDef,
    mainStatValue: 8.7,
    subStats: {
      [SubStats.elementalMastery]: 23,
      [SubStats.flatDef]: 23,
      [SubStats.percentHp]: 4.1,
      [SubStats.flatAtk]: 19,
    },
  },
  {
    type: ArtifactType.plume,
    set: SetNames.noblesseOblige,
    level: 8,
    mainStatType: MainStats.flatAtk,
    mainStatValue: 152,
    subStats: {
      [SubStats.percentAtk]: 4.7,
      [SubStats.percentDef]: 11.7,
      [SubStats.critDmg]: 13.2,
    },
  },
];
export const artifactWith2LinesNameMock = {
  type: ArtifactType.flower,
  set: SetNames.viridescentVenerer,
  level: 12,
  mainStatType: MainStats.flatHp,
  mainStatValue: 3155,
  subStats: {
    [SubStats.critRate]: 7.0,
    [SubStats.critDmg]: 7.0,
    [SubStats.elementalMastery]: 37,
    [SubStats.flatAtk]: 37,
  },
};
