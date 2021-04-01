import { ArtifactType } from '../core/domain/entities/artifact';
import { ArtifactData } from '../core/domain/models/artifact-data';
import { MainStats } from '../core/domain/models/main-statistics';
import { SetNames } from '../core/domain/models/sets-with-effects';
import { SubStats } from '../core/domain/models/sub-statistics';

export const importedArtifactDataMock: ArtifactData[] = [
  {
    id: '0',
    type: ArtifactType.circlet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.critRate,
    subStats: {
      [SubStats.flatHp]: 508,
      [SubStats.critDmg]: 13.2,
      [SubStats.percentDef]: 19.0,
      [SubStats.energyRecharge]: 9.1,
    },
  },
  {
    id: '1',
    type: ArtifactType.flower,
    set: SetNames.gladiatorsFinale,
    level: 16,
    mainStatType: MainStats.flatHp,
    subStats: {
      [SubStats.critDmg]: 14.0,
      [SubStats.flatDef]: 32,
      [SubStats.percentAtk]: 8.2,
      [SubStats.elementalMastery]: 42,
    },
  },
  {
    id: '2',
    type: ArtifactType.plume,
    set: SetNames.maidenBeloved,
    level: 20,
    mainStatType: MainStats.flatAtk,
    subStats: {
      [SubStats.energyRecharge]: 4.5,
      [SubStats.percentAtk]: 26.8,
      [SubStats.flatHp]: 538,
      [SubStats.flatDef]: 21,
    },
  },
  {
    id: '3',
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 20,
    mainStatType: MainStats.geoDmg,
    subStats: {
      [SubStats.critDmg]: 13.2,
      [SubStats.critRate]: 8.9,
      [SubStats.flatHp]: 598,
      [SubStats.flatAtk]: 35,
    },
  },
  {
    id: '4',
    type: ArtifactType.goblet,
    set: SetNames.gladiatorsFinale,
    level: 4,
    mainStatType: MainStats.physicalDmg,
    subStats: {
      [SubStats.critDmg]: 7.0,
      [SubStats.percentHp]: 4.7,
      [SubStats.flatAtk]: 18,
      [SubStats.elementalMastery]: 23,
    },
  },
  {
    id: '5',
    type: ArtifactType.sands,
    set: SetNames.gladiatorsFinale,
    level: 12,
    mainStatType: MainStats.percentAtk,
    subStats: {
      [SubStats.critDmg]: 14.0,
      [SubStats.critRate]: 3.9,
      [SubStats.flatHp]: 239,
      [SubStats.flatDef]: 44,
    },
  },
  {
    id: '6',
    type: ArtifactType.flower,
    set: SetNames.crimsonWitchOfFlames,
    level: 0,
    mainStatType: MainStats.flatHp,
    subStats: {
      [SubStats.flatDef]: 19,
      [SubStats.percentAtk]: 5.8,
      [SubStats.percentDef]: 5.8,
    },
  },
];
