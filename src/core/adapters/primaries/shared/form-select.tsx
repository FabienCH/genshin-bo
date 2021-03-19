import { ChangeEvent, ReactElement } from 'react';
import { InputLabel, Select, MenuItem, FormControl, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { StringFormatter } from '../../../domain/mappers/string-formatter';

const styles = createStyles({
  formControl: {
    display: 'flex',
    flex: 1,
  },
});

export interface FormSelectProps<T extends string | number> extends WithStyles<typeof styles> {
  label: string;
  data: Array<T>;
  selectedValue?: T;
  isOptional?: boolean;
  onChange: (value: T) => void;
}

function FormSelect<T extends string | number>(props: FormSelectProps<T>): ReactElement {
  const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    const value = event.target.value !== '-' ? event.target.value : null;
    props.onChange(value as T);
  };

  const { label, data, selectedValue, isOptional, classes } = props;
  const options = data.map((dataItem) => (
    <MenuItem value={dataItem} key={dataItem}>
      {StringFormatter.formatStringWithUpperCase(`${dataItem}`)}
    </MenuItem>
  ));

  if (isOptional) {
    options.unshift(
      <MenuItem value="-" key="default">
        -
      </MenuItem>,
    );
  }
  const value = selectedValue != null ? selectedValue : '-';
  const selectId = label.toLowerCase().replace(' ', '');

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <Select id={selectId} value={value} defaultValue="-" onChange={handleChange}>
        {options}
      </Select>
    </FormControl>
  );
}

type FormSelectWithoutClasses = <T extends string | number>(props: Omit<FormSelectProps<T>, 'classes'>) => JSX.Element;
export default withStyles(styles)(FormSelect) as FormSelectWithoutClasses;
