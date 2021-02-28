import React, { ChangeEvent, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { SetNamesWithPlaceholder } from '../../../domain/models/sets-with-effects';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SetsSelects from './sets-selects';

const styles = createStyles({
  container: {
    margin: '20px 0',
  },
});

interface SetsFormProps extends WithStyles<typeof styles> {
  currentSets: SetNamesWithPlaceholder[];
  setPieces: 2 | 4;
  onSetNameChange: (event: { value: SetNamesWithPlaceholder; setIndex: number }) => void;
  onSetPiecesChange: (value: 2 | 4) => void;
}

function SetsForm(props: SetsFormProps): ReactElement {
  const { setPieces, currentSets } = props;

  const handleSetNameChange = (event: { value: SetNamesWithPlaceholder; setIndex: number }): void => {
    props.onSetNameChange(event);
  };

  const handleSetPiecesChange = (_: ChangeEvent<HTMLInputElement>, value: string): void => {
    const intValue = parseInt(value);
    const newSetPieces = intValue === 2 || intValue === 4 ? intValue : 2;
    props.onSetPiecesChange(newSetPieces);
  };
  return (
    <Container fixed>
      <FormControl>
        <FormLabel>Set effects</FormLabel>
        <RadioGroup row aria-label="set-pieces" name="set-pieces" value={setPieces} onChange={handleSetPiecesChange}>
          <FormControlLabel value={2} control={<Radio />} label="2 Pieces" />
          <FormControlLabel value={4} control={<Radio />} label="4 Pieces" />
        </RadioGroup>
      </FormControl>
      <SetsSelects currentSets={currentSets} setPieces={setPieces} onSetNameChange={handleSetNameChange}></SetsSelects>
    </Container>
  );
}

export default withStyles(styles)(SetsForm);
