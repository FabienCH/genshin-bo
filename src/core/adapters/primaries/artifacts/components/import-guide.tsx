import { Fragment, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Theme } from '@material-ui/core';
import ImportGuideTable from './import-guide-table';
import outputTab from '../../../../../assets/import-guide-img/output-tab.jpg';
import resolution from '../../../../../assets/import-guide-img/resolution.jpg';
import source from '../../../../../assets/import-guide-img/source.jpg';
import cropFilter from '../../../../../assets/import-guide-img/crop-filter.jpg';

const styles = ({ palette }: Theme) =>
  createStyles({
    appBar: {
      position: 'sticky',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      paddingLeft: 12,
    },
    modalContent: {
      padding: 20,
    },
    link: {
      color: palette.primary.main,
      textDecoration: 'none',
    },
    img: {
      display: 'block',
      margin: 'auto',
    },
    notesContainer: {
      padding: '0 20px',
      marginLeft: 30,
      border: `1px solid ${palette.secondary.main}`,
    },
  });

interface ImportGuideProps extends WithStyles<typeof styles> {
  onClose: () => void;
}

function ImportGuide(props: ImportGuideProps): ReactElement {
  const { classes } = props;

  const handleClose = (): void => {
    props.onClose();
  };

  const performanceHeaderRows = [
    [{ value: 'Nb of Artifacts' }, { value: 'Duration for each CPU and threads', colSpan: 3 }],
    [{ value: '' }, { value: 'i5-6500 – 3 threads' }, { value: 'i5-8250U – 7 threads' }, { value: 'i3-6100U – 3 threads' }],
  ];
  const chromeRows = [
    [{ value: 210 }, { value: '6m42 (avg of 5)' }, { value: '8m31 (avg of 5)' }, { value: '17m26 (avg of 3)' }],
    [{ value: 630 }, { value: '20m56 (avg of 3)' }, { value: '29m33 (avg of 3)' }, { value: '50m38 (1)' }],
  ];
  const firefoxRows = [
    [{ value: 210 }, { value: '7m51 (avg of 5)' }, { value: '12m50 (avg of 5)' }, { value: '18m39 (avg of 3)' }],
    [{ value: 630 }, { value: '23m03 (avg of 3)' }, { value: '35m43 (avg of 3)' }, { value: '53m53 (1)' }],
  ];

  const resolutionsHeaderRows = [
    [{ value: 'Game resolution' }, { value: 'Output resolution' }, { value: 'Filter values (Left, Top, Right, Bottom)' }],
  ];
  const resolutionsRows = [
    [{ value: '1366 x 768' }, { value: '349 x 596' }, { value: '950 - 86 - 97 - 86' }],
    [{ value: '1920 x 1080' }, { value: '489 x 838' }, { value: '1294 - 121 - 137 - 121' }],
    [{ value: '2540 x 1440' }, { value: '652 x 1116' }, { value: '1725 - 162 - 183 - 162' }],
    [{ value: '3840 x 2160 (not tested)' }, { value: '978 x 1676' }, { value: '2588 - 242 - 274 - 242' }],
  ];

  return (
    <Fragment>
      <AppBar className={classes.appBar}>
        <h3 className={classes.title}>Artifacts Import Guide</h3>
        <IconButton color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </AppBar>
      <section className={classes.modalContent}>
        <h4>Prerequisites</h4>
        <ul>
          <li>
            Download and install OBS Studio:{' '}
            <a className={classes.link} href="https://obsproject.com/download" target="_blank" rel="noreferrer">
              https://obsproject.com/download
            </a>
          </li>
          <li>Set Genshin Impact language to English</li>
          <li>
            If you want to import more than 500 artifacts from 1 video, you need at least 2.5Go of free RAM. Otherwise, you can import them
            from 2 or 3 different videos.
          </li>
        </ul>

        <h4>Performance overview</h4>
        <p>
          Durations are an average of 1 to 5 imports for each case. As you can see, it seems better to use Chrome when you want to import
          artifacts.
        </p>
        <ImportGuideTable title="Chrome" rows={chromeRows} headerRows={performanceHeaderRows}></ImportGuideTable>
        <ImportGuideTable title="Firefox" rows={firefoxRows} headerRows={performanceHeaderRows}></ImportGuideTable>

        <h4>OBS configration</h4>
        <h5>Settings (right bottom button)</h5>
        <p>In the Output tab, set quality to Indistinguishable Quality and Recording Format to mp4. You can set the Recording Path.</p>
        <img className={classes.img} src={outputTab} alt="output settings" />
        <p>
          In the video tab, set Base and Output resolution to the same value, accordingly to the following table. There is values for
          different game resolutions but keep in mind that, if you can, you should always set your game resolution to 1920 x 1080 when
          recording your artifacts. Not doing so could reduce recognition accuracy and increase import duration because images will have to
          be rescale. Also, the recognition accuracy could be reduced at lower resolution.
        </p>
        <ImportGuideTable rows={resolutionsRows} headerRows={resolutionsHeaderRows}></ImportGuideTable>
        <p>Also set the FPS to 10, this is more than enough, having a low FPS will reduce the import duration</p>
        <img className={classes.img} src={resolution} alt="resolution settings" />
        <p>In the Hotkeys tab, you can also configure Start and Stop Recording hotkeys.</p>
        <h5>Settings (right bottom button)</h5>
        <p>Under Source, click on “+” and add a Windows Capture</p>
        <img className={classes.img} src={source} alt="source settings" />
        <p>
          The right click on your source and click Filters. At the bottom click on “+”, add a Crop/Pad filter and set the values from the
          table.
        </p>
        <img className={classes.img} src={cropFilter} alt="crop filter settings" />
        <p>Configuration is now done, you’re ready to start recording</p>

        <h4>Recording</h4>
        <div className={classes.notesContainer}>
          <h5>Important notes</h5>
          <p>
            You can only import 5 starts artifacts.
            <br />
            Start by recording just a view artifacts and try to import them to make sure everything is properly setup. Also, the Start and
            Stop recording hotkeys might not work if you don’t run OBS as administrator so if you have this issue, just close it and reopen
            it as administrator.
          </p>
        </div>
        <p>
          To record your artifacts, open your artifacts inventory, press your Start Recording hotkey and click on each of your artifacts.
          You can do it fast, recording at 10 FPS means that a frame is captured every 100ms. Once you’re done, just press you Stop
          Recording hotkey, your video should look like the demo video.
        </p>
      </section>
    </Fragment>
  );
}

export default withStyles(styles)(ImportGuide);
