import { misrecognizedMainImportedArtifactMock, properlyImportedArtifactMock } from '../../test/imported-artifacts-data-mock';
import { goodOcrResultsMock, wrongMainValuesOcrResultsMock } from '../../test/ocr-results-mock';
import { OcrResultsParser } from './ocr-results-parser';

describe('OcrResultsParser', () => {
  let ocrResultsParser: OcrResultsParser;

  beforeEach(() => {
    ocrResultsParser = new OcrResultsParser();
  });

  it('should parse artifacts properly recognized', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults)).toEqual(properlyImportedArtifactMock[index]);
    });
  });

  it('should parse artifacts main stats when not properly recognized', () => {
    wrongMainValuesOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults)).toEqual(misrecognizedMainImportedArtifactMock[index]);
    });
  });

  it('should return an error when main stat value and level are not consistent', () => {
    wrongMainValuesOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).errors).toEqual(misrecognizedMainImportedArtifactMock[index].errors);
    });
  });
});
