import { ChangeEvent, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

const styles = createStyles({
  buttonsContainer: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  uploadJson: {
    marginRight: 10,
  },
  uploadJsonInput: {
    display: 'none',
  },
  icon: {
    marginRight: 5,
  },
});

interface ArtifactsImportExportButtonsProps extends WithStyles<typeof styles> {
  canImportArtifact: boolean;
  canExportArtifact: boolean;
  jsonFileChange: (jsonFile: File) => void;
  exportArtifacts: () => void;
}

function ArtifactsImportExportButtons(props: ArtifactsImportExportButtonsProps): ReactElement {
  const { canImportArtifact, canExportArtifact, classes } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      props.jsonFileChange(event.target.files[0]);
      event.target.value = '';
    }
  };

  const handleExportArtifacts = (): void => {
    props.exportArtifacts();
  };

  return (
    <div className={classes.buttonsContainer}>
      <label className={classes.uploadJson} htmlFor="upload-json">
        <input
          className={classes.uploadJsonInput}
          id="upload-json"
          name="upload-json"
          type="file"
          disabled={!canImportArtifact}
          onChange={handleFileChange}
        />

        <Button color="primary" component="span" disabled={!canImportArtifact}>
          <PublishIcon className={classes.icon}></PublishIcon>Import Artifacts
        </Button>
      </label>

      <Button color="primary" disabled={!canExportArtifact} onClick={handleExportArtifacts}>
        <GetAppIcon className={classes.icon}></GetAppIcon>Export Artifacts
      </Button>
    </div>
  );
}

export default withStyles(styles)(ArtifactsImportExportButtons);
