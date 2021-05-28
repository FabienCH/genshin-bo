import { ChangeEvent, ReactElement } from 'react';
import logo from '../../../assets/logo.png';
import paypalIcon from '../../../assets/paypal-icon.svg';
import discordIcon from '../../../assets/discord-icon.svg';
import { AppBar, Tabs, Tab, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = ({ palette }: Theme) =>
  createStyles({
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
    button: {
      marginRight: 10,
    },
    link: {
      color: palette.primary.contrastText,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    linkIcon: {
      height: 20,
      marginRight: 10,
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
        <Button className={classes.button} color="primary">
          <a className={classes.link} href="https://www.paypal.com/donate?hosted_button_id=BLNWZTD8LUEH2" target="_blank" rel="noreferrer">
            <img className={classes.linkIcon} src={paypalIcon} alt="Paypal Icon" />
            Paypal
          </a>
        </Button>
        <Button className={classes.button} color="primary">
          <a className={classes.link} href="https://discord.gg/S38Hexrt" target="_blank" rel="noreferrer">
            <img className={classes.linkIcon} src={discordIcon} alt="Discord Icon" />
            Discord
          </a>
        </Button>
      </div>
    </AppBar>
  );
}

export default withStyles(styles)(GboHeader);
