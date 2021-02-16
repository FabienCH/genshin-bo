import { AllArtifacts } from '../domain/models/all-artifacts';
import { CircletMainStatType } from '../domain/models/circlet-artifact-data';
import { GobletMainStatType } from '../domain/models/goblet-artifact-data';
import { MainStats } from '../domain/models/main-statistics';
import { SandsMainStatType } from '../domain/models/sands-artifact-data';
import { SubStats } from '../domain/models/sub-statistics';

export abstract class ArtifactsFilter {
  public static filterArtifacts(
    artifacts: AllArtifacts,
    mainStats?: { sandsMain?: SandsMainStatType; gobletMain?: GobletMainStatType; circletMain?: CircletMainStatType },
    minLevel?: number,
    focusStats?: Array<SubStats | MainStats>,
  ): AllArtifacts {
    const { flowers, plumes, sands, goblets, circlets } = artifacts;
    const { sandsMain, gobletMain, circletMain } = mainStats
      ? mainStats
      : { sandsMain: undefined, gobletMain: undefined, circletMain: undefined };

    return {
      flowers: flowers.filter((artifact) => artifact.matchFilters(minLevel, focusStats)),
      plumes: plumes.filter((artifact) => artifact.matchFilters(minLevel, focusStats)),
      sands: sands.filter((artifact) => artifact.matchFiltersWithMain(sandsMain, minLevel, focusStats)),
      goblets: goblets.filter((artifact) => artifact.matchFiltersWithMain(gobletMain, minLevel, focusStats)),
      circlets: circlets.filter((artifact) => artifact.matchFiltersWithMain(circletMain, minLevel, focusStats)),
    };
  }
}
