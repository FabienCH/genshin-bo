import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';

import { AllArtifacts } from '../domain/models/all-artifacts';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { PossibleSubStats } from '../domain/models/sub-statistics';
import { ArtifactsFilter } from './artifacts-filter';

describe('Artifacts Filter', () => {
  const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

  let allArtifacts: AllArtifacts;

  beforeEach(() => {
    allArtifacts = {
      flowers: artifactsRepository.getFlowerArtifacts(),
      plumes: artifactsRepository.getPlumeArtifacts(),
      sands: artifactsRepository.getSandsArtifacts(),
      goblets: artifactsRepository.getGobletArtifacts(),
      circlets: artifactsRepository.getCircletArtifacts(),
    };
  });

  describe('filter artifacts by main stat should set possible builds', () => {
    it('with sand having elementalMastery', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { sandsMain: PossibleMainStats.elementalMastery });
      const expectedSands = [
        new GobletArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.flatHp]: 6,
            [PossibleSubStats.critDmg]: 7,
            [PossibleSubStats.percentDef]: 3.2,
            [PossibleSubStats.percentAtk]: 2.9,
          },
          8,
          PossibleMainStats.elementalMastery,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, sands: expectedSands });
    });

    it('with goblet having cryoDmg', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { gobletMain: PossibleMainStats.cryoDmg });
      const expectedGoblets = [
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.elementalMastery]: 4,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3,
          },
          8,
          PossibleMainStats.cryoDmg,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, goblets: expectedGoblets });
    });

    it('with circlet having critRate', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, { circletMain: PossibleMainStats.critRate });
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [PossibleSubStats.flatHp]: 4,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.energyRecharge]: 5,
          },
          12,
          PossibleMainStats.critRate,
        ),
        new CircletArtifact(
          '13',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.energyRecharge]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.flatHp]: 5,
          },
          14,
          PossibleMainStats.critRate,
        ),
      ];

      expect(filteredArtifacts).toEqual({ ...allArtifacts, circlets: expectedCirclets });
    });

    it('with sand, goblet and circlet artifacts', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, {
        sandsMain: PossibleMainStats.percentAtk,
        gobletMain: PossibleMainStats.percentDef,
        circletMain: PossibleMainStats.healingBonus,
      });
      const expectedSands = [
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [PossibleSubStats.energyRecharge]: 6,
            [PossibleSubStats.flatAtk]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.flatDef]: 2.9,
          },
          16,
          PossibleMainStats.percentAtk,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
          15,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [PossibleSubStats.critDmg]: 2.5,
            [PossibleSubStats.energyRecharge]: 5.2,
            [PossibleSubStats.percentHp]: 4,
            [PossibleSubStats.flatDef]: 3,
          },
          12,
          PossibleMainStats.percentDef,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '11',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
          17,
          PossibleMainStats.healingBonus,
        ),
      ];
      expect(filteredArtifacts).toEqual({ ...allArtifacts, sands: expectedSands, goblets: expectedGoblets, circlets: expectedCirclets });
    });
  });

  describe('filter artifacts by min level should set possible builds', () => {
    it('with artifacts higher or equal to 8', () => {
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, null, 8);
      const expectedFlowers = [
        new FlowerArtifact(
          '1',
          SetNames.thunderingFury,
          {
            [PossibleSubStats.energyRecharge]: 3,
            [PossibleSubStats.percentHp]: 6,
            [PossibleSubStats.critDmg]: 3.9,
            [PossibleSubStats.percentAtk]: 7,
          },
          8,
        ),
      ];
      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.flatHp]: 12,
            [PossibleSubStats.flatDef]: 6,
            [PossibleSubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
          12,
          PossibleMainStats.percentHp,
        ),
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [PossibleSubStats.energyRecharge]: 6,
            [PossibleSubStats.flatAtk]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.flatDef]: 2.9,
          },
          16,
          PossibleMainStats.percentAtk,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.flatHp]: 6,
            [PossibleSubStats.critDmg]: 7,
            [PossibleSubStats.percentDef]: 3.2,
            [PossibleSubStats.percentAtk]: 2.9,
          },
          8,
          PossibleMainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
          15,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [PossibleSubStats.critDmg]: 2.5,
            [PossibleSubStats.energyRecharge]: 5.2,
            [PossibleSubStats.percentHp]: 4,
            [PossibleSubStats.flatDef]: 3,
          },
          12,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.elementalMastery]: 4,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3,
          },
          8,
          PossibleMainStats.cryoDmg,
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
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, null, 12);

      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.flatHp]: 12,
            [PossibleSubStats.flatDef]: 6,
            [PossibleSubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
          12,
          PossibleMainStats.percentHp,
        ),
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [PossibleSubStats.energyRecharge]: 6,
            [PossibleSubStats.flatAtk]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.flatDef]: 2.9,
          },
          16,
          PossibleMainStats.percentAtk,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
          15,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '8',
          SetNames.archaicPetra,
          {
            [PossibleSubStats.critDmg]: 2.5,
            [PossibleSubStats.energyRecharge]: 5.2,
            [PossibleSubStats.percentHp]: 4,
            [PossibleSubStats.flatDef]: 3,
          },
          12,
          PossibleMainStats.percentDef,
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
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, null, null, [PossibleSubStats.percentAtk]);

      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.flatHp]: 12,
            [PossibleSubStats.flatDef]: 6,
            [PossibleSubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '5',
          SetNames.bloodstainedChivalry,
          {
            [PossibleSubStats.energyRecharge]: 6,
            [PossibleSubStats.flatAtk]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.flatDef]: 2.9,
          },
          16,
          PossibleMainStats.percentAtk,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.flatHp]: 6,
            [PossibleSubStats.critDmg]: 7,
            [PossibleSubStats.percentDef]: 3.2,
            [PossibleSubStats.percentAtk]: 2.9,
          },
          8,
          PossibleMainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
          15,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.elementalMastery]: 4,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3,
          },
          8,
          PossibleMainStats.cryoDmg,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [PossibleSubStats.flatHp]: 4,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.energyRecharge]: 5,
          },
          12,
          PossibleMainStats.critRate,
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
      const filteredArtifacts = ArtifactsFilter.filterArtifacts(allArtifacts, null, null, [
        PossibleSubStats.flatHp,
        PossibleSubStats.elementalMastery,
      ]);
      const expectedPlumes = [
        new PlumeArtifact(
          '3',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.percentAtk]: 5,
            [PossibleSubStats.flatHp]: 12,
            [PossibleSubStats.flatDef]: 6,
            [PossibleSubStats.percentDef]: 8,
          },
          12,
        ),
      ];
      const expectedSands = [
        new SandsArtifact(
          '4',
          SetNames.thunderingFury,
          {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
          12,
          PossibleMainStats.percentHp,
        ),
        new SandsArtifact(
          '6',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.flatHp]: 6,
            [PossibleSubStats.critDmg]: 7,
            [PossibleSubStats.percentDef]: 3.2,
            [PossibleSubStats.percentAtk]: 2.9,
          },
          8,
          PossibleMainStats.elementalMastery,
        ),
      ];
      const expectedGoblets = [
        new GobletArtifact(
          '7',
          SetNames.lavawalker,
          {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
          15,
          PossibleMainStats.percentDef,
        ),
        new GobletArtifact(
          '9',
          SetNames.blizzardStrayer,
          {
            [PossibleSubStats.elementalMastery]: 4,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3,
          },
          8,
          PossibleMainStats.cryoDmg,
        ),
      ];
      const expectedCirclets = [
        new CircletArtifact(
          '12',
          SetNames.gladiatorsFinale,
          {
            [PossibleSubStats.flatHp]: 4,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.energyRecharge]: 5,
          },
          12,
          PossibleMainStats.critRate,
        ),
        new CircletArtifact(
          '13',
          SetNames.retracingBolide,
          {
            [PossibleSubStats.energyRecharge]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.flatHp]: 5,
          },
          14,
          PossibleMainStats.critRate,
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
      { sandsMain: PossibleMainStats.percentHp, gobletMain: PossibleMainStats.percentDef, circletMain: PossibleMainStats.healingBonus },
      8,
      [PossibleSubStats.flatHp, PossibleSubStats.elementalMastery],
    );
    const expectedFlowers = [
      new FlowerArtifact(
        '1',
        SetNames.thunderingFury,
        {
          [PossibleSubStats.energyRecharge]: 3,
          [PossibleSubStats.percentHp]: 6,
          [PossibleSubStats.critDmg]: 3.9,
          [PossibleSubStats.percentAtk]: 7,
        },
        8,
      ),
    ];
    const expectedPlumes = [
      new PlumeArtifact(
        '3',
        SetNames.blizzardStrayer,
        {
          [PossibleSubStats.percentAtk]: 5,
          [PossibleSubStats.flatHp]: 12,
          [PossibleSubStats.flatDef]: 6,
          [PossibleSubStats.percentDef]: 8,
        },
        12,
      ),
    ];
    const expectedSands = [
      new SandsArtifact(
        '4',
        SetNames.thunderingFury,
        {
          [PossibleSubStats.percentDef]: 6,
          [PossibleSubStats.elementalMastery]: 7,
          [PossibleSubStats.critRate]: 3.2,
          [PossibleSubStats.critDmg]: 2.9,
        },
        12,
        PossibleMainStats.percentHp,
      ),
    ];
    const expectedGoblets = [
      new GobletArtifact(
        '7',
        SetNames.lavawalker,
        {
          [PossibleSubStats.critRate]: 2.5,
          [PossibleSubStats.percentHp]: 5.2,
          [PossibleSubStats.percentAtk]: 4,
          [PossibleSubStats.flatHp]: 3,
        },
        15,
        PossibleMainStats.percentDef,
      ),
      new GobletArtifact(
        '8',
        SetNames.archaicPetra,
        {
          [PossibleSubStats.critDmg]: 2.5,
          [PossibleSubStats.energyRecharge]: 5.2,
          [PossibleSubStats.percentHp]: 4,
          [PossibleSubStats.flatDef]: 3,
        },
        12,
        PossibleMainStats.percentDef,
      ),
    ];
    const expectedCirclets = [
      new CircletArtifact(
        '11',
        SetNames.retracingBolide,
        {
          [PossibleSubStats.percentDef]: 4,
          [PossibleSubStats.flatAtk]: 4,
          [PossibleSubStats.critDmg]: 3.2,
          [PossibleSubStats.percentHp]: 5,
        },
        17,
        PossibleMainStats.healingBonus,
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
