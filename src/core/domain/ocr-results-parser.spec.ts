import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { goodOcrResultsMock } from '../../test/ocr-results-mock';
import { OcrResultsParser } from './ocr-results-parser';

describe('OcrResultsParser', () => {
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

  it('should parse artifact substats', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).subStats).toEqual(importedArtifactDataMock[index].subStats);
    });
  });

  it('should parse artifact set', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults).set).toEqual(importedArtifactDataMock[index].set);
    });
  });
});
