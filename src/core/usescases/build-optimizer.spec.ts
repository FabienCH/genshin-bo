import { BuildOptimizer } from './build-optimizer';
import { CharacterStats } from '../domain/models/character-statistics';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { Character } from '../domain/models/character';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import {
  atkGeoDmgEmBuildArtifactsData,
  bolideLavawalkerBuildArtifactsData,
  defaultBuildArtifactsData,
  defPhyDmgAtkBuildArtifactsData,
  gladiatorThunderingBuildArtifactsData,
  lvl134820BuildArtifactsData,
  lvl27121517BuildArtifactsData,
  multipleArtifactsBuildArtifactsData,
} from '../../test/artifacts-data-mock';
import { SetNames } from '../domain/models/sets-with-effects';
import { AllArtifacts } from '../domain/models/all-artifacts';
import { ArtifactsMainStats } from '../adapters/primaries/build-optimizer/build-optimizer-container';
import { ArtifactStatsTypes } from '../domain/models/main-statistics';

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let charactersRepository: InMemoryCharactersRepository;
  let razor: Character;

  const defaultArtifactsFilters = {
    currentSets: [],
    setPieces: 2,
    mainsStats: {},
    focusStats: [],
    minArtifactLevel: 0,
  } as {
    currentSets: SetNames[];
    setPieces: 2 | 4;
    mainsStats: ArtifactsMainStats;
    focusStats: ArtifactStatsTypes[];
    minArtifactLevel: number;
  };
  const defaultStatsFilter = {
    [CharacterStats.hp]: 0,
    [CharacterStats.atk]: 0,
    [CharacterStats.def]: 0,
  };

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer(defaultBuildArtifactsData);
    charactersRepository = new InMemoryCharactersRepository();

    razor = charactersRepository.getCharacter('razor', '80a', { name: 'snowTombedStarsilver', level: '90' });
  });

  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      buildOptimizer = new BuildOptimizer(defPhyDmgAtkBuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 11951,
          [CharacterStats.atk]: 931,
          [CharacterStats.def]: 906,
          [CharacterStats.physicalDmg]: 73.2,
          [CharacterStats.critRate]: 16,
          [CharacterStats.elementalMastery]: 6,
          [CharacterStats.critDmg]: 53.7,
          [CharacterStats.energyRecharge]: 100,
          [CharacterStats.powerfulShield]: 35,
        },
      ]);
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      buildOptimizer = new BuildOptimizer(atkGeoDmgEmBuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 12430,
          [CharacterStats.atk]: 947,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 797,
          [CharacterStats.elementalMastery]: 35,
          [CharacterStats.geoDmg]: 7,
          [CharacterStats.critDmg]: 53.2,
          [CharacterStats.physicalDmg]: 64.5,
          [CharacterStats.powerfulShield]: 35,
        },
      ]);
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      buildOptimizer = new BuildOptimizer(lvl134820BuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 13190,
          [CharacterStats.atk]: 1048,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 797,
          [CharacterStats.elementalMastery]: 194,
          [CharacterStats.geoDmg]: 22.8,
          [CharacterStats.critDmg]: 59.3,
          [CharacterStats.powerfulShield]: 35,
          [CharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      buildOptimizer = new BuildOptimizer(lvl27121517BuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 16825,
          [CharacterStats.atk]: 1024,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 1097,
          [CharacterStats.elementalMastery]: 7,
          [CharacterStats.healingBonus]: 31.3,
          [CharacterStats.critDmg]: 59.3,
          [CharacterStats.powerfulShield]: 35,
          [CharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with gladiator and thundering sets effects', () => {
      buildOptimizer = new BuildOptimizer(gladiatorThunderingBuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 16825,
          [CharacterStats.atk]: 1126,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 1125,
          [CharacterStats.elementalMastery]: 7,
          [CharacterStats.healingBonus]: 31.3,
          [CharacterStats.critDmg]: 59.3,
          [CharacterStats.electroDmg]: 15,
          [CharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with bolide and Lavawalker sets effects', () => {
      buildOptimizer = new BuildOptimizer(bolideLavawalkerBuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 16825,
          [CharacterStats.atk]: 985,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 1097,
          [CharacterStats.elementalMastery]: 7,
          [CharacterStats.healingBonus]: 31.3,
          [CharacterStats.critDmg]: 63.2,
          [CharacterStats.powerfulShield]: 35,
          [CharacterStats.physicalDmg]: 64.5,
          [CharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 1 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '1', { name: 'rust', level: '1' });
      buildOptimizer = new BuildOptimizer(bolideLavawalkerBuildArtifactsData);

      expect(buildOptimizer.computeBuildsStats(amber, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 2244,
          [CharacterStats.atk]: 219,
          [CharacterStats.critRate]: 16.6,
          [CharacterStats.energyRecharge]: 103,
          [CharacterStats.def]: 85,
          [CharacterStats.elementalMastery]: 7,
          [CharacterStats.healingBonus]: 31.3,
          [CharacterStats.critDmg]: 63.2,
          [CharacterStats.powerfulShield]: 35,
          [CharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 20 ascended Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '20a', { name: 'rust', level: '40' });

      expect(buildOptimizer.computeBuildsStats(amber, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 6112,
          [CharacterStats.atk]: 794,
          [CharacterStats.def]: 217,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 50 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '50', { name: 'rust', level: '60a' });

      expect(buildOptimizer.computeBuildsStats(amber, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 8610,
          [CharacterStats.atk]: 1279,
          [CharacterStats.def]: 379,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 80 ascended Razor', () => {
      expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 15015,
          [CharacterStats.atk]: 1680,
          [CharacterStats.def]: 789,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
          [CharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with level 60 ascended Albedo', () => {
      const albedo = charactersRepository.getCharacter('albedo', '60a', { name: 'darkIronSword', level: '70' });

      expect(buildOptimizer.computeBuildsStats(albedo, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 12998,
          [CharacterStats.atk]: 1132,
          [CharacterStats.def]: 693,
          [CharacterStats.elementalMastery]: 172,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
          [CharacterStats.geoDmg]: 14.4,
        },
      ]);
    });

    it('with level 70 Fischl', () => {
      const fischl = charactersRepository.getCharacter('fischl', '70', { name: 'favoniusWarbow', level: '70a' });

      expect(buildOptimizer.computeBuildsStats(fischl, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 10791,
          [CharacterStats.atk]: 1343,
          [CharacterStats.def]: 531,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 170.5,
          [CharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 1 Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '1' });

      expect(buildOptimizer.computeBuildsStats(razorWithProto, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 15015,
          [CharacterStats.atk]: 736,
          [CharacterStats.def]: 789,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
          [CharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with level 40 ascended Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '40a' });

      expect(buildOptimizer.computeBuildsStats(razorWithProto, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
        {
          [CharacterStats.hp]: 15015,
          [CharacterStats.atk]: 1177,
          [CharacterStats.def]: 789,
          [CharacterStats.elementalMastery]: 56,
          [CharacterStats.critRate]: 11.6,
          [CharacterStats.critDmg]: 69.5,
          [CharacterStats.energyRecharge]: 120,
          [CharacterStats.pyroDmg]: 7,
          [CharacterStats.physicalDmg]: 30,
        },
      ]);
    });
  });

  it('should compute build stats of multiple artifacts for each type', () => {
    buildOptimizer = new BuildOptimizer(multipleArtifactsBuildArtifactsData);

    expect(buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, defaultStatsFilter)).toEqual([
      {
        [CharacterStats.hp]: 16825,
        [CharacterStats.atk]: 985,
        [CharacterStats.critRate]: 16.6,
        [CharacterStats.energyRecharge]: 104,
        [CharacterStats.def]: 1097,
        [CharacterStats.elementalMastery]: 7,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 64.3,
        [CharacterStats.powerfulShield]: 35,
        [CharacterStats.physicalDmg]: 64.5,
        [CharacterStats.pyroRes]: 40,
      },
      {
        [CharacterStats.hp]: 16822,
        [CharacterStats.atk]: 985,
        [CharacterStats.critRate]: 14.1,
        [CharacterStats.energyRecharge]: 104,
        [CharacterStats.def]: 776,
        [CharacterStats.elementalMastery]: 11,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 67.3,
        [CharacterStats.powerfulShield]: 35,
        [CharacterStats.physicalDmg]: 64.5,
        [CharacterStats.cryoDmg]: 22.8,
      },
      {
        [CharacterStats.hp]: 16837,
        [CharacterStats.atk]: 1090,
        [CharacterStats.critRate]: 13.9,
        [CharacterStats.energyRecharge]: 100,
        [CharacterStats.def]: 1152,
        [CharacterStats.elementalMastery]: 7,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 59.3,
        [CharacterStats.pyroRes]: 40,
        [CharacterStats.physicalDmg]: 64.5,
      },
      {
        [CharacterStats.hp]: 16834,
        [CharacterStats.atk]: 1090,
        [CharacterStats.critRate]: 11.4,
        [CharacterStats.energyRecharge]: 100,
        [CharacterStats.def]: 831,
        [CharacterStats.elementalMastery]: 11,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 62.3,
        [CharacterStats.cryoDmg]: 37.8,
        [CharacterStats.physicalDmg]: 64.5,
      },
      {
        [CharacterStats.hp]: 18509,
        [CharacterStats.atk]: 1011,
        [CharacterStats.critRate]: 13.4,
        [CharacterStats.energyRecharge]: 107,
        [CharacterStats.def]: 1097,
        [CharacterStats.elementalMastery]: 7,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 65,
        [CharacterStats.powerfulShield]: 35,
        [CharacterStats.electroDmg]: 15,
        [CharacterStats.physicalDmg]: 64.5,
      },
      {
        [CharacterStats.hp]: 18506,
        [CharacterStats.atk]: 1011,
        [CharacterStats.critRate]: 10.9,
        [CharacterStats.energyRecharge]: 107,
        [CharacterStats.def]: 776,
        [CharacterStats.elementalMastery]: 11,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 68,
        [CharacterStats.powerfulShield]: 35,
        [CharacterStats.electroDmg]: 15,
        [CharacterStats.cryoDmg]: 22.8,
        [CharacterStats.physicalDmg]: 64.5,
      },
      {
        [CharacterStats.hp]: 18521,
        [CharacterStats.atk]: 1116,
        [CharacterStats.critRate]: 10.7,
        [CharacterStats.energyRecharge]: 103,
        [CharacterStats.def]: 1152,
        [CharacterStats.elementalMastery]: 7,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 60,
        [CharacterStats.electroDmg]: 15,
        [CharacterStats.physicalDmg]: 64.5,
      },
      {
        [CharacterStats.hp]: 18518,
        [CharacterStats.atk]: 1116,
        [CharacterStats.critRate]: 8.2,
        [CharacterStats.energyRecharge]: 103,
        [CharacterStats.def]: 831,
        [CharacterStats.elementalMastery]: 11,
        [CharacterStats.healingBonus]: 31.3,
        [CharacterStats.critDmg]: 63,
        [CharacterStats.electroDmg]: 15,
        [CharacterStats.cryoDmg]: 37.8,
        [CharacterStats.physicalDmg]: 64.5,
      },
    ]);
  });

  describe('filter builds before stats computation', () => {
    let buildOptimizer: BuildOptimizer;

    beforeEach(() => {
      buildOptimizer = new BuildOptimizer();
    });

    it('that must have 2 thunderingFury set pieces', () => {
      expect(
        buildOptimizer.computeBuildsStats(
          razor,
          { ...defaultArtifactsFilters, currentSets: [SetNames.thunderingFury], setPieces: 2 },
          defaultStatsFilter,
        ).length,
      ).toEqual(24);
    });

    it('that must have 4 retracingBolide set pieces', () => {
      expect(
        buildOptimizer.computeBuildsStats(
          razor,
          { ...defaultArtifactsFilters, currentSets: [SetNames.retracingBolide], setPieces: 4 },
          defaultStatsFilter,
        ).length,
      ).toEqual(8);
    });

    it('that must have 2 thunderingFury and 2 blizzardStrayer set pieces', () => {
      expect(
        buildOptimizer.computeBuildsStats(
          razor,
          { ...defaultArtifactsFilters, currentSets: [SetNames.thunderingFury, SetNames.blizzardStrayer], setPieces: 2 },
          defaultStatsFilter,
        ).length,
      ).toEqual(3);
    });

    it('must not run with total pieces higher than 5', () => {
      expect(
        () =>
          buildOptimizer.computeBuildsStats(
            razor,
            {
              ...defaultArtifactsFilters,
              currentSets: [SetNames.thunderingFury, SetNames.blizzardStrayer],
              setPieces: 4,
            },
            defaultStatsFilter,
          ).length,
      ).toThrowError('total pieces can not be higher than 5');
    });
  });

  describe('filter builds after stats computation', () => {
    let buildOptimizer: BuildOptimizer;

    beforeEach(() => {
      buildOptimizer = new BuildOptimizer();
    });

    it('that must have at least 17000 hp', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, { ...defaultStatsFilter, [CharacterStats.hp]: 17000 }).length,
      ).toEqual(24);
    });

    it('that must have at least 16000 hp and 30 crit rate', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, defaultArtifactsFilters, {
          ...defaultStatsFilter,
          [CharacterStats.hp]: 16000,
          [CharacterStats.critRate]: 30,
        }).length,
      ).toEqual(26);
    });
  });

  describe('return number of possible builds', () => {
    const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();
    const buildOptimizer: BuildOptimizer = new BuildOptimizer();
    const allArtifacts: AllArtifacts = {
      flowers: artifactsRepository.getFlowerArtifacts(),
      plumes: artifactsRepository.getPlumeArtifacts(),
      sands: artifactsRepository.getSandsArtifacts(),
      goblets: artifactsRepository.getGobletArtifacts(),
      circlets: artifactsRepository.getCircletArtifacts(),
    };

    expect(buildOptimizer.getBuilds(allArtifacts)).toEqual(144);
  });
});
