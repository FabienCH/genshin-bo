import { Fragment, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import ImportGuideTable, { Row } from './import-guide-table';
import DialogContainer from '../../shared/dialog-container';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import PcImportGuide from './pc-import-guide';
import Ps4ImportGuide from './ps4-import-guide';

const styles = ({ palette }: Theme) =>
  createStyles({
    link: {
      color: palette.primary.main,
      textDecoration: 'none',
    },
    accordionsContainer: {
      marginTop: 20,
    },
  });

interface ImportGuideProps extends WithStyles<typeof styles> {
  onClose: () => void;
}

function ImportGuide(props: ImportGuideProps): ReactElement {
  const { classes } = props;

  const [expanded, setExpanded] = React.useState<'pc-panel' | 'ps4-panel' | false>(false);

  const handleAccordionChange = (panel: 'pc-panel' | 'ps4-panel') => (_: React.ChangeEvent<unknown>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = (): void => {
    props.onClose();
  };

  const performanceHeaderRows: Row[] = [
    [{ value: 'Nb of Artifacts' }, { value: 'Duration for each CPU and threads', colSpan: 3 }],
    [{ value: '' }, { value: 'i5-6500 – 3 threads' }, { value: 'i5-8250U – 7 threads' }, { value: 'i3-6100U – 3 threads' }],
  ];
  const chromeRows: Row[] = [
    [{ value: 210 }, { value: '6m42 (avg of 5)' }, { value: '8m31 (avg of 5)' }, { value: '17m26 (avg of 3)' }],
    [{ value: 630 }, { value: '20m56 (avg of 3)' }, { value: '29m33 (avg of 3)' }, { value: '50m38 (1)' }],
  ];
  const firefoxRows: Row[] = [
    [{ value: 210 }, { value: '7m51 (avg of 5)' }, { value: '12m50 (avg of 5)' }, { value: '18m39 (avg of 3)' }],
    [{ value: 630 }, { value: '23m03 (avg of 3)' }, { value: '35m43 (avg of 3)' }, { value: '53m53 (1)' }],
  ];

  return (
    <DialogContainer title="Artifacts Import Guide" onClose={handleClose}>
      <Fragment>
        <h4>Prerequisites</h4>
        <ul>
          <li>
            [PC] Download and install OBS Studio:{' '}
            <a className={classes.link} href="https://obsproject.com/download" target="_blank" rel="noreferrer">
              https://obsproject.com/download
            </a>
          </li>
          <li>
            [PS4] Download and install Avidemux (or any other video editor you may be already familiar with):{' '}
            <a className={classes.link} href="http://avidemux.sourceforge.net/download.html" target="_blank" rel="noreferrer">
              http://avidemux.sourceforge.net/download
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

        <div className={classes.accordionsContainer}>
          <Accordion expanded={expanded === 'pc-panel'} onChange={handleAccordionChange('pc-panel')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="pc-panel-content" id="pc-panel-header">
              PC
            </AccordionSummary>
            <AccordionDetails>
              <PcImportGuide></PcImportGuide>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'ps4-panel'} onChange={handleAccordionChange('ps4-panel')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ps4-panel-content" id="ps4-panel-header">
              PS4
            </AccordionSummary>
            <AccordionDetails>
              <Ps4ImportGuide></Ps4ImportGuide>
            </AccordionDetails>
          </Accordion>
        </div>
      </Fragment>
    </DialogContainer>
  );
}

export default withStyles(styles)(ImportGuide);
