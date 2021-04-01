import { SandsMainStatType } from '../core/domain/models/sands-artifact-data';
import { MainStats } from '../core/domain/models/main-statistics';
import { SetNames } from '../core/domain/models/sets-with-effects';
import { SubStats } from '../core/domain/models/sub-statistics';
import { GobletMainStatType } from '../core/domain/models/goblet-artifact-data';
import { CircletMainStatType } from '../core/domain/models/circlet-artifact-data';
import { AllArtifactsData } from '../core/domain/models/artifact-data';
import { FlowerArtifact } from '../core/domain/entities/flower-artifact';
import { PlumeArtifact } from '../core/domain/entities/plume-artifact';
import { ArtifactType } from '../core/domain/entities/artifact';

export const defaultBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.gladiatorsFinale,
      level: 8,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 16,
        [SubStats.percentAtk]: 4.7,
        [SubStats.critDmg]: 11.7,
        [SubStats.energyRecharge]: 4.5,
      },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.crimsonWitchOfFlames,
      level: 8,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.flatHp]: 478,
        [SubStats.critDmg]: 7.8,
        [SubStats.critRate]: 3.1,
        [SubStats.energyRecharge]: 5.8,
      },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
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
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
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
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
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

export const defPhyDmgAtkBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: FlowerArtifact.mainStat,
      subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.percentAtk]: 5,
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 6,
      },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: MainStats.percentDef as SandsMainStatType,
      subStats: { [SubStats.flatDef]: 6, [SubStats.flatHp]: 40, [SubStats.critRate]: 2.5 },
    },
  ],
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: MainStats.physicalDmg as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentDef]: 4,
        [SubStats.critDmg]: 3.7,
      },
    },
  ],
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
      set: SetNames.retracingBolide,
      level: 0,
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

export const atkGeoDmgEmBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: FlowerArtifact.mainStat,
      subStats: { [SubStats.flatAtk]: 5, [SubStats.critRate]: 3.2, [SubStats.percentAtk]: 3 },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: PlumeArtifact.mainStat,
      subStats: { [SubStats.energyRecharge]: 3, [SubStats.flatDef]: 7, [SubStats.critRate]: 2.7 },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: MainStats.percentAtk as SandsMainStatType,
      subStats: { [SubStats.percentDef]: 6, [SubStats.elementalMastery]: 7, [SubStats.critRate]: 3.2 },
    },
  ],
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: MainStats.geoDmg as GobletMainStatType,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.percentDef]: 3,
      },
    },
  ],
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
      set: SetNames.retracingBolide,
      level: 0,
      mainStatType: MainStats.elementalMastery as CircletMainStatType,
      subStats: { [SubStats.percentDef]: 4, [SubStats.flatAtk]: 4, [SubStats.critDmg]: 3.2 },
    },
  ],
};

export const lvl134820BuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.retracingBolide,
      level: 1,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 3,
      mainStatType: PlumeArtifact.mainStat,
      subStats: { [SubStats.energyRecharge]: 3, [SubStats.flatDef]: 7, [SubStats.critRate]: 2.7 },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
      set: SetNames.retracingBolide,
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
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
      set: SetNames.retracingBolide,
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
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
      set: SetNames.retracingBolide,
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

export const lvl27121517BuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.retracingBolide,
      level: 2,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 7,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.percentAtk]: 5,
      },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
      set: SetNames.retracingBolide,
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
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
      set: SetNames.bloodstainedChivalry,
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
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
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

export const gladiatorThunderingBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.gladiatorsFinale,
      level: 2,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 7,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.percentDef]: 4,
      },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
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
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
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
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
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

export const bolideLavawalkerBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.lavawalker,
      level: 2,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
  ],
  plumes: [
    {
      id: '1',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 7,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.critDmg]: 3.9,
      },
    },
  ],
  sands: [
    {
      id: '2',
      type: ArtifactType.sands,
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
  goblets: [
    {
      id: '3',
      type: ArtifactType.goblet,
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
  circlets: [
    {
      id: '4',
      type: ArtifactType.circlet,
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

export const multipleArtifactsBuildArtifactsData: AllArtifactsData = {
  flowers: [
    {
      id: '0',
      type: ArtifactType.flower,
      set: SetNames.lavawalker,
      level: 2,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.critRate]: 3.2,
        [SubStats.percentAtk]: 3,
        [SubStats.critDmg]: 3.2,
      },
    },
    {
      id: '1',
      type: ArtifactType.flower,
      set: SetNames.thunderingFury,
      level: 7,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.percentHp]: 6,
        [SubStats.critDmg]: 3.9,
        [SubStats.percentAtk]: 7,
      },
    },
  ],
  plumes: [
    {
      id: '2',
      type: ArtifactType.plume,
      set: SetNames.retracingBolide,
      level: 7,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 4,
        [SubStats.flatDef]: 7,
        [SubStats.critRate]: 2.7,
        [SubStats.critDmg]: 5,
      },
    },
    {
      id: '3',
      type: ArtifactType.plume,
      set: SetNames.blizzardStrayer,
      level: 12,
      mainStatType: PlumeArtifact.mainStat,
      subStats: {
        [SubStats.percentAtk]: 5,
        [SubStats.flatHp]: 12,
        [SubStats.flatDef]: 6,
        [SubStats.percentDef]: 8,
      },
    },
  ],
  sands: [
    {
      id: '4',
      type: ArtifactType.sands,
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
  goblets: [
    {
      id: '5',
      type: ArtifactType.goblet,
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
      type: ArtifactType.goblet,
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
  circlets: [
    {
      id: '7',
      type: ArtifactType.circlet,
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
