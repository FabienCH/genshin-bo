import { Component, ReactElement } from 'react';
import { CharactersDI } from '../../../di/characters-di';
import { WeaponsDI } from '../../../di/weapons-di';
import CharacterForm from './character-form';
import SetsForm from './sets-form';
import ArtifactsForm from './artifacts-form';
import { ExistingCharacters } from '../../../domain/models/character';
import { Levels } from '../../../domain/models/levels';
import { SetNamesWithPlaceholder } from '../../../domain/models/sets-with-effects';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ArtifactStatsTypes } from '../../../domain/models/main-statistics';
import { CircletMainStatWithPlaceholder } from '../../../domain/models/circlet-artifact-data';
import { GobletMainStatWithPlaceholder } from '../../../domain/models/goblet-artifact-data';
import { SandsMainStatWithPlaceholder } from '../../../domain/models/sands-artifact-data';

const styles = createStyles({
  form: {
    display: 'flex',
    height: 260,
  },
});

type BuildOptimizerProps = WithStyles<typeof styles>;

export type ArtifactsMainStats = {
  sandsMain: SandsMainStatWithPlaceholder;
  gobletMain: GobletMainStatWithPlaceholder;
  circletMain: CircletMainStatWithPlaceholder;
};

type State = {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: { name: ExistingCharacters; level: Levels };
  currentWeapon: { name: string; level: Levels };
  filters: {
    currentSets: SetNamesWithPlaceholder[];
    setPieces: 2 | 4;
    mainsStats: ArtifactsMainStats;
    focusStats: ArtifactStatsTypes[];
    minArtifactLevel: number;
  };
};

class BuildOptimizerContainer extends Component<BuildOptimizerProps, State> {
  constructor(props: BuildOptimizerProps) {
    super(props);
    this.state = {
      charactersNames: [],
      weaponsNames: [],
      currentCharacter: { name: 'albedo', level: '1' },
      currentWeapon: { name: 'skywardHarp', level: '1' },
      filters: {
        currentSets: ['-', '-'],
        setPieces: 2,
        mainsStats: {
          sandsMain: '-',
          gobletMain: '-',
          circletMain: '-',
        },
        focusStats: [],
        minArtifactLevel: 1,
      },
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

  handleSetNameChange(event: { value: SetNamesWithPlaceholder; setIndex: number }): void {
    this.setState((state) => ({
      ...state,
      filters: {
        ...state.filters,
        currentSets: [
          ...state.filters.currentSets.slice(0, event.setIndex),
          event.value,
          ...state.filters.currentSets.slice(event.setIndex + 1),
        ],
      },
    }));
  }

  handleSetPiecesChange(setPieces: 2 | 4): void {
    this.setState((state) => ({
      ...state,
      filters: {
        ...state.filters,
        setPieces,
      },
    }));
  }

  handleMainsStatsChange(mainsStats: ArtifactsMainStats): void {
    this.setState((state) => ({
      ...state,
      filters: {
        ...state.filters,
        mainsStats,
      },
    }));
  }

  handleFocusStatsChange(focusStats: ArtifactStatsTypes[]): void {
    if (focusStats.length <= 5) {
      this.setState((state) => ({
        ...state,
        filters: {
          ...state.filters,
          focusStats,
        },
      }));
    }
  }

  handleMinLevelChange(minArtifactLevel: number): void {
    this.setState((state) => ({
      ...state,
      filters: {
        ...state.filters,
        minArtifactLevel,
      },
    }));
  }

  render(): ReactElement {
    const { classes } = this.props;

    return (
      <section>
        <h2>Build Optimizer</h2>
        <h3>Build Setup</h3>
        <form className={classes.form}>
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
            currentSets={this.state.filters.currentSets}
            setPieces={this.state.filters.setPieces}
            onSetNameChange={this.handleSetNameChange}
            onSetPiecesChange={this.handleSetPiecesChange}
          ></SetsForm>
          <ArtifactsForm
            mainsStats={this.state.filters.mainsStats}
            focusStats={this.state.filters.focusStats}
            minLevel={this.state.filters.minArtifactLevel}
            onMainsStatsChange={this.handleMainsStatsChange}
            onFocusStatsChange={this.handleFocusStatsChange}
            onMinLevelChange={this.handleMinLevelChange}
          ></ArtifactsForm>
        </form>
      </section>
    );
  }
}

export default withStyles(styles)(BuildOptimizerContainer);
