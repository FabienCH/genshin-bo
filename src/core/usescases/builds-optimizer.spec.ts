import { BuildsOptimizer } from './builds-optimizer';
import { CharacterStats } from '../domain/models/character-statistics';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { CharacterView } from '../domain/models/character';
import {
  atkGeoDmgEmBuildArtifactsData,
  bolideLavawalkerBuildArtifactsData,
  defaultBuildArtifactsData,
  defPhyDmgAtkBuildArtifactsData,
  gladiatorThunderingBuildArtifactsData,
  lvl134820BuildArtifactsData,
  lvl27121517BuildArtifactsData,
  moreThan1000BuildsArtifactsData,
  moreThan10BillionsBuildsArtifactsData,
  multipleArtifactsBuildArtifactsData,
} from '../../test/artifacts-data-mock';
import { SetNames } from '../domain/models/sets-with-effects';
import { ArtifactsDI } from '../di/artifacts-di';
import { buildsComputationProgress, buildsLimitReached, selectAllBuilds } from '../adapters/redux/builds/builds-selectors';
import { WeaponView } from '../domain/models/weapon';
import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { appStore } from '../adapters/redux/store';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Unsubscribe } from '@reduxjs/toolkit';
import { loadArtifactsActions } from '../adapters/redux/artifacts/artifacts-action';
import { AllArtifactsData } from '../domain/models/artifact-data';
import { ArtifactsFilters } from './artifacts-filter';

