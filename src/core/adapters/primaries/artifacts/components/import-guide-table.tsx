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

interface ImportGuideTableProps extends WithStyles<typeof styles> {
  title?: string;
  rows: { value: string | number; colSpan?: number }[][];
  headerRows: { value: string | number; colSpan?: number }[][];
}

function ImportGuideTable(props: ImportGuideTableProps): ReactElement {
  const { title, rows, headerRows, classes } = props;

  const mapRows = (rowsToMap: { value: string | number; colSpan?: number }[][]) =>
    rowsToMap.map((row) => (
      <TableRow key={`row${row[0].value}`}>
        {row.map((cell) => (
          <TableCell key={`${cell.value}`} align="center" colSpan={cell.colSpan}>
            {cell.value}
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <TableContainer className={classes.tableContainer}>
      <h5>{title}</h5>
      <Table size="small" aria-label="a dense table">
        <TableHead>{mapRows(headerRows)}</TableHead>
        <TableBody>{mapRows(rows)}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(styles)(ImportGuideTable);
