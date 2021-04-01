import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { goodOcrResultsMock } from '../../test/ocr-results-mock';
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
});
