import { ReactElement } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { BuildArtifactParams } from '../../../../domain/builds-optimizer/models/build';

interface BuildArtifactsCellProps extends ICellRendererParams {
  value: BuildArtifactParams[];
}

export function BuildArtifactsCellRenderer(props: BuildArtifactsCellProps): ReactElement {
  const buildArtifactsParams = props.value;

  const iconsData = {
    flower: {
      d:
        'M496.25 202.52l-110-15.44 41.82-104.34c6.67-16.64-11.6-32.18-26.59-22.63L307.44 120 273.35 12.82C270.64 4.27 263.32 0 256 0c-7.32 0-14.64 4.27-17.35 12.82l-34.09 107.19-94.04-59.89c-14.99-9.55-33.25 5.99-26.59 22.63l41.82 104.34-110 15.43c-17.54 2.46-21.68 26.27-6.03 34.67l98.16 52.66-74.48 83.54c-10.92 12.25-1.72 30.93 13.29 30.93 1.31 0 2.67-.14 4.07-.45l108.57-23.65-4.11 112.55c-.43 11.65 8.87 19.22 18.41 19.22 5.15 0 10.39-2.21 14.2-7.18l68.18-88.9 68.18 88.9c3.81 4.97 9.04 7.18 14.2 7.18 9.54 0 18.84-7.57 18.41-19.22l-4.11-112.55 108.57 23.65c17.36 3.76 29.21-17.2 17.35-30.49l-74.48-83.54 98.16-52.66c15.64-8.39 11.5-32.2-6.04-34.66zM338.51 311.68l-51.89-11.3 1.97 53.79L256 311.68l-32.59 42.49 1.96-53.79-51.89 11.3 35.6-39.93-46.92-25.17 52.57-7.38-19.99-49.87 44.95 28.62L256 166.72l16.29 51.23 44.95-28.62-19.99 49.87 52.57 7.38-46.92 25.17 35.61 39.93z',
      viewBox: '0 0 512 512',
    },
    plume: {
      d:
        'M512 0C460.22 3.56 96.44 38.2 71.01 287.61c-3.09 26.66-4.84 53.44-5.99 80.24l178.87-178.69c6.25-6.25 16.4-6.25 22.65 0s6.25 16.38 0 22.63L7.04 471.03c-9.38 9.37-9.38 24.57 0 33.94 9.38 9.37 24.59 9.37 33.98 0l57.13-57.07c42.09-.14 84.15-2.53 125.96-7.36 53.48-5.44 97.02-26.47 132.58-56.54H255.74l146.79-48.88c11.25-14.89 21.37-30.71 30.45-47.12h-81.14l106.54-53.21C500.29 132.86 510.19 26.26 512 0z',
      viewBox: '0 0 512 512',
    },
    sands: {
      d:
        'M360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64z',
      viewBox: '0 0 384 512',
    },
    goblet: {
      d:
        'M216 464h-40V346.81c68.47-15.89 118.05-79.91 111.4-154.16l-15.95-178.1C270.71 6.31 263.9 0 255.74 0H32.26c-8.15 0-14.97 6.31-15.7 14.55L.6 192.66C-6.05 266.91 43.53 330.93 112 346.82V464H72c-22.09 0-40 17.91-40 40 0 4.42 3.58 8 8 8h208c4.42 0 8-3.58 8-8 0-22.09-17.91-40-40-40z',
      viewBox: '0 0 288 512',
    },
    circlet: {
      d:
        'M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z',
      viewBox: '0 0 640 512',
    },
  };

  const handlePopoverOpen = (artifactId: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    props.context.onMouseEnterArtifact(artifactId, event);
  };

  const handlePopoverClose = () => {
    props.context.onMouseLeaveArtifact();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        position: 'relative',
        top: '10px',
      }}
    >
      {buildArtifactsParams.map((artifactParams) => (
        <SvgIcon
          key={artifactParams.id}
          color="secondary"
          fontSize="small"
          viewBox={iconsData[artifactParams.type].viewBox}
          onMouseEnter={(e) => handlePopoverOpen(artifactParams.id, e)}
          onMouseLeave={handlePopoverClose}
        >
          <path d={iconsData[artifactParams.type].d} />
        </SvgIcon>
      ))}
    </div>
  );
}
