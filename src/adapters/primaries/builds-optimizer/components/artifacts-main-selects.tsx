import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormSelect from '../../shared/form-select';
import { CircletMainStatType, circletMainStats } from '../../../../domain/artifacts/models/circlet-artifact-data';
import { GobletMainStatType, gobletMainStats } from '../../../../domain/artifacts/models/goblet-artifact-data';
import { ArtifactsMainStats } from '../../../../domain/artifacts/models/main-statistics';
import { SandsMainStatType, sandsMainStats } from '../../../../domain/artifacts/models/sands-artifact-data';

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
        options={sandsMainStats}
        selectedValue={mainsStats.sandsMain}
        isOptional={true}
        onChange={handleSandsMainChange}
      ></FormSelect>
      <FormSelect
        label="Goblet Main"
        options={gobletMainStats}
        selectedValue={mainsStats.gobletMain}
        isOptional={true}
        onChange={handleGobletMainChange}
      ></FormSelect>
      <FormSelect
        label="Circlet Main"
        options={circletMainStats}
        selectedValue={mainsStats.circletMain}
        isOptional={true}
        onChange={handleCircletMainChange}
      ></FormSelect>
    </div>
  );
}

export default withStyles(styles)(ArtifactsMainSelects);
