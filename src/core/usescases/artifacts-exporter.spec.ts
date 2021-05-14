import { loadArtifactsActions } from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactsDI } from '../di/artifacts-di';
import { ArtifactType } from '../domain/entities/artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';
import { ArtifactsExporter } from './artifacts-exporter';
import artifact0 from '../../test/artifact0.jpg';
import { from } from 'rxjs';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { isArtifactsImportRunning } from '../adapters/redux/artifacts/artifacts-selectors';
import { ArtifactData } from '../domain/models/artifact-data';
import { artifactsJsonString } from '../../test/artifacts-from-json';

describe('ArtifactsExporter', () => {
  let artifactsExporter: ArtifactsExporter;
  let createObjectURLSpy: jest.SpyInstance;
  const flower = {
    id: '20',
    type: ArtifactType.flower,
    set: SetNames.gladiatorsFinale,
    level: 2,
    mainStatType: FlowerArtifact.mainStat,
    subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
  };

  beforeEach(() => {
    window.URL.createObjectURL = () => '';
    ArtifactsDI.registerRepository();
    artifactsExporter = ArtifactsDI.getArtifactsExporter();
    createObjectURLSpy = jest.spyOn(window.URL, 'createObjectURL');
  });

  describe('exportAsJsonFile', () => {
    it('should download a json file with all saved artifacts', () => {
      artifactsExporter.exportAsJsonFile();

      expect(createObjectURLSpy).toHaveBeenCalledWith(new Blob([artifactsJsonString], { type: 'application/json' }));
    });
  });

  describe('canExportArtifacts', () => {
    it('should not allow to export artifacts if there is none', () => {
      registerArtifactRepository();

      expect(artifactsExporter.canExportArtifacts()).toBeFalsy();
    });

    it('should not allow to export artifacts if import from OCR is running', (done) => {
      registerArtifactRepository(flower);
      ArtifactsDI.registerOcrWorker();
      const artifactsImporter = ArtifactsDI.getArtifactsImporter();

      const videoToFramesSpy = jest.spyOn(VideoToFrames, 'getFrames');
      videoToFramesSpy.mockReturnValue(from([{ frame: artifact0, isLast: true }]));

      artifactsImporter.importFromVideo(new File([], 'filename'), 1);

      expect(artifactsExporter.canExportArtifacts()).toBeFalsy();
      appStore.subscribe(() => {
        if (!isArtifactsImportRunning()) {
          done();
        }
      });
    });

    it('should allow to export artifacts if there at least one and import from OCR is not running', () => {
      registerArtifactRepository(flower);

      expect(artifactsExporter.canExportArtifacts()).toBeTruthy();
    });
  });

  function registerArtifactRepository(flower?: ArtifactData) {
    ArtifactsDI.registerRepository({
      flowers: flower ? [flower] : [],
      plumes: [],
      sands: [],
      goblets: [],
      circlets: [],
    });
    appStore.dispatch(loadArtifactsActions());
  }
});
