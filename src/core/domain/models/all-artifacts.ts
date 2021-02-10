import { CircletArtifact } from '../entities/circlet-artifact';
import { FlowerArtifact } from '../entities/flower-artifact';
import { GobletArtifact } from '../entities/goblet-artifact';
import { PlumeArtifact } from '../entities/plume-artifact';
import { SandsArtifact } from '../entities/sands-artifact';

export interface AllArtifacts {
  flowers: FlowerArtifact[];
  plumes: PlumeArtifact[];
  sands: SandsArtifact[];
  goblets: GobletArtifact[];
  circlets: CircletArtifact[];
}
