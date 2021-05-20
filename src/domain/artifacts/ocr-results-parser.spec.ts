import {
  artifactWith2LinesNameMock,
  artifactWithFixableOcrResultsMock,
  misrecognizedMainImportedArtifactMock,
  misrecognizedSubsImportedArtifactMock,
  properlyImportedArtifactMock,
} from '../../test/imported-artifacts-data-mock';
import {
  goodOcrResultsMock,
  ocrResultsWith2LinesNameMock,
  wrongMainValuesOcrResultsMock,
  wrongSubsOcrResultsMock,
  fixableStringsOcrResultsMock,
} from '../../test/ocr-results-mock';
import { OcrResultsParser } from './ocr-results-parser';

describe('OcrResultsParser', () => {
  let ocrResultsParser: OcrResultsParser;

  beforeEach(() => {
    ocrResultsParser = new OcrResultsParser();
  });

  it('should parse artifacts properly recognized', () => {
    goodOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults, false)).toEqual(properlyImportedArtifactMock[index]);
    });
  });

  it('should parse artifacts main stats when not properly recognized', () => {
    wrongMainValuesOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults, false)).toEqual(misrecognizedMainImportedArtifactMock[index]);
    });
  });

  it('should parse artifacts sub stats when not properly recognized', () => {
    wrongSubsOcrResultsMock.forEach((ocrResults, index) => {
      expect(ocrResultsParser.parseToArtifactData(ocrResults, false)).toEqual(misrecognizedSubsImportedArtifactMock[index]);
    });
  });

  it('should parse an artifact with 2 lines name', () => {
    expect(ocrResultsParser.parseToArtifactData(ocrResultsWith2LinesNameMock, false)).toEqual(artifactWith2LinesNameMock);
  });

  it('should parse and fix error of an artifact with wrong type, set and stats types', () => {
    expect(ocrResultsParser.parseToArtifactData(fixableStringsOcrResultsMock, true)).toEqual(artifactWithFixableOcrResultsMock);
  });
});
