import { ArtifactsDI } from '../../../di/artifacts-di';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { AppDispatch } from '../store';
import { addAllArtifactsAction } from './artifacts-action';

export function loadArtifacts() {
  return (
    dispatch: AppDispatch,
  ): {
    payload: ArtifactData[];
    type: string;
  } => {
    const artifacts = ArtifactsDI.getRepository().getAll();
    return dispatch(addAllArtifactsAction(artifacts));
  };
}
