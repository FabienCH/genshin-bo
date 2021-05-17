import { ChangeEvent, ReactElement } from 'react';
import { InputLabel, Select, MenuItem, FormControl, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { StringFormatter } from '../../../domain/mappers/string-formatter';
import HelpIconTooltip from './help-icon-tooltip';
import { SelectOption } from '../../../usescases/builds-forms-handler';

const styles = createStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
});

export interface FormSelectProps<T extends string | number> extends WithStyles<typeof styles> {
  label: string;
  options: SelectOption[] | T[];
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
  const isTypeT = (x: SelectOption | T): x is T => {
    return typeof x === 'string' || typeof x === 'number';
  };

  const { label, options, selectedValue, isOptional, tooltipText, classes } = props;

  const menuItems = options.map((option: SelectOption | T) => {
    const value = isTypeT(option) ? option : option.value;
    const disableMessage = isTypeT(option) || !option.disableMessage ? false : <span>{option.disableMessage}</span>;
    const menuItem = (key?: string | number): ReactElement => (
      <MenuItem key={key} value={value} disabled={key == null}>
        {StringFormatter.formatStringWithUpperCase(`${value}`)}
      </MenuItem>
    );

    return disableMessage ? (
      <Tooltip key={value} title={disableMessage} placement="right-start" aria-label="disable message">
        <div>{menuItem()}</div>
      </Tooltip>
    ) : (
      menuItem(value)
    );
  });

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
    <div className={classes.container}>
      <InputLabel htmlFor={selectId} shrink={!tooltipText}>
        {label}
        {tooltipText ? <HelpIconTooltip tooltipText={tooltipText}></HelpIconTooltip> : null}
      </InputLabel>
      <FormControl>
        <Select id={selectId} value={value} defaultValue="-" onChange={handleChange}>
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
}

type FormSelectWithoutClasses = <T extends string | number>(props: Omit<FormSelectProps<T>, 'classes'>) => JSX.Element;
export default withStyles(styles)(FormSelect) as FormSelectWithoutClasses;
