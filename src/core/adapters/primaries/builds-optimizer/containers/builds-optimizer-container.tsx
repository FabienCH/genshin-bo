import { Component, ReactElement } from 'react';
import { CharactersDI } from '../../../../di/characters-di';
import { WeaponsDI } from '../../../../di/weapons-di';
import { CharacterView, ExistingCharacters } from '../../../../domain/models/character';
import { Levels } from '../../../../domain/models/levels';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../../domain/models/character-statistics';
import BuildFiltersForm from '../components/build-filters-form';
import BuildsResultsContainer from './builds-results-container';
import BuildsSetupContainer from './builds-setup-container';
import { connect } from 'react-redux';
import { Build } from '../../../../domain/models/build';
import { selectAllBuilds, selectNewBuilds } from '../../../redux/builds/builds-selectors';
import { BuildsOptimizerDI } from '../../../../di/builds-optimizer-di';
import { WeaponView } from '../../../../domain/models/weapon';
import { ArtifactsFiltersView } from '../../../../usescases/artifacts-filter';

const styles = createStyles({
  form: {
    minHeight: 260,
  },
});

interface BuildsOptimizerProps extends WithStyles<typeof styles> {
  initialBuilds: Build[];
  newBuilds: Build[];
  isBuildsLimitReached: boolean;
  isOptimizationRunning: boolean;
  buildsComputationProgress: string;
}

type State = {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: CharacterView;
  currentWeapon: WeaponView;
  artifactsFilters: ArtifactsFiltersView;
  buildFilters: Partial<CharacterStatsValues>;
  buildsCombinationsLimitReached: boolean;
};

class BuildsOptimizerContainer extends Component<BuildsOptimizerProps, State> {
  constructor(props: BuildsOptimizerProps) {
    super(props);
    const charactersNames = CharactersDI.charactersHandler.getCharactersNames();
    const currentCharacter = this.getCurrentCharacter(charactersNames[0], '1');
    const weaponsNames = WeaponsDI.weaponsHandler.getWeaponsNamesByTypes(currentCharacter.weaponType);
    const currentWeapon = this.getCurrentWeapon(weaponsNames[0], '1');
    const artifactsFilters: ArtifactsFiltersView = {
      currentSets: {},
      setPieces: 2,
      mainsStats: {},
      focusStats: [],
      minArtifactLevel: 0,
    };

    this.state = {
      charactersNames,
      weaponsNames,
      currentCharacter,
      currentWeapon,
      artifactsFilters,
      buildFilters: {},
      buildsCombinationsLimitReached: this.isBuildsCombinationsLimitReached(artifactsFilters),
    };

    this.handleCharacterChange = this.handleCharacterChange.bind(this);
    this.handleWeaponChange = this.handleWeaponChange.bind(this);
    this.handleArtifactsFiltersChange = this.handleArtifactsFiltersChange.bind(this);
    this.handleBuildFiltersChange = this.handleBuildFiltersChange.bind(this);
    this.runOptimization = this.runOptimization.bind(this);
  }

  getCurrentCharacter = (name: ExistingCharacters, level: Levels = this.state.currentCharacter.level) =>
    CharactersDI.charactersHandler.getCharacterView(name, level);

  getCurrentWeapon = (name: string, level: Levels = this.state.currentWeapon.level) => WeaponsDI.weaponsHandler.getWeaponView(name, level);

  isBuildsCombinationsLimitReached = (artifactsFilters: ArtifactsFiltersView): boolean =>
    BuildsOptimizerDI.getBuildsOptimizer().isBuildsCombinationsLimitReached({
      ...artifactsFilters,
      currentSets: Object.values(artifactsFilters.currentSets),
    });

  handleCharacterChange(character: CharacterView): void {
    const currentCharacter = this.getCurrentCharacter(character.name, character.level);
    if (currentCharacter.weaponType !== this.state.currentCharacter.weaponType) {
      this.updateWeaponsState(currentCharacter);
    }
    this.setState((state) => ({
      ...state,
      currentCharacter,
    }));
  }

  handleWeaponChange(weapon: WeaponView): void {
    const currentWeapon = this.getCurrentWeapon(weapon.name, weapon.level);
    const weaponsLevels = BuildsOptimizerDI.buildsFormsHandler.getWeaponLevelsOptions(currentWeapon.name);

    this.setState((state) => ({
      ...state,
      currentWeapon,
      weaponsLevels,
    }));
  }

