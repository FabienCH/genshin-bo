import {
  addBuildsAction,
  buildsLimitReached,
  buildsOptimizationDone,
  removeAllBuildsAction,
  runBuildsOptimizerAction,
  updateBuildsComputationProgress,
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
        dispatch(updateBuildsComputationProgress({ buildsComputationProgress: progress }));

        if (builds) {
          dispatch(addBuildsAction(builds));
        }
        if (selectAllBuilds().length >= BuildsComputation.buildsLimit) {
          dispatch(buildsLimitReached());
        }
        if (progress.computed === progress.total) {
          dispatch(buildsOptimizationDone());
        }
      };
      bcWorker.postMessage(action.payload);

      next(action);
      break;
    }
    case buildsLimitReached.type:
    case buildsOptimizationDone.type: {
      bcWorker.terminate();

      next(action);
      break;
    }
    default:
      next(action);
      break;
  }
};
