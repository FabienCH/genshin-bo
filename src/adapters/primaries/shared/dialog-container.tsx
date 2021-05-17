import { Fragment, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = createStyles({
  appBar: {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingLeft: 17,
  },
  modalContent: {
    padding: 20,
  },
});

interface DialogContainerProps extends WithStyles<typeof styles> {
  title: string;
  children: ReactElement;
  onClose: () => void;
}

function DialogContainer(props: DialogContainerProps): ReactElement {
  const { children, title, classes } = props;

  const handleClose = (): void => {
    props.onClose();
  };

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <h3 className={classes.title}>{title}</h3>
        <IconButton color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </AppBar>
      <section className={classes.modalContent}>{children}</section>
    </Fragment>
  );
}

export default withStyles(styles)(DialogContainer);
