import { Fragment, ReactElement } from 'react';
import paypalIcon from '../../../assets/paypal-icon.svg';
import discordIcon from '../../../assets/discord-icon.svg';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = ({ palette }: Theme) =>
  createStyles({
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

interface LinksButtonsProps extends WithStyles<typeof styles> {
  size?: 'small' | 'medium' | 'large';
}

function LinksButtons(props: LinksButtonsProps): ReactElement {
  const { size = 'medium', classes } = props;

  return (
    <Fragment>
      <Button className={classes.button} color="primary" size={size}>
        <a className={classes.link} href="https://www.paypal.com/donate?hosted_button_id=BLNWZTD8LUEH2" target="_blank" rel="noreferrer">
          <img className={classes.linkIcon} src={paypalIcon} alt="Paypal Icon" />
          Paypal
        </a>
      </Button>
      <Button className={classes.button} color="primary" size={size}>
        <a className={classes.link} href="https://discord.gg/cqWjcg9TRf" target="_blank" rel="noreferrer">
          <img className={classes.linkIcon} src={discordIcon} alt="Discord Icon" />
          Discord
        </a>
      </Button>
    </Fragment>
  );
}

export default withStyles(styles)(LinksButtons);
