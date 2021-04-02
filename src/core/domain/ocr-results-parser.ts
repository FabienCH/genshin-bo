import { ArtifactType } from './entities/artifact';
import { StringFormatter } from './mappers/string-formatter';
import { OcrArtifactData } from './models/artifact-data';
import { MainStats, MainStatTypes } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { SubStats, SubStatsValues } from './models/sub-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercentStats: string[] = ['atk', 'def', 'hp'];
  private readonly mainStatsValues: { stats: MainStatTypes[]; values: number[] }[] = [
    {
      stats: [
        MainStats.percentAtk,
        MainStats.percentHp,
        MainStats.pyroDmg,
        MainStats.dendroDmg,
        MainStats.electroDmg,
        MainStats.anemoDmg,
        MainStats.cryoDmg,
        MainStats.geoDmg,
      ],
      values: [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
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
      values: [4.7, 6, 7.4, 8.7, 10.0, 11.4, 12.7, 14, 15.4, 16.7, 18, 19.3, 20.7, 22, 23.3, 24.7, 26, 27.3, 28.7, 30, 31.1],
    },
    {
      stats: [MainStats.critDmg],
      values: [9.3, 11.9, 14.6, 17.2, 19.9, 22.5, 25.5, 27.8, 30.5, 33.1, 35.8, 38.4, 41.1, 43.7, 46.3, 49, 51.6, 54.3, 56.9, 59.6, 62.2],
    },
    {
      stats: [MainStats.healingBonus],
      values: [5.4, 6.9, 8.4, 10, 11.5, 13, 14.5, 16.1, 17.6, 19.1, 20.6, 22.2, 23.7, 25.2, 26.7, 28.3, 29.8, 31.3, 32.8, 34.4, 35.9],
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

  public parseToArtifactData(ocrResults: string[]): OcrArtifactData {
    const noNewLineCharOcrResults = ocrResults.map((line) => line.replace(/\n/g, ''));
    const type = Object.values(ArtifactType).find((type) => noNewLineCharOcrResults[1].toLowerCase().includes(type));
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
