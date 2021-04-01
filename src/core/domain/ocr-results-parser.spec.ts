import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { goodOcrResultsMock } from '../../test/ocr-results-mock';
import { SubStats } from './models/sub-statistics';
import { OcrResultsParser } from './ocr-results-parser';

fdescribe('OcrResultsParser', () => {
  let ocrResultsParser: OcrResultsParser;

  beforeEach(() => {
    ocrResultsParser = new OcrResultsParser();
  });

  it('should parse artifact type', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).type).toEqual(importedArtifactDataMock[index].type);
    });
  });

  it('should parse artifact main stat type', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).mainStatType).toEqual(importedArtifactDataMock[index].mainStatType);
    });
  });

  it('should parse artifact level', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).level).toEqual(importedArtifactDataMock[index].level);
    });
  });

  fit('should parse artifact substats', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      const parsedSubs = ocrResultsParser.parseToArtifactData(ocrResults).subStats;
      const expectedSubs = importedArtifactDataMock[index].subStats;
      Object.keys(parsedSubs).forEach((subKey) => {
        expect(parsedSubs[subKey as SubStats]).toEqual(expectedSubs[subKey as SubStats]);
      });
    });
  });
});
