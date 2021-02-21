import { ReactElement, Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';

type AppState = {
  tabId: number;
};
class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
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
        Hello World
      </ThemeProvider>
    );
  }
}

export default App;
