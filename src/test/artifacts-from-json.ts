import { ArtifactType } from '../domain/artifacts/entities/artifact';
import { ArtifactData } from '../domain/artifacts/models/artifact-data';
import { SetNames } from '../domain/artifacts/models/sets-with-effects';

export const artifactsJsonString =
  '[{"id":"0","type":"flower","set":"retracingBolide","level":2,"mainStatType":"flatHp","subStats":{"flatAtk":5,"critRate":3.2,"percentAtk":3,"critDmg":3.2}},{"id":"1","type":"flower","set":"thunderingFury","level":8,"mainStatType":"flatHp","subStats":{"energyRecharge":3,"percentHp":6,"critDmg":3.9,"percentAtk":7}},{"id":"2","type":"plume","set":"retracingBolide","level":7,"mainStatType":"flatAtk","subStats":{"energyRecharge":4,"flatDef":7,"critRate":2.7,"critDmg":5}},{"id":"3","type":"plume","set":"blizzardStrayer","level":12,"mainStatType":"flatAtk","subStats":{"percentAtk":5,"flatHp":12,"flatDef":6,"percentDef":8}},{"id":"4","type":"sands","set":"thunderingFury","level":12,"mainStatType":"percentHp","subStats":{"percentDef":6,"elementalMastery":7,"critRate":3.2,"critDmg":2.9}},{"id":"5","type":"sands","set":"bloodstainedChivalry","level":16,"mainStatType":"percentAtk","subStats":{"energyRecharge":6,"flatAtk":7,"critRate":3.2,"flatDef":2.9}},{"id":"6","type":"sands","set":"retracingBolide","level":8,"mainStatType":"elementalMastery","subStats":{"flatHp":6,"critDmg":7,"percentDef":3.2,"percentAtk":2.9}},{"id":"7","type":"goblet","set":"lavawalker","level":15,"mainStatType":"percentDef","subStats":{"critRate":2.5,"percentHp":5.2,"percentAtk":4,"flatHp":3}},{"id":"8","type":"goblet","set":"archaicPetra","level":12,"mainStatType":"percentDef","subStats":{"critDmg":2.5,"energyRecharge":5.2,"percentHp":4,"flatDef":3}},{"id":"9","type":"goblet","set":"blizzardStrayer","level":8,"mainStatType":"cryoDmg","subStats":{"elementalMastery":4,"percentHp":5.2,"percentAtk":4,"critDmg":3}},{"id":"10","type":"goblet","set":"wanderersTroupe","level":4,"mainStatType":"physicalDmg","subStats":{"flatAtk":4,"percentDef":5.2,"energyRecharge":4,"critRate":3}},{"id":"11","type":"circlet","set":"retracingBolide","level":17,"mainStatType":"healingBonus","subStats":{"percentDef":4,"flatAtk":4,"critDmg":3.2,"percentHp":5}},{"id":"12","type":"circlet","set":"gladiatorsFinale","level":12,"mainStatType":"critRate","subStats":{"flatHp":4,"percentAtk":4,"critDmg":3.2,"energyRecharge":5}},{"id":"13","type":"circlet","set":"retracingBolide","level":14,"mainStatType":"critRate","subStats":{"energyRecharge":4,"flatAtk":4,"critDmg":3.2,"flatHp":5}}]';

