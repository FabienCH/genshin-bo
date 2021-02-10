import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats } from '../domain/models/sub-statistics';
import { BuildOptimizer } from './build-optimizer';
import { PossibleCharacterStats } from '../domain/models/character-statistics';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';
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

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let charactersRepository: InMemoryCharactersRepository;
  let artifactsRepository: InMemoryArtifactsRepository;
  let defaultFlowerArtifacts: FlowerArtifact[];
  let defaultPlumeArtifacts: PlumeArtifact[];
  let defaultSandsArtifacts: SandsArtifact[];
  let defaultGobletArtifacts: GobletArtifact[];
  let defaultCircletArtifacts: CircletArtifact[];
  let razor: Character;

  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
    charactersRepository = new InMemoryCharactersRepository();
    artifactsRepository = new InMemoryArtifactsRepository(defaultBuildArtifactsData);

    razor = charactersRepository.getCharacter('razor', '80a', { name: 'snowTombedStarsilver', level: '90' });
    defaultFlowerArtifacts = artifactsRepository.getFlowerArtifacts();
    defaultPlumeArtifacts = artifactsRepository.getPlumeArtifacts();
    defaultSandsArtifacts = artifactsRepository.getSandsArtifacts();
    defaultGobletArtifacts = artifactsRepository.getGobletArtifacts();
    defaultCircletArtifacts = artifactsRepository.getCircletArtifacts();
  });

  xdescribe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      artifactsRepository = new InMemoryArtifactsRepository(defPhyDmgAtkBuildArtifactsData);

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

  xdescribe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      artifactsRepository = new InMemoryArtifactsRepository(lvl134820BuildArtifactsData);

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
      const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
      const sandsArtifacts = artifactsRepository.getSandsArtifacts();
      const gobletArtifacts = artifactsRepository.getGobletArtifacts();
      const circletArtifacts = artifactsRepository.getCircletArtifacts();

      expect(
        buildOptimizer.computeBuildsStats(amber, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          amber,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          amber,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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
      expect(
        buildOptimizer.computeBuildsStats(
          razor,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          albedo,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          fischl,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          razorWithProto,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

      expect(
        buildOptimizer.computeBuildsStats(
          razorWithProto,
          defaultFlowerArtifacts,
          defaultPlumeArtifacts,
          defaultSandsArtifacts,
          defaultGobletArtifacts,
          defaultCircletArtifacts,
        ),
      ).toEqual([
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

  xit('should compute build stats of multiple artifacts for each type', () => {
    artifactsRepository = new InMemoryArtifactsRepository(multipleArtifactsBuildArtifactsData);

    const flowerArtifacts = artifactsRepository.getFlowerArtifacts();
    const plumeArtifacts = artifactsRepository.getPlumeArtifacts();
    const sandsArtifacts = artifactsRepository.getSandsArtifacts();
    const gobletArtifacts = artifactsRepository.getGobletArtifacts();
    const circletArtifacts = artifactsRepository.getCircletArtifacts();

    expect(
      buildOptimizer.computeBuildsStats(razor, flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts),
    ).toEqual([
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

  xdescribe('filter builds before stats computation', () => {
    const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

    let buildOptimizer: BuildOptimizer;
    let allFlowerArtifacts: FlowerArtifact[];
    let allPlumeArtifacts: PlumeArtifact[];
    let allSandsArtifacts: SandsArtifact[];
    let allGobletArtifacts: GobletArtifact[];
    let allCircletArtifacts: CircletArtifact[];

    beforeEach(() => {
      allFlowerArtifacts = artifactsRepository.getFlowerArtifacts();
      allPlumeArtifacts = artifactsRepository.getPlumeArtifacts();
      allSandsArtifacts = artifactsRepository.getSandsArtifacts();
      allGobletArtifacts = artifactsRepository.getGobletArtifacts();
      allCircletArtifacts = artifactsRepository.getCircletArtifacts();
      buildOptimizer = new BuildOptimizer(
        allFlowerArtifacts,
        allPlumeArtifacts,
        allSandsArtifacts,
        allGobletArtifacts,
        allCircletArtifacts,
      );
    });

    it('that must have 2 thunderingFury set pieces', () => {
      expect(buildOptimizer.computeBuildsStats(razor, { setNames: [SetNames.thunderingFury], pieces: 2 }).length).toEqual(24);
    });

    it('that must have 2 thunderingFury set pieces with filtered artifacts', () => {
      buildOptimizer.filterArtifacts(null, 8);
      expect(buildOptimizer.computeBuildsStats(razor, { setNames: [SetNames.thunderingFury], pieces: 2 }).length).toEqual(9);
    });

    it('that must have 4 retracingBolide set pieces', () => {
      expect(buildOptimizer.computeBuildsStats(razor, { setNames: [SetNames.retracingBolide], pieces: 4 }).length).toEqual(8);
    });

    it('that must have 2 thunderingFury and 2 blizzardStrayer set pieces', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, { setNames: [SetNames.thunderingFury, SetNames.blizzardStrayer], pieces: 2 }).length,
      ).toEqual(3);
    });

    it('must not run with total pieces higher than 5', () => {
      expect(
        () => buildOptimizer.computeBuildsStats(razor, { setNames: [SetNames.thunderingFury, SetNames.blizzardStrayer], pieces: 4 }).length,
      ).toThrowError('total pieces can not be higher than 5');
    });
  });

  fdescribe('filter builds after stats computation', () => {
    const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

    let buildOptimizer: BuildOptimizer;
    let allFlowerArtifacts: FlowerArtifact[];
    let allPlumeArtifacts: PlumeArtifact[];
    let allSandsArtifacts: SandsArtifact[];
    let allGobletArtifacts: GobletArtifact[];
    let allCircletArtifacts: CircletArtifact[];

    beforeEach(() => {
      allFlowerArtifacts = artifactsRepository.getFlowerArtifacts();
      allPlumeArtifacts = artifactsRepository.getPlumeArtifacts();
      allSandsArtifacts = artifactsRepository.getSandsArtifacts();
      allGobletArtifacts = artifactsRepository.getGobletArtifacts();
      allCircletArtifacts = artifactsRepository.getCircletArtifacts();
      buildOptimizer = new BuildOptimizer(
        allFlowerArtifacts,
        allPlumeArtifacts,
        allSandsArtifacts,
        allGobletArtifacts,
        allCircletArtifacts,
      );
    });

    fit('that must have at least 17000 hp', () => {
      expect(buildOptimizer.computeBuildsStats(razor, null, { [PossibleCharacterStats.hp]: 17000 }).length).toEqual(24);
    });

    fit('that must have at least 16000 hp and 30 crit rate', () => {
      expect(
        buildOptimizer.computeBuildsStats(razor, null, { [PossibleCharacterStats.hp]: 16000, [PossibleCharacterStats.critRate]: 30 })
          .length,
      ).toEqual(26);
    });
  });
});

xdescribe('BuildOptimizer.filterArtifacts', () => {
  const artifactsRepository: InMemoryArtifactsRepository = new InMemoryArtifactsRepository();

  let buildOptimizer: BuildOptimizer;
  let allFlowerArtifacts: FlowerArtifact[];
  let allPlumeArtifacts: PlumeArtifact[];
  let allSandsArtifacts: SandsArtifact[];
  let allGobletArtifacts: GobletArtifact[];
  let allCircletArtifacts: CircletArtifact[];

  beforeEach(() => {
    allFlowerArtifacts = artifactsRepository.getFlowerArtifacts();
    allPlumeArtifacts = artifactsRepository.getPlumeArtifacts();
    allSandsArtifacts = artifactsRepository.getSandsArtifacts();
    allGobletArtifacts = artifactsRepository.getGobletArtifacts();
    allCircletArtifacts = artifactsRepository.getCircletArtifacts();
    buildOptimizer = new BuildOptimizer(allFlowerArtifacts, allPlumeArtifacts, allSandsArtifacts, allGobletArtifacts, allCircletArtifacts);
  });

  describe('filter artifacts by main stat should set possible builds', () => {
    it('with sand having elementalMastery', () => {
      buildOptimizer.filterArtifacts({ sandsMain: PossibleMainStats.elementalMastery });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(48);
    });

    it('with goblet having cryoDmg', () => {
      buildOptimizer.filterArtifacts({ gobletMain: PossibleMainStats.cryoDmg });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(36);
    });

    it('with circlet having critRate', () => {
      buildOptimizer.filterArtifacts({ circletMain: PossibleMainStats.critRate });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(96);
    });

    it('with sand, goblet and circlet artifacts', () => {
      buildOptimizer.filterArtifacts({
        sandsMain: PossibleMainStats.percentAtk,
        gobletMain: PossibleMainStats.percentDef,
        circletMain: PossibleMainStats.healingBonus,
      });
      expect(buildOptimizer.getPossibleBuilds()).toEqual(8);
    });
  });

  describe('filter artifacts by min level should set possible builds', () => {
    it('with artifacts higher or equal to 8', () => {
      buildOptimizer.filterArtifacts(null, 8);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(27);
    });
    it('with artifacts higher or equal to 12', () => {
      buildOptimizer.filterArtifacts(null, 12);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(0);
    });
  });

  describe('filter artifacts by focused stats should set possible builds', () => {
    it('with artifacts that have percent atk', () => {
      buildOptimizer.filterArtifacts(null, null, [PossibleSubStats.percentAtk]);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(8);
    });
    it('with artifacts that have at least flat hp or elemental mastery', () => {
      buildOptimizer.filterArtifacts(null, null, [PossibleSubStats.flatHp, PossibleSubStats.elementalMastery]);
      expect(buildOptimizer.getPossibleBuilds()).toEqual(16);
    });
  });

  it('with artifacts that have healing bonus in circlet, level 8 and at least flat hp or elemental mastery', () => {
    buildOptimizer.filterArtifacts(
      { sandsMain: PossibleMainStats.percentHp, gobletMain: PossibleMainStats.percentDef, circletMain: PossibleMainStats.healingBonus },
      8,
      [PossibleSubStats.flatHp, PossibleSubStats.elementalMastery],
    );
    expect(buildOptimizer.getPossibleBuilds()).toEqual(2);
  });
});
