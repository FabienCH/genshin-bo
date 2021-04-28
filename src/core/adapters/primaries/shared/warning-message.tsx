import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { Theme } from '@material-ui/core';

const styles = ({ palette }: Theme) =>
  createStyles({
    warningContainer: {
      display: 'flex',
      alignItems: 'center',
      color: palette.warning.light,
    },
    icon: {
      float: 'left',
      marginRight: 10,
    },
  });

interface WarningMessageProps extends WithStyles<typeof styles> {
  message: string;
}

function WarningMessage(props: WarningMessageProps): ReactElement {
  const { message, classes } = props;

  return (
    <span className={classes.warningContainer}>
      <WarningIcon className={classes.icon}></WarningIcon>
      {message}
    </span>
  );
}

export default withStyles(styles)(WarningMessage);
