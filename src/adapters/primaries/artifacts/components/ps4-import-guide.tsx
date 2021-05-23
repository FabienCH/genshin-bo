import { ReactElement } from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import avidemux from '../../../../assets/import-guide-img/avidemux.jpg';
import avidemuxFilters from '../../../../assets/import-guide-img/avidemux-filters.jpg';

const styles = ({ palette }: Theme) =>
  createStyles({
    img: {
      display: 'block',
      margin: 'auto',
      maxWidth: '100%',
    },
    link: {
      color: palette.primary.main,
      textDecoration: 'none',
    },
    notesContainer: {
      padding: '0 20px',
      margin: '0 30px',
      border: `1px solid ${palette.secondary.main}`,
    },
  });
type Ps4ImportGuideProps = WithStyles<typeof styles>;

function Ps4ImportGuide(props: Ps4ImportGuideProps): ReactElement {
  const { classes } = props;
  return (
    <div>
      <h4>Recording</h4>
      <p>
        I don't own a PS4 so I couldn't test it but it seems like you have different ways to record gameplay. Check{' '}
        <a
          className={classes.link}
          href="https://www.reddit.com/r/PS4/comments/fxpg6t/possible_ways_on_how_to_record_gameplay_on_ps4pro/"
          target="_blank"
          rel="noreferrer"
        >
          this reddit post
        </a>{' '}
        for more infos.
      </p>{' '}
      <div className={classes.notesContainer}>
        <h5>Important notes</h5>
        <p>You can only import 5 starts artifacts.</p>
      </div>
      <p>
        To record your artifacts, open your artifacts inventory, start your recording and select each artifacts you want to import. You can
        do it fast, we will set the video FPS to 10 later, which means 100 ms per artifacts is enough. Once it's done, stop the recording.
      </p>
      <h4>Editing the video</h4>
      <p>
        You have recorded a full screen video, you now needs to crop it to keep just the artifact window. We'll see how to do it with
        Avidemux to feel free to use any other video editor if you want.
        <br />
        First, you have to open your video and set Video Output to Mpeg4 AVC (x264) and Output Format to MP4 Muxer.
      </p>
      <img className={classes.img} src={avidemux} alt="avidemux" />
      <p>
        Now, under Video Output, click on Configure and set Encoding mode to Constant Bitrate and Target Bitrate to 2500.
        <br />
        Then click on Filter and start by adding a Resample FPS filter and set it to 10 FPS (setting a low FPS value will shorten artifacts
        import duration).
        <br />
        If your TV resolution is higher than 1920 x 1080 you have to resize the video. To do that, add a swsResize filter and set Width to
        1920 and Height to 1080.
        <br />
        Finally, add a Crop filter. You have to set values around 1294 for left, 137 for right and 121 for top and bottom. The most
        important is to have a size of 488 x 838. In my case the video I used had a resolution of 2560 x 1440 so I had to set 1294 - 138 -
        122 - 120. In the end, you should have something like this.
      </p>
      <img className={classes.img} src={avidemuxFilters} alt="avidemux-filters" />
      <p>You're done, close the filter window and click on the floppy disk to export the video.</p>
    </div>
  );
}

export default withStyles(styles)(Ps4ImportGuide);
