import { ArtifactType } from './entities/artifact';
import { StringFormatter } from './mappers/string-formatter';
import { OcrArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { SubStats, SubStatsValues } from './models/sub-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercentStats: string[] = ['atk', 'def', 'hp'];

  public parseToArtifactData(ocrResults: string[]): OcrArtifactData {
    const type = Object.values(ArtifactType).find((type) => ocrResults[1].toLowerCase().includes(type));
    const mainStatType = this.parseMainStatType(ocrResults[2], type);
    const mainStatValue = this.parseMainStatValue(ocrResults);
    const level = parseInt(ocrResults[4].replace(/\n/g, ''));
    const subStats = this.parseSubsStats([ocrResults[5], ocrResults[6], ocrResults[7], ocrResults[8]]);
    const set = this.parseSet(subStats, ocrResults);

    return {
      type,
      set,
      mainStatType,
      mainStatValue,
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
    const mainWords = ocrMainStat.toLowerCase().replace(/\n/g, '').split(' ');

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
    const ocrMainStatValue = isMainPercent ? ocrResults[3].replace(/\n|%/g, '') : ocrResults[3].replace(/\n|,/g, '');
    return isMainPercent ? Math.trunc(parseFloat(ocrMainStatValue) * 10) / 10 : parseInt(ocrMainStatValue);
  }

  private parseSubsStats(ocrSubsStats: string[]): SubStatsValues {
    const typeValueSplitedSubsStats = ocrSubsStats.map((ocrSubStat) =>
      ocrSubStat.toLowerCase().replace(/\n/g, '').replace(/ /g, '').split('+'),
    );
    return typeValueSplitedSubsStats.reduce((subsStatsAcc, ocrSubStat) => {
      const isPercent = ocrSubStat[1] && (ocrSubStat[1].includes('.') || ocrSubStat[1].includes('%'));
      const subStatType = this.parseSubStatType(ocrSubStat[0], isPercent);
      const subStatValue = isPercent ? parseFloat(ocrSubStat[1]) : parseInt(ocrSubStat[1]);
      if (subStatType) {
        subsStatsAcc = { ...subsStatsAcc, [`${subStatType}`]: subStatValue };
      }
      return subsStatsAcc;
    }, {});
  }

  private parseSubStatType(ocrSubStatType: string, isPercent: string | boolean) {
    return Object.values(SubStats).find((subStat) => {
      if (this.flatOrPercentStats.find((stat) => ocrSubStatType.includes(stat))) {
        ocrSubStatType = `${isPercent ? 'percent' : 'flat'}${ocrSubStatType}`;
      }

      return ocrSubStatType.replace(/\./g, '').includes(subStat.toLowerCase());
    });
  }
}
