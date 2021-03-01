import React, { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormSelect from '../shared/form-select';
import { CircletMainStatWithPlaceholder, circletMainStatsWithPlaceholder } from '../../../domain/models/circlet-artifact-data';
import { SandsMainStatWithPlaceholder, sandsMainStatsWithPlaceholder } from '../../../domain/models/sands-artifact-data';
import { gobletMainStatsWithPlaceholder, GobletMainStatWithPlaceholder } from '../../../domain/models/goblet-artifact-data';
import { ArtifactsMainStats } from './build-optimizer-container';

const styles = createStyles({
  mainStatDiv: {
    width: 180,
    marginRight: 30,
  },
});

interface ArtifactsMainSelectsProps extends WithStyles<typeof styles> {
  mainsStats: ArtifactsMainStats;
  onMainsStatsChange: (mainsStats: ArtifactsMainStats) => void;
}

function ArtifactsMainSelects(props: ArtifactsMainSelectsProps): ReactElement {
  const { mainsStats, classes } = props;

  const handleSandsMainChange = (sandsMain: SandsMainStatWithPlaceholder): void => {
    props.onMainsStatsChange({ ...mainsStats, sandsMain });
  };
  const handleGobletMainChange = (gobletMain: GobletMainStatWithPlaceholder): void => {
    props.onMainsStatsChange({ ...mainsStats, gobletMain });
  };
  const handleCircletMainChange = (circletMain: CircletMainStatWithPlaceholder): void => {
    props.onMainsStatsChange({ ...mainsStats, circletMain });
  };

  return (
    <div className={classes.mainStatDiv}>
      <FormSelect
        label="Sands Main"
        data={sandsMainStatsWithPlaceholder}
        selectedValue={mainsStats.sandsMain}
        onChange={handleSandsMainChange}
      ></FormSelect>
      <FormSelect
        label="Goblet Main"
        data={gobletMainStatsWithPlaceholder}
        selectedValue={mainsStats.gobletMain}
        onChange={handleGobletMainChange}
      ></FormSelect>
      <FormSelect
        label="Circlet Main"
        data={circletMainStatsWithPlaceholder}
        selectedValue={mainsStats.circletMain}
        onChange={handleCircletMainChange}
      ></FormSelect>
    </div>
  );
}

export default withStyles(styles)(ArtifactsMainSelects);