export const invalidArtifactsJsonString =
  '[{"id":"0","type":"flower","level":2,"mainStatType":"flatHp"},{"id":"1","type":"flower","set":"thunderingFury","level":8,"mainStatType":"flatHp","subStats":{"energyRecharge":3,"percentHp":6,"critDmg":3.9,"percentAtk":7}},{"id":"2","level":7,"mainStatType":"flatAtk","subStats":{"energyRecharge":4,"flatDef":7,"critRate":2.7,"critDmg":5}},{"id":"3","type":"plume","set":"blizzardStrayer","level":12,"mainStatType":"flatAtk","subStats":{"percentAtk":5,"flatHp":12,"flatDef":6,"percentDef":8}},{"id":"4","type":"sands","set":"thunderingFury","level":12,"mainStatType":"percentHp","subStats":{"percentDef":6,"elementalMastery":7,"critRate":3.2,"critDmg":2.9}},{"id":"5","type":"sands","set":"bloodstainedChivalry","level":16,"mainStatType":"percentAtk","subStats":{"energyRecharge":6,"flatAtk":7,"critRate":3.2,"flatDef":2.9}},{"id":"6","type":"sands","set":"retracingBolide","level":8,"mainStatType":"elementalMastery","subStats":{"flatHp":6,"critDmg":7,"percentDef":3.2,"percentAtk":2.9}},{"id":"7","type":"goblet","set":"lavawalker","level":15,"mainStatType":"percentDef","subStats":{"critRate":2.5,"percentHp":5.2,"percentAtk":4,"flatHp":3}},{"id":"8","type":"goblet","set":"archaicPetra","level":12,"mainStatType":"percentDef","subStats":{"critDmg":2.5,"energyRecharge":5.2,"percentHp":4,"flatDef":3}},{"id":"9","type":"goblet","set":"blizzardStrayer","level":8,"mainStatType":"cryoDmg","subStats":{"elementalMastery":4,"percentHp":5.2,"percentAtk":4,"critDmg":3}},{"id":"10","type":"goblet","set":"wanderersTroupe","level":4,"mainStatType":"physicalDmg","subStats":{"flatAtk":4,"percentDef":5.2,"energyRecharge":4,"critRate":3}},{"id":"11","type":"circlet","set":"retracingBolide","level":17,"mainStatType":"healingBonus","subStats":{"percentDef":4,"flatAtk":4,"critDmg":3.2,"percentHp":5}},{"id":"12","type":"circlet","set":"gladiatorsFinale","level":12,"mainStatType":"critRate","subStats":{"flatHp":4,"percentAtk":4,"critDmg":3.2,"energyRecharge":5}},{"id":"13","type":"circlet","set":"retracingBolide","level":14,"mainStatType":"critRate","subStats":{"energyRecharge":4,"flatAtk":4,"critDmg":3.2,"flatHp":5}}]';

export const notArtifactsArrayJsonString =
  '{"id":"1","type":"flower","set":"thunderingFury","level":8,"mainStatType":"flatHp","subStats":{"energyRecharge":3,"percentHp":6,"critDmg":3.9,"percentAtk":7}}';

export const malformedArtifactsArrayJsonString =
  '{"id":"0","type":"flower","level":2,"mainStatType":"flatHp"},{"id":"1","type":"flower","set":"thunderingFury","level":8,"mainStatType":"flatHp","subStats":{"energyRecharge":3,"percentHp":6,"critDmg":3.9,"percentAtk":7}}';

export const artifactsJsonData: ArtifactData[] = [
  {
    id: '0',
    type: ArtifactType.flower,
    set: SetNames.retracingBolide,
    level: 2,
    mainStatType: 'flatHp',
    subStats: { flatAtk: 5, critRate: 3.2, percentAtk: 3, critDmg: 3.2 },
  },
  {
    id: '1',
    type: ArtifactType.flower,
    set: SetNames.thunderingFury,
    level: 8,
    mainStatType: 'flatHp',
    subStats: { energyRecharge: 3, percentHp: 6, critDmg: 3.9, percentAtk: 7 },
  },
  {
    id: '2',
    type: ArtifactType.plume,
    set: SetNames.retracingBolide,
    level: 7,
    mainStatType: 'flatAtk',
    subStats: { energyRecharge: 4, flatDef: 7, critRate: 2.7, critDmg: 5 },
  },
  {
    id: '3',
    type: ArtifactType.plume,
    set: SetNames.blizzardStrayer,
    level: 12,
    mainStatType: 'flatAtk',
    subStats: { percentAtk: 5, flatHp: 12, flatDef: 6, percentDef: 8 },
  },
  {
    id: '4',
    type: ArtifactType.sands,
    set: SetNames.thunderingFury,
    level: 12,
    mainStatType: 'percentHp',
    subStats: { percentDef: 6, elementalMastery: 7, critRate: 3.2, critDmg: 2.9 },
  },
  {
    id: '5',
    type: ArtifactType.sands,
    set: SetNames.bloodstainedChivalry,
    level: 16,
    mainStatType: 'percentAtk',
    subStats: { energyRecharge: 6, flatAtk: 7, critRate: 3.2, flatDef: 2.9 },
  },
  {
    id: '6',
    type: ArtifactType.sands,
    set: SetNames.retracingBolide,
    level: 8,
    mainStatType: 'elementalMastery',
    subStats: { flatHp: 6, critDmg: 7, percentDef: 3.2, percentAtk: 2.9 },
  },
  {
    id: '7',
    type: ArtifactType.goblet,
    set: SetNames.lavawalker,
    level: 15,
    mainStatType: 'percentDef',
    subStats: { critRate: 2.5, percentHp: 5.2, percentAtk: 4, flatHp: 3 },
  },
  {
    id: '8',
    type: ArtifactType.goblet,
    set: SetNames.archaicPetra,
    level: 12,
    mainStatType: 'percentDef',
    subStats: { critDmg: 2.5, energyRecharge: 5.2, percentHp: 4, flatDef: 3 },
  },
  {
    id: '9',
    type: ArtifactType.goblet,
    set: SetNames.blizzardStrayer,
    level: 8,
    mainStatType: 'cryoDmg',
    subStats: { elementalMastery: 4, percentHp: 5.2, percentAtk: 4, critDmg: 3 },
  },
  {
    id: '10',
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 4,
    mainStatType: 'physicalDmg',
    subStats: { flatAtk: 4, percentDef: 5.2, energyRecharge: 4, critRate: 3 },
  },
  {
    id: '11',
    type: ArtifactType.circlet,
    set: SetNames.retracingBolide,
    level: 17,
    mainStatType: 'healingBonus',
    subStats: { percentDef: 4, flatAtk: 4, critDmg: 3.2, percentHp: 5 },
  },
  {
    id: '12',
    type: ArtifactType.circlet,
    set: SetNames.gladiatorsFinale,
    level: 12,
    mainStatType: 'critRate',
    subStats: { flatHp: 4, percentAtk: 4, critDmg: 3.2, energyRecharge: 5 },
  },
  {
    id: '13',
    type: ArtifactType.circlet,
    set: SetNames.retracingBolide,
    level: 14,
    mainStatType: 'critRate',
    subStats: { energyRecharge: 4, flatAtk: 4, critDmg: 3.2, flatHp: 5 },
  },
];

