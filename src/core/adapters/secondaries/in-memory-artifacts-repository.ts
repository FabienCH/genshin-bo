import { ArtifactData } from '../../domain/models/artifact-data';
import { CircletArtifactData } from '../../domain/models/circlet-artifact-data';
import { GobletArtifactData } from '../../domain/models/goblet-artifact-data';
import { PossibleMainStats } from '../../domain/models/main-statistics';
import { SandsArtifactData } from '../../domain/models/sands-artifact-data';
import { SetNames } from '../../domain/models/sets-with-effects';
import { PossibleSubStats } from '../../domain/models/sub-statistics';
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
  ];
  private plumeArtifactsData: ArtifactData[] = [
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
  ];
  private sandsArtifactsData: SandsArtifactData[] = [
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
  ];
  private gobletArtifactsData: GobletArtifactData[] = [
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
  ];
  private circletArtifactsData: CircletArtifactData[] = [
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
