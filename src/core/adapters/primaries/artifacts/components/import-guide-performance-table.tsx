import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = createStyles({
  tableContainer: {
    padding: 5,
    margin: 'auto',
    maxWidth: 900,
  },
});

interface ImportGuidePerformanceTableProps extends WithStyles<typeof styles> {
  title: string;
  rows: Array<string | number>[];
}

function ImportGuidePerformanceTable(props: ImportGuidePerformanceTableProps): ReactElement {
  const { title, rows, classes } = props;

  return (
    <TableContainer className={classes.tableContainer}>
      <h5>{title}</h5>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nb of Artifacts</TableCell>
            <TableCell align="center" colSpan={3}>
              Duration for each CPU and threads
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">i5-6500 – 3 threads</TableCell>
            <TableCell align="center">i5-8250U – 7 threads</TableCell>
            <TableCell align="center">i3-6100U – 3 threads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              <TableCell align="center">{row[0]}</TableCell>
              <TableCell align="center">{row[1]}</TableCell>
              <TableCell align="center">{row[2]}</TableCell>
              <TableCell align="center">{row[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(styles)(ImportGuidePerformanceTable);
