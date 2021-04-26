import { ArtifactsDI } from '../../../di/artifacts-di';
import {
  addAllArtifactsAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  runOcrOnImageAction,
  loadArtifactsActions,
  saveAllArtifactsAction,
  importArtifactsDoneAction,
  incrementArtifactsInError,
} from './artifacts-action';
import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { selectAllArtifacts } from './artifacts-selectors';

export const artifactsMiddleware: Middleware<void, AppState> = ({ dispatch }) => (next) => async (action) => {
  switch (action.type) {
    case runOcrOnImageAction.type: {
      const ocrResults = await ArtifactsDI.getArtifactImageOcr().runArtifactOcrFromImage(action.payload);
      if (ocrResults.artifact) {
        dispatch(addOneArtifactAction(ocrResults.artifact));
      }
      if (ocrResults.inError) {
        dispatch(incrementArtifactsInError());
      }
      if (ocrResults.isDone) {
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
      const artifacts = ArtifactsDI.getRepository().getAll();
      dispatch(addAllArtifactsAction(artifacts));
      next(action);
      break;
    }
    case saveAllArtifactsAction.type: {
      ArtifactsDI.getRepository().addMany(selectAllArtifacts());
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
