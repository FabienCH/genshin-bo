import { Artifact } from '../entities/artifact';
import { CircletArtifact } from '../entities/circlet-artifact';
import { FlowerArtifact } from '../entities/flower-artifact';
import { GobletArtifact } from '../entities/goblet-artifact';
import { PlumeArtifact } from '../entities/plume-artifact';
import { SandsArtifact } from '../entities/sands-artifact';
import { AllArtifacts } from '../models/all-artifacts';
import { ArtifactData, NewArtifactData } from '../models/artifact-data';
import { ArtifactView } from '../models/artifact-view';
import { ArtifactStatsValues, MainStats, MainStatTypes } from '../models/main-statistics';
import { StringFormatter } from '../../mappers/string-formatter';
import { v4 as uuidv4 } from 'uuid';
import { ArtifactValidator } from '../artifacts-validator';
import { ArtifactValidationError } from '../artifact-validation-error';

export abstract class ArtifactMapper {
  private static readonly artifactValidator: ArtifactValidator = new ArtifactValidator();
  private static readonly mainStatValues: { stats: Array<MainStatTypes>; values: number[] }[] = [
    {
      stats: [
        MainStats.percentAtk,
        MainStats.percentHp,
        MainStats.pyroDmg,
        MainStats.hydroDmg,
        MainStats.dendroDmg,
        MainStats.electroDmg,
        MainStats.anemoDmg,
        MainStats.cryoDmg,
        MainStats.geoDmg,
      ],
      values: [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    },
    {
      stats: [MainStats.percentDef, MainStats.physicalDmg],
      values: [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    },
    {
      stats: [MainStats.elementalMastery],
      values: [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187],
    },
    {
      stats: [MainStats.energyRecharge],
      values: [7.8, 10, 12.2, 14.4, 16.6, 18.8, 21, 23.2, 25.4, 27.6, 29.8, 32, 34.2, 36.4, 38.6, 40.8, 43, 45.2, 47.4, 49.6, 51.8],
    },
    {
      stats: [MainStats.critRate],
      values: [4.7, 6, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5, 21.8, 23.2, 24.5, 25.8, 27.1, 28.4, 29.8, 31.1],
    },
    {
      stats: [MainStats.critDmg],
      values: [9.3, 12, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4, 41, 43.7, 46.3, 49, 51.6, 54.2, 56.9, 59.5, 62.2],
    },
    {
      stats: [MainStats.healingBonus],
      values: [5.4, 6.9, 8.4, 10, 11.5, 13, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7, 25.2, 26.7, 28.2, 29.8, 31.3, 32.8, 34.4, 35.9],
    },
    {
      stats: [MainStats.flatHp],
      values: [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
    },
    {
      stats: [MainStats.flatAtk],
      values: [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
    },
  ];

  public static mapDataToArtifact(artifactData: ArtifactData): Artifact | ArtifactValidationError {
    const { type, mainStatType, level } = artifactData;
    const mainStatValue = ArtifactMapper.getMainStatValue(mainStatType, level);

    if (!this.artifactValidator.isArtifactValid(artifactData)) {
      return this.artifactValidator.getErrors();
    }
    switch (type) {
      case 'flower':
        return ArtifactMapper.newFlowerArtifact(artifactData, mainStatValue);
      case 'plume':
        return ArtifactMapper.newPlumeArtifact(artifactData, mainStatValue);
      case 'sands':
        return ArtifactMapper.newSandsArtifact(artifactData, mainStatValue);
      case 'goblet':
        return ArtifactMapper.newGobletArtifact(artifactData, mainStatValue);
      case 'circlet':
        return ArtifactMapper.newCircletArtifact(artifactData, mainStatValue);
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

  public static mapOcrDataToArtifactData(
    newArtifactData: Partial<NewArtifactData>,
    fixMainStatValue: boolean,
  ): ArtifactData | ArtifactValidationError {
    if (this.isValidNewArtifactData(newArtifactData, fixMainStatValue)) {
      const { type, set, level, mainStatType, subStats } = newArtifactData;
      return { id: uuidv4(), type, set, level, mainStatType, subStats };
    }
    return this.artifactValidator.getErrors();
  }

  public static mapAllDataToAllArtifactsByType(artifactsData: ArtifactData[]): AllArtifacts {
    const emptyAllArtifacts: AllArtifacts = { flowers: [], plumes: [], sands: [], goblets: [], circlets: [] };
    return artifactsData.reduce((allArtifacts, artifactData): AllArtifacts => {
      const { mainStatType, level } = artifactData;
      const mainStatValue = ArtifactMapper.getMainStatValue(mainStatType, level);
      if (this.artifactValidator.isArtifactValid(artifactData)) {
        switch (artifactData.type) {
          case 'flower':
            allArtifacts.flowers = [...allArtifacts.flowers, ArtifactMapper.newFlowerArtifact(artifactData, mainStatValue)];
            break;
          case 'plume':
            allArtifacts.plumes = [...allArtifacts.plumes, ArtifactMapper.newPlumeArtifact(artifactData, mainStatValue)];
            break;
          case 'sands':
            allArtifacts.sands = [...allArtifacts.sands, ArtifactMapper.newSandsArtifact(artifactData, mainStatValue)];
            break;
          case 'goblet':
            allArtifacts.goblets = [...allArtifacts.goblets, ArtifactMapper.newGobletArtifact(artifactData, mainStatValue)];
            break;
          case 'circlet':
            allArtifacts.circlets = [...allArtifacts.circlets, ArtifactMapper.newCircletArtifact(artifactData, mainStatValue)];
            break;
        }
      }
      return allArtifacts;
    }, emptyAllArtifacts);
  }

  private static newCircletArtifact(artifactData: ArtifactData, mainStatValue: number): CircletArtifact {
    return new CircletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, {
      [artifactData.mainStatType]: mainStatValue,
    });
  }

  private static newGobletArtifact(artifactData: ArtifactData, mainStatValue: number): GobletArtifact {
    return new GobletArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, {
      [artifactData.mainStatType]: mainStatValue,
    });
  }

  private static newSandsArtifact(artifactData: ArtifactData, mainStatValue: number): SandsArtifact {
    return new SandsArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, {
      [artifactData.mainStatType]: mainStatValue,
    });
  }

  private static newPlumeArtifact(artifactData: ArtifactData, mainStatValue: number): PlumeArtifact {
    return new PlumeArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, mainStatValue);
  }

  private static newFlowerArtifact(artifactData: ArtifactData, mainStatValue: number): FlowerArtifact {
    return new FlowerArtifact(artifactData.id, artifactData.set, artifactData.subStats, artifactData.level, mainStatValue);
  }

  private static isValidNewArtifactData(
    newArtifactData: Partial<NewArtifactData>,
    fixOcrErrors: boolean,
  ): newArtifactData is NewArtifactData {
    const mainStatValue = ArtifactMapper.getMainStatValue(newArtifactData.mainStatType, newArtifactData.level);
    const newArtifactIsValid = ArtifactMapper.artifactValidator.isNewArtifactValid(newArtifactData, mainStatValue);

    return newArtifactIsValid || !fixOcrErrors
      ? newArtifactIsValid
      : ArtifactMapper.artifactValidator.isNewArtifactValid({ ...newArtifactData, mainStatValue }, mainStatValue);
  }

  private static getMainStatValue(mainStatType?: MainStatTypes, level?: number): number {
    const defaultValue = 0;
    if (!mainStatType || level == null) {
      return defaultValue;
    }

    const mainStat = ArtifactMapper.mainStatValues.find((mainStatValue) => mainStatValue.stats.includes(mainStatType));
    return mainStat?.values[level] || defaultValue;
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
