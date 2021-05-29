import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import LinksButtons from './links-buttons';

const styles = createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1280,
    margin: 'auto',
    padding: '10px',
    fontSize: '0.8rem',
  },
});

type FooterProps = WithStyles<typeof styles>;

function GboFooter(props: FooterProps): ReactElement {
  const { classes } = props;

  return (
    <Paper square>
      <div className={classes.container}>
        <span>Genshin Builds Optimizer v0.2.0 - Not affiliated with or endorsed by miHoYo - Does not use cookie</span>
        <span>
          <LinksButtons size="small"></LinksButtons>
        </span>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(GboFooter);
