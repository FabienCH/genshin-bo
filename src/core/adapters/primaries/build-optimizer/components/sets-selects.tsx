import { Fragment, ReactElement } from 'react';
import { SetNames } from '../../../../domain/models/sets-with-effects';
import FormSelect from '../../shared/form-select';

interface SetsSelectsProps {
  currentSets: { [index: number]: SetNames };
  setPieces: 2 | 4;
  onSetNameChange: (event: { value: SetNames; setIndex: number }) => void;
}

function SetsSelects(props: SetsSelectsProps): ReactElement {
  const { currentSets, setPieces } = props;
  const setNames = Object.values(SetNames);
  const handleSetNameChange = (value: SetNames, setIndex: number): void => {
    props.onSetNameChange({ value, setIndex });
  };

  const firstSetSelect = (
    <FormSelect
      label="Set 1"
      data={setNames}
      selectedValue={currentSets[0]}
      isOptional={true}
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
        data={setNames}
        selectedValue={currentSets[1]}
        isOptional={true}
        onChange={(e) => handleSetNameChange(e, 1)}
      ></FormSelect>
    </Fragment>
  );
}

export default SetsSelects;
