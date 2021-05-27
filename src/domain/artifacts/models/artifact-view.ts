export interface ArtifactView {
  id: string;
  type: string;
  set: string;
  level: number;
  mainStat: string;
  subStat1: string;
  subStat2: string;
  subStat3: string;
  subStat4: string;
  uppedValues?: { level: number; mainStat: string };
}
