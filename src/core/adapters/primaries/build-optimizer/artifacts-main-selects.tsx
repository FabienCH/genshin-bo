import React, { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormSelect from '../shared/form-select';
import { CircletMainStatWithPlaceholder, circletMainStatWithPlaceholder } from '../../../domain/models/circlet-artifact-data';
import { SandsMainStatWithPlaceholder, sandsMainStatWithPlaceholder } from '../../../domain/models/sands-artifact-data';
import { gobletMainStatWithPlaceholder, GobletMainStatWithPlaceholder } from '../../../domain/models/goblet-artifact-data';

const styles = createStyles({
  mainStatDiv: {
    width: 180,
    marginRight: 30,
  },
});

interface ArtifactsMainSelectsProps extends WithStyles<typeof styles> {
  sandsMain: SandsMainStatWithPlaceholder;
  gobletMain: GobletMainStatWithPlaceholder;
  circletMain: CircletMainStatWithPlaceholder;
  onSandsMainChange: (sandsMain: SandsMainStatWithPlaceholder) => void;
  onGobletMainChange: (gobletMain: GobletMainStatWithPlaceholder) => void;
  onCircletMainChange: (circletMain: CircletMainStatWithPlaceholder) => void;
}

function ArtifactsMainSelects(props: ArtifactsMainSelectsProps): ReactElement {
  const { sandsMain, gobletMain, circletMain, classes } = props;

  const handleSandsMainChange = (value: SandsMainStatWithPlaceholder): void => {
    props.onSandsMainChange(value);
  };
  const handleGobletMainChange = (value: GobletMainStatWithPlaceholder): void => {
    props.onGobletMainChange(value);
  };
  const handleCircletMainChange = (value: CircletMainStatWithPlaceholder): void => {
    props.onCircletMainChange(value);
  };

  return (
    <div className={classes.mainStatDiv}>
      <FormSelect
        label="Sands Main"
        data={sandsMainStatWithPlaceholder}
        selectedValue={sandsMain}
        onChange={handleSandsMainChange}
      ></FormSelect>
      <FormSelect
        label="Goblet Main"
        data={gobletMainStatWithPlaceholder}
        selectedValue={gobletMain}
        onChange={handleGobletMainChange}
      ></FormSelect>
      <FormSelect
        label="Circlet Main"
        data={circletMainStatWithPlaceholder}
        selectedValue={circletMain}
        onChange={handleCircletMainChange}
      ></FormSelect>
    </div>
  );
}

export default withStyles(styles)(ArtifactsMainSelects);
