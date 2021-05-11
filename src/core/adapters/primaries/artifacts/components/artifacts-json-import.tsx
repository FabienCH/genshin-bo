import { Fragment, ReactElement } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { JsonImportResults } from '../../../../usescases/artifacts-importer';
import Button from '@material-ui/core/Button';

const styles = ({ palette }: Theme) =>
  createStyles({
    appBar: {
      position: 'sticky',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    errorMessage: {
      color: palette.error.light,
    },
    title: {
      paddingLeft: 12,
    },
    modalContent: {
      padding: 20,
      textAlign: 'center',
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
    <Fragment>
      <AppBar className={classes.appBar}>
        <h3 className={classes.title}>Artifacts Import</h3>
        <IconButton color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </AppBar>
      <section className={classes.modalContent}>
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
      </section>
    </Fragment>
  );
}

export default withStyles(styles)(ArtifactsJsonImport);
