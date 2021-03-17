import { ReactElement } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { ArtifactView } from '../../../domain/models/artifact-view';
import { StringFormatter } from '../../../domain/mappers/string-formatter';

const styles = ({ palette }: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    popoverContent: {
      backgroundColor: palette.primary.main,
      margin: 0,
      padding: 10,
      borderRadius: 10,
    },
    mainStat: {
      fontSize: 18,
    },
    subStats: {
      paddingLeft: 20,
    },
  });

interface ArtifactPopoverProps extends WithStyles<typeof styles> {
  artifact: ArtifactView;
  anchorEl: SVGElement | null;
}

function ArtifactPopover(props: ArtifactPopoverProps): ReactElement {
  const { artifact, anchorEl, classes } = props;

  const open = !!anchorEl;

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{ paper: classes.popoverContent }}
      disableRestoreFocus
    >
      {StringFormatter.upperCaseFirstChar(artifact.type)}
      <br />
      <span className={classes.mainStat}>{artifact.mainStat}</span>
      <br />+ {artifact.level} <br />
      <ul className={classes.subStats}>
        <li>{artifact.subStat1}</li>
        <li>{artifact.subStat2}</li>
        <li>{artifact.subStat3}</li>
        <li>{artifact.subStat4}</li>
      </ul>
      {artifact.set}
    </Popover>
  );
}

export default withStyles(styles)(ArtifactPopover);
