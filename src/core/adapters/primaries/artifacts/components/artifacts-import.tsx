import { ChangeEvent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ImportInfos } from '../../../redux/artifacts/artifacts-reducer';
import ArtifactsImportInfos from './artifacts-import-infos';
import FormSelect from '../../shared/form-select';
import RunButtons from '../../shared/run-buttons';

const styles = ({ palette }: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
    },
    uploadVideo: {
      alignSelf: 'center',
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
    threadsSelect: {
      flex: 1,
      maxWidth: 172,
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
  nbOfThreads: number;
  nbThreadsOptions: number[];
  fileChanged: (video: File) => void;
  nbThreadsChanged: (selectedNbThreads: number) => void;
  importArtifacts: () => void;
  cancelImport: () => void;
  overrideArtifactsChanged: (checked: boolean) => void;
}

function ArtifactsImport(props: ArtifactsImportProps): ReactElement {
  const { video, isImportRunning, importInfos, nbOfThreads, nbThreadsOptions, classes } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      props.fileChanged(event.target.files[0]);
    }
  };

  const handleNbThreadsChange = (selectedNbThreads: number): void => {
    props.nbThreadsChanged(selectedNbThreads);
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
    props.overrideArtifactsChanged(event.target.checked);
  };

  const videoName = video ? video.name : '';
  const tooltip = (
    <div>
      The more threads you use, the faster the import will be.
      <br />
      The max number of threads is given by the number of threads of your CPU minus 1.
    </div>
  );

  return (
    <Container className={classes.container}>
      <div className={classes.importFlex}>
        <label className={classes.uploadVideo} htmlFor="upload-video">
          <input className={classes.uploadVideoInput} id="upload-video" name="upload-video" type="file" onChange={handleFileChange} />

          <Button color="primary" variant="contained" component="span">
            Upload video
          </Button>
          <input className={classes.videoNameInput} id="video-name" name="video-name" type="text" value={videoName} disabled={true} />
        </label>

        <div className={classes.threadsSelect}>
          <FormSelect
            label="Threads"
            options={nbThreadsOptions}
            selectedValue={nbOfThreads}
            tooltipText={tooltip}
            onChange={(e) => handleNbThreadsChange(e)}
          ></FormSelect>
        </div>
      </div>

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
        <RunButtons
          runButtonLabel="Import Artifacts"
          canRun={!!video}
          isRunning={isImportRunning}
          runClicked={importArtifacts}
          cancelClicked={cancelImport}
        ></RunButtons>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsImport);
