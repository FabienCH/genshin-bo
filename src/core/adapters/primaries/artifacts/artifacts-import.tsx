import { ChangeEvent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = ({ palette }: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
    },
    uploadVideoInput: {
      display: 'none',
    },
    videoNameInput: {
      backgroundColor: 'transparent',
      color: palette.text.primary,
      marginLeft: 10,
      border: 'none',
    },
    importButton: {
      display: 'block',
      marginTop: 20,
    },
  });

interface ArtifactsImportProps extends WithStyles<typeof styles> {
  video?: File;
  handleFileChange: (video: File) => void;
  importArtifacts: () => void;
  handleOverrideArtifactsChange: (checked: boolean) => void;
}

function ArtifactsImport(props: ArtifactsImportProps): ReactElement {
  const { video, classes } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      props.handleFileChange(event.target.files[0]);
    }
  };

  const importArtifacts = (): void => {
    if (video) {
      props.importArtifacts();
    }
  };

  const handleOverrideArtifactsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.handleOverrideArtifactsChange(event.target.checked);
  };

  const videoName = video ? video.name : '';
  return (
    <Container className={classes.container}>
      <label htmlFor="upload-video">
        <input className={classes.uploadVideoInput} id="upload-video" name="upload-video" type="file" onChange={handleFileChange} />

        <Button color="primary" variant="contained" component="span">
          Upload video
        </Button>
        <input className={classes.videoNameInput} id="video-name" name="video-name" type="text" value={videoName} disabled={true} />
      </label>
      <Button className={classes.importButton} color="primary" variant="contained" disabled={!video} onClick={importArtifacts}>
        Import Artifacts
      </Button>
      <FormControlLabel
        control={<Checkbox onChange={handleOverrideArtifactsChange} name="override-artifacts" />}
        label="Override current artifacts"
      />
    </Container>
  );
}

export default withStyles(styles)(ArtifactsImport);
