import { ArtifactsDI } from '../../../di/artifacts-di';
import {
  addAllArtifactsAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  runOcrOnImageAction,
  loadArtifactsActions,
  saveAllArtifactsAction,
  importArtifactsDoneAction,
} from './artifacts-action';
import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { selectAllArtifacts } from './artifacts-selectors';

export const artifactsMiddleware: Middleware<void, AppState> = ({ dispatch }) => (next) => async (action) => {
  const artifactRepository = ArtifactsDI.getRepository();
  switch (action.type) {
    case runOcrOnImageAction.type: {
      const ocrResults = await ArtifactsDI.getArtifactImageOcr().runArtifactOcrFromImage(action.payload);
      if (ocrResults.artifact) {
        dispatch(addOneArtifactAction(ocrResults.artifact));
      }
      if (ocrResults.isDone) {
        console.log('importArtifactsDoneAction!!!');
        dispatch(importArtifactsDoneAction());
      }
      next(action);
      break;
    }
    case importArtifactsDoneAction.type: {
      dispatch(saveAllArtifactsAction());
      next(action);
      break;
    }
    case loadArtifactsActions.type: {
      const artifacts = artifactRepository.getAll();
      dispatch(addAllArtifactsAction(artifacts));
      next(action);
      break;
    }
    case saveAllArtifactsAction.type: {
      artifactRepository.addMany(selectAllArtifacts());
      next(action);
      break;
    }
    case deleteAllArtifactsAction.type: {
      artifactRepository.deleteAll();
      next(action);
      break;
    }
    default:
      next(action);
      break;
  }
};
