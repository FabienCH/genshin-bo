import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Fragment, ReactElement } from 'react';
import { SetNames } from '../../../../domain/artifacts/models/sets-with-effects';
import FormSelect from '../../shared/form-select';

const styles = createStyles({
  container: {
    flex: '45% 0 0 ',
    maxWidth: 250,
  },
});

interface SetsSelectsProps extends WithStyles<typeof styles> {
  currentSets: { [index: number]: SetNames };
  setPieces: 2 | 4;
  onSetNameChange: (event: { value: SetNames; setIndex: number }) => void;
}

function SetsSelects(props: SetsSelectsProps): ReactElement {
  const { currentSets, setPieces, classes } = props;
  const setNames = Object.values(SetNames);
  const handleSetNameChange = (value: SetNames, setIndex: number): void => {
    props.onSetNameChange({ value, setIndex });
  };

  const setsIndexes = Array.from(Array(setPieces === 2 ? 2 : 1), (_, i) => i);

  return (
    <Fragment>
      {setsIndexes.map((index) => (
        <div key={`set-${index}`} className={classes.container}>
          <FormSelect
            label={`Set ${index + 1}`}
            options={setNames}
            selectedValue={currentSets[index]}
            isOptional={true}
            onChange={(e) => handleSetNameChange(e, index)}
          ></FormSelect>
        </div>
      ))}
    </Fragment>
  );
}

export default withStyles(styles)(SetsSelects);
