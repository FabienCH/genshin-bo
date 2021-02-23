import { ArtifactType } from '../entities/artifact';

export interface ArtifactView {
  id: string;
  type: ArtifactType;
  set: string;
  level: number;
  mainStat: string;
  subStat1: string;
  subStat2: string;
  subStat3: string;
  subStat4: string;
}
