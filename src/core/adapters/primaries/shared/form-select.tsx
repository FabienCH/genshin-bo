import { ChangeEvent, ReactElement } from 'react';
import { InputLabel, Select, MenuItem, FormControl, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { StringFormatter } from '../../../domain/mappers/string-formatter';
import HelpIconTooltip from './help-icon-tooltip';

const styles = createStyles({
  formControl: {
    display: 'flex',
    flex: 1,
  },
});

export interface FormSelectProps<T extends string | number> extends WithStyles<typeof styles> {
  label: string;
  options: Array<T>;
  selectedValue?: T;
  isOptional?: boolean;
  tooltipText?: NonNullable<React.ReactNode>;
  onChange: (value: T) => void;
}

function FormSelect<T extends string | number>(props: FormSelectProps<T>): ReactElement {
  const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
    const value = event.target.value !== '-' ? event.target.value : null;
    props.onChange(value as T);
  };

  const { label, options, selectedValue, isOptional, tooltipText, classes } = props;
  const menuItems = options.map((option) => (
    <MenuItem value={option} key={option}>
      {StringFormatter.formatStringWithUpperCase(`${option}`)}
    </MenuItem>
  ));

  if (isOptional) {
    menuItems.unshift(
      <MenuItem value="-" key="default">
        -
      </MenuItem>,
    );
  }
  const value = selectedValue != null ? selectedValue : '-';
  const selectId = label.toLowerCase().replace(' ', '');

  return (
    <div>
      <InputLabel htmlFor={selectId} shrink={!tooltipText}>
        {label}
        {tooltipText ? <HelpIconTooltip tooltipText={tooltipText}></HelpIconTooltip> : null}
      </InputLabel>
      <FormControl className={classes.formControl}>
        <Select id={selectId} value={value} defaultValue="-" onChange={handleChange}>
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
}

type FormSelectWithoutClasses = <T extends string | number>(props: Omit<FormSelectProps<T>, 'classes'>) => JSX.Element;
export default withStyles(styles)(FormSelect) as FormSelectWithoutClasses;
