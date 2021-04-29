import { AllArtifacts } from '../domain/models/all-artifacts';
import { CircletMainStatType } from '../domain/models/circlet-artifact-data';
import { GobletMainStatType } from '../domain/models/goblet-artifact-data';
import { ArtifactsMainStats, ArtifactStatsTypes } from '../domain/models/main-statistics';
import { SandsMainStatType } from '../domain/models/sands-artifact-data';
import { SetNames } from '../domain/models/sets-with-effects';

export interface ArtifactsFiltersView {
  currentSets: { [index: number]: SetNames };
  setPieces: 2 | 4;
  mainsStats: ArtifactsMainStats;
  focusStats: ArtifactStatsTypes[];
  minArtifactLevel: number;
}

export interface ArtifactsFilters {
  currentSets: SetNames[];
  setPieces: 2 | 4;
  mainsStats: ArtifactsMainStats;
  focusStats: ArtifactStatsTypes[];
  minArtifactLevel: number;
}

export abstract class ArtifactsFilter {
  public static filterArtifacts(
    artifacts: AllArtifacts,
    mainStats: { sandsMain?: SandsMainStatType; gobletMain?: GobletMainStatType; circletMain?: CircletMainStatType },
    minLevel: number,
    focusStats: ArtifactStatsTypes[],
  ): AllArtifacts {
    const { flowers, plumes, sands, goblets, circlets } = artifacts;

    return {
      flowers: flowers.filter((artifact) => artifact.matchFilters(minLevel, focusStats)),
      plumes: plumes.filter((artifact) => artifact.matchFilters(minLevel, focusStats)),
      sands: sands.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, mainStats.sandsMain)),
      goblets: goblets.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, mainStats.gobletMain)),
      circlets: circlets.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, mainStats.circletMain)),
    };
  }
}
