import React, { ChangeEvent, Fragment, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormSelect from '../shared/form-select';
import { SetNamesWithPlaceholder, setNamesWithPlaceholder } from '../../../domain/models/sets-with-effects';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

  const handleSetNameChange = (value: SetNamesWithPlaceholder, setIndex: number): void => {
    props.onSetNameChange({ value, setIndex });
  };

  const handleSetPiecesChange = (_: ChangeEvent<HTMLInputElement>, value: string): void => {
    const intValue = parseInt(value);
    const newSetPieces = intValue === 2 || intValue === 4 ? intValue : 2;
    props.onSetPiecesChange(newSetPieces);
  };

  const firstSetSelect = (
    <FormSelect
      label="Set 1"
      data={setNamesWithPlaceholder}
      selectedValue={currentSets[0]}
      onChange={(e) => handleSetNameChange(e, 0)}
    ></FormSelect>
  );
  const setSelects =
    setPieces === 4 ? (
      firstSetSelect
    ) : (
      <Fragment>
        {firstSetSelect}
        <FormSelect
          label="Set 2"
          data={setNamesWithPlaceholder}
          selectedValue={currentSets[1]}
          onChange={(e) => handleSetNameChange(e, 1)}
        ></FormSelect>
      </Fragment>
    );

  return (
    <Container fixed>
      <FormControl>
        <FormLabel>Set effects</FormLabel>
        <RadioGroup row aria-label="set-pieces" name="set-pieces" value={setPieces} onChange={handleSetPiecesChange}>
          <FormControlLabel value={2} control={<Radio />} label="2 Pieces" />
          <FormControlLabel value={4} control={<Radio />} label="4 Pieces" />
        </RadioGroup>
      </FormControl>
      {setSelects}
    </Container>
  );
}

export default withStyles(styles)(SetsForm);
