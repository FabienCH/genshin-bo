import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const styles = createStyles({
  helpIconSup: {
    display: 'inline-block',
    height: 22,
    padding: 3,
    cursor: 'pointer',
  },
  helpIcon: {
    fontSize: '1rem',
  },
});

interface HelpIconTooltipProps extends WithStyles<typeof styles> {
  tooltipText: NonNullable<React.ReactNode>;
}

function HelpIconTooltip(props: HelpIconTooltipProps): ReactElement {
  const { tooltipText, classes } = props;

  return (
    <Tooltip title={tooltipText} placement="top-start" interactive>
      <sup className={classes.helpIconSup}>
        <HelpIcon className={classes.helpIcon} />
      </sup>
    </Tooltip>
  );
}

export default withStyles(styles)(HelpIconTooltip);
