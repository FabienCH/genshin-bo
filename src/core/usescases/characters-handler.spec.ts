import { albedo } from '../adapters/secondaries/characters-stats/albedo';
import { amber } from '../adapters/secondaries/characters-stats/amber';
import { barbara } from '../adapters/secondaries/characters-stats/barbara';
import { beidou } from '../adapters/secondaries/characters-stats/beidou';
import { bennett } from '../adapters/secondaries/characters-stats/bennett';
import { chongyun } from '../adapters/secondaries/characters-stats/chongyun';
import { diluc } from '../adapters/secondaries/characters-stats/diluc';
import { diona } from '../adapters/secondaries/characters-stats/diona';
import { fischl } from '../adapters/secondaries/characters-stats/fischl';
import { ganyu } from '../adapters/secondaries/characters-stats/ganyu';
import { jean } from '../adapters/secondaries/characters-stats/jean';
import { kaeya } from '../adapters/secondaries/characters-stats/kaeya';
import { keqing } from '../adapters/secondaries/characters-stats/keqing';
import { klee } from '../adapters/secondaries/characters-stats/klee';
import { lisa } from '../adapters/secondaries/characters-stats/lisa';
import { mona } from '../adapters/secondaries/characters-stats/mona';
import { ningguang } from '../adapters/secondaries/characters-stats/ningguang';
import { noelle } from '../adapters/secondaries/characters-stats/noelle';
import { qiqi } from '../adapters/secondaries/characters-stats/qiqi';
import { razor } from '../adapters/secondaries/characters-stats/razor';
import { sucrose } from '../adapters/secondaries/characters-stats/sucrose';
import { tartaglia } from '../adapters/secondaries/characters-stats/tartaglia';
import { traveler } from '../adapters/secondaries/characters-stats/traveler';
import { venti } from '../adapters/secondaries/characters-stats/venti';
import { xiangling } from '../adapters/secondaries/characters-stats/xiangling';
import { xingqiu } from '../adapters/secondaries/characters-stats/xingqiu';
import { xinyan } from '../adapters/secondaries/characters-stats/xinyan';
import { zhongli } from '../adapters/secondaries/characters-stats/zhongli';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { CharactersHandler } from './characters-handler';

describe('CharactersHandler.getCharactersNames', () => {
  let charactersHandler: CharactersHandler;
  const allCharactersWithStats = [
    albedo,
    amber,
    barbara,
    beidou,
    bennett,
    chongyun,
    diluc,
    diona,
    fischl,
    ganyu,
    jean,
    kaeya,
    keqing,
    klee,
    lisa,
    mona,
    ningguang,
    noelle,
    qiqi,
    razor,
    sucrose,
    tartaglia,
    traveler,
    venti,
    xiangling,
    xingqiu,
    xinyan,
    zhongli,
  ];
  beforeEach(() => {
    charactersHandler = new CharactersHandler(new InMemoryCharactersRepository());
  });

  it('should give list of expected characters names', () => {
    const expectedCharactersNames = charactersHandler.getCharactersNames();

    expect(allCharactersWithStats.length).toEqual(expectedCharactersNames.length);
    allCharactersWithStats.forEach((charactersWithStats, index) => {
      expect(charactersWithStats.name).toEqual(expectedCharactersNames[index]);
    });
  });
});
