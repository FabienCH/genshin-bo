import { AllArtifactsData, ArtifactData } from '../../domain/models/artifact-data';
import { CircletArtifactData } from '../../domain/models/circlet-artifact-data';
import { GobletArtifactData } from '../../domain/models/goblet-artifact-data';
import { MainStats } from '../../domain/models/main-statistics';
import { SandsArtifactData } from '../../domain/models/sands-artifact-data';
import { SetNames } from '../../domain/models/sets-with-effects';
import { SubStats } from '../../domain/models/sub-statistics';
import { ArtifactsRepository } from '../../domain/artifacts-repository';
import { FlowerArtifact } from '../../domain/entities/flower-artifact';
import { PlumeArtifact } from '../../domain/entities/plume-artifact';

export class InMemoryArtifactsRepository implements ArtifactsRepository {
  private flowerArtifactsData: ArtifactData[] = [
    {
      id: '0',
      type: 'flower',
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
    {
      id: '1',
      type: 'flower',
      set: SetNames.thunderingFury,
      level: 8,
      mainStatType: FlowerArtifact.mainStat,
      subStats: {
        [SubStats.energyRecharge]: 3,
        [SubStats.percentHp]: 6,
        [SubStats.critDmg]: 3.9,
        [SubStats.percentAtk]: 7,
      },
    },
  ];
  private plumeArtifactsData: ArtifactData[] = [
    {
      id: '2',
      type: 'plume',
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
      type: 'plume',
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
  ];
  private sandsArtifactsData: SandsArtifactData[] = [
    {
      id: '4',
      type: 'sands',
      set: SetNames.thunderingFury,
      level: 12,
      mainStatType: MainStats.percentHp,
      subStats: {
        [SubStats.percentDef]: 6,
        [SubStats.elementalMastery]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.critDmg]: 2.9,
      },
    },
    {
      id: '5',
      type: 'sands',
      set: SetNames.bloodstainedChivalry,
      level: 16,
      mainStatType: MainStats.percentAtk,
      subStats: {
        [SubStats.energyRecharge]: 6,
        [SubStats.flatAtk]: 7,
        [SubStats.critRate]: 3.2,
        [SubStats.flatDef]: 2.9,
      },
    },
    {
      id: '6',
      type: 'sands',
      set: SetNames.retracingBolide,
      level: 8,
      mainStatType: MainStats.elementalMastery,
      subStats: {
        [SubStats.flatHp]: 6,
        [SubStats.critDmg]: 7,
        [SubStats.percentDef]: 3.2,
        [SubStats.percentAtk]: 2.9,
      },
    },
  ];
  private gobletArtifactsData: GobletArtifactData[] = [
    {
      id: '7',
      type: 'goblet',
      set: SetNames.lavawalker,
      level: 15,
      mainStatType: MainStats.percentDef,
      subStats: {
        [SubStats.critRate]: 2.5,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.flatHp]: 3,
      },
    },
    {
      id: '8',
      type: 'goblet',
      set: SetNames.archaicPetra,
      level: 12,
      mainStatType: MainStats.percentDef,
      subStats: {
        [SubStats.critDmg]: 2.5,
        [SubStats.energyRecharge]: 5.2,
        [SubStats.percentHp]: 4,
        [SubStats.flatDef]: 3,
      },
    },
    {
      id: '9',
      type: 'goblet',
      set: SetNames.blizzardStrayer,
      level: 8,
      mainStatType: MainStats.cryoDmg,
      subStats: {
        [SubStats.elementalMastery]: 4,
        [SubStats.percentHp]: 5.2,
        [SubStats.percentAtk]: 4,
        [SubStats.critDmg]: 3,
      },
    },
    {
      id: '10',
      type: 'goblet',
      set: SetNames.wanderersTroupe,
      level: 4,
      mainStatType: MainStats.physicalDmg,
      subStats: {
        [SubStats.flatAtk]: 4,
        [SubStats.percentDef]: 5.2,
        [SubStats.energyRecharge]: 4,
        [SubStats.critRate]: 3,
      },
    },
  ];
  private circletArtifactsData: CircletArtifactData[] = [
    {
      id: '11',
      type: 'circlet',
      set: SetNames.retracingBolide,
      level: 17,
      mainStatType: MainStats.healingBonus,
      subStats: {
        [SubStats.percentDef]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.percentHp]: 5,
      },
    },
    {
      id: '12',
      type: 'circlet',
      set: SetNames.gladiatorsFinale,
      level: 12,
      mainStatType: MainStats.critRate,
      subStats: {
        [SubStats.flatHp]: 4,
        [SubStats.percentAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.energyRecharge]: 5,
      },
    },
    {
      id: '13',
      type: 'circlet',
      set: SetNames.retracingBolide,
      level: 14,
      mainStatType: MainStats.critRate,
      subStats: {
        [SubStats.energyRecharge]: 4,
        [SubStats.flatAtk]: 4,
        [SubStats.critDmg]: 3.2,
        [SubStats.flatHp]: 5,
      },
    },
  ];

  constructor(artifactsData?: AllArtifactsData) {
    if (artifactsData) {
      const { flowers, plumes, sands, goblets, circlets } = artifactsData;
      this.setArtifactsData(flowers, plumes, sands, goblets, circlets);
    }
  }

  private setArtifactsData(
    flowerArtifactsData?: ArtifactData[],
    plumeArtifactsData?: ArtifactData[],
    sandsArtifactsData?: SandsArtifactData[],
    gobletArtifactsData?: GobletArtifactData[],
    circletArtifactsData?: CircletArtifactData[],
  ) {
    if (flowerArtifactsData) {
      this.flowerArtifactsData = flowerArtifactsData;
    }
    if (plumeArtifactsData) {
      this.plumeArtifactsData = plumeArtifactsData;
    }
    if (sandsArtifactsData) {
      this.sandsArtifactsData = sandsArtifactsData;
    }
    if (gobletArtifactsData) {
      this.gobletArtifactsData = gobletArtifactsData;
    }
    if (circletArtifactsData) {
      this.circletArtifactsData = circletArtifactsData;
    }
  }

  public getAll(): ArtifactData[] {
    return [
      ...this.getFlowerArtifacts(),
      ...this.getPlumeArtifacts(),
      ...this.getSandsArtifacts(),
      ...this.getGobletArtifacts(),
      ...this.getCircletArtifacts(),
    ];
  }

  public getFlowerArtifacts(): ArtifactData[] {
    return this.flowerArtifactsData;
  }
  public getPlumeArtifacts(): ArtifactData[] {
    return this.plumeArtifactsData;
  }
  public getSandsArtifacts(): SandsArtifactData[] {
    return this.sandsArtifactsData;
  }
  public getGobletArtifacts(): GobletArtifactData[] {
    return this.gobletArtifactsData;
  }
  public getCircletArtifacts(): CircletArtifactData[] {
    return this.circletArtifactsData;
  }
}
