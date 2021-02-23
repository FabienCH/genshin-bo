import { Artifact } from '../entities/artifact';
import { ArtifactView } from '../models/artifact-view';
import { ArtifactStatsValues } from '../models/main-statistics';

export abstract class ArtifactMapper {
  public static mapToArtifactView(artifact: Artifact): ArtifactView {
    const subValues = Object.values(artifact.subStats);
    const subStats = Object.keys(artifact.subStats).map((key, index) => ({ [key]: subValues[index] }));
    return {
      id: artifact.id,
      type: artifact.getType(),
      set: ArtifactMapper.formatStringWithUpperCase(artifact.set),
      level: artifact.level,
      mainStat: ArtifactMapper.statToString(artifact.mainStat),
      subStat1: ArtifactMapper.statToString(subStats[0]),
      subStat2: ArtifactMapper.statToString(subStats[1]),
      subStat3: ArtifactMapper.statToString(subStats[2]),
      subStat4: subStats[3] ? ArtifactMapper.statToString(subStats[3]) : '-',
    };
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
      return `${this.upperCaseFirstChar(statKey.split('Dmg')[0])} DMG`;
    }

    return this.formatStringWithUpperCase(statKey);
  }

  private static formatStringWithUpperCase(string: string): string {
    const strWithMultipleWords = this.upperCaseFirstChar(string).match(/[A-Z][a-z]+/g);

    return strWithMultipleWords ? strWithMultipleWords.join(' ') : string;
  }

  private static upperCaseFirstChar(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
