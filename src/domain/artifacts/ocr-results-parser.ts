import { ArtifactType } from './entities/artifact';
import { StringFormatter } from '../mappers/string-formatter';
import { NewArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { SubStats, SubStatsValues } from './models/sub-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercentStats: string[] = ['atk', 'def', 'hp'];
  private ocrResults!: string[];

  public parseToArtifactData(ocrResults: string[], fixOcrErrors: boolean): Partial<NewArtifactData> {
    this.ocrResults = ocrResults.map((line) => line.replace(/^[^\w]*|[^\w%]*$|\n/g, ''));
    const type = this.parseArtifactType(fixOcrErrors);
    const mainStatType = this.parseMainStatType(type, fixOcrErrors);
    const parsedMainStatValue = this.parseMainStatValue();
    const level = parseInt(this.ocrResults[4]);
    const subStats = this.parseSubsStats(fixOcrErrors);
    const set = this.parseSet(subStats, fixOcrErrors);

    return {
      type,
      set,
      mainStatType,
      mainStatValue: parsedMainStatValue,
      level,
      subStats,
    };
  }

  private parseArtifactType(fixOcrErrors: boolean) {
    let type = this.findMatchingArtifactType();
    if (!type && fixOcrErrors) {
      type = this.findMatchingArtifactType(fixOcrErrors);
    }
    return type;
  }

  private findMatchingArtifactType(fixOcrErrors?: boolean) {
    const matchingFn = (lineIndex: 1 | 2, type: string) =>
      fixOcrErrors ? this.partiallyMatchStrings(this.lowerCaseType(lineIndex), type) : this.lowerCaseType(lineIndex) === type;

    const findType = (lineIndex: 1 | 2) => Object.values(ArtifactType).find((type) => matchingFn(lineIndex, type));

    let type = findType(1);
    if (!type) {
      type = findType(2);
      if (type) {
        this.ocrResults.shift();
      }
    }
    return type;
  }
  private lowerCaseType(lineIndex: 1 | 2): string {
    return this.ocrResults[lineIndex].split(' ')[0].toLowerCase();
  }

  private parseSet(subStats: SubStatsValues, fixOcrErrors: boolean) {
    const ocrSetIndex = Object.values(subStats).length === 4 ? 9 : 8;
    const ocrSet = this.ocrResults[ocrSetIndex].replace(/ |'/g, '').toLowerCase();

    let set = Object.values(SetNames).find((setName) => {
      return ocrSet.includes(setName.toLowerCase());
    });

    if (!set && fixOcrErrors) {
      set = Object.values(SetNames).find((setName) => {
        return this.partiallyMatchStrings(ocrSet, setName.toLowerCase());
      });
    }
    return set;
  }

  private parseMainStatType(type: ArtifactType | undefined, fixOcrErrors: boolean): MainStats | undefined {
    const mainWords = this.ocrResults[2].toLowerCase().split(' ');
    if (this.flatOrPercentStats.includes(mainWords[0])) {
      const artifactHasFlatMain = type === ArtifactType.flower || type === ArtifactType.plume;
      mainWords.unshift(artifactHasFlatMain ? 'flat' : 'percent');
    }

    let parsedMainStat = mainWords
      .filter((_, i) => i < this.maxStatWords)
      .map((mainWord, i) => (i > 0 ? StringFormatter.upperCaseFirstChar(mainWord) : mainWord))
      .join('')
      .replace(/ /g, '');

    const mainStatTypes = Object.values(MainStats);
    let mainStatType = mainStatTypes.find((mainStat) => mainStat === parsedMainStat);

    if (!mainStatType && fixOcrErrors) {
      if (parsedMainStat.length <= 3) {
        const artifactHasFlatMain = type === ArtifactType.flower || type === ArtifactType.plume;
        parsedMainStat = `${artifactHasFlatMain ? 'flat' : 'percent'}${parsedMainStat}`;
      }
      mainStatType = mainStatTypes.find((mainStat) => this.partiallyMatchStrings(parsedMainStat, mainStat));
    }

    return mainStatType;
  }

  private parseMainStatValue(): number {
    const mainStatValue = this.ocrResults[3];
    const isMainPercent = mainStatValue.includes('.') || mainStatValue.includes('%');
    return this.parseStatValue(isMainPercent, mainStatValue);
  }

  private parseSubsStats(fixOcrErrors: boolean): SubStatsValues {
    const ocrSubsStats = [this.ocrResults[5], this.ocrResults[6], this.ocrResults[7], this.ocrResults[8]];
    const typeValueSplitedSubsStats = ocrSubsStats.map((ocrSubStat) => ocrSubStat.toLowerCase().replace(/ /g, '').split('+'));
    return typeValueSplitedSubsStats.reduce((subsStatsAcc, ocrSubStat) => {
      const isPercent = !!ocrSubStat[1] && (ocrSubStat[1].includes('.') || ocrSubStat[1].includes('%'));
      const subStatType = this.parseSubStatType(ocrSubStat[0], isPercent, fixOcrErrors);

      if (subStatType) {
        const subStatValue = this.parseStatValue(isPercent, ocrSubStat[1]);
        subsStatsAcc = { ...subsStatsAcc, [`${subStatType}`]: subStatValue };
      }
      return subsStatsAcc;
    }, {});
  }

  private parseSubStatType(ocrSubStatType: string, isPercent: boolean, fixOcrErrors: boolean): SubStats | undefined {
    let subStatTypePrefix = '';
    if (this.flatOrPercentStats.find((stat) => ocrSubStatType.includes(stat))) {
      subStatTypePrefix = isPercent ? 'percent' : 'flat';
    }

    let subStatType = Object.values(SubStats).find((subStat) => {
      const parsedSubStatType = `${subStatTypePrefix}${ocrSubStatType}`;
      return parsedSubStatType.includes(subStat.toLowerCase());
    });

    if (!subStatType && fixOcrErrors) {
      if (ocrSubStatType.length <= 3) {
        subStatTypePrefix = isPercent ? 'percent' : 'flat';
      }
      subStatType = Object.values(SubStats).find((subStat) => {
        const parsedSubStatType = `${subStatTypePrefix}${ocrSubStatType}`;
        return this.partiallyMatchStrings(parsedSubStatType, subStat.toLowerCase());
      });
    }
    return subStatType;
  }

  private parseStatValue(isPercent: boolean, value: string): number {
    const letterCleanedValue = value.replace(/[^\d|\.]/g, '');
    const ocrMainStatValue = isPercent ? letterCleanedValue.replace(/\.\./g, '.') : letterCleanedValue.replace(/,/g, '');
    return isPercent ? Math.trunc(parseFloat(ocrMainStatValue) * 10) / 10 : parseInt(ocrMainStatValue);
  }

  private partiallyMatchStrings(inputString: string, stringToMatch: string): boolean {
    if (Math.abs(inputString.length - stringToMatch.length) > 1) {
      return false;
    }
    const matchingPercent = inputString.length <= 4 ? 75 : 80;
    const splittedInputString = inputString.split('');
    const matchingChars = stringToMatch.split('').reduce((matchingChars, char, index) => {
      if (char === splittedInputString[index]) {
        matchingChars++;
      } else if (splittedInputString.length > stringToMatch.length) {
        splittedInputString.splice(index, 1);
      }
      return matchingChars;
    }, 0);

    return (matchingChars * 100) / inputString.length >= matchingPercent;
  }
}
