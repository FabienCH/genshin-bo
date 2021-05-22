import { ChangeEvent, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Container, InputLabel, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { ImportInfos } from '../../../redux/artifacts/artifacts-reducer';
import ArtifactsImportInfos from './artifacts-import-infos';
import FormSelect from '../../shared/form-select';
import RunButtons from '../../shared/run-buttons';
import HelpIconTooltip from '../../shared/help-icon-tooltip';

const styles = ({ palette }: Theme) =>
  createStyles({
    container: {
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'space-between',
    },
    importFlex: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    leftSide: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    rightSide: {
      flexDirection: 'row',
    },
    uploadVideo: {
      alignSelf: 'flex-start',
      margin: '10px 0',
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
    importCheckboxes: {
      display: 'flex',
    },
    ocrCheckboxLabel: {
      position: 'relative',
      top: 2,
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
  fixOcrErrorsChanged: (checked: boolean) => void;
}

function ArtifactsImport(props: ArtifactsImportProps): ReactElement {
  const { video, isImportRunning, importInfos, nbOfThreads, nbThreadsOptions, classes } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      props.fileChanged(event.target.files[0]);
      event.target.value = '';
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

  const handleFixOcrErrorsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.fixOcrErrorsChanged(event.target.checked);
  };

  const videoName = video ? video.name : '';
  const threadTooltip = (
    <div>
      The more threads you use, the faster the import will be.
      <br />
      The max number of threads is given by the number of threads of your CPU minus 1.
    </div>
  );

  const fixOcrTooltip = (
    <div>
      Unrecognized main stat value will be determined from the artifact's level.
      <br />
      Unrecognized artifact type, stats type or set will be fixed if more than 80% of the characters are matching an existing artifact type,
      stats type or set.
    </div>
  );

  return (
    <Container className={classes.container}>
      <div className={`${classes.importFlex} ${classes.leftSide}`}>
        <label className={classes.uploadVideo} htmlFor="upload-video">
          <input
            className={classes.uploadVideoInput}
            id="upload-video"
            name="upload-video"
            type="file"
            accept="video/mp4"
            onChange={handleFileChange}
          />

          <Button color="primary" variant="contained" component="span">
            Upload video
          </Button>
          <input className={classes.videoNameInput} id="video-name" name="video-name" type="text" value={videoName} disabled={true} />
        </label>

        <div className={classes.importCheckboxes}>
          <FormControlLabel
            control={<Checkbox onChange={handleOverrideArtifactsChange} name="override-artifacts" />}
            label="Override current artifacts"
          />
          <Checkbox id="fix-ocr-checkbox" name="fix-ocr-errors" onChange={handleFixOcrErrorsChange} />
          <InputLabel htmlFor="fix-ocr-checkbox" className={classes.ocrCheckboxLabel}>
            Try to fix recognition errors
            {<HelpIconTooltip tooltipText={fixOcrTooltip}></HelpIconTooltip>}
          </InputLabel>
        </div>
      </div>

      <div className={`${classes.importFlex} ${classes.rightSide}`}>
        {video ? (
          <ArtifactsImportInfos
            foundFrames={importInfos.foundFrames}
            importedArtifacts={importInfos.importedArtifacts}
            artifactsInError={importInfos.artifactsInError}
          ></ArtifactsImportInfos>
        ) : null}
        <div>
          <FormSelect
            label="Threads"
            options={nbThreadsOptions}
            selectedValue={nbOfThreads}
            tooltipText={threadTooltip}
            onChange={(e) => handleNbThreadsChange(e)}
          ></FormSelect>
          <RunButtons
            runButtonLabel="Import Artifacts"
            canRun={!!video}
            isRunning={isImportRunning}
            runClicked={importArtifacts}
            cancelClicked={cancelImport}
          ></RunButtons>
        </div>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsImport);
