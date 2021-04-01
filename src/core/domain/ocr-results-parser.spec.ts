import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { goodOcrResultsMock } from '../../test/ocr-results-mock';
import { OcrResultsParser } from './ocr-results-parser';

fdescribe('OcrResultsParser', () => {
  let ocrResultsParser: OcrResultsParser;

  beforeEach(() => {
    ocrResultsParser = new OcrResultsParser();
  });

  fit('should parse artifact type', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults)).toEqual(importedArtifactDataMock[index].type);
    });
  });
});
