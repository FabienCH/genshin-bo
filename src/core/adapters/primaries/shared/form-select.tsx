import { ChangeEvent, ReactElement } from 'react';
import { InputLabel, Select, MenuItem, FormControl, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { StringFormatter } from '../../../domain/mappers/string-formatter';

const styles = createStyles({
  formControl: {
    width: '100%',
    margin: '15px 0',
  },
});

export interface FormSelectProps<T extends string | number> extends WithStyles<typeof styles> {
  label: string;
  data: Array<T>;
  selectedValue: T;
  isDefaultEmpty?: boolean;
  onChange: (value: T) => void;
}

function FormSelect<T extends string | number>(props: FormSelectProps<T>): ReactElement {
  const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    props.onChange(event.target.value as T);
  };

  const { label, data, selectedValue, classes } = props;
  const options = data.map((dataItem) => (
    <MenuItem value={dataItem} key={dataItem}>
      {StringFormatter.formatStringWithUpperCase(`${dataItem}`)}
    </MenuItem>
  ));
  if (selectedValue === '-') {
    options.unshift(
      <MenuItem value="-" key="-">
        -
      </MenuItem>,
    );
  }
  const selectId = label.toLowerCase();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <Select id={selectId} value={selectedValue} onChange={handleChange}>
        {options}
      </Select>
    </FormControl>
  );
}

type FormSelectWithClasses = <T extends string>(props: Omit<FormSelectProps<T>, 'classes'>) => JSX.Element;
export default withStyles(styles)(FormSelect) as FormSelectWithClasses;
