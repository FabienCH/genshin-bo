import { isArtifactsStateInitialized, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { Artifact } from '../domain/entities/artifact';
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { Character, CharacterView } from '../domain/models/character';
import { CharacterStatsValues } from '../domain/models/character-statistics';
import { ArtifactsMainStats, ArtifactStatsTypes, MainStatsValues } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { ArtifactsFilter } from './artifacts-filter';
import { StatsComputation } from '../domain/stats-computation';
import { runBuildsOptimizer } from '../adapters/redux/builds/builds-middleware';
import { SetFilter } from '../domain/build-filter';
import { loadArtifactsActions } from '../adapters/redux/artifacts/artifacts-action';
import { CharactersRepository } from '../domain/characters-repository';
import { Weapon, WeaponView } from '../domain/models/weapon';
import { WeaponsRepository } from '../domain/weapons-repository';

export class BuildsOptimizer {
  private allArtifacts!: Artifact[][];

  constructor(private readonly charactersRepository: CharactersRepository, private readonly weaponsRepository: WeaponsRepository) {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifactsActions());
    }
  }

  public computeBuildsStats(
    characterView: CharacterView,
    weaponView: WeaponView,
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

    const character = this.charactersRepository.getCharacter(characterView.name, characterView.level);
    const weapon = this.weaponsRepository.getWeapon(weaponView.name, weaponView.level);
    const baseStats = { ...character.stats, atk: character.stats.atk + weapon.atk };
    const characterBonusStat = this.computeBonusStats(character, weapon);

    const { mainsStats, minArtifactLevel, focusStats } = artifactsFilters;
    const mainStats = {
      sandsMain: mainsStats.sandsMain,
      gobletMain: mainsStats.gobletMain,
      circletMain: mainsStats.circletMain,
    };

    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(selectAllArtifacts());
    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainStats, minArtifactLevel, focusStats));
    runBuildsOptimizer(this.allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter);
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

  private computeBonusStats(character: Character, weapon: Weapon): MainStatsValues {
    const statsComputation = new StatsComputation();
    const weaponBonusStat = weapon.bonusStat;
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
