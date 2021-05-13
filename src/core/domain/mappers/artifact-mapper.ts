import { Artifact } from '../entities/artifact';
import { CircletArtifact } from '../entities/circlet-artifact';
import { FlowerArtifact } from '../entities/flower-artifact';
import { GobletArtifact } from '../entities/goblet-artifact';
import { PlumeArtifact } from '../entities/plume-artifact';
import { SandsArtifact } from '../entities/sands-artifact';
import { AllArtifacts } from '../models/all-artifacts';
import { ArtifactData, NewArtifactData } from '../models/artifact-data';
import { ArtifactView } from '../models/artifact-view';
import { ArtifactStatsValues } from '../models/main-statistics';
import { StringFormatter } from './string-formatter';
import { v4 as uuidv4 } from 'uuid';
import { ArtifactValidator } from '../artifacts-validator';
import { ArtifactValidationError } from '../artifact-validation-error';

export abstract class ArtifactMapper {
  private static artifactValidator: ArtifactValidator = new ArtifactValidator();

  public static mapDataToArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): Artifact | ArtifactValidationError {
    if (!this.artifactValidator.isArtifactValid(artifactData)) {
      return this.artifactValidator.getErrors();
    }
    switch (artifactData.type) {
      case 'flower':
        return ArtifactMapper.newFlowerArtifact(artifactData, mainValueFromOcr);
      case 'plume':
        return ArtifactMapper.newPlumeArtifact(artifactData, mainValueFromOcr);
      case 'sands':
        return ArtifactMapper.newSandsArtifact(artifactData, mainValueFromOcr);
      case 'goblet':
        return ArtifactMapper.newGobletArtifact(artifactData, mainValueFromOcr);
      case 'circlet':
        return ArtifactMapper.newCircletArtifact(artifactData, mainValueFromOcr);
      default:
        return new ArtifactValidationError(['incorrect artifact type']);
    }
  }

  public static mapDataToView(artifactData: ArtifactData): ArtifactView | ArtifactValidationError {
    const artifact = ArtifactMapper.mapDataToArtifact(artifactData);
    return artifact instanceof Artifact ? ArtifactMapper.mapArtifactToView(artifact) : artifact;
  }

  public static mapArtifactToView(artifact: Artifact): ArtifactView {
    const subValues = Object.values(artifact.subStats);
    const subStats = Object.keys(artifact.subStats).map((key, index) => ({ [key]: subValues[index] }));
    return {
      id: artifact.id,
      type: StringFormatter.upperCaseFirstChar(artifact.getType()),
      set: StringFormatter.formatStringWithUpperCase(artifact.set),
      level: artifact.level,
      mainStat: ArtifactMapper.statToString(artifact.mainStat),
      subStat1: ArtifactMapper.statToString(subStats[0]),
      subStat2: ArtifactMapper.statToString(subStats[1]),
      subStat3: ArtifactMapper.statToString(subStats[2]),
      subStat4: subStats[3] ? ArtifactMapper.statToString(subStats[3]) : '-',
    };
  }

  public static mapNewDataToArtifactData(newArtifactData: Partial<NewArtifactData>): ArtifactData | ArtifactValidationError {
    if (this.isValidNewArtifactData(newArtifactData)) {
      const { type, set, level, mainStatType, subStats } = newArtifactData;
      return { id: uuidv4(), type, set, level, mainStatType, subStats };
    }
    return this.artifactValidator.getErrors();
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

  private static newCircletArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): CircletArtifact {
    return new CircletArtifact(
      artifactData.id,
      artifactData.set,
      artifactData.subStats,
      artifactData.level,
      artifactData.mainStatType,
      mainValueFromOcr,
    );
  }

  private static newGobletArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): GobletArtifact {
    return new GobletArtifact(
      artifactData.id,
      artifactData.set,
      artifactData.subStats,
      artifactData.level,
      artifactData.mainStatType,
      mainValueFromOcr,
    );
  }

  private static newSandsArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): SandsArtifact {
    return new SandsArtifact(
      artifactData.id,
      artifactData.set,
      artifactData.subStats,
      artifactData.level,
      artifactData.mainStatType,
      mainValueFromOcr,
    );
  }

  private static newPlumeArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): PlumeArtifact {
    return new PlumeArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, mainValueFromOcr);
  }

  private static newFlowerArtifact(artifactData: ArtifactData, mainValueFromOcr?: number): FlowerArtifact {
    return new FlowerArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, mainValueFromOcr);
  }

  private static isValidNewArtifactData(newArtifactData: Partial<NewArtifactData>): newArtifactData is NewArtifactData {
    return ArtifactMapper.artifactValidator.isNewArtifactValid(newArtifactData);
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
