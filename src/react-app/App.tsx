import { ReactElement, Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import GboHeader from '../adapters/primaries/layout/header';
import { MainContainer } from '../adapters/primaries/layout/main-container';
import { ArtifactsDI } from '../di/artifacts-di';
import { appStore } from '../adapters/redux/store';
import { Provider } from 'react-redux';

type AppState = {
  tabId: number;
};
class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    ArtifactsDI.registerRepository();
    ArtifactsDI.registerOcrWorker();
    this.state = { tabId: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(newTabId: number): void {
    this.setState((state) => ({
      ...state,
      tabId: newTabId,
    }));
  }

  render(): ReactElement {
    return (
      <Provider store={appStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GboHeader tabId={this.state.tabId} onTabChange={this.handleTabChange}></GboHeader>
          <MainContainer tabId={this.state.tabId}></MainContainer>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
