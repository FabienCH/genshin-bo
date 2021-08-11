import { albedo } from '../../adapters/secondaries/builds-optimizer/characters-stats/albedo';
import { amber } from '../../adapters/secondaries/builds-optimizer/characters-stats/amber';
import { barbara } from '../../adapters/secondaries/builds-optimizer/characters-stats/barbara';
import { beidou } from '../../adapters/secondaries/builds-optimizer/characters-stats/beidou';
import { bennett } from '../../adapters/secondaries/builds-optimizer/characters-stats/bennett';
import { chongyun } from '../../adapters/secondaries/builds-optimizer/characters-stats/chongyun';
import { diluc } from '../../adapters/secondaries/builds-optimizer/characters-stats/diluc';
import { diona } from '../../adapters/secondaries/builds-optimizer/characters-stats/diona';
import { eula } from '../../adapters/secondaries/builds-optimizer/characters-stats/eula';
import { fischl } from '../../adapters/secondaries/builds-optimizer/characters-stats/fischl';
import { ganyu } from '../../adapters/secondaries/builds-optimizer/characters-stats/ganyu';
import { huTao } from '../../adapters/secondaries/builds-optimizer/characters-stats/hu-tao';
import { jean } from '../../adapters/secondaries/builds-optimizer/characters-stats/jean';
import { kaedeharaKazuha } from '../../adapters/secondaries/builds-optimizer/characters-stats/kaedehara-kazuha';
import { kaeya } from '../../adapters/secondaries/builds-optimizer/characters-stats/kaeya';
import { kamisatoAyaka } from '../../adapters/secondaries/builds-optimizer/characters-stats/kamisato-ayaka';
import { keqing } from '../../adapters/secondaries/builds-optimizer/characters-stats/keqing';
import { klee } from '../../adapters/secondaries/builds-optimizer/characters-stats/klee';
import { lisa } from '../../adapters/secondaries/builds-optimizer/characters-stats/lisa';
import { mona } from '../../adapters/secondaries/builds-optimizer/characters-stats/mona';
import { ningguang } from '../../adapters/secondaries/builds-optimizer/characters-stats/ningguang';
import { noelle } from '../../adapters/secondaries/builds-optimizer/characters-stats/noelle';
import { qiqi } from '../../adapters/secondaries/builds-optimizer/characters-stats/qiqi';
import { razor } from '../../adapters/secondaries/builds-optimizer/characters-stats/razor';
import { rosaria } from '../../adapters/secondaries/builds-optimizer/characters-stats/rosaria';
import { sayu } from '../../adapters/secondaries/builds-optimizer/characters-stats/sayu';
import { sucrose } from '../../adapters/secondaries/builds-optimizer/characters-stats/sucrose';
import { tartaglia } from '../../adapters/secondaries/builds-optimizer/characters-stats/tartaglia';
import { traveler } from '../../adapters/secondaries/builds-optimizer/characters-stats/traveler';
import { venti } from '../../adapters/secondaries/builds-optimizer/characters-stats/venti';
import { xiangling } from '../../adapters/secondaries/builds-optimizer/characters-stats/xiangling';
import { xiao } from '../../adapters/secondaries/builds-optimizer/characters-stats/xiao';
import { xingqiu } from '../../adapters/secondaries/builds-optimizer/characters-stats/xingqiu';
import { xinyan } from '../../adapters/secondaries/builds-optimizer/characters-stats/xinyan';
import { yanfei } from '../../adapters/secondaries/builds-optimizer/characters-stats/yanfei';
import { yoimiya } from '../../adapters/secondaries/builds-optimizer/characters-stats/yoimiya';
import { zhongli } from '../../adapters/secondaries/builds-optimizer/characters-stats/zhongli';
import { InMemoryCharactersRepository } from '../../adapters/secondaries/builds-optimizer/in-memory-characters-repository';
import { ExistingCharacters } from '../../domain/builds-optimizer/models/character';
import { CharactersHandler } from './characters-handler';

describe('CharactersHandler', () => {
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
    eula,
    fischl,
    ganyu,
    huTao,
    jean,
    kaedeharaKazuha,
    kamisatoAyaka,
    kaeya,
    keqing,
    klee,
    lisa,
    mona,
    ningguang,
    noelle,
    qiqi,
    razor,
    rosaria,
    sayu,
    sucrose,
    tartaglia,
    traveler,
    venti,
    xiangling,
    xiao,
    xingqiu,
    xinyan,
    yanfei,
    yoimiya,
    zhongli,
  ];
  beforeEach(() => {
    charactersHandler = new CharactersHandler(new InMemoryCharactersRepository());
  });

  describe('getCharactersNames', () => {
    it('should give list of expected characters names', () => {
      const expectedCharactersNames = charactersHandler.getCharactersNames();

      expect(allCharactersWithStats.length).toEqual(expectedCharactersNames.length);
      allCharactersWithStats.forEach((charactersWithStats, index) => {
        expect(charactersWithStats.name).toEqual(expectedCharactersNames[index]);
      });
    });
  });

  describe('getCharacterView', () => {
    it('should retrieve a character name, weapon type and level', () => {
      const expectedCharacter = charactersHandler.getCharacterView(albedo.name);

      expect(expectedCharacter.name).toEqual(albedo.name);
      expect(expectedCharacter.level).toEqual('1');
      expect(expectedCharacter.weaponType).toEqual(albedo.weaponType);
    });

    it('should return an error if the character does not exist', () => {
      expect(() => charactersHandler.getCharacterView('charName' as ExistingCharacters)).toThrowError(
        'could not find character with name charName',
      );
    });
  });
});