  handleArtifactsFiltersChange(artifactsFilters: ArtifactsFiltersView): void {
    const buildsCombinationsLimitReached = this.isBuildsCombinationsLimitReached(artifactsFilters);

    this.setState((state) => ({
      ...state,
      artifactsFilters,
      buildsCombinationsLimitReached,
    }));
  }

  handleBuildFiltersChange(event: { stat: CharacterStatTypes; value: number | undefined }): void {
    this.setState((state) => {
      const buildFilters = state.buildFilters;
      if (event.value == null) {
        delete buildFilters[event.stat];
      }
      const newBuildFilters = event.value == null ? buildFilters : { ...buildFilters, [event.stat]: event.value };

      return {
        ...state,
        buildFilters: newBuildFilters,
      };
    });
  }

  runOptimization(): void {
    const artifactsFilters = { ...this.state.artifactsFilters, currentSets: Object.values(this.state.artifactsFilters.currentSets) };
    BuildsOptimizerDI.getBuildsOptimizer().computeBuildsStats(
      this.state.currentCharacter,
      this.state.currentWeapon,
      artifactsFilters,
      this.state.buildFilters,
    );
  }

  cancelOptimization(): void {
    BuildsOptimizerDI.getBuildsOptimizer().cancelOptimization();
  }

  render(): ReactElement {
    const { classes, initialBuilds, newBuilds, isBuildsLimitReached, isOptimizationRunning, buildsComputationProgress } = this.props;
    const canRunOptimization = this.state.artifactsFilters.focusStats.length !== 1 && !this.state.buildsCombinationsLimitReached;

    return (
      <section>
        <h2>Builds Optimizer</h2>
        <h3>Build Setup</h3>
        <form className={classes.form}>
          <BuildsSetupContainer
            charactersNames={this.state.charactersNames}
            weaponsNames={this.state.weaponsNames}
            currentCharacter={this.state.currentCharacter}
            currentWeapon={this.state.currentWeapon}
            artifactsFilters={this.state.artifactsFilters}
            onCharacterChange={this.handleCharacterChange}
            onWeaponChange={this.handleWeaponChange}
            onArtifactsFiltersChange={this.handleArtifactsFiltersChange}
          ></BuildsSetupContainer>
          <h3>Build Filters</h3>
          <BuildFiltersForm
            buildFilters={this.state.buildFilters}
            canRunOptimization={canRunOptimization}
            buildsCombinationsLimitReached={this.state.buildsCombinationsLimitReached}
            isOptimizationRunning={isOptimizationRunning}
            buildsComputationProgress={buildsComputationProgress}
            onBuildFiltersChange={this.handleBuildFiltersChange}
            onRunClick={this.runOptimization}
            onCancelClick={this.cancelOptimization}
          ></BuildFiltersForm>
        </form>
        <BuildsResultsContainer
          initialBuilds={initialBuilds}
          newBuilds={newBuilds}
          isBuildsLimitReached={isBuildsLimitReached}
          buildFilters={this.state.buildFilters}
        ></BuildsResultsContainer>
      </section>
    );
  }

  private updateWeaponsState(currentCharacter: CharacterView) {
    const weaponsNames = WeaponsDI.weaponsHandler.getWeaponsNamesByTypes(currentCharacter.weaponType);
    const currentWeapon = this.getCurrentWeapon(weaponsNames[0], '1');
    this.setState((state) => ({
      ...state,
      weaponsNames,
      currentWeapon,
    }));
  }
}

const mapStateToProps = () => {
  const buildsOptimizer = BuildsOptimizerDI.getBuildsOptimizer();
  return {
    initialBuilds: selectAllBuilds(),
    newBuilds: selectNewBuilds(),
    isBuildsLimitReached: buildsOptimizer.isBuildsLimitReached(),
    isOptimizationRunning: buildsOptimizer.isOptimizationRunning(),
    buildsComputationProgress: buildsOptimizer.getBuildsComputationProgress(),
  };
};

export default connect(mapStateToProps)(withStyles(styles)(BuildsOptimizerContainer));
