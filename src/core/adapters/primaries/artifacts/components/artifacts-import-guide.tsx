import { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import ImportGuide from './import-guide';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = createStyles({
  container: {
    marginBottom: 20,
  },
  demoVideoButton: {
    marginLeft: 15,
  },
  downloadVideoLink: {
    display: 'flex',
    color: 'inherit',
    textDecoration: 'none',
  },
  getAppIcon: {
    marginRight: 5,
  },
  paperScrollPaper: { maxHeight: 'calc(100% - 128px)' },
});

type ArtifactsImportGuideProps = WithStyles<typeof styles>;

function ArtifactsImportGuide(props: ArtifactsImportGuideProps): ReactElement {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ForwardImportGuide = React.forwardRef(() => <ImportGuide onClose={handleClose}></ImportGuide>);

  return (
    <Container className={classes.container}>
      <p>
        Genshin BO gives you the possibility to import your artifacts from a video. If you just want to try it out you can download a demo
        video containing 70 artifacts. Otherwise, please read the import guide to learn how to record your artifacts. Note that you can only
        import 5 stars artifacts.
      </p>
      <Button color="primary" onClick={handleOpen}>
        Read Guide
      </Button>
      <Button className={classes.demoVideoButton} color="primary">
        <a
          className={classes.downloadVideoLink}
          href="https://github.com/FabienCH/genshin-bo-demo-video/blob/master/genshin-bo-demo-video.mp4?raw=true"
        >
          <GetAppIcon className={classes.getAppIcon}></GetAppIcon>Demo Video
        </a>
      </Button>
      <Dialog
        open={open}
        maxWidth="lg"
        classes={{
          paperScrollPaper: classes.paperScrollPaper,
        }}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ForwardImportGuide />
      </Dialog>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsImportGuide);
