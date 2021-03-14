import { ReactElement, Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import GboHeader from '../core/adapters/primaries/layout/header';
import { MainContainer } from '../core/adapters/primaries/layout/main-container';
import { ArtifactsDI } from '../core/di/artifacts-di';

type AppState = {
  tabId: number;
};
class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    ArtifactsDI.registerRepository();
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GboHeader tabId={this.state.tabId} onTabChange={this.handleTabChange}></GboHeader>
        <MainContainer tabId={this.state.tabId}></MainContainer>
      </ThemeProvider>
    );
  }
}

export default App;
