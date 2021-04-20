import { createStyles, withStyles, WithStyles, Box, Container } from '@material-ui/core';
import { Levels } from '../../../../domain/models/levels';
import { CharacterView, ExistingCharacters } from '../../../../domain/models/character';
import FormSelect from '../../shared/form-select';
import { ReactElement } from 'react';
import { WeaponView } from '../../../../domain/models/weapon';

const styles = createStyles({
  div: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftSelect: {
    marginRight: 30,
    width: 220,
  },
  rightSelect: {
    width: 60,
  },
});

interface CharacterFormProps extends WithStyles<typeof styles> {
  charactersNames: ExistingCharacters[];
  weaponsNames: string[];
  currentCharacter: CharacterView;
  currentWeapon: WeaponView;
  onCharacterNameChange: (value: ExistingCharacters) => void;
  onCharacterLevelChange: (value: Levels) => void;
  onWeaponNameChange: (value: string) => void;
  onWeaponLevelChange: (value: Levels) => void;
}

function CharacterForm(props: CharacterFormProps): ReactElement {
  const { charactersNames, weaponsNames, currentCharacter, currentWeapon, classes } = props;
  const levels: Levels[] = ['1', '20', '20a', '40', '40a', '50', '50a', '60', '60a', '70', '70a', '80', '80a', '90'];

  const handleCharacterNameChange = (value: ExistingCharacters): void => {
    props.onCharacterNameChange(value);
  };
  const handleCharacterLevelChange = (value: Levels): void => {
    props.onCharacterLevelChange(value);
  };
  const handleWeaponNameChange = (value: string): void => {
    props.onWeaponNameChange(value);
  };
  const handleWeaponLevelChange = (value: Levels): void => {
    props.onWeaponLevelChange(value);
  };

  return (
    <Container>
      <div className={classes.div}>
        <Box className={classes.leftSelect}>
          <FormSelect
            label="Character"
            options={charactersNames}
            selectedValue={currentCharacter.name}
            onChange={handleCharacterNameChange}
          ></FormSelect>
        </Box>
        <Box className={classes.rightSelect}>
          <FormSelect
            label="Level"
            options={levels}
            selectedValue={currentCharacter.level}
            onChange={handleCharacterLevelChange}
          ></FormSelect>
        </Box>
      </div>
      <div className={classes.div}>
        <Box className={classes.leftSelect}>
          <FormSelect
            label="Weapon"
            options={weaponsNames}
            selectedValue={currentWeapon.name}
            onChange={handleWeaponNameChange}
          ></FormSelect>
        </Box>
        <Box className={classes.rightSelect}>
          <FormSelect label="Level" options={levels} selectedValue={currentWeapon.level} onChange={handleWeaponLevelChange}></FormSelect>
        </Box>
      </div>
    </Container>
  );
}

export default withStyles(styles)(CharacterForm);
