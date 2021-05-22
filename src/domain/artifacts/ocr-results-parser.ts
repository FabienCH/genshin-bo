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

  private parseArtifactType(fixOcrErrors: boolean): ArtifactType | undefined {
    const type = this.findMatchingArtifactType();
    return type || !fixOcrErrors ? type : this.findMatchingArtifactType(fixOcrErrors);
  }

  private findMatchingArtifactType(fixOcrErrors?: boolean) {
    const artifactTypes: ArtifactType[] = Object.values(ArtifactType);
    const getTypeCandidate = (lineIndex: 1 | 2): string => this.ocrResults[lineIndex].split(' ')[0];
    const findType = (lineIndex: 1 | 2) => this.findStringInArray(getTypeCandidate(lineIndex), artifactTypes, fixOcrErrors);

    const typeAtIndex1 = findType(1);
    if (!typeAtIndex1) {
      const typeAtIndex2 = findType(2);
      if (typeAtIndex2) {
        this.ocrResults.shift();
      }
      return typeAtIndex2;
    }
    return typeAtIndex1;
  }

  private parseSet(subStats: SubStatsValues, fixOcrErrors: boolean): SetNames | undefined {
    const setNames: SetNames[] = Object.values(SetNames);
    const ocrSetIndex = Object.values(subStats).length === 4 ? 9 : 8;
    const ocrSet = this.ocrResults[ocrSetIndex].replace(/ |'/g, '');
    const set = this.findStringInArray(ocrSet, setNames);

    return set || !fixOcrErrors ? set : this.findStringInArray(ocrSet, setNames, fixOcrErrors);
  }

  private parseMainStatType(type: ArtifactType | undefined, fixOcrErrors: boolean): MainStats | undefined {
    const mainStatTypes: MainStats[] = Object.values(MainStats);
    const mainStatWords = this.ocrResults[2].toLowerCase().split(' ');
    const artifactHasFlatMain = type === ArtifactType.flower || type === ArtifactType.plume;
    if (this.flatOrPercentStats.includes(mainStatWords[0])) {
      mainStatWords.unshift(artifactHasFlatMain ? 'flat' : 'percent');
    }

    let parsedMainStat = mainStatWords
      .filter((_, i) => i < this.maxStatWords)
      .map((mainWord, i) => (i > 0 ? StringFormatter.upperCaseFirstChar(mainWord) : mainWord))
      .join('')
      .replace(/ /g, '');

    const mainStatType = this.findStringInArray(parsedMainStat, mainStatTypes);
    if (!mainStatType && fixOcrErrors) {
      if (parsedMainStat.length <= 3) {
        parsedMainStat = `${artifactHasFlatMain ? 'flat' : 'percent'}${parsedMainStat}`;
      }
      return this.findStringInArray(parsedMainStat, mainStatTypes, fixOcrErrors);
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
    const splitedSubsStats = ocrSubsStats.map((ocrSubStat) => ocrSubStat.toLowerCase().replace(/ /g, '').split('+'));
    return splitedSubsStats.reduce((subsStatsAcc, ocrSubStat) => {
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
    const subStatsTypes: SubStats[] = Object.values(SubStats);
    let subStatTypePrefix = '';
    if (this.flatOrPercentStats.find((stat) => ocrSubStatType.includes(stat))) {
      subStatTypePrefix = isPercent ? 'percent' : 'flat';
    }
    const parsedSubStatType = `${subStatTypePrefix}${ocrSubStatType}`;
    const subStatType = this.findStringInArray(parsedSubStatType, subStatsTypes);

    if (!subStatType && fixOcrErrors) {
      if (ocrSubStatType.length <= 3) {
        subStatTypePrefix = isPercent ? 'percent' : 'flat';
      }
      const parsedSubStatType = `${subStatTypePrefix}${ocrSubStatType}`;
      return this.findStringInArray(parsedSubStatType, subStatsTypes, fixOcrErrors);
    }

    return subStatType;
  }

  private parseStatValue(isPercent: boolean, value: string): number {
    const letterCleanedValue = value.replace(/[^\d|\.]/g, '');
    const ocrMainStatValue = isPercent ? letterCleanedValue.replace(/\.\./g, '.') : letterCleanedValue.replace(/,/g, '');
    return isPercent ? Math.trunc(parseFloat(ocrMainStatValue) * 10) / 10 : parseInt(ocrMainStatValue);
  }

  private findStringInArray<T extends string>(stringToFind: string, inputStrings: T[], fixOcrErrors?: boolean): T | undefined {
    const lowercaseStrToFind = stringToFind.toLowerCase();
    return fixOcrErrors
      ? inputStrings.find((string) => this.partiallyMatchStrings(lowercaseStrToFind, string.toLowerCase()))
      : inputStrings.find((string) => string.toLowerCase() === lowercaseStrToFind);
  }

  private partiallyMatchStrings(inputString: string, stringToMatch: string): boolean {
    if (Math.abs(inputString.length - stringToMatch.length) > 1) {
      return false;
    }
    const matchingPercent = inputString.length <= 4 ? 75 : 80;
    const matchingChars = this.findMatchingChars(inputString, stringToMatch);

    return (matchingChars * 100) / inputString.length >= matchingPercent;
  }

  private findMatchingChars(inputString: string, stringToMatch: string): number {
    const splittedInputString = inputString.split('');
    return stringToMatch.split('').reduce((matchingChars, char, index) => {
      if (char === splittedInputString[index]) {
        matchingChars++;
      } else if (splittedInputString.length > stringToMatch.length) {
        splittedInputString.splice(index, 1);
      }
      return matchingChars;
    }, 0);
  }
}
