import { ChangeEvent, ReactElement } from 'react';
import logo from '../../../assets/logo.png';
import { AppBar, Tabs, Tab, createStyles, withStyles, WithStyles } from '@material-ui/core';
import LinksButtons from './links-buttons';

const styles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: '200px',
    display: 'flex',
    alignSelf: 'center',
  },
  tab: {
    fontFamily: 'genshin-font',
    letterSpacing: '0.07em',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    flex: 'auto',
    justifyContent: 'flex-end',
  },
});

interface HeaderProps extends WithStyles<typeof styles> {
  tabId: number;
  onTabChange: (newTabId: number) => void;
}

function GboHeader(props: HeaderProps): ReactElement {
  const handleChange = (_: ChangeEvent<Record<string, unknown>>, newTabId: number): void => {
    props.onTabChange(newTabId);
  };
  const { classes, tabId } = props;

  return (
    <AppBar className={classes.header} position="static">
      <img src={logo} alt="app logo" className={classes.logo} />
      <Tabs value={tabId} onChange={handleChange} aria-label="simple tabs example">
        <Tab className={classes.tab} label="Artifacts" />
        <Tab className={classes.tab} label="Builds Optimizer" />
      </Tabs>
      <div className={classes.links}>
        <LinksButtons></LinksButtons>
      </div>
    </AppBar>
  );
}

export default withStyles(styles)(GboHeader);
