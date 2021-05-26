import { ChangeEvent, Fragment, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SetsSelects from './sets-selects';
import { SetNames } from '../../../../domain/artifacts/models/sets-with-effects';

const styles = createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
});

interface SetsFormProps extends WithStyles<typeof styles> {
  currentSets: { [index: number]: SetNames };
  setPieces: 2 | 4;
  onSetNameChange: (event: { value: SetNames; setIndex: number }) => void;
  onSetPiecesChange: (value: 2 | 4) => void;
}

function SetsForm(props: SetsFormProps): ReactElement {
  const { setPieces, currentSets, classes } = props;

  const handleSetNameChange = (event: { value: SetNames; setIndex: number }): void => {
    props.onSetNameChange(event);
  };

  const handleSetPiecesChange = (_: ChangeEvent<HTMLInputElement>, value: string): void => {
    const intValue = parseInt(value);
    const newSetPieces = intValue === 2 || intValue === 4 ? intValue : 2;
    props.onSetPiecesChange(newSetPieces);
  };

  return (
    <Fragment>
      <FormControl className={classes.container}>
        <FormLabel>Set effects</FormLabel>
        <RadioGroup row aria-label="set-pieces" name="set-pieces" value={setPieces} onChange={handleSetPiecesChange}>
          <FormControlLabel value={2} control={<Radio />} label="2 Pieces" />
          <FormControlLabel value={4} control={<Radio />} label="4 Pieces" />
        </RadioGroup>
      </FormControl>
      <div className={classes.container}>
        <SetsSelects currentSets={currentSets} setPieces={setPieces} onSetNameChange={handleSetNameChange}></SetsSelects>
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(SetsForm);
