import { ReactElement } from 'react';
import { Box, createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {
  children: ReactElement | string;
  value: number;
  index: number;
}

const TabPanel = (props: Props): ReactElement => {
  const { children, value, index, classes, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3} className={classes.box}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default withStyles(styles)(TabPanel);
