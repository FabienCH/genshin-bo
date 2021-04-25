import {
  addBuildsAction,
  buildsLimitReachedAction,
  buildsOptimizationDoneAction,
  removeAllBuildsAction,
  runBuildsOptimizerAction,
  updateBuildsComputationProgressAction,
} from './builds-action';
import { BuildsOptimizerDI } from '../../../di/builds-optimizer-di';
import { Middleware } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { BuildsComputation } from '../../../domain/builds-computation';
import { selectAllBuilds } from './builds-selectors';

export const buildsMiddleware: Middleware<void, AppState> = ({ dispatch }) => (next) => (action) => {
  const bcWorker = BuildsOptimizerDI.getBcWorker();

  switch (action.type) {
    case runBuildsOptimizerAction.type: {
      dispatch(removeAllBuildsAction());

      bcWorker.onmessage = ({ data }) => {
        const { builds, progress } = data.buildsResults;
        dispatch(updateBuildsComputationProgressAction({ buildsComputationProgress: progress }));
        dispatch(addBuildsAction(builds));

        if (selectAllBuilds().length >= BuildsComputation.buildsLimit) {
          dispatch(buildsLimitReachedAction());
        }
        if (progress.computed === progress.total) {
          dispatch(buildsOptimizationDoneAction());
        }
      };
      bcWorker.postMessage(action.payload);

      next(action);
      break;
    }
    case buildsLimitReachedAction.type:
    case buildsOptimizationDoneAction.type: {
      bcWorker.terminate();

      next(action);
      break;
    }
    default:
      next(action);
      break;
  }
};
