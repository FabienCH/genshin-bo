import { ArtifactValidationError } from './artifact-validation-error';
import { ArtifactData } from './models/artifact-data';

export class ArtifactValidator {
  private errorMessages!: string[];

  public isArtifactValid(artifactData: ArtifactData): boolean {
    const { subStats, level, mainStatType } = artifactData;
    this.errorMessages = [];

    const subStatsKeys = subStats ? Object.keys(subStats) : [];
    if (subStatsKeys.length < 3) {
      this.errorMessages.push('an artifact can not have less than 3 substats');
    }
    if (level > 3 && subStatsKeys.length === 3) {
      this.errorMessages.push('an artifact with level higher than 3 must have 4 substats');
    }
    if (subStatsKeys.length > 4) {
      this.errorMessages.push('an artifact can not have more than 4 substats');
    }

    if (subStatsKeys.find((subStat) => subStat === mainStatType)) {
      this.errorMessages.push('main stat can not be the same as one of the substats');
    }

    return this.errorMessages.length === 0;
  }

  public getErrors(): ArtifactValidationError {
    const artifactValidationError = new ArtifactValidationError(this.errorMessages);
    console.log('artifactValidationError', artifactValidationError);
    return new ArtifactValidationError(this.errorMessages);
  }
}
