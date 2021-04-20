import { Component, ReactElement } from 'react';
import { CharactersDI } from '../../../../di/characters-di';
import { WeaponsDI } from '../../../../di/weapons-di';
import CharacterForm from '../components/character-form';
import SetsForm from '../components/sets-form';
import ArtifactsForm from '../components/artifacts-form';
import { CharacterView, ExistingCharacters } from '../../../../domain/models/character';
import { Levels } from '../../../../domain/models/levels';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ArtifactsMainStats, ArtifactStatsTypes } from '../../../../domain/models/main-statistics';
import { CharacterStatsValues, CharacterStatTypes } from '../../../../domain/models/character-statistics';
import BuildFiltersForm from '../components/build-filters-form';
import { SetNames } from '../../../../domain/models/sets-with-effects';
import BuildsResultsContainer from './builds-results-container';
import { connect } from 'react-redux';
import { Build } from '../../../../domain/models/build';
import { selectAllBuilds } from '../../../redux/builds/builds-selectors';
import { BuildsOptimizerDI } from '../../../../di/builds-optimizer-di';
import { WeaponView } from '../../../../domain/models/weapon';

const styles = createStyles({
  form: {
    minHeight: 260,
  },
  buildSetup: {
    display: 'flex',
  },
});

interface BuildsOptimizerProps extends WithStyles<typeof styles> {
  builds: Build[];
}

type State = {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: CharacterView;
  currentWeapon: WeaponView;
  artifactsFilters: {
    currentSets: { [index: number]: SetNames };
    setPieces: 2 | 4;
    mainsStats: ArtifactsMainStats;
    focusStats: ArtifactStatsTypes[];
    minArtifactLevel: number;
  };
  buildFilters: Partial<CharacterStatsValues>;
};

class BuildsOptimizerContainer extends Component<BuildsOptimizerProps, State> {
  constructor(props: BuildsOptimizerProps) {
    super(props);
    const charactersNames = CharactersDI.charactersHandler.getCharactersNames();
    const currentCharacter = this.getCurrentCharacter(charactersNames[0], '1');
    const weaponsNames = WeaponsDI.weaponsHandler.getWeaponsNamesByTypes(currentCharacter.weaponType);
    const currentWeapon = this.getCurrentWeapon(weaponsNames[0], '1');

    this.state = {
      charactersNames,
      weaponsNames,
      currentCharacter,
      currentWeapon,
      artifactsFilters: {
        currentSets: {},
        setPieces: 2,
        mainsStats: {},
        focusStats: [],
        minArtifactLevel: 0,
      },
      buildFilters: {},
    };
    this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
    this.handleCharacterLevelChange = this.handleCharacterLevelChange.bind(this);
    this.handleWeaponNameChange = this.handleWeaponNameChange.bind(this);
    this.handleWeaponLevelChange = this.handleWeaponLevelChange.bind(this);
    this.handleSetNameChange = this.handleSetNameChange.bind(this);
    this.handleSetPiecesChange = this.handleSetPiecesChange.bind(this);
    this.handleMainsStatsChange = this.handleMainsStatsChange.bind(this);
    this.handleFocusStatsChange = this.handleFocusStatsChange.bind(this);
    this.handleMinLevelChange = this.handleMinLevelChange.bind(this);
    this.handleBuildFiltersChange = this.handleBuildFiltersChange.bind(this);
    this.runOptimization = this.runOptimization.bind(this);
  }

  getCurrentCharacter = (name: ExistingCharacters, level: Levels = this.state.currentCharacter.level) =>
    CharactersDI.charactersHandler.getCharacterView(name, level);

  getCurrentWeapon = (name: string, level: Levels = this.state.currentWeapon.level) => WeaponsDI.weaponsHandler.getWeaponView(name, level);

  handleCharacterNameChange(name: ExistingCharacters): void {
    const currentCharacter = this.getCurrentCharacter(name);
    this.setState((state) => ({
      ...state,
      currentCharacter,
    }));
    if (currentCharacter.weaponType !== this.state.currentCharacter.weaponType) {
      this.updateWeaponsState(currentCharacter);
    }
  }

  handleCharacterLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentCharacter: this.getCurrentCharacter(this.state.currentCharacter.name, level),
    }));
  }

  handleWeaponNameChange(name: string): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: this.getCurrentWeapon(name),
    }));
  }

  handleWeaponLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: this.getCurrentWeapon(this.state.currentWeapon.name, level),
    }));
  }

  handleSetNameChange(event: { value: SetNames; setIndex: number }): void {
    this.setState((state) => {
      const currentSets = state.artifactsFilters.currentSets;
      if (event.value == null) {
        delete currentSets[event.setIndex];
      }
      const newCurrentSets = event.value == null ? currentSets : { ...currentSets, [event.setIndex]: event.value };

      return {
        ...state,
        artifactsFilters: {
          ...state.artifactsFilters,
          currentSets: newCurrentSets,
        },
      };
    });
  }

  handleSetPiecesChange(setPieces: 2 | 4): void {
    this.setState((state) => ({
      ...state,
      artifactsFilters: {
        ...state.artifactsFilters,
        setPieces,
      },
    }));
  }

  handleMainsStatsChange(mainsStats: ArtifactsMainStats): void {
    this.setState((state) => ({
      ...state,
      artifactsFilters: {
        ...state.artifactsFilters,
        mainsStats,
      },
    }));
  }

  handleFocusStatsChange(focusStats: ArtifactStatsTypes[]): void {
    if (focusStats.length <= 5) {
      this.setState((state) => ({
        ...state,
        artifactsFilters: {
          ...state.artifactsFilters,
          focusStats,
        },
      }));
    }
  }

  handleMinLevelChange(minArtifactLevel: number): void {
    this.setState((state) => ({
      ...state,
      artifactsFilters: {
        ...state.artifactsFilters,
        minArtifactLevel,
      },
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

  render(): ReactElement {
    const { classes, builds } = this.props;
    let buildsResultsContainer;
    if (builds.length > 0) {
      buildsResultsContainer = <BuildsResultsContainer builds={builds} buildFilters={this.state.buildFilters}></BuildsResultsContainer>;
    }

    return (
      <section>
        <h2>Builds Optimizer</h2>
        <h3>Build Setup</h3>
        <form className={classes.form}>
          <div className={classes.buildSetup}>
            <CharacterForm
              charactersNames={this.state.charactersNames}
              currentCharacter={this.state.currentCharacter}
              weaponsNames={this.state.weaponsNames}
              currentWeapon={this.state.currentWeapon}
              onCharacterNameChange={this.handleCharacterNameChange}
              onCharacterLevelChange={this.handleCharacterLevelChange}
              onWeaponNameChange={this.handleWeaponNameChange}
              onWeaponLevelChange={this.handleWeaponLevelChange}
            ></CharacterForm>
            <SetsForm
              currentSets={this.state.artifactsFilters.currentSets}
              setPieces={this.state.artifactsFilters.setPieces}
              onSetNameChange={this.handleSetNameChange}
              onSetPiecesChange={this.handleSetPiecesChange}
            ></SetsForm>
            <ArtifactsForm
              mainsStats={this.state.artifactsFilters.mainsStats}
              focusStats={this.state.artifactsFilters.focusStats}
              minLevel={this.state.artifactsFilters.minArtifactLevel}
              onMainsStatsChange={this.handleMainsStatsChange}
              onFocusStatsChange={this.handleFocusStatsChange}
              onMinLevelChange={this.handleMinLevelChange}
            ></ArtifactsForm>
          </div>
          <h3>Build Filters</h3>
          <BuildFiltersForm
            buildFilters={this.state.buildFilters}
            disableButton={this.state.artifactsFilters.focusStats.length === 1}
            onBuildFiltersChange={this.handleBuildFiltersChange}
            onRunClick={this.runOptimization}
          ></BuildFiltersForm>
        </form>
        {buildsResultsContainer}
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
  return { builds: selectAllBuilds() };
};

export default connect(mapStateToProps)(withStyles(styles)(BuildsOptimizerContainer));
