import { BuildOptimizer } from './build-optimizer';
import { PossibleCharacterStats } from '../domain/models/character-statistics';
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

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let charactersRepository: InMemoryCharactersRepository;
  let artifactsRepository: InMemoryArtifactsRepository;
  let allDefaultArtifacts: AllArtifacts;

  let razor: Character;

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
    charactersRepository = new InMemoryCharactersRepository();
    artifactsRepository = new InMemoryArtifactsRepository(defaultBuildArtifactsData);

    razor = charactersRepository.getCharacter('razor', '80a', { name: 'snowTombedStarsilver', level: '90' });
    allDefaultArtifacts = {
      flowers: artifactsRepository.getFlowerArtifacts(),
      plumes: artifactsRepository.getPlumeArtifacts(),
      sands: artifactsRepository.getSandsArtifacts(),
      goblets: artifactsRepository.getGobletArtifacts(),
      circlets: artifactsRepository.getCircletArtifacts(),
    };
  });

  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      artifactsRepository = new InMemoryArtifactsRepository(defPhyDmgAtkBuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 11951,
          [PossibleCharacterStats.atk]: 931,
          [PossibleCharacterStats.def]: 906,
          [PossibleCharacterStats.physicalDmg]: 73.2,
          [PossibleCharacterStats.critRate]: 16,
          [PossibleCharacterStats.elementalMastery]: 6,
          [PossibleCharacterStats.critDmg]: 53.7,
          [PossibleCharacterStats.energyRecharge]: 100,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      artifactsRepository = new InMemoryArtifactsRepository(atkGeoDmgEmBuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 12430,
          [PossibleCharacterStats.atk]: 947,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 35,
          [PossibleCharacterStats.geoDmg]: 7,
          [PossibleCharacterStats.critDmg]: 53.2,
          [PossibleCharacterStats.physicalDmg]: 64.5,
          [PossibleCharacterStats.powerfulShield]: 35,
        },
      ]);
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      artifactsRepository = new InMemoryArtifactsRepository(lvl134820BuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 13190,
          [PossibleCharacterStats.atk]: 1048,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 797,
          [PossibleCharacterStats.elementalMastery]: 194,
          [PossibleCharacterStats.geoDmg]: 22.8,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      artifactsRepository = new InMemoryArtifactsRepository(lvl27121517BuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 1024,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with gladiator and thundering sets effects', () => {
      artifactsRepository = new InMemoryArtifactsRepository(gladiatorThunderingBuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 1126,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1125,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 59.3,
          [PossibleCharacterStats.electroDmg]: 15,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with bolide and Lavawalker sets effects', () => {
      artifactsRepository = new InMemoryArtifactsRepository(bolideLavawalkerBuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 16825,
          [PossibleCharacterStats.atk]: 985,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 1097,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 63.2,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.physicalDmg]: 64.5,
          [PossibleCharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 1 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '1', { name: 'rust', level: '1' });
      artifactsRepository = new InMemoryArtifactsRepository(bolideLavawalkerBuildArtifactsData);

      const allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };

      expect(buildOptimizer.computeBuildsStats(amber, allArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 2244,
          [PossibleCharacterStats.atk]: 219,
          [PossibleCharacterStats.critRate]: 16.6,
          [PossibleCharacterStats.energyRecharge]: 103,
          [PossibleCharacterStats.def]: 85,
          [PossibleCharacterStats.elementalMastery]: 7,
          [PossibleCharacterStats.healingBonus]: 31.3,
          [PossibleCharacterStats.critDmg]: 63.2,
          [PossibleCharacterStats.powerfulShield]: 35,
          [PossibleCharacterStats.pyroRes]: 40,
        },
      ]);
    });

    it('with level 20 ascended Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '20a', { name: 'rust', level: '40' });

      expect(buildOptimizer.computeBuildsStats(amber, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 6112,
          [PossibleCharacterStats.atk]: 794,
          [PossibleCharacterStats.def]: 217,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 50 Amber', () => {
      const amber = charactersRepository.getCharacter('amber', '50', { name: 'rust', level: '60a' });

      expect(buildOptimizer.computeBuildsStats(amber, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 8610,
          [PossibleCharacterStats.atk]: 1279,
          [PossibleCharacterStats.def]: 379,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 80 ascended Razor', () => {
      expect(buildOptimizer.computeBuildsStats(razor, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 1680,
          [PossibleCharacterStats.def]: 789,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.physicalDmg]: 64.5,
        },
      ]);
    });

    it('with level 60 ascended Albedo', () => {
      const albedo = charactersRepository.getCharacter('albedo', '60a', { name: 'darkIronSword', level: '70' });

      expect(buildOptimizer.computeBuildsStats(albedo, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 12998,
          [PossibleCharacterStats.atk]: 1132,
          [PossibleCharacterStats.def]: 693,
          [PossibleCharacterStats.elementalMastery]: 172,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.geoDmg]: 14.4,
        },
      ]);
    });

    it('with level 70 Fischl', () => {
      const fischl = charactersRepository.getCharacter('fischl', '70', { name: 'favoniusWarbow', level: '70a' });

      expect(buildOptimizer.computeBuildsStats(fischl, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 10791,
          [PossibleCharacterStats.atk]: 1343,
          [PossibleCharacterStats.def]: 531,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 170.5,
          [PossibleCharacterStats.pyroDmg]: 7,
        },
      ]);
    });

    it('with level 1 Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '1' });

      expect(buildOptimizer.computeBuildsStats(razorWithProto, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 736,
          [PossibleCharacterStats.def]: 789,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });

    it('with level 40 ascended Prototype Archaic', () => {
      const razorWithProto = charactersRepository.getCharacter('razor', '80a', { name: 'prototypeArchaic', level: '40a' });

      expect(buildOptimizer.computeBuildsStats(razorWithProto, allDefaultArtifacts)).toEqual([
        {
          [PossibleCharacterStats.hp]: 15015,
          [PossibleCharacterStats.atk]: 1177,
          [PossibleCharacterStats.def]: 789,
          [PossibleCharacterStats.elementalMastery]: 56,
          [PossibleCharacterStats.critRate]: 11.6,
          [PossibleCharacterStats.critDmg]: 69.5,
          [PossibleCharacterStats.energyRecharge]: 120,
          [PossibleCharacterStats.pyroDmg]: 7,
          [PossibleCharacterStats.physicalDmg]: 30,
        },
      ]);
    });
  });

  it('should compute build stats of multiple artifacts for each type', () => {
    artifactsRepository = new InMemoryArtifactsRepository(multipleArtifactsBuildArtifactsData);

    const allArtifacts = {
      flowers: artifactsRepository.getFlowerArtifacts(),
      plumes: artifactsRepository.getPlumeArtifacts(),
      sands: artifactsRepository.getSandsArtifacts(),
      goblets: artifactsRepository.getGobletArtifacts(),
      circlets: artifactsRepository.getCircletArtifacts(),
    };

    expect(buildOptimizer.computeBuildsStats(razor, allArtifacts)).toEqual([
      {
        [PossibleCharacterStats.hp]: 16825,
        [PossibleCharacterStats.atk]: 985,
        [PossibleCharacterStats.critRate]: 16.6,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 64.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 64.5,
        [PossibleCharacterStats.pyroRes]: 40,
      },
      {
        [PossibleCharacterStats.hp]: 16822,
        [PossibleCharacterStats.atk]: 985,
        [PossibleCharacterStats.critRate]: 14.1,
        [PossibleCharacterStats.energyRecharge]: 104,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 67.3,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.physicalDmg]: 64.5,
        [PossibleCharacterStats.cryoDmg]: 22.8,
      },
      {
        [PossibleCharacterStats.hp]: 16837,
        [PossibleCharacterStats.atk]: 1090,
        [PossibleCharacterStats.critRate]: 13.9,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 59.3,
        [PossibleCharacterStats.pyroRes]: 40,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 16834,
        [PossibleCharacterStats.atk]: 1090,
        [PossibleCharacterStats.critRate]: 11.4,
        [PossibleCharacterStats.energyRecharge]: 100,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 62.3,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18509,
        [PossibleCharacterStats.atk]: 1011,
        [PossibleCharacterStats.critRate]: 13.4,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 1097,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 65,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18506,
        [PossibleCharacterStats.atk]: 1011,
        [PossibleCharacterStats.critRate]: 10.9,
        [PossibleCharacterStats.energyRecharge]: 107,
        [PossibleCharacterStats.def]: 776,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 68,
        [PossibleCharacterStats.powerfulShield]: 35,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 22.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18521,
        [PossibleCharacterStats.atk]: 1116,
        [PossibleCharacterStats.critRate]: 10.7,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 1152,
        [PossibleCharacterStats.elementalMastery]: 7,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 60,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
      {
        [PossibleCharacterStats.hp]: 18518,
        [PossibleCharacterStats.atk]: 1116,
        [PossibleCharacterStats.critRate]: 8.2,
        [PossibleCharacterStats.energyRecharge]: 103,
        [PossibleCharacterStats.def]: 831,
        [PossibleCharacterStats.elementalMastery]: 11,
        [PossibleCharacterStats.healingBonus]: 31.3,
        [PossibleCharacterStats.critDmg]: 63,
        [PossibleCharacterStats.electroDmg]: 15,
        [PossibleCharacterStats.cryoDmg]: 37.8,
        [PossibleCharacterStats.physicalDmg]: 64.5,
      },
    ]);
  });

  describe('filter builds before stats computation', () => {
    const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

    let buildOptimizer: BuildOptimizer;
    let allArtifacts: AllArtifacts;

    beforeEach(() => {
      allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };
      buildOptimizer = new BuildOptimizer();
    });

    it('that must have 2 thunderingFury set pieces', () => {
      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts, { setNames: [SetNames.thunderingFury], pieces: 2 }).length).toEqual(24);
    });

    it('that must have 4 retracingBolide set pieces', () => {
      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts, { setNames: [SetNames.retracingBolide], pieces: 4 }).length).toEqual(8);
    });

    it('that must have 2 thunderingFury and 2 blizzardStrayer set pieces', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, allArtifacts, { setNames: [SetNames.thunderingFury, SetNames.blizzardStrayer], pieces: 2 })
          .length,
      ).toEqual(3);
    });

    it('must not run with total pieces higher than 5', () => {
      expect(
        () =>
          buildOptimizer.computeBuildsStats(razor, allArtifacts, {
            setNames: [SetNames.thunderingFury, SetNames.blizzardStrayer],
            pieces: 4,
          }).length,
      ).toThrowError('total pieces can not be higher than 5');
    });
  });

  describe('filter builds after stats computation', () => {
    const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

    let buildOptimizer: BuildOptimizer;
    let allArtifacts: AllArtifacts;

    beforeEach(() => {
      allArtifacts = {
        flowers: artifactsRepository.getFlowerArtifacts(),
        plumes: artifactsRepository.getPlumeArtifacts(),
        sands: artifactsRepository.getSandsArtifacts(),
        goblets: artifactsRepository.getGobletArtifacts(),
        circlets: artifactsRepository.getCircletArtifacts(),
      };
      buildOptimizer = new BuildOptimizer();
    });

    it('that must have at least 17000 hp', () => {
      expect(buildOptimizer.computeBuildsStats(razor, allArtifacts, null, { [PossibleCharacterStats.hp]: 17000 }).length).toEqual(24);
    });

    it('that must have at least 16000 hp and 30 crit rate', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, allArtifacts, null, {
          [PossibleCharacterStats.hp]: 16000,
          [PossibleCharacterStats.critRate]: 30,
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

    expect(buildOptimizer.getPossibleBuilds(allArtifacts)).toEqual(144);
  });
});
