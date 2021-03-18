import { loadArtifacts } from '../adapters/redux/artifacts/artifacts-middleware';
import { isArtifactsStateInitialized, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { Artifact } from '../domain/entities/artifact';
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { Character } from '../domain/models/character';
import { CharacterStatsValues } from '../domain/models/character-statistics';
import { ArtifactsMainStats, ArtifactStatsTypes, MainStatsValues } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { ArtifactsFilter } from './artifacts-filter';
import { StatsComputation } from '../domain/stats-computation';
import { runBuildOptimizer } from '../adapters/redux/builds/builds-middleware';
import { SetFilter } from '../domain/build-filter';

export class BuildOptimizer {
  private allArtifacts!: Artifact[][];

  constructor() {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifacts());
    }
  }

  public computeBuildsStats(
    character: Character,
    artifactsFilters: {
      currentSets: SetNames[];
      setPieces: 2 | 4;
      mainsStats: ArtifactsMainStats;
      focusStats: ArtifactStatsTypes[];
      minArtifactLevel: number;
    },
    statsFilter: Partial<CharacterStatsValues>,
  ): void {
    const setFilter = {
      setNames: artifactsFilters.currentSets,
      pieces: artifactsFilters.setPieces,
    };
    const totalSetFilterPieces = this.getTotalSetFilterPieces(setFilter);
    if (totalSetFilterPieces > 5) {
      throw new Error('total pieces can not be higher than 5');
    }

    const baseStats = { ...character.stats, atk: character.stats.atk + character.weapon.atk };
    const characterBonusStat = this.computeCharacterBonusStats(character);

    const { mainsStats, minArtifactLevel, focusStats } = artifactsFilters;
    const mainStats = {
      sandsMain: mainsStats.sandsMain,
      gobletMain: mainsStats.gobletMain,
      circletMain: mainsStats.circletMain,
    };

    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(selectAllArtifacts());
    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainStats, minArtifactLevel, focusStats));
    appStore.dispatch(runBuildOptimizer(this.allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter));
  }

  public getBuilds(): number {
    if (!this.allArtifacts) {
      return 0;
    }
    return this.allArtifacts.reduce((numberOfBuilds, artifacts) => {
      numberOfBuilds *= artifacts.length;
      return numberOfBuilds;
    }, 1);
  }

  private getTotalSetFilterPieces(setFilter: SetFilter) {
    const setNames = setFilter ? setFilter.setNames : [];
    const totalSetFilterPieces = setNames.reduce((totalPieces) => {
      totalPieces += setFilter.pieces;
      return totalPieces;
    }, 0);
    return totalSetFilterPieces;
  }

  private computeCharacterBonusStats(character: Character): MainStatsValues {
    const statsComputation = new StatsComputation();
    const weaponBonusStat = character.weapon.bonusStat;
    const characterBonusStat = character.bonusStat;
    if (!characterBonusStat) {
      return weaponBonusStat;
    }

    const characterBonusKey = Object.keys(characterBonusStat)[0];
    const withSameCharAndWeaponStat = (): MainStatsValues => ({
      [characterBonusKey]: statsComputation.addStats([characterBonusStat[characterBonusKey], weaponBonusStat[characterBonusKey]]),
    });

    return characterBonusKey === Object.keys(weaponBonusStat)[0]
      ? withSameCharAndWeaponStat()
      : { ...characterBonusStat, ...weaponBonusStat };
  }
}
