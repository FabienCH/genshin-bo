import { ArtifactsDI } from '../../../di/artifacts-di';
import { ArtifactImagesOcr } from '../../../domain/artifact-images-ocr';
import {
  addAllArtifactsAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  importArtifactsFromImagesAction,
  loadArtifactsActions,
} from './artifacts-action';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { selectAllArtifacts } from './artifacts-selectors';

export const artifactsMiddleware: Middleware<void, AppState> = ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case importArtifactsFromImagesAction.type: {
      dispatch(deleteAllArtifactsAction());
      const artifactImageOcr = new ArtifactImagesOcr();
      const importIsDone = new Subject<void>();
      artifactImageOcr.runArtifactsOcrFromImages(action.payload);
      artifactImageOcr
        .getOcrResults()
        .pipe(takeUntil(importIsDone))
        .subscribe((ocrResults) => {
          if (ocrResults.isDone) {
            importIsDone.next();
            ArtifactsDI.getRepository().addMany(selectAllArtifacts());
          }
          if (ocrResults.artifact) {
            dispatch(addOneArtifactAction(ocrResults.artifact));
          }
        });
      next(action);
      break;
    }
    case loadArtifactsActions.type: {
      const artifacts = ArtifactsDI.getRepository().getAll();
      dispatch(addAllArtifactsAction(artifacts));
      next(action);
      break;
    }
    case deleteAllArtifactsAction.type: {
      ArtifactsDI.getRepository().deleteAll();
      next(action);
      break;
    }
    default:
      next(action);
      break;
  }
};
