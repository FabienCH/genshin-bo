import { ReactElement, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core';
import ArtifactsImport from './components/artifacts-import';
import ArtifactsImportGuide from './components/artifacts-import-guide';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import ArtifactsImportExportButtons from './components/artifacts-import-export-buttons';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import ArtifactsJsonImport from './components/artifacts-json-import';
import { ArtifactsContainerState, ArtifactsPresenter } from './artifacts-presenter';
import React from 'react';
import { useSelector } from 'react-redux';

const styles = createStyles({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  artifactsCount: { marginBottom: 5 },
});

type ArtifactsContainerProps = { artifactsPresenter: ArtifactsPresenter } & WithStyles<typeof styles>;

function ArtifactsContainer(props: ArtifactsContainerProps): ReactElement {
  const { artifactsPresenter, classes } = props;
  const [localState, setLocalState] = React.useState<ArtifactsContainerState>(artifactsPresenter.getLocalState());
  const { video, nbOfThreads, nbThreadsOptions, errorMessage, jsonImportResults } = localState;
  const { artifacts, isImportRunning, importInfos, canExportArtifact } = useSelector(artifactsPresenter.getReduxSelectors());

  useEffect(() => {
    artifactsPresenter.onStateUpdated((state) => {
      setLocalState({ ...state });
    });
  }, [artifactsPresenter]);

  const onGridReady = (params: GridReadyEvent): void => {
    params.api.sizeColumnsToFit();
  };

  const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    lockVisible: true,
  };

  const columnDefs: ColDef[] = [
    {
      field: 'type',
      width: 100,
    },
    {
      field: 'level',
      width: 80,
    },
    {
      field: 'set',
      width: 170,
    },
    {
      field: 'mainStat',
      width: 170,
    },
    {
      headerName: 'Sub Stat 1',
      field: 'subStat1',
      width: 170,
    },
    {
      headerName: 'Sub Stat 2',
      field: 'subStat2',
      width: 170,
    },
    {
      headerName: 'Sub Stat 3',
      field: 'subStat3',
      width: 170,
    },
    {
      headerName: 'Sub Stat 4',
      field: 'subStat4',
      width: 170,
    },
  ];

  return (
    <section>
      <h2>Import Artifacts</h2>
      <ArtifactsImportGuide></ArtifactsImportGuide>
      <ArtifactsImport
        video={video}
        isImportRunning={isImportRunning}
        importInfos={importInfos}
        nbThreadsOptions={nbThreadsOptions}
        nbOfThreads={nbOfThreads}
        fileChanged={artifactsPresenter.videoFileChange.bind(artifactsPresenter)}
        nbThreadsChanged={artifactsPresenter.nbThreadsChange.bind(artifactsPresenter)}
        importArtifacts={artifactsPresenter.importArtifactsFromVideo.bind(artifactsPresenter)}
        cancelImport={artifactsPresenter.cancelImport.bind(artifactsPresenter)}
        overrideArtifactsChanged={artifactsPresenter.overrideArtifactsChange.bind(artifactsPresenter)}
        fixOcrErrorsChanged={artifactsPresenter.fixOcrErrorsChange.bind(artifactsPresenter)}
      ></ArtifactsImport>
      <Container>
        <div className={classes.actionsContainer}>
          <ArtifactsImportExportButtons
            canImportArtifact={!isImportRunning}
            canExportArtifact={canExportArtifact}
            jsonFileChange={artifactsPresenter.jsonFileChange.bind(artifactsPresenter)}
            exportArtifacts={artifactsPresenter.exportArtifacts.bind(artifactsPresenter)}
          ></ArtifactsImportExportButtons>
          <span className={classes.artifactsCount}>artifacts: {artifacts.length}</span>
        </div>
        <div style={{ height: 750, width: '100%' }} className="ag-theme-material">
          <AgGridReact rowData={artifacts} defaultColDef={defaultColDef} columnDefs={columnDefs} onGridReady={onGridReady}>
            <AgGridColumn field="type"></AgGridColumn>
            <AgGridColumn field="level"></AgGridColumn>
            <AgGridColumn field="set"></AgGridColumn>
            <AgGridColumn field="mainStat"></AgGridColumn>
            <AgGridColumn field="subStat1"></AgGridColumn>
            <AgGridColumn field="subStat2"></AgGridColumn>
            <AgGridColumn field="subStat3"></AgGridColumn>
            <AgGridColumn field="subStat4"></AgGridColumn>
          </AgGridReact>
        </div>
      </Container>
      <Snackbar open={!!errorMessage} autoHideDuration={7000} onClose={artifactsPresenter.handleAlertClose.bind(artifactsPresenter)}>
        <Alert onClose={artifactsPresenter.handleAlertClose.bind(artifactsPresenter)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Dialog
        data-testid="json-import-modal"
        open={!!jsonImportResults}
        maxWidth="sm"
        onClose={artifactsPresenter.handleDialogClose.bind(artifactsPresenter)}
        aria-labelledby="json-import-modal"
      >
        {jsonImportResults ? (
          <ArtifactsJsonImport
            importResults={jsonImportResults}
            onClose={artifactsPresenter.handleDialogClose.bind(artifactsPresenter)}
            onImport={artifactsPresenter.handleImportFromJson.bind(artifactsPresenter)}
          ></ArtifactsJsonImport>
        ) : null}
      </Dialog>
    </section>
  );
}

export default withStyles(styles)(ArtifactsContainer);
