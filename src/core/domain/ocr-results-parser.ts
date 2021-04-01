import { ArtifactType } from './entities/artifact';

export class OcrResultsParser {
  parseToArtifactData(ocrResults: string[]): ArtifactType | undefined {
    return Object.values(ArtifactType).find((type) => ocrResults[1].toLowerCase().includes(type));
  }
}
