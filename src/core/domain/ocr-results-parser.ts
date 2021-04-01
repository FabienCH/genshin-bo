import { ArtifactType } from './entities/artifact';
import { StringFormatter } from './mappers/string-formatter';
import { ArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';

export class OcrResultsParser {
  private readonly maxStatWords: number = 2;
  private readonly flatOrPercent: string[] = ['atk', 'def', 'hp'];

  public parseToArtifactData(ocrResults: string[]): Partial<ArtifactData> {
    const type = Object.values(ArtifactType).find((type) => ocrResults[1].toLowerCase().includes(type));
    const ocrMainStat = this.parseMainStatType(ocrResults, type);
    const mainStatType = Object.values(MainStats).find((mainStat) => mainStat === ocrMainStat);
    return { type, mainStatType };
  }

  private parseMainStatType(ocrResults: string[], type: ArtifactType | undefined) {
    const mainWords = ocrResults[2].toLowerCase().replace(/\n/g, '').split(' ');

    if (this.flatOrPercent.includes(mainWords[0])) {
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
