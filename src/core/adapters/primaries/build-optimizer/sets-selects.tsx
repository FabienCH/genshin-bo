import React, { Fragment, ReactElement } from 'react';
import FormSelect from '../shared/form-select';
import { SetNamesWithPlaceholder, setNamesWithPlaceholder } from '../../../domain/models/sets-with-effects';

interface SetsSelectsProps {
  currentSets: SetNamesWithPlaceholder[];
  setPieces: 2 | 4;
  onSetNameChange: (event: { value: SetNamesWithPlaceholder; setIndex: number }) => void;
}

function SetsSelects(props: SetsSelectsProps): ReactElement {
  const { currentSets, setPieces } = props;

  const handleSetNameChange = (value: SetNamesWithPlaceholder, setIndex: number): void => {
    props.onSetNameChange({ value, setIndex });
  };

  const firstSetSelect = (
    <FormSelect
      label="Set 1"
      data={setNamesWithPlaceholder}
      selectedValue={currentSets[0]}
      onChange={(e) => handleSetNameChange(e, 0)}
    ></FormSelect>
  );
  return setPieces === 4 ? (
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
}

export default SetsSelects;
