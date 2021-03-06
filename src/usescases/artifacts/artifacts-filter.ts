import { AllArtifacts } from '../../domain/artifacts/models/all-artifacts';
import { CircletMainStatType } from '../../domain/artifacts/models/circlet-artifact-data';
import { GobletMainStatType } from '../../domain/artifacts/models/goblet-artifact-data';
import { ArtifactsMainStats, ArtifactStatsTypes } from '../../domain/artifacts/models/main-statistics';
import { SandsMainStatType } from '../../domain/artifacts/models/sands-artifact-data';
import { SetNames } from '../../domain/artifacts/models/sets-with-effects';

interface BaseArtifactFilters {
  setPieces: 2 | 4;
  mainsStats: ArtifactsMainStats;
  focusStats: ArtifactStatsTypes[];
  minArtifactLevel: number;
  hasFourSubs: boolean;
}

export interface ArtifactsFiltersView extends BaseArtifactFilters {
  currentSets: { [index: number]: SetNames };
}

export interface ArtifactsFilters extends BaseArtifactFilters {
  currentSets: SetNames[];
}

export abstract class ArtifactsFilter {
  public static filterArtifacts(
    artifacts: AllArtifacts,
    mainStats: { sandsMain?: SandsMainStatType; gobletMain?: GobletMainStatType; circletMain?: CircletMainStatType },
    minLevel: number,
    focusStats: ArtifactStatsTypes[],
    hasFourSubs: boolean,
  ): AllArtifacts {
    const { flowers, plumes, sands, goblets, circlets } = artifacts;

    return {
      flowers: flowers.filter((artifact) => artifact.matchFilters(minLevel, focusStats, hasFourSubs)),
      plumes: plumes.filter((artifact) => artifact.matchFilters(minLevel, focusStats, hasFourSubs)),
      sands: sands.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, hasFourSubs, mainStats.sandsMain)),
      goblets: goblets.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, hasFourSubs, mainStats.gobletMain)),
      circlets: circlets.filter((artifact) => artifact.matchFiltersWithMain(minLevel, focusStats, hasFourSubs, mainStats.circletMain)),
    };
  }
}
