import { loadArtifactsActions } from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactsDI } from '../di/artifacts-di';
import { ArtifactType } from '../domain/entities/artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';
import { ArtifactsExporter } from './artifacts-exporter';
import { ArtifactsImporter } from './artifacts-importer';
import artifact0 from '../../test/artifact0.jpg';
import { from } from 'rxjs';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { isArtifactsImportRunning } from '../adapters/redux/artifacts/artifacts-selectors';
import { ArtifactData } from '../domain/models/artifact-data';

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
      const expectedString =
        '[{"id":"0","type":"flower","set":"retracingBolide","level":2,"mainStatType":"flatHp","subStats":{"flatAtk":5,"critRate":3.2,"percentAtk":3,"critDmg":3.2}},{"id":"1","type":"flower","set":"thunderingFury","level":8,"mainStatType":"flatHp","subStats":{"energyRecharge":3,"percentHp":6,"critDmg":3.9,"percentAtk":7}},{"id":"2","type":"plume","set":"retracingBolide","level":7,"mainStatType":"flatAtk","subStats":{"energyRecharge":4,"flatDef":7,"critRate":2.7,"critDmg":5}},{"id":"3","type":"plume","set":"blizzardStrayer","level":12,"mainStatType":"flatAtk","subStats":{"percentAtk":5,"flatHp":12,"flatDef":6,"percentDef":8}},{"id":"4","type":"sands","set":"thunderingFury","level":12,"mainStatType":"percentHp","subStats":{"percentDef":6,"elementalMastery":7,"critRate":3.2,"critDmg":2.9}},{"id":"5","type":"sands","set":"bloodstainedChivalry","level":16,"mainStatType":"percentAtk","subStats":{"energyRecharge":6,"flatAtk":7,"critRate":3.2,"flatDef":2.9}},{"id":"6","type":"sands","set":"retracingBolide","level":8,"mainStatType":"elementalMastery","subStats":{"flatHp":6,"critDmg":7,"percentDef":3.2,"percentAtk":2.9}},{"id":"7","type":"goblet","set":"lavawalker","level":15,"mainStatType":"percentDef","subStats":{"critRate":2.5,"percentHp":5.2,"percentAtk":4,"flatHp":3}},{"id":"8","type":"goblet","set":"archaicPetra","level":12,"mainStatType":"percentDef","subStats":{"critDmg":2.5,"energyRecharge":5.2,"percentHp":4,"flatDef":3}},{"id":"9","type":"goblet","set":"blizzardStrayer","level":8,"mainStatType":"cryoDmg","subStats":{"elementalMastery":4,"percentHp":5.2,"percentAtk":4,"critDmg":3}},{"id":"10","type":"goblet","set":"wanderersTroupe","level":4,"mainStatType":"physicalDmg","subStats":{"flatAtk":4,"percentDef":5.2,"energyRecharge":4,"critRate":3}},{"id":"11","type":"circlet","set":"retracingBolide","level":17,"mainStatType":"healingBonus","subStats":{"percentDef":4,"flatAtk":4,"critDmg":3.2,"percentHp":5}},{"id":"12","type":"circlet","set":"gladiatorsFinale","level":12,"mainStatType":"critRate","subStats":{"flatHp":4,"percentAtk":4,"critDmg":3.2,"energyRecharge":5}},{"id":"13","type":"circlet","set":"retracingBolide","level":14,"mainStatType":"critRate","subStats":{"energyRecharge":4,"flatAtk":4,"critDmg":3.2,"flatHp":5}}]';
      artifactsExporter.exportAsJsonFile();

      expect(createObjectURLSpy).toHaveBeenCalledWith(new Blob([JSON.stringify(expectedString)], { type: 'application/json' }));
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

      const videoToFramesSpy = jest.spyOn(VideoToFrames, 'getFrames');
      videoToFramesSpy.mockReturnValue(from([{ frame: artifact0, isLast: true }]));
      const artifactsImporter = new ArtifactsImporter();

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

      console.log('isArtifactsImportRunning', isArtifactsImportRunning());
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
