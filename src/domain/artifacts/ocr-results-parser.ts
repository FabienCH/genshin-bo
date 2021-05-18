import { ArtifactType } from './entities/artifact';
import { StringFormatter } from '../mappers/string-formatter';
import { NewArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { SubStats, SubStatsValues } from './models/sub-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercentStats: string[] = ['atk', 'def', 'hp'];

  public parseToArtifactData(ocrResults: string[]): Partial<NewArtifactData> {
    const noNewLineCharOcrResults = ocrResults.map((line) => line.replace(/\n/g, ''));
    let type = Object.values(ArtifactType).find((type) => noNewLineCharOcrResults[1].toLowerCase().includes(type));
    if (!type) {
      type = Object.values(ArtifactType).find((type) => noNewLineCharOcrResults[2].toLowerCase().includes(type));
      if (type) {
        noNewLineCharOcrResults.shift();
      }
    }
    const mainStatType = this.parseMainStatType(noNewLineCharOcrResults[2], type);
    const parsedMainStatValue = this.parseMainStatValue(noNewLineCharOcrResults);
    const level = parseInt(noNewLineCharOcrResults[4]);
    const subStats = this.parseSubsStats([
      noNewLineCharOcrResults[5],
      noNewLineCharOcrResults[6],
      noNewLineCharOcrResults[7],
      noNewLineCharOcrResults[8],
    ]);
    const set = this.parseSet(subStats, noNewLineCharOcrResults);

    return {
      type,
      set,
      mainStatType,
      mainStatValue: parsedMainStatValue,
      level,
      subStats,
    };
  }

  private parseSet(subStats: SubStatsValues, ocrResults: string[]) {
    const ocrSetIndex = Object.values(subStats).length === 4 ? 9 : 8;
    const set = Object.values(SetNames).find((setName) => {
      const ocrSet = ocrResults[ocrSetIndex].replace(/ |'/g, '').toLowerCase();
      return ocrSet.includes(setName.toLowerCase());
    });
    return set;
  }

  private parseMainStatType(ocrMainStat: string, type: ArtifactType | undefined): MainStats | undefined {
    const mainWords = ocrMainStat.toLowerCase().split(' ');

    if (this.flatOrPercentStats.includes(mainWords[0])) {
      const artifactHasFlatMain = type === ArtifactType.flower || type === ArtifactType.plume;
      mainWords.unshift(artifactHasFlatMain ? 'flat' : 'percent');
    }

    const parsedMainStat = mainWords
      .filter((_, i) => i < this.maxStatWords)
      .map((mainWord, i) => (i > 0 ? StringFormatter.upperCaseFirstChar(mainWord) : mainWord))
      .join('')
      .replace(/ /g, '');

    return Object.values(MainStats).find((mainStat) => mainStat === parsedMainStat);
  }

  private parseMainStatValue(ocrResults: string[]): number {
    const isMainPercent = ocrResults[3].includes('.') || ocrResults[3].includes('%');
    return this.parseStatValue(isMainPercent, ocrResults[3]);
  }

  private parseSubsStats(ocrSubsStats: string[]): SubStatsValues {
    const typeValueSplitedSubsStats = ocrSubsStats.map((ocrSubStat) => ocrSubStat.toLowerCase().replace(/ /g, '').split('+'));
    return typeValueSplitedSubsStats.reduce((subsStatsAcc, ocrSubStat) => {
      const isPercent = !!ocrSubStat[1] && (ocrSubStat[1].includes('.') || ocrSubStat[1].includes('%'));
      const subStatType = this.parseSubStatType(ocrSubStat[0], isPercent);

      if (subStatType) {
        const subStatValue = this.parseStatValue(isPercent, ocrSubStat[1]);
        subsStatsAcc = { ...subsStatsAcc, [`${subStatType}`]: subStatValue };
      }
      return subsStatsAcc;
    }, {});
  }

  private parseSubStatType(ocrSubStatType: string, isPercent: string | boolean) {
    let subStatTypePrefix = '';
    if (this.flatOrPercentStats.find((stat) => ocrSubStatType.includes(stat))) {
      subStatTypePrefix = isPercent ? 'percent' : 'flat';
    }
    return Object.values(SubStats).find((subStat) => {
      const parsedSubStatType = `${subStatTypePrefix}${ocrSubStatType}`.replace(/[.\-:]/g, '');
      return parsedSubStatType.includes(subStat.toLowerCase());
    });
  }

  private parseStatValue(isPercent: boolean, value: string): number {
    const ocrMainStatValue = isPercent ? value.replace(/\.\./g, '.') : value.replace(/,/g, '');
    return isPercent ? Math.trunc(parseFloat(ocrMainStatValue) * 10) / 10 : parseInt(ocrMainStatValue);
  }
}
