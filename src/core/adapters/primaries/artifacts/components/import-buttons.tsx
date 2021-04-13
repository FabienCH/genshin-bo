import { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  importButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  importButton: {
    display: 'block',
    marginTop: 20,
  },
  cancelButton: {
    display: 'block',
    marginTop: 20,
    marginRight: 20,
  },
});

interface ImportButtonsProps extends WithStyles<typeof styles> {
  video?: File;
  isImportRunning: boolean;
  importArtifactsClicked: () => void;
  cancelImportClicked: () => void;
}

function ImportButtons(props: ImportButtonsProps): ReactElement {
  const { video, isImportRunning, classes } = props;

  const handleImportArtifactsClick = (): void => {
    if (video) {
      props.importArtifactsClicked();
    }
  };

  const handleCancelImportClick = (): void => {
    props.cancelImportClicked();
  };

  const importButtonLabel = isImportRunning ? 'Running' : 'Import Artifacts';
  return (
    <div className={classes.importButtonsContainer}>
      {isImportRunning ? (
        <Button className={classes.cancelButton} color="primary" onClick={handleCancelImportClick}>
          Cancel
        </Button>
      ) : null}
      <Button
        className={classes.importButton}
        color="primary"
        variant="contained"
        disabled={!video || isImportRunning}
        onClick={handleImportArtifactsClick}
      >
        {importButtonLabel}
      </Button>
    </div>
  );
}

export default withStyles(styles)(ImportButtons);
