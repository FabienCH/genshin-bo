import { Component, ReactElement } from 'react';
import { CharactersDI } from '../../../di/characters-di';
import { WeaponsDI } from '../../../di/weapons-di';
import CharacterForm from './character-form';
import { ExistingCharacters } from '../../../domain/models/character';
import { Levels } from '../../../domain/models/levels';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  form: {
    display: 'flex',
    height: '260px',
  },
});

type BuildOptimizerProps = WithStyles<typeof styles>;

type State = {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: { name: ExistingCharacters; level: Levels };
  currentWeapon: { name: string; level: Levels };
};

class BuildOptimizerContainer extends Component<BuildOptimizerProps, State> {
  constructor(props: BuildOptimizerProps) {
    super(props);
    this.state = {
      charactersNames: [],
      weaponsNames: [],
      currentCharacter: { name: 'albedo', level: '1' },
      currentWeapon: { name: 'skywardHarp', level: '1' },
    };
    this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
    this.handleCharacterLevelChange = this.handleCharacterLevelChange.bind(this);
    this.handleWeaponNameChange = this.handleWeaponNameChange.bind(this);
    this.handleWeaponLevelChange = this.handleWeaponLevelChange.bind(this);
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
    setTimeout(() => {
      console.log(this.state.currentCharacter);
    }, 100);
  }

  handleCharacterLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentCharacter: { ...state.currentCharacter, level },
    }));
    setTimeout(() => {
      console.log(this.state.currentCharacter);
    }, 100);
  }

  handleWeaponNameChange(name: string): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: { ...state.currentWeapon, name },
    }));
    setTimeout(() => {
      console.log(this.state.currentWeapon);
    }, 100);
  }

  handleWeaponLevelChange(level: Levels): void {
    this.setState((state) => ({
      ...state,
      currentWeapon: { ...state.currentWeapon, level },
    }));
    setTimeout(() => {
      console.log(this.state.currentWeapon);
    }, 100);
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
        </form>
      </section>
    );
  }
}

export default withStyles(styles)(BuildOptimizerContainer);
