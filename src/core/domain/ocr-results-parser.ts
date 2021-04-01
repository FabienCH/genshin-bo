import { ArtifactType } from './entities/artifact';
import { StringFormatter } from './mappers/string-formatter';
import { ArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { SubStats } from './models/sub-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercentStats: string[] = ['atk', 'def', 'hp'];

  public parseToArtifactData(ocrResults: string[]): ArtifactData {
    const type = Object.values(ArtifactType).find((type) => ocrResults[1].toLowerCase().includes(type));
    const ocrMainStat = this.parseMainStatType(ocrResults[2], type);
    const mainStatType = Object.values(MainStats).find((mainStat) => mainStat === ocrMainStat);
    const level = parseInt(ocrResults[4].replace(/\n/g, ''));
    const ocrSubsStats = [ocrResults[5], ocrResults[6], ocrResults[7], ocrResults[8]].map((ocrSubStat) =>
      ocrSubStat.toLowerCase().replace(/\n/g, '').replace(/ /g, '').split('+'),
    );
    const subsStats = ocrSubsStats.reduce((subsStatsAcc, ocrSubStat) => {
      const isPercent = ocrSubStat[1] && (ocrSubStat[1].includes('.') || ocrSubStat[1].includes('%'));

      const subStatType = Object.values(SubStats).find((subStat) => {
        let ocrSubStatType = ocrSubStat[0];

        if (this.flatOrPercentStats.find((stat) => ocrSubStatType.includes(stat))) {
          ocrSubStatType = `${isPercent ? 'percent' : 'flat'}${ocrSubStatType}`;
        }

        return ocrSubStatType.replace(/\./g, '').includes(subStat.toLowerCase());
      });
      const subStatValue = isPercent ? parseFloat(ocrSubStat[1]) : parseInt(ocrSubStat[1]);
      if (subStatType) {
        subsStatsAcc = { ...subsStatsAcc, [`${subStatType}`]: subStatValue };
      }
      return subsStatsAcc;
    }, {});

    return {
      id: '0',
      type: type ? type : ArtifactType.flower,
      set: SetNames.archaicPetra,
      mainStatType: mainStatType ? mainStatType : MainStats.percentAtk,
      level,
      subStats: subsStats,
    };
  }

  private parseMainStatType(ocrMainStat: string, type: ArtifactType | undefined) {
    const mainWords = ocrMainStat.toLowerCase().replace(/\n/g, '').split(' ');

    if (this.flatOrPercentStats.includes(mainWords[0])) {
      const artifactHasFlatMain = type === ArtifactType.flower || type === ArtifactType.plume;
      mainWords.unshift(artifactHasFlatMain ? 'flat' : 'percent');
    }

    return mainWords
      .filter((_, i) => i < this.maxStatWords)
      .map((mainWord, i) => (i > 0 ? StringFormatter.upperCaseFirstChar(mainWord) : mainWord))
      .join('')
      .replace(/ /g, '');
  }
}
