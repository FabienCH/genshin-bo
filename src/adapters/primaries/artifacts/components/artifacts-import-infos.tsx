import { ReactElement } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = ({ palette }: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    importInfos: {
      margin: '5px 30px 0 10px',
    },
    artifactsInError: {
      color: palette.error.light,
    },
  });

interface ArtifactsImportInfosProps extends WithStyles<typeof styles> {
  foundFrames: number;
  importedArtifacts: number;
  artifactsInError: number;
}

function ArtifactsImportInfos(props: ArtifactsImportInfosProps): ReactElement {
  const { foundFrames, importedArtifacts, artifactsInError, classes } = props;
  return (
    <div className={classes.container}>
      <span className={classes.importInfos}>Found frames: {foundFrames}</span>
      <span className={classes.importInfos}>Imported artifacts: {importedArtifacts}</span>
      <span className={artifactsInError > 0 ? classes.importInfos + ' ' + classes.artifactsInError : classes.importInfos}>
        Artifacts in error: {artifactsInError}
      </span>
    </div>
  );
}

export default withStyles(styles)(ArtifactsImportInfos);
