import { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  runButton: {
    minWidth: 100,
  },
  cancelButton: {
    marginRight: 20,
  },
});

interface RunButtonsProps extends WithStyles<typeof styles> {
  runButtonLabel: string;
  isRunning: boolean;
  canRun: boolean;
  runClicked: () => void;
  cancelClicked: () => void;
}

function RunButtons(props: RunButtonsProps): ReactElement {
  const { runButtonLabel, isRunning, canRun, classes } = props;

  const handleRunClick = (): void => {
    if (canRun) {
      props.runClicked();
    }
  };

  const handleCancelClick = (): void => {
    props.cancelClicked();
  };

  const buttonLabel = isRunning ? 'Running' : runButtonLabel;
  return (
    <div className={classes.buttonsContainer}>
      {isRunning ? (
        <Button className={classes.cancelButton} color="primary" onClick={handleCancelClick}>
          Cancel
        </Button>
      ) : null}
      <Button className={classes.runButton} color="primary" variant="contained" disabled={!canRun || isRunning} onClick={handleRunClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}

export default withStyles(styles)(RunButtons);
