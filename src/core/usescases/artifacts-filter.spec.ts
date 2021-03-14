import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';

import { AllArtifacts } from '../domain/models/all-artifacts';
import { MainStats } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';
import { ArtifactsFilter } from './artifacts-filter';

describe('Artifacts Filter', () => {
  const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();
  let allArtifacts: AllArtifacts;

  beforeEach(() => {
    allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(artifactsRepository.getAll());
  });

  describe('filter artifacts by main stat should set possible builds', () => {
    it('with sand having elementalMastery', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { sandsMain: MainStats.elementalMastery }, 0, []);
      const expectedSands = [
        new GobletArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [SubStats.flatHp]: 6,
            [SubStats.critDmg]: 7,
            [SubStats.percentDef]: 3.2,
            [SubStats.percentAtk]: 2.9,
          },
          8,
          MainStats.elementalMastery,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, sands: expectedSands });
    });

    it('with goblet having cryoDmg', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { gobletMain: MainStats.cryoDmg }, 0, []);
      const expectedGoblets = [
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [SubStats.elementalMastery]: 4,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3,
          },
          8,
          MainStats.cryoDmg,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, goblets: expectedGoblets });
    });

    it('with circlet having critRate', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { circletMain: MainStats.critRate }, 0, []);
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [SubStats.flatHp]: 4,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.energyRecharge]: 5,
          },
          12,
          MainStats.critRate,
        ),
        new CircletArtifact(
          '13',
          SetNames.retracingBolide,
          {
            [SubStats.energyRecharge]: 4,
            [SubStats.flatAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.flatHp]: 5,
          },
          14,
          MainStats.critRate,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, circlets: expectedCirclets });
    });

    it('with sand, goblet and circlet artifacts', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(
        allArtifacts,
        {
          sandsMain: MainStats.percentAtk,
          gobletMain: MainStats.percentDef,
          circletMain: MainStats.healingBonus,
        },
        0,
        [],
      );
      const expectedSands = [
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [SubStats.energyRecharge]: 6,
            [SubStats.flatAtk]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.flatDef]: 2.9,
          },
          16,
          MainStats.percentAtk,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [SubStats.critRate]: 2.5,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.flatHp]: 3,
          },
          15,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [SubStats.critDmg]: 2.5,
            [SubStats.energyRecharge]: 5.2,
            [SubStats.percentHp]: 4,
            [SubStats.flatDef]: 3,
          },
          12,
          MainStats.percentDef,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '11',
          SetNames.retracingBolide,
          {
            [SubStats.percentDef]: 4,
            [SubStats.flatAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.percentHp]: 5,
          },
          17,
          MainStats.healingBonus,
        ),
      ];
      expect(filteredArtifacts).toEqual({ ...allArtifacts, sands: expectedSands, goblets: expectedGoblets, circlets: expectedCirclets });
    });
  });

  describe('filter artifacts by min level should set possible builds', () => {
    it('with artifacts higher or equal to 8', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, {}, 8, []);
      const expectedFlowers = [
        new FlowerArtifact(
          '1',
          SetNames.thunderingFury,
          {
            [SubStats.energyRecharge]: 3,
            [SubStats.percentHp]: 6,
            [SubStats.critDmg]: 3.9,
            [SubStats.percentAtk]: 7,
          },
          8,
        ),
      ];
      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [SubStats.percentAtk]: 5,
            [SubStats.flatHp]: 12,
            [SubStats.flatDef]: 6,
            [SubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [SubStats.percentDef]: 6,
            [SubStats.elementalMastery]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.critDmg]: 2.9,
          },
          12,
          MainStats.percentHp,
        ),
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [SubStats.energyRecharge]: 6,
            [SubStats.flatAtk]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.flatDef]: 2.9,
          },
          16,
          MainStats.percentAtk,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [SubStats.flatHp]: 6,
            [SubStats.critDmg]: 7,
            [SubStats.percentDef]: 3.2,
            [SubStats.percentAtk]: 2.9,
          },
          8,
          MainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [SubStats.critRate]: 2.5,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.flatHp]: 3,
          },
          15,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [SubStats.critDmg]: 2.5,
            [SubStats.energyRecharge]: 5.2,
            [SubStats.percentHp]: 4,
            [SubStats.flatDef]: 3,
          },
          12,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [SubStats.elementalMastery]: 4,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3,
          },
          8,
          MainStats.cryoDmg,
        ),
      ];

      expect(filteredArtifacts).toEqual({
        ...allArtifacts,
        flowers: expectedFlowers,
        plumes: expectedPlumes,
        sands: expectedSands,
        goblets: expectedGoblets,
      });
    });

    it('with artifacts higher or equal to 12', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, {}, 12, []);

      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [SubStats.percentAtk]: 5,
            [SubStats.flatHp]: 12,
            [SubStats.flatDef]: 6,
            [SubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [SubStats.percentDef]: 6,
            [SubStats.elementalMastery]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.critDmg]: 2.9,
          },
          12,
          MainStats.percentHp,
        ),
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [SubStats.energyRecharge]: 6,
            [SubStats.flatAtk]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.flatDef]: 2.9,
          },
          16,
          MainStats.percentAtk,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [SubStats.critRate]: 2.5,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.flatHp]: 3,
          },
          15,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [SubStats.critDmg]: 2.5,
            [SubStats.energyRecharge]: 5.2,
            [SubStats.percentHp]: 4,
            [SubStats.flatDef]: 3,
          },
          12,
          MainStats.percentDef,
        ),
      ];

      expect(filteredArtifacts).toEqual({
        ...allArtifacts,
        flowers: [],
        plumes: expectedPlumes,
        sands: expectedSands,
        goblets: expectedGoblets,
      });
    });
  });

  describe('filter artifacts by focused stats should set possible builds', () => {
    it('with artifacts that have percent atk', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, {}, 0, [SubStats.percentAtk]);

      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [SubStats.percentAtk]: 5,
            [SubStats.flatHp]: 12,
            [SubStats.flatDef]: 6,
            [SubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [SubStats.energyRecharge]: 6,
            [SubStats.flatAtk]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.flatDef]: 2.9,
          },
          16,
          MainStats.percentAtk,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [SubStats.flatHp]: 6,
            [SubStats.critDmg]: 7,
            [SubStats.percentDef]: 3.2,
            [SubStats.percentAtk]: 2.9,
          },
          8,
          MainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [SubStats.critRate]: 2.5,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.flatHp]: 3,
          },
          15,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [SubStats.elementalMastery]: 4,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3,
          },
          8,
          MainStats.cryoDmg,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [SubStats.flatHp]: 4,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.energyRecharge]: 5,
          },
          12,
          MainStats.critRate,
        ),
      ];

      expect(filteredArtifacts).toEqual({
        ...allArtifacts,
        plumes: expectedPlumes,
        sands: expectedSands,
        goblets: expectedGoblets,
        circlets: expectedCirclets,
      });
    });

    it('with artifacts that have at least flat hp or elemental mastery', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, {}, 0, [SubStats.flatHp, SubStats.elementalMastery]);
      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [SubStats.percentAtk]: 5,
            [SubStats.flatHp]: 12,
            [SubStats.flatDef]: 6,
            [SubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [SubStats.percentDef]: 6,
            [SubStats.elementalMastery]: 7,
            [SubStats.critRate]: 3.2,
            [SubStats.critDmg]: 2.9,
          },
          12,
          MainStats.percentHp,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [SubStats.flatHp]: 6,
            [SubStats.critDmg]: 7,
            [SubStats.percentDef]: 3.2,
            [SubStats.percentAtk]: 2.9,
          },
          8,
          MainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [SubStats.critRate]: 2.5,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.flatHp]: 3,
          },
          15,
          MainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [SubStats.elementalMastery]: 4,
            [SubStats.percentHp]: 5.2,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3,
          },
          8,
          MainStats.cryoDmg,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [SubStats.flatHp]: 4,
            [SubStats.percentAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.energyRecharge]: 5,
          },
          12,
          MainStats.critRate,
        ),
        new CircletArtifact(
          '13',
          SetNames.retracingBolide,
          {
            [SubStats.energyRecharge]: 4,
            [SubStats.flatAtk]: 4,
            [SubStats.critDmg]: 3.2,
            [SubStats.flatHp]: 5,
          },
          14,
          MainStats.critRate,
        ),
      ];
      expect(filteredArtifacts).toEqual({
        ...allArtifacts,
        plumes: expectedPlumes,
        sands: expectedSands,
        goblets: expectedGoblets,
        circlets: expectedCirclets,
      });
    });
  });

  it('with artifacts that have percentHp in sands, percentDef in goblet and healingBonus in circlet, level 8 and at least flat hp or elemental mastery', () => {
    const filteredArtifacts = ArtifactsFilter.filterArtifacts(
      allArtifacts,
      { sandsMain: MainStats.percentHp, gobletMain: MainStats.percentDef, circletMain: MainStats.healingBonus },
      8,
      [SubStats.flatHp, SubStats.elementalMastery],
    );
    const expectedFlowers = [
      new FlowerArtifact(
        '1',
        SetNames.thunderingFury,
        {
          [SubStats.energyRecharge]: 3,
          [SubStats.percentHp]: 6,
          [SubStats.critDmg]: 3.9,
          [SubStats.percentAtk]: 7,
        },
        8,
      ),
    ];
    const expectedPlumes = [
      new PlumeArtifact(
        '3',
        SetNames.blizzardStrayer,
        {
          [SubStats.percentAtk]: 5,
          [SubStats.flatHp]: 12,
          [SubStats.flatDef]: 6,
          [SubStats.percentDef]: 8,
        },
        12,
      ),
    ];
    const expectedSands = [
      new SandsArtifact(
        '4',
        SetNames.thunderingFury,
        {
          [SubStats.percentDef]: 6,
          [SubStats.elementalMastery]: 7,
          [SubStats.critRate]: 3.2,
          [SubStats.critDmg]: 2.9,
        },
        12,
        MainStats.percentHp,
      ),
    ];
    const expectedGoblets = [
      new GobletArtifact(
        '7',
        SetNames.lavawalker,
        {
          [SubStats.critRate]: 2.5,
          [SubStats.percentHp]: 5.2,
          [SubStats.percentAtk]: 4,
          [SubStats.flatHp]: 3,
        },
        15,
        MainStats.percentDef,
      ),
      new GobletArtifact(
        '8',
        SetNames.archaicPetra,
        {
          [SubStats.critDmg]: 2.5,
          [SubStats.energyRecharge]: 5.2,
          [SubStats.percentHp]: 4,
          [SubStats.flatDef]: 3,
        },
        12,
        MainStats.percentDef,
      ),
    ];
    const expectedCirclets = [
      new CircletArtifact(
        '11',
        SetNames.retracingBolide,
        {
          [SubStats.percentDef]: 4,
          [SubStats.flatAtk]: 4,
          [SubStats.critDmg]: 3.2,
          [SubStats.percentHp]: 5,
        },
        17,
        MainStats.healingBonus,
      ),
    ];
    expect(filteredArtifacts).toEqual({
      flowers: expectedFlowers,
      plumes: expectedPlumes,
      sands: expectedSands,
      goblets: expectedGoblets,
      circlets: expectedCirclets,
    });
  });
});
