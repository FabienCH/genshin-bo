import { ArtifactData } from '../../domain/models/artifact-data';
import { CircletArtifactData } from '../../domain/models/circlet-artifact-data';
import { GobletArtifactData } from '../../domain/models/goblet-artifact-data';
import { MainStats } from '../../domain/models/main-statistics';
import { SandsArtifactData } from '../../domain/models/sands-artifact-data';
import { SetNames } from '../../domain/models/sets-with-effects';
import { SubStats } from '../../domain/models/sub-statistics';
import { ArtifactsRepository } from '../../domain/artifacts-repository';
import { CircletArtifact } from '../../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../../domain/entities/flower-artifact';
import { GobletArtifact } from '../../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../../domain/entities/plume-artifact';
import { SandsArtifact } from '../../domain/entities/sands-artifact';

export class InMemoryArtifactsRepository implements ArtifactsRepository {
  private flowerArtifactsData: ArtifactData[] = [
    {
      id: '0',
      set: SetNames.retracingBolide,
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
      level: 8,
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
  ];
  private sandsArtifactsData: SandsArtifactData[] = [
    {
      id: '4',
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

  constructor(artifactsData?: {
    flowerArtifacts?: ArtifactData[];
    plumeArtifacts?: ArtifactData[];
    sandsArtifacts?: SandsArtifactData[];
    gobletArtifacts?: GobletArtifactData[];
    circletArtifacts?: CircletArtifactData[];
  }) {
    if (artifactsData) {
      const { flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts } = artifactsData;
      this.setArtifactsData(flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts);
    }
  }

  private setArtifactsData(
    flowerArtifactsData: ArtifactData[],
    plumeArtifactsData: ArtifactData[],
    sandsArtifactsData: SandsArtifactData[],
    gobletArtifactsData: GobletArtifactData[],
    circletArtifactsData: CircletArtifactData[],
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

  public getFlowerArtifacts(): FlowerArtifact[] {
    return this.flowerArtifactsData.map(
      (artifactData) =>
        new FlowerArtifact(artifactData.id, this.getSet(artifactData.set), artifactData.subStats, this.getLevel(artifactData.level)),
    );
  }
  public getPlumeArtifacts(): PlumeArtifact[] {
    return this.plumeArtifactsData.map(
      (artifactData) =>
        new PlumeArtifact(artifactData.id, this.getSet(artifactData.set), artifactData.subStats, this.getLevel(artifactData.level)),
    );
  }
  public getSandsArtifacts(): SandsArtifact[] {
    return this.sandsArtifactsData.map(
      (artifactData) =>
        new SandsArtifact(
          artifactData.id,
          this.getSet(artifactData.set),
          artifactData.subStats,
          this.getLevel(artifactData.level),
          artifactData.mainStatType,
        ),
    );
  }
  public getGobletArtifacts(): GobletArtifact[] {
    return this.gobletArtifactsData.map(
      (artifactData) =>
        new GobletArtifact(
          artifactData.id,
          this.getSet(artifactData.set),
          artifactData.subStats,
          this.getLevel(artifactData.level),
          artifactData.mainStatType,
        ),
    );
  }
  public getCircletArtifacts(): CircletArtifact[] {
    return this.circletArtifactsData.map(
      (artifactData) =>
        new CircletArtifact(
          artifactData.id,
          this.getSet(artifactData.set),
          artifactData.subStats,
          this.getLevel(artifactData.level),
          artifactData.mainStatType,
        ),
    );
  }

  private getSet(artifactSet: SetNames): SetNames {
    return artifactSet ? artifactSet : SetNames.retracingBolide;
  }

  private getLevel(artifactLevel: number): number {
    return artifactLevel ? artifactLevel : 0;
  }
}
