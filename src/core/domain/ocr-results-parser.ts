import { ArtifactType } from './entities/artifact';
import { StringFormatter } from './mappers/string-formatter';
import { ArtifactData } from './models/artifact-data';
import { MainStats } from './models/main-statistics';

export class OcrResultsParser {
  parseToArtifactData(ocrResults: string[]): Partial<ArtifactData> {
    const type = Object.values(ArtifactType).find((type) => ocrResults[1].toLowerCase().includes(type));
    const mainWords = ocrResults[2].replace(/\n/g, '').split(' ');
    mainWords[0] = mainWords[0].toLowerCase();
    if (!mainWords[1]) {
      mainWords[0] = StringFormatter.upperCaseFirstChar(mainWords[0]);
    }
    if (mainWords[0] === 'Atk' || mainWords[0] === 'Def' || mainWords[0] === 'Hp') {
      if (type === ArtifactType.flower || type === ArtifactType.plume) {
        mainWords.unshift('flat');
      } else {
        mainWords.unshift('percent');
      }
    }

    if (mainWords[1] && mainWords[1] === 'DMG') {
      mainWords[1] = 'Dmg';
    }
    const ocrMainStat = mainWords
      .filter((_, i) => i < 2)
      .join('')
      .replace(/ /g, '');

    const mainStatType = Object.values(MainStats).find((mainStat) => mainStat === ocrMainStat);
    return { type, mainStatType };
  }
}
