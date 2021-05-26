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

  const firstSetSelect = (
    <div className={classes.container}>
      <FormSelect
        label="Set 1"
        options={setNames}
        selectedValue={currentSets[0]}
        isOptional={true}
        onChange={(e) => handleSetNameChange(e, 0)}
      ></FormSelect>
    </div>
  );
  return setPieces === 4 ? (
    firstSetSelect
  ) : (
    <Fragment>
      {firstSetSelect}
      <div className={classes.container}>
        <FormSelect
          label="Set 2"
          options={setNames}
          selectedValue={currentSets[1]}
          isOptional={true}
          onChange={(e) => handleSetNameChange(e, 1)}
        ></FormSelect>
      </div>
    </Fragment>
  );
}

export default withStyles(styles)(SetsSelects);
