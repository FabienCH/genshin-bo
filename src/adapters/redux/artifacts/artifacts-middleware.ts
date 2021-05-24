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
  addManyArtifactAction,
} from './artifacts-action';
import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { selectAllArtifacts, selectLastAddedArtifact } from './artifacts-selectors';
import { isEqual, omit } from 'lodash';

export const artifactsMiddleware: Middleware<void, AppState> = ({ dispatch }) => (next) => async (action) => {
  switch (action.type) {
    case runOcrOnImageAction.type: {
      const { frameData, fixOcrErrors } = action.payload;
      const { artifact, inError, isDone } = await ArtifactsDI.getArtifactImageOcr().runArtifactOcrFromImage(frameData, fixOcrErrors);
      const lastAddedArtifact = selectLastAddedArtifact();
      const isDuplicate = isEqual(omit(lastAddedArtifact, ['id']), omit(artifact, ['id']));

      if (artifact && !isDuplicate) {
        dispatch(addOneArtifactAction(artifact));
      }
      if (inError) {
        dispatch(incrementArtifactsInError());
      }
      if (isDone) {
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
    case addManyArtifactAction.type: {
      ArtifactsDI.getRepository().addMany(action.payload);
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
