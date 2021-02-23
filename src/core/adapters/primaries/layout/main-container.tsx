import { Fragment, ReactElement } from 'react';
import ArtifactsContainer from '../artifacts/artifacts-container';
import TabPanel from './tab-panel';

interface MainContainerProps {
  tabId: number;
}

export const MainContainer = (props: MainContainerProps): ReactElement => {
  return (
    <Fragment>
      <TabPanel value={props.tabId} index={0}>
        <ArtifactsContainer></ArtifactsContainer>
      </TabPanel>
      <TabPanel value={props.tabId} index={1}>
        Build Optimizer
      </TabPanel>
    </Fragment>
  );
};
