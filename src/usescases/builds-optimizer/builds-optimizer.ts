import { loadArtifactsActions } from '../../adapters/redux/artifacts/artifacts-action';
import { isArtifactsStateInitialized, selectAllArtifacts } from '../../adapters/redux/artifacts/artifacts-selectors';
import { runBuildsOptimizerAction, cancelOptimizationAction } from '../../adapters/redux/builds/builds-action';
import {
  buildsComputationProgress,
  optimizationStatsFilter,
  isOptimizationRunning,
  buildsLimitReached,
} from '../../adapters/redux/builds/builds-selectors';
import { appStore } from '../../adapters/redux/store';
import { BuildsOptimizerDI } from '../../di/builds-optimizer-di';
import { MainStatsValues } from '../../domain/artifacts/models/main-statistics';
import { SetFilter } from '../../domain/builds-optimizer/build-filter';
import { CharactersRepository } from '../../domain/builds-optimizer/characters-repository';
import { CharacterView, Character } from '../../domain/builds-optimizer/models/character';
import { CharacterStatsValues, CharacterStatTypes } from '../../domain/builds-optimizer/models/character-statistics';
import { WeaponView, Weapon } from '../../domain/builds-optimizer/models/weapon';
import { StatsComputation } from '../../domain/builds-optimizer/stats-computation';
import { WeaponsRepository } from '../../domain/builds-optimizer/weapons-repository';
import { ArtifactsFilters } from '../artifacts/artifacts-filter';

export class BuildsOptimizer {
  constructor(private readonly charactersRepository: CharactersRepository, private readonly weaponsRepository: WeaponsRepository) {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifactsActions());
    }
  }

  public computeBuildsStats(
    characterView: CharacterView,
    weaponView: WeaponView,
    artifactsFilters: ArtifactsFilters,
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

    appStore.dispatch(
      runBuildsOptimizerAction({ allArtifacts: selectAllArtifacts(), baseStats, characterBonusStat, artifactsFilters, statsFilter }),
    );
  }

  public getBuildsComputationProgress(): string {
    const buildsComputationProgressValues = buildsComputationProgress();
    if (!buildsComputationProgressValues) {
      return '';
    }

    const computed = this.formatNumberWithSuffix(buildsComputationProgressValues.computed);
    const total = this.formatNumberWithSuffix(buildsComputationProgressValues.total);

    return `${computed} / ${total}`;
  }

  public hasLowerStatsFilter(statsFilter: Partial<CharacterStatsValues>): boolean {
    const currentOptimizationStatsFilter = optimizationStatsFilter();
    if (!currentOptimizationStatsFilter || Object.keys(currentOptimizationStatsFilter).length === 0) {
      return false;
    }

    return !!Object.keys(currentOptimizationStatsFilter).find((key) => {
      const statFilterKey = key as CharacterStatTypes;
      const filterValue = statsFilter[statFilterKey];
      const optimFilterValue = currentOptimizationStatsFilter[statFilterKey] || 0;
      return filterValue && filterValue < optimFilterValue;
    });
  }

  public cancelOptimization(): void {
    appStore.dispatch(cancelOptimizationAction());
  }

  public isOptimizationRunning(): boolean {
    return isOptimizationRunning();
  }

  public isBuildsLimitReached(): boolean {
    return buildsLimitReached();
  }

  public isBuildsCombinationsLimitReached(artifactsFilters: ArtifactsFilters): boolean {
    return BuildsOptimizerDI.getBuildsComputation().getBuildsCombinations(artifactsFilters, selectAllArtifacts()) > Math.pow(10, 10);
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

  private formatNumberWithSuffix(valueToFormat: number): string {
    const formatters = [
      { value: 1000000, suffix: 'M' },
      { value: 1000, suffix: 'k' },
    ];
    const formatter = formatters.find((f) => valueToFormat >= f.value);
    const formattedValue = formatter ? this.formatWithPrecision(valueToFormat, formatter.value) : valueToFormat;

    return `${formattedValue}${formatter ? formatter.suffix : ''}`;
  }

  private formatWithPrecision(valueToFormat: number, divisor: number) {
    const formattedValue = valueToFormat / divisor;
    const precision = valueToFormat < 100 ? 2 : formattedValue < 1000 ? 3 : 4;
    return formattedValue.toPrecision(precision);
  }
}
