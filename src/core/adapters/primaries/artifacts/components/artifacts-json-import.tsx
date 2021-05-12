import { Fragment, ReactElement } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { JsonImportResults } from '../../../../usescases/artifacts-importer';
import Button from '@material-ui/core/Button';
import DialogContainer from '../../shared/dialog-container';

const styles = ({ palette }: Theme) =>
  createStyles({
    errorMessage: {
      color: palette.error.light,
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      marginTop: 20,
    },
  });

interface ArtifactsJsonImportProps extends WithStyles<typeof styles> {
  importResults: JsonImportResults;
  onClose: () => void;
  onImport: () => void;
}

function ArtifactsJsonImport(props: ArtifactsJsonImportProps): ReactElement {
  const { importResults, classes } = props;

  const handleClose = (): void => {
    props.onClose();
  };

  const handleImport = (): void => {
    props.onImport();
  };

  return (
    <DialogContainer title="Artifacts Import" onClose={handleClose}>
      <Fragment>
        {importResults.artifactsInError ? (
          <p className={classes.errorMessage}>{importResults.artifactsInError} artifact(s) contains error(s) and won't be imported.</p>
        ) : null}
        <p>
          You are about to import {importResults.artifacts.length} artifacts, do you want to continue ?<br />
          <b>This will delete you current artifacts.</b>
        </p>

        <div className={classes.buttonsContainer}>
          <Button color="primary" onClick={handleClose}>
            No
          </Button>

          <Button color="primary" variant="contained" onClick={handleImport}>
            Yes
          </Button>
        </div>
      </Fragment>
    </DialogContainer>
  );
}

export default withStyles(styles)(ArtifactsJsonImport);
