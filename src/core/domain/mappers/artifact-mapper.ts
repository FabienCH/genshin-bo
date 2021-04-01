import { Artifact } from '../entities/artifact';
import { CircletArtifact } from '../entities/circlet-artifact';
import { FlowerArtifact } from '../entities/flower-artifact';
import { GobletArtifact } from '../entities/goblet-artifact';
import { PlumeArtifact } from '../entities/plume-artifact';
import { SandsArtifact } from '../entities/sands-artifact';
import { AllArtifacts } from '../models/all-artifacts';
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

  public static mapArtifactToView(artifact: Artifact): ArtifactView {
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
        return ArtifactMapper.newFlowerArtifact(artifactData);
      case 'plume':
        return ArtifactMapper.newPlumeArtifact(artifactData);
      case 'sands':
        return ArtifactMapper.newSandsArtifact(artifactData);
      case 'goblet':
        return ArtifactMapper.newGobletArtifact(artifactData);
      case 'circlet':
        return ArtifactMapper.newCircletArtifact(artifactData);
      default:
        throw new Error('incorrect artifact type');
    }
  }
  public static mapAllDataToAllArtifactsByType(artifactsData: ArtifactData[]): AllArtifacts {
    const emptyAllArtifacts: AllArtifacts = { flowers: [], plumes: [], sands: [], goblets: [], circlets: [] };
    return artifactsData.reduce((allArtifacts, artifactData): AllArtifacts => {
      switch (artifactData.type) {
        case 'flower':
          allArtifacts.flowers = [...allArtifacts.flowers, ArtifactMapper.newFlowerArtifact(artifactData)];
          break;
        case 'plume':
          allArtifacts.plumes = [...allArtifacts.plumes, ArtifactMapper.newPlumeArtifact(artifactData)];
          break;
        case 'sands':
          allArtifacts.sands = [...allArtifacts.sands, ArtifactMapper.newSandsArtifact(artifactData)];
          break;
        case 'goblet':
          allArtifacts.goblets = [...allArtifacts.goblets, ArtifactMapper.newGobletArtifact(artifactData)];
          break;
        case 'circlet':
          allArtifacts.circlets = [...allArtifacts.circlets, ArtifactMapper.newCircletArtifact(artifactData)];
          break;
      }
      return allArtifacts;
    }, emptyAllArtifacts);
  }

  private static newCircletArtifact(artifactData: ArtifactData): CircletArtifact {
    return new CircletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
  }

  private static newGobletArtifact(artifactData: ArtifactData): GobletArtifact {
    return new GobletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
  }

  private static newSandsArtifact(artifactData: ArtifactData): SandsArtifact {
    return new SandsArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, artifactData.mainStatType);
  }

  private static newPlumeArtifact(artifactData: ArtifactData): PlumeArtifact {
    return new PlumeArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level);
  }

  private static newFlowerArtifact(artifactData: ArtifactData): FlowerArtifact {
    return new FlowerArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level);
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
