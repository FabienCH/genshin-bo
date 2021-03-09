import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormSelect from '../shared/form-select';
import { CircletMainStatType, circletMainStats } from '../../../domain/models/circlet-artifact-data';
import { SandsMainStatType, sandsMainStats } from '../../../domain/models/sands-artifact-data';
import { gobletMainStats, GobletMainStatType } from '../../../domain/models/goblet-artifact-data';
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

  const handleSandsMainChange = (sandsMain: SandsMainStatType): void => {
    props.onMainsStatsChange({ ...mainsStats, sandsMain });
  };
  const handleGobletMainChange = (gobletMain: GobletMainStatType): void => {
    props.onMainsStatsChange({ ...mainsStats, gobletMain });
  };
  const handleCircletMainChange = (circletMain: CircletMainStatType): void => {
    props.onMainsStatsChange({ ...mainsStats, circletMain });
  };

  return (
    <div className={classes.mainStatDiv}>
      <FormSelect
        label="Sands Main"
        data={sandsMainStats}
        selectedValue={mainsStats.sandsMain}
        isOptional={true}
        onChange={handleSandsMainChange}
      ></FormSelect>
      <FormSelect
        label="Goblet Main"
        data={gobletMainStats}
        selectedValue={mainsStats.gobletMain}
        isOptional={true}
        onChange={handleGobletMainChange}
      ></FormSelect>
      <FormSelect
        label="Circlet Main"
        data={circletMainStats}
        selectedValue={mainsStats.circletMain}
        isOptional={true}
        onChange={handleCircletMainChange}
      ></FormSelect>
    </div>
  );
}

export default withStyles(styles)(ArtifactsMainSelects);
