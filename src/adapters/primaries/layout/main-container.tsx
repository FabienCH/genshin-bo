import { Fragment, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import ArtifactsContainer from '../artifacts/artifacts-container';
import { ArtifactsPresenter } from '../artifacts/artifacts-presenter';
import BuildsOptimizerContainer from '../builds-optimizer/containers/builds-optimizer-container';
import TabPanel from './tab-panel';

interface MainContainerProps {
  tabId: number;
}
const artifactsPresenter = new ArtifactsPresenter(
  ArtifactsDI.getArtifactsHandler(),
  ArtifactsDI.getArtifactsImporter(),
  ArtifactsDI.getArtifactsExporter(),
  ArtifactsDI.getVideoValidator(),
);

export const MainContainer = (props: MainContainerProps): ReactElement => {
  return (
    <Fragment>
      <TabPanel value={props.tabId} index={0}>
        <ArtifactsContainer artifactsPresenter={artifactsPresenter}></ArtifactsContainer>
      </TabPanel>
      <TabPanel value={props.tabId} index={1}>
        <BuildsOptimizerContainer></BuildsOptimizerContainer>
      </TabPanel>
    </Fragment>
  );
};
