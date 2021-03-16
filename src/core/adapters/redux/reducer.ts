import { artifactsReducer, ArtifactsState } from './artifacts/artifacts-reducer';
import { buildsReducer, BuildsState } from './builds/builds-reducer';

export interface AppState {
  artifacts: ArtifactsState;
  builds: BuildsState;
}

export const appReducer = {
  artifacts: artifactsReducer,
  builds: buildsReducer,
};
