import { ChangeEvent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ImportInfos } from '../../../redux/artifacts/artifacts-reducer';
import ArtifactsImportInfos from './artifacts-import-infos';
import ImportButtons from './import-buttons';

const styles = ({ palette }: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
    },
    uploadVideo: {
      display: 'block',
    },
    uploadVideoInput: {
      display: 'none',
    },
    videoNameInput: {
      backgroundColor: 'transparent',
      color: palette.text.primary,
      marginLeft: 10,
      border: 'none',
      textOverflow: 'ellipsis',
      width: 200,
    },
    importFlex: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  });

interface ArtifactsImportProps extends WithStyles<typeof styles> {
  video?: File;
  isImportRunning: boolean;
  importInfos: ImportInfos;
  handleFileChange: (video: File) => void;
  importArtifacts: () => void;
  cancelImport: () => void;
  handleOverrideArtifactsChange: (checked: boolean) => void;
}

function ArtifactsImport(props: ArtifactsImportProps): ReactElement {
  const { video, isImportRunning, importInfos, classes } = props;

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

  const cancelImport = (): void => {
    props.cancelImport();
  };

  const handleOverrideArtifactsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.handleOverrideArtifactsChange(event.target.checked);
  };

  const videoName = video ? video.name : '';
  return (
    <Container className={classes.container}>
      <label className={classes.uploadVideo} htmlFor="upload-video">
        <input className={classes.uploadVideoInput} id="upload-video" name="upload-video" type="file" onChange={handleFileChange} />

        <Button color="primary" variant="contained" component="span">
          Upload video
        </Button>
        <input className={classes.videoNameInput} id="video-name" name="video-name" type="text" value={videoName} disabled={true} />
      </label>

      <div className={classes.importFlex}>
        <FormControlLabel
          control={<Checkbox onChange={handleOverrideArtifactsChange} name="override-artifacts" />}
          label="Override current artifacts"
        />
        {video ? (
          <ArtifactsImportInfos
            foundFrames={importInfos.foundFrames}
            importedArtifacts={importInfos.importedArtifacts}
            artifactsInError={importInfos.artifactsInError}
          ></ArtifactsImportInfos>
        ) : null}
        <ImportButtons
          video={video}
          isImportRunning={isImportRunning}
          importArtifactsClicked={importArtifacts}
          cancelImportClicked={cancelImport}
        ></ImportButtons>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsImport);
