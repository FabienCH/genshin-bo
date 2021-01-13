import { Artifact } from '../domain/entities/artifact';
import { CircletArtifact, CircletMainStatType } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact, GobletMainStatType } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact, SandsMainStatType } from '../domain/entities/sands-artifact';
import { ArtifactTypes } from '../domain/models/artifact-types';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { PossibleSubStats } from '../domain/models/sub-statistics';
import { ArtifactsHandler } from './artifacts-handler';

fdescribe('ArtifactsHandler.addArtifact', () => {
  let artifactsHandler: ArtifactsHandler;

  beforeEach(() => {
    artifactsHandler = new ArtifactsHandler();
  });

  describe('Adding a flower artifact', () => {
    it('should succeed with flat HP in main stat if main stat is not specified', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 2,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      artifactsHandler.addFlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level);
      const addedArtifact = artifactsHandler.getAll().find((storedArtifact) => storedArtifact.id === artifactValues.id);
      expect(addedArtifact).toEqual(
        new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [PossibleMainStats.flatHp]: 1123 });
    });
  });

  describe('Adding a plume artifact', () => {
    it('should succeed with flat atk in main stat if main stat is not specified', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        subStats: {
          [PossibleSubStats.percentAtk]: 5,
          [PossibleSubStats.percentDef]: 6,
          [PossibleSubStats.critRate]: 3.5,
          [PossibleSubStats.elementalMastery]: 8,
        },
      };
      artifactsHandler.addPlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level);
      const addedArtifact = artifactsHandler.getAll().find((storedArtifact) => storedArtifact.id === artifactValues.id);
      expect(addedArtifact).toEqual(
        new PlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [PossibleMainStats.flatAtk]: 152 });
    });
  });

  describe('Adding a sands artifact', () => {
    const subStats = {
      [PossibleSubStats.flatAtk]: 5,
      [PossibleSubStats.flatHp]: 6,
      [PossibleSubStats.critRate]: 3.5,
      [PossibleSubStats.energyRecharge]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery or energy recharge in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as SandsMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as SandsMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as SandsMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as SandsMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'energyRecharge' as SandsMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addSandsArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new SandsArtifact(
            expectedArtifact.id,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has a no main stat', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        subStats,
      };
      expect(() =>
        artifactsHandler.addSandsArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level, null),
      ).toThrowError('main stat is mandatory');
    });
  });

  describe('Adding a goblet artifact', () => {
    const subStats = {
      [PossibleSubStats.flatAtk]: 5,
      [PossibleSubStats.flatHp]: 6,
      [PossibleSubStats.critRate]: 3.5,
      [PossibleSubStats.energyRecharge]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, elemental damage or physical damage in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as GobletMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as GobletMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as GobletMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as GobletMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'electroDmg' as GobletMainStatType,
          subStats,
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'physicalDmg' as GobletMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addGobletArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new GobletArtifact(
            expectedArtifact.id,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has a no main stat', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        subStats,
      };
      expect(() =>
        artifactsHandler.addGobletArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level, null),
      ).toThrowError('main stat is mandatory');
    });
  });

  describe('Adding a circlet artifact', () => {
    const subStats = {
      [PossibleSubStats.flatAtk]: 5,
      [PossibleSubStats.flatHp]: 6,
      [PossibleSubStats.energyRecharge]: 3.5,
      [PossibleSubStats.flatDef]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, crit rate, crit damage or healing bonus in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as CircletMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as CircletMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as CircletMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as CircletMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'critRate' as CircletMainStatType,
          subStats,
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'critDmg' as CircletMainStatType,
          subStats,
        },
        {
          id: '7',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'healingBonus' as CircletMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addCircletArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new CircletArtifact(
            expectedArtifact.id,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has a no main stat', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        subStats,
      };
      expect(() =>
        artifactsHandler.addCircletArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level, null),
      ).toThrowError('main stat is mandatory');
    });
  });

  describe('Adding an artifact', () => {
    it('should succeed if it has 4 substats', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 3,
          type: 'goblet',
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.percentAtk]: 7,
          },
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 4,
          type: 'goblet',
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.critRate]: 3.5,
            [PossibleSubStats.percentHp]: 9,
          },
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new Artifact(
            expectedArtifact.id,
            expectedArtifact.type as ArtifactTypes,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has more than 4 substat', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 4,
        type: 'flower',
        subStats: {
          [PossibleSubStats.flatAtk]: 5,
          [PossibleSubStats.percentDef]: 6,
          [PossibleSubStats.critRate]: 3.5,
          [PossibleSubStats.percentHp]: 8,
          [PossibleSubStats.critDmg]: 5.2,
        },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      ).toThrowError('an artifact can not have more than 4 substats');
    });

    it('should failed if it has les than 3 substats', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 4,
        type: 'flower',
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6 },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      ).toThrowError('an artifact can not have less than 3 substats');
    });

    it('should failed if it has 3 substats and level higher than 3', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 4,
        type: 'flower',
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      ).toThrowError('an artifact with level higher than 3 must have 4 substat');
    });
  });
});
