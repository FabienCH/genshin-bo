import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import ImportGuideTable, { Row } from './import-guide-table';
import outputTab from '../../../../assets/import-guide-img/output-tab.jpg';
import resolution from '../../../../assets/import-guide-img/resolution.jpg';
import source from '../../../../assets/import-guide-img/source.jpg';
import cropFilter from '../../../../assets/import-guide-img/crop-filter.jpg';

const styles = ({ palette }: Theme) =>
  createStyles({
    img: {
      display: 'block',
      margin: 'auto',
    },
    notesContainer: {
      padding: '0 20px',
      margin: '0 30px',
      border: `1px solid ${palette.secondary.main}`,
    },
  });

type PcImportGuideProps = WithStyles<typeof styles>;

function PcImportGuide(props: PcImportGuideProps): ReactElement {
  const { classes } = props;

  const resolutionsHeaderRows: Row[] = [
    [{ value: 'Game resolution' }, { value: 'Output resolution' }, { value: 'Filter values (Left, Top, Right, Bottom)' }],
  ];
  const resolutionsRows: Row[] = [
    [{ value: '1366 x 768' }, { value: '349 x 596' }, { value: '950 - 86 - 97 - 86' }],
    [{ value: '1920 x 1080' }, { value: '489 x 838' }, { value: '1294 - 121 - 137 - 121' }],
    [{ value: '2540 x 1440' }, { value: '652 x 1116' }, { value: '1725 - 162 - 183 - 162' }],
    [{ value: '3840 x 2160 (not tested)' }, { value: '978 x 1676' }, { value: '2588 - 242 - 274 - 242' }],
  ];

  return (
    <div>
      <h4>OBS configuration</h4>
      <h5>Settings (right bottom button)</h5>
      <p>In the Output tab, set quality to Indistinguishable Quality and Recording Format to mp4. You can set the Recording Path.</p>
      <img className={classes.img} src={outputTab} alt="output settings" />
      <p>
        In the video tab, set Base and Output resolution to the same value, accordingly to the following table. There is values for
        different game resolutions but keep in mind that, if you can, you should always set your game resolution to 1920 x 1080 when
        recording your artifacts. Not doing so could reduce recognition accuracy and increase import duration because images will have to be
        rescale. Also, the recognition accuracy could be reduced at lower resolution.
      </p>
      <ImportGuideTable rows={resolutionsRows} headerRows={resolutionsHeaderRows}></ImportGuideTable>
      <p>Also set the FPS to 10, this is more than enough, having a low FPS will reduce the import duration</p>
      <img className={classes.img} src={resolution} alt="resolution settings" />
      <p>In the Hotkeys tab, you can also configure Start and Stop Recording hotkeys.</p>
      <h5>Configure source</h5>
      <p>
        First, launch Genshin Impact. Once it's done, under Source, click on “+”, add a Windows Capture, click Ok and make sure the Windows
        is set to GenshinImpact.exe.
      </p>
      <img className={classes.img} src={source} alt="source settings" />
      <p>
        The right click on your source and click Filters. At the bottom click on “+”, add a Crop/Pad filter and set the values from the
        table.
      </p>
      <img className={classes.img} src={cropFilter} alt="crop filter settings" />
      <p>Configuration is now done, if you open your artifacts inventory, the OBS preview should exactly fit the selected artifact.</p>

      <h4>Recording</h4>
      <div className={classes.notesContainer}>
        <h5>Important notes</h5>
        <p>
          You can only import 5 starts artifacts.
          <br />
          Start by recording just a view artifacts and try to import them to make sure everything is properly setup. Also, the Start and
          Stop recording hotkeys might not work if you don’t run OBS as administrator so if you have this issue, just close it and reopen it
          as administrator.
        </p>
      </div>
      <p>
        To record your artifacts, open your artifacts inventory, press your Start Recording hotkey and click on each of your artifacts. You
        can do it fast, recording at 10 FPS means that a frame is captured every 100ms. Once you’re done, just press you Stop Recording
        hotkey, your video should look like the demo video.
      </p>
    </div>
  );
}

export default withStyles(styles)(PcImportGuide);
