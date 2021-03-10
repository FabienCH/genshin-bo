import { Artifact } from '../entities/artifact';
import { CircletArtifact } from '../entities/circlet-artifact';
import { FlowerArtifact } from '../entities/flower-artifact';
import { GobletArtifact } from '../entities/goblet-artifact';
import { PlumeArtifact } from '../entities/plume-artifact';
import { SandsArtifact } from '../entities/sands-artifact';
import { ArtifactData } from '../models/artifact-data';
import { ArtifactView } from '../models/artifact-view';
import { ArtifactStatsValues } from '../models/main-statistics';
import { StringFormatter } from './string-formatter';

export abstract class ArtifactMapper {
  public static mapDataToView(artifactData: ArtifactData): ArtifactView {
    const artifact = ArtifactMapper.mapDataToArtifact(artifactData);
    const subValues = Object.values(artifact.subStats);
    const subStats = Object.keys(artifact.subStats).map((key, index) => ({ [key]: subValues[index] }));
    return {
      id: artifact.id,
      type: artifact.getType(),
      set: StringFormatter.formatStringWithUpperCase(artifact.set),
      level: artifact.level,
      mainStat: ArtifactMapper.statToString(artifact.mainStat),
      subStat1: ArtifactMapper.statToString(subStats[0]),
      subStat2: ArtifactMapper.statToString(subStats[1]),
      subStat3: ArtifactMapper.statToString(subStats[2]),
      subStat4: subStats[3] ? ArtifactMapper.statToString(subStats[3]) : '-',
    };
  }

  public static mapToView(artifact: Artifact): ArtifactView {
    const subValues = Object.values(artifact.subStats);
    const subStats = Object.keys(artifact.subStats).map((key, index) => ({ [key]: subValues[index] }));
    return {
      id: artifact.id,
      type: artifact.getType(),
      set: StringFormatter.formatStringWithUpperCase(artifact.set),
      level: artifact.level,
      mainStat: ArtifactMapper.statToString(artifact.mainStat),
      subStat1: ArtifactMapper.statToString(subStats[0]),
      subStat2: ArtifactMapper.statToString(subStats[1]),
      subStat3: ArtifactMapper.statToString(subStats[2]),
      subStat4: subStats[3] ? ArtifactMapper.statToString(subStats[3]) : '-',
    };
  }

  public static mapDataToArtifact(artifactData: ArtifactData): Artifact {
    switch (artifactData.type) {
      case 'flower':
        return new FlowerArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level);
      case 'plume':
        return new PlumeArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level);
      case 'sands':
        return new SandsArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
      case 'goblet':
        return new GobletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
      case 'circlet':
        return new CircletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
    }
  }

  private static statToString(stat: ArtifactStatsValues): string {
    const statKey = Object.keys(stat)[0];
    const statName = this.statKeyToStatName(statKey);
    const valueSuffix = statKey.includes('flat') || statKey === 'elementalMastery' ? '' : '%';

    return `${Object.values(stat)[0]}${valueSuffix} ${statName}`;
  }

  private static statKeyToStatName(statKey: string): string {
    if (statKey.includes('Hp')) {
      return 'HP';
    }
    if (statKey.includes('Atk')) {
      return 'ATK';
    }
    if (statKey.includes('Def')) {
      return 'DEF';
    }
    if (statKey.includes('Dmg')) {
      return `${StringFormatter.upperCaseFirstChar(statKey.split('Dmg')[0])} DMG`;
    }

    return StringFormatter.formatStringWithUpperCase(statKey);
  }
}