describe('BuildsOptimizer', () => {
  let buildsOptimizer: BuildsOptimizer;
  let razor: CharacterView;
  let snowTombedStarsilver: WeaponView;

  const defaultArtifactsFilters: ArtifactsFilters = {
    currentSets: [],
    setPieces: 2,
    mainsStats: {},
    focusStats: [],
    minArtifactLevel: 0,
  };

  const defaultStatsFilter = {
    [CharacterStats.hp]: 0,
    [CharacterStats.atk]: 0,
    [CharacterStats.def]: 0,
  };

  beforeEach(() => {
    loadArtifacts(defaultBuildArtifactsData);
    buildsOptimizer = new BuildsOptimizer(new InMemoryCharactersRepository(), new InMemoryWeaponsRepository());

    razor = { name: 'razor', level: '80a', weaponType: 'claymore' };
    snowTombedStarsilver = { name: 'snowTombedStarsilver', level: '90' };
  });

  describe('computeBuildsStats', () => {
    describe('should compute build stats of 5 lvl 0 artifacts', () => {
      it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stats', () => {
        loadArtifacts(defPhyDmgAtkBuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
        loadArtifacts(atkGeoDmgEmBuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });
    });

    describe('should compute build stats of 5 artifacts', () => {
      it('with levels 1, 3, 4, 8, 20', () => {
        loadArtifacts(lvl134820BuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with levels 2, 7, 12, 15, 17', () => {
        loadArtifacts(lvl27121517BuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with gladiator and thundering sets effects', () => {
        loadArtifacts(gladiatorThunderingBuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with bolide and Lavawalker sets effects', () => {
        loadArtifacts(bolideLavawalkerBuildArtifactsData);

        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 1 Amber', () => {
        loadArtifacts(bolideLavawalkerBuildArtifactsData);
        const amber: CharacterView = { name: 'amber', level: '1', weaponType: 'bow' };
        const rust: WeaponView = { name: 'rust', level: '1' };

        buildsOptimizer.computeBuildsStats(amber, rust, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 20 ascended Amber', () => {
        const amber: CharacterView = { name: 'amber', level: '20a', weaponType: 'bow' };
        const rust: WeaponView = { name: 'rust', level: '40' };
        buildsOptimizer.computeBuildsStats(amber, rust, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
              [CharacterStats.hp]: 6112,
              [CharacterStats.atk]: 794,
              [CharacterStats.def]: 217,
              [CharacterStats.elementalMastery]: 56,
              [CharacterStats.critRate]: 11.6,
              [CharacterStats.critDmg]: 69.5,
              [CharacterStats.energyRecharge]: 120,
              [CharacterStats.pyroDmg]: 7,
            },
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 50 Amber', () => {
        const amber: CharacterView = { name: 'amber', level: '50', weaponType: 'bow' };
        const rust: WeaponView = { name: 'rust', level: '60a' };
        buildsOptimizer.computeBuildsStats(amber, rust, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
              [CharacterStats.hp]: 8610,
              [CharacterStats.atk]: 1279,
              [CharacterStats.def]: 379,
              [CharacterStats.elementalMastery]: 56,
              [CharacterStats.critRate]: 11.6,
              [CharacterStats.critDmg]: 69.5,
              [CharacterStats.energyRecharge]: 120,
              [CharacterStats.pyroDmg]: 7,
            },
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 80 ascended Razor', () => {
        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 60 ascended Albedo', () => {
        const albedo: CharacterView = { name: 'albedo', level: '60a', weaponType: 'sword' };
        const darkIronSword: WeaponView = { name: 'darkIronSword', level: '70' };
        buildsOptimizer.computeBuildsStats(albedo, darkIronSword, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 70 Fischl', () => {
        const fischl: CharacterView = { name: 'fischl', level: '70', weaponType: 'bow' };
        const favoniusWarbow: WeaponView = { name: 'favoniusWarbow', level: '70a' };
        buildsOptimizer.computeBuildsStats(fischl, favoniusWarbow, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
              [CharacterStats.hp]: 10791,
              [CharacterStats.atk]: 1343,
              [CharacterStats.def]: 531,
              [CharacterStats.elementalMastery]: 56,
              [CharacterStats.critRate]: 11.6,
              [CharacterStats.critDmg]: 69.5,
              [CharacterStats.energyRecharge]: 170.5,
              [CharacterStats.pyroDmg]: 7,
            },
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 1 Prototype Archaic', () => {
        const prototypeArchaic: WeaponView = { name: 'prototypeArchaic', level: '1' };
        buildsOptimizer.computeBuildsStats(razor, prototypeArchaic, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });

      it('with level 40 ascended Prototype Archaic', () => {
        const prototypeArchaic: WeaponView = { name: 'prototypeArchaic', level: '40a' };
        buildsOptimizer.computeBuildsStats(razor, prototypeArchaic, defaultArtifactsFilters, defaultStatsFilter);

        expect(getBuildsWithoutId()).toEqual([
          {
            stats: {
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
            artifactIds: ['0', '1', '2', '3', '4'],
          },
        ]);
      });
    });

    it('should compute build stats of multiple artifacts for each type', () => {
      loadArtifacts(multipleArtifactsBuildArtifactsData);

      buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, defaultStatsFilter);

      expect(getBuildsWithoutId()).toEqual([
        {
          stats: {
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
          artifactIds: ['0', '2', '4', '5', '7'],
        },
        {
          stats: {
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
          artifactIds: ['0', '2', '4', '6', '7'],
        },
        {
          stats: {
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
          artifactIds: ['0', '3', '4', '5', '7'],
        },
        {
          stats: {
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
          artifactIds: ['0', '3', '4', '6', '7'],
        },
        {
          stats: {
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
          artifactIds: ['1', '2', '4', '5', '7'],
        },
        {
          stats: {
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
          artifactIds: ['1', '2', '4', '6', '7'],
        },
        {
          stats: {
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
          artifactIds: ['1', '3', '4', '5', '7'],
        },
        {
          stats: {
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
          artifactIds: ['1', '3', '4', '6', '7'],
        },
      ]);
    });

    describe('filter builds before stats computation', () => {
      beforeEach(() => {
        loadArtifacts();
      });

      it('that must have 2 thunderingFury set pieces', () => {
        buildsOptimizer.computeBuildsStats(
          razor,
          snowTombedStarsilver,
          { ...defaultArtifactsFilters, currentSets: [SetNames.thunderingFury], setPieces: 2 },
          defaultStatsFilter,
        );
        expect(selectAllBuilds().length).toEqual(24);
      });

      it('that must have 4 retracingBolide set pieces', () => {
        buildsOptimizer.computeBuildsStats(
          razor,
          snowTombedStarsilver,
          { ...defaultArtifactsFilters, currentSets: [SetNames.retracingBolide], setPieces: 4 },
          defaultStatsFilter,
        );
        expect(selectAllBuilds().length).toEqual(8);
      });

      it('that must have 2 thunderingFury and 2 blizzardStrayer set pieces', () => {
        buildsOptimizer.computeBuildsStats(
          razor,
          snowTombedStarsilver,
          { ...defaultArtifactsFilters, currentSets: [SetNames.thunderingFury, SetNames.blizzardStrayer], setPieces: 2 },
          defaultStatsFilter,
        );
        expect(selectAllBuilds().length).toEqual(3);
      });

      it('must not run with total pieces higher than 5', () => {
        expect(() =>
          buildsOptimizer.computeBuildsStats(
            razor,
            snowTombedStarsilver,
            {
              ...defaultArtifactsFilters,
              currentSets: [SetNames.thunderingFury, SetNames.blizzardStrayer],
              setPieces: 4,
            },
            defaultStatsFilter,
          ),
        ).toThrowError('total pieces can not be higher than 5');
      });
    });

    describe('filter builds after stats computation', () => {
      beforeEach(() => {
        loadArtifacts();
      });

      it('that must have at least 17000 hp', () => {
        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, {
          ...defaultStatsFilter,
          [CharacterStats.hp]: 17000,
        });
        expect(selectAllBuilds().length).toEqual(24);
      });

      it('that must have at least 16000 hp and 30 crit rate', () => {
        buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, {
          ...defaultStatsFilter,
          [CharacterStats.hp]: 16000,
          [CharacterStats.critRate]: 30,
        });
        expect(selectAllBuilds().length).toEqual(26);
      });
    });
  });

  describe('getBuildsComputationProgress', () => {
    const optimizationDoneSub: Subject<void> = new Subject();
    let appStoreUnsubscribe: Unsubscribe;

    beforeEach(() => {
      appStoreUnsubscribe = appStore.subscribe(() => {
        const progress = buildsComputationProgress();
        if (buildsLimitReached() || (!!progress && progress.computed === progress.total)) {
          optimizationDoneSub.next();
        }
      });
    });

    it('should return 144 total and computed builds with default artifacts', () => {
      loadArtifacts();

      buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, {});
      expect(buildsOptimizer.getBuildsComputationProgress()).toEqual({ computed: 144, total: 144 });
    });

    it('should limit to 1000 builds', (done) => {
      loadArtifacts(moreThan1000BuildsArtifactsData);

      optimizationDoneSub.pipe(take(1)).subscribe(() => {
        expect(buildsOptimizer.getBuildsComputationProgress()).toEqual({ computed: 1000, total: 1536 });
        expect(buildsOptimizer.isBuildsLimitReached()).toBeTruthy();
        done();
      });

      buildsOptimizer.computeBuildsStats(razor, snowTombedStarsilver, defaultArtifactsFilters, {});
    });

    afterEach(() => {
      appStoreUnsubscribe();
    });
  });

  describe('isBuildsCombinationsLimitReached', () => {
    it('should reach the limit with 10 billions builds combinations', () => {
      loadArtifacts(moreThan10BillionsBuildsArtifactsData);

      expect(buildsOptimizer.isBuildsCombinationsLimitReached(defaultArtifactsFilters)).toBeTruthy();
    });
  });

  it('should reach the limit with 10 billions builds combinations', () => {
    const lessThan10BillionsBuildsArtifactsData: AllArtifactsData = {
      ...moreThan10BillionsBuildsArtifactsData,
      flowers: moreThan10BillionsBuildsArtifactsData.flowers.slice(0, 99),
    };
    loadArtifacts(lessThan10BillionsBuildsArtifactsData);

    expect(buildsOptimizer.isBuildsCombinationsLimitReached(defaultArtifactsFilters)).toBeFalsy();
  });
});

function loadArtifacts(artifactsData?: AllArtifactsData) {
  ArtifactsDI.registerRepository(artifactsData);
  appStore.dispatch(loadArtifactsActions());
}

function getBuildsWithoutId() {
  return selectAllBuilds().map((buildItem) => {
    const { id, ...build } = buildItem;
    return build;
  });
}
