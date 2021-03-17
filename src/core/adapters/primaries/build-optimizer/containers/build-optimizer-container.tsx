import { Component, ReactElement } from 'react';
import { CharactersDI } from '../../../../di/characters-di';
import { WeaponsDI } from '../../../../di/weapons-di';
import CharacterForm from '../components/character-form';
import SetsForm from '../components/sets-form';
import ArtifactsForm from '../components/artifacts-form';
import { ExistingCharacters } from '../../../../domain/models/character';
import { Levels } from '../../../../domain/models/levels';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ArtifactStatsTypes } from '../../../../domain/models/main-statistics';
import { CircletMainStatType } from '../../../../domain/models/circlet-artifact-data';
import { GobletMainStatType } from '../../../../domain/models/goblet-artifact-data';
import { SandsMainStatType } from '../../../../domain/models/sands-artifact-data';
import { CharacterStatsValues, CharacterStatTypes } from '../../../../domain/models/character-statistics';
import BuildFiltersForm from '../components/build-filters-form';
import { BuildOptimizerDI } from '../../../../di/build-optimizer-di';
import { SetNames } from '../../../../domain/models/sets-with-effects';
import BuildsResultsContainer from './builds-results-container';
import { connect } from 'react-redux';
import { Build } from '../../../../domain/models/build';
import { selectAllBuilds } from '../../../redux/builds/builds-selectors';

const styles = createStyles({
  form: {
    minHeight: 260,
  },
  buildSetup: {
    display: 'flex',
  },
});

interface BuildOptimizerProps extends WithStyles<typeof styles> {
  builds: Build[];
}

export type ArtifactsMainStats = {
  sandsMain?: SandsMainStatType;
  gobletMain?: GobletMainStatType;
  circletMain?: CircletMainStatType;
};

type State = {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: { name: ExistingCharacters; level: Levels };
  currentWeapon: { name: string; level: Levels };
  artifactsFilters: {
    currentSets: { [index: number]: SetNames };
    setPieces: 2 | 4;
    mainsStats: ArtifactsMainStats;
    focusStats: ArtifactStatsTypes[];
    minArtifactLevel: number;
  };
  buildFilters: Partial<CharacterStatsValues>;
};

class BuildOptimizerContainer extends Component<BuildOptimizerProps, State> {
  constructor(props: BuildOptimizerProps) {
    super(props);
    this.state = {
      charactersNames: [],
      weaponsNames: [],
      currentCharacter: { name: 'albedo', level: '1' },
      currentWeapon: { name: 'skywardHarp', level: '1' },
      artifactsFilters: {
        currentSets: {},
        setPieces: 2,
        mainsStats: {},
        focusStats: [],
        minArtifactLevel: 1,
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

  componentDidMount(): void {
    const charactersNames = CharactersDI.charactersHandler.getCharactersNames();
    const weaponsNames = WeaponsDI.weaponsHandler.getWeaponsNames();
    this.setState({ ...this.state, charactersNames, weaponsNames });
  }

  handleCharacterNameChange(name: ExistingCharacters): void {
    this.setState((state) => ({
      ...state,
      currentCharacter: { ...state.currentCharacter, name },
    }));
  }

  handleCharacterLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentCharacter: { ...state.currentCharacter, level },
    }));
  }

  handleWeaponNameChange(name: string): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: { ...state.currentWeapon, name },
    }));
  }

  handleWeaponLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: { ...state.currentWeapon, level },
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
    const { name, level } = this.state.currentCharacter;
    const character = CharactersDI.charactersHandler.getCharacter(name, level, this.state.currentWeapon);
    const artifactsFilters = { ...this.state.artifactsFilters, currentSets: Object.values(this.state.artifactsFilters.currentSets) };
    BuildOptimizerDI.getBuildOptimizer().computeBuildsStats(character, artifactsFilters, this.state.buildFilters);
  }

  render(): ReactElement {
    const { classes, builds } = this.props;

    let buildsResultsContainer;
    if (builds.length > 0) {
      buildsResultsContainer = <BuildsResultsContainer builds={builds} buildFilters={this.state.buildFilters}></BuildsResultsContainer>;
    }

    return (
      <section>
        <h2>Build Optimizer</h2>
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
}

const mapStateToProps = () => {
  return { builds: selectAllBuilds() };
};

export default connect(mapStateToProps)(withStyles(styles)(BuildOptimizerContainer));
