import { ArtifactValidationError } from './artifact-validation-error';
import { ArtifactData, BaseArtifactData, NewArtifactData } from './models/artifact-data';

export class ArtifactValidator {
  private errorMessages!: string[];

  public isArtifactValid(artifactData: ArtifactData): boolean {
    this.errorMessages = [];
    if (!artifactData.id) {
      this.errorMessages.push('an artifact must have an id');
    }
    this.validateNewArtifact(artifactData);

    return this.errorMessages.length === 0;
  }

  public isNewArtifactValid(newArtifactData: Partial<NewArtifactData>): boolean {
    this.errorMessages = [];
    this.validateNewArtifact(newArtifactData);

    return this.errorMessages.length === 0;
  }

  public getErrors(): ArtifactValidationError {
    return new ArtifactValidationError(this.errorMessages);
  }

  private validateNewArtifact(newArtifactData: Partial<NewArtifactData>) {
    this.validateMandatoryAttributes(newArtifactData);
    this.validateArtifactStats(newArtifactData);
  }

  private validateArtifactStats(artifactData: Partial<BaseArtifactData>) {
    const { subStats, level, mainStatType } = artifactData;
    const subStatsKeys = subStats ? Object.keys(subStats) : [];
    if (subStatsKeys.length < 3) {
      this.errorMessages.push('an artifact can not have less than 3 substats');
    }
    if (level && level > 3 && subStatsKeys.length === 3) {
      this.errorMessages.push('an artifact with level higher than 3 must have 4 substats');
    }
    if (subStatsKeys.length > 4) {
      this.errorMessages.push('an artifact can not have more than 4 substats');
    }
    if (subStatsKeys.find((subStat) => subStat === mainStatType)) {
      this.errorMessages.push('main stat can not be the same as one of the substats');
    }
  }

  private validateMandatoryAttributes(newArtifactData: Partial<NewArtifactData>) {
    const { type, set, level, mainStatType, subStats } = newArtifactData;

    const missingStats = [];
    if (!type) {
      missingStats.push('type');
    }
    if (!set) {
      missingStats.push('set');
    }
    if (!level) {
      missingStats.push('level');
    }
    if (!mainStatType) {
      missingStats.push('main stat type');
    }
    if (!subStats) {
      missingStats.push('sub stats');
    }
    if (missingStats.length) {
      this.errorMessages.push(`missing artifact data :${missingStats.join(', ')}`);
    }
  }
}
