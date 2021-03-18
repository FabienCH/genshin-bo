import { ChangeEvent, ReactElement } from 'react';
import { createStyles, TextField, withStyles, WithStyles } from '@material-ui/core';
import { StringFormatter } from '../../../../domain/mappers/string-formatter';
import { CharacterStatTypes } from '../../../../domain/models/character-statistics';

const styles = createStyles({
  textField: {
    marginRight: 30,
    display: 'flex',
    flex: '170px 0 1',
  },
});
interface BuildFiltersTextFieldProps extends WithStyles<typeof styles> {
  data: { stat: CharacterStatTypes; value: number | undefined };
  onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
}

function BuildFiltersTextField(props: BuildFiltersTextFieldProps): ReactElement {
  const { data, classes } = props;

  const getDisplayedValue = (value?: number): number | '' => {
    return value != null ? value : '';
  };
  const handleValueChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    props.onChange(event);
  };

  return (
    <TextField
      id={`${data.stat}`}
      className={classes.textField}
      label={'Min ' + StringFormatter.formatStringWithUpperCase(data.stat)}
      value={getDisplayedValue(data.value)}
      onChange={handleValueChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export default withStyles(styles)(BuildFiltersTextField);