export const invalidArtifactsJsonData: ArtifactData[] = [
  {
    id: '1',
    type: ArtifactType.flower,
    set: SetNames.thunderingFury,
    level: 8,
    mainStatType: 'flatHp',
    subStats: { energyRecharge: 3, percentHp: 6, critDmg: 3.9, percentAtk: 7 },
  },

  {
    id: '3',
    type: ArtifactType.plume,
    set: SetNames.blizzardStrayer,
    level: 12,
    mainStatType: 'flatAtk',
    subStats: { percentAtk: 5, flatHp: 12, flatDef: 6, percentDef: 8 },
  },
  {
    id: '4',
    type: ArtifactType.sands,
    set: SetNames.thunderingFury,
    level: 12,
    mainStatType: 'percentHp',
    subStats: { percentDef: 6, elementalMastery: 7, critRate: 3.2, critDmg: 2.9 },
  },
  {
    id: '5',
    type: ArtifactType.sands,
    set: SetNames.bloodstainedChivalry,
    level: 16,
    mainStatType: 'percentAtk',
    subStats: { energyRecharge: 6, flatAtk: 7, critRate: 3.2, flatDef: 2.9 },
  },
  {
    id: '6',
    type: ArtifactType.sands,
    set: SetNames.retracingBolide,
    level: 8,
    mainStatType: 'elementalMastery',
    subStats: { flatHp: 6, critDmg: 7, percentDef: 3.2, percentAtk: 2.9 },
  },
  {
    id: '7',
    type: ArtifactType.goblet,
    set: SetNames.lavawalker,
    level: 15,
    mainStatType: 'percentDef',
    subStats: { critRate: 2.5, percentHp: 5.2, percentAtk: 4, flatHp: 3 },
  },
  {
    id: '8',
    type: ArtifactType.goblet,
    set: SetNames.archaicPetra,
    level: 12,
    mainStatType: 'percentDef',
    subStats: { critDmg: 2.5, energyRecharge: 5.2, percentHp: 4, flatDef: 3 },
  },
  {
    id: '9',
    type: ArtifactType.goblet,
    set: SetNames.blizzardStrayer,
    level: 8,
    mainStatType: 'cryoDmg',
    subStats: { elementalMastery: 4, percentHp: 5.2, percentAtk: 4, critDmg: 3 },
  },
  {
    id: '10',
    type: ArtifactType.goblet,
    set: SetNames.wanderersTroupe,
    level: 4,
    mainStatType: 'physicalDmg',
    subStats: { flatAtk: 4, percentDef: 5.2, energyRecharge: 4, critRate: 3 },
  },
  {
    id: '11',
    type: ArtifactType.circlet,
    set: SetNames.retracingBolide,
    level: 17,
    mainStatType: 'healingBonus',
    subStats: { percentDef: 4, flatAtk: 4, critDmg: 3.2, percentHp: 5 },
  },
  {
    id: '12',
    type: ArtifactType.circlet,
    set: SetNames.gladiatorsFinale,
    level: 12,
    mainStatType: 'critRate',
    subStats: { flatHp: 4, percentAtk: 4, critDmg: 3.2, energyRecharge: 5 },
  },
  {
    id: '13',
    type: ArtifactType.circlet,
    set: SetNames.retracingBolide,
    level: 14,
    mainStatType: 'critRate',
    subStats: { energyRecharge: 4, flatAtk: 4, critDmg: 3.2, flatHp: 5 },
  },
];
