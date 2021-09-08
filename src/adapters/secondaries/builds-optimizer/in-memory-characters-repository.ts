import { CharacterBuilder } from '../../../domain/builds-optimizer/models/character-builder';
import { ExistingCharacters, Character } from '../../../domain/builds-optimizer/models/character';
import { amber } from './characters-stats/amber';
import { CharacterWithStats } from './characters-stats/character-stats-type';
import { razor } from './characters-stats/razor';
import { albedo } from './characters-stats/albedo';
import { barbara } from './characters-stats/barbara';
import { beidou } from './characters-stats/beidou';
import { bennett } from './characters-stats/bennett';
import { chongyun } from './characters-stats/chongyun';
import { diluc } from './characters-stats/diluc';
import { diona } from './characters-stats/diona';
import { fischl } from './characters-stats/fischl';
import { ganyu } from './characters-stats/ganyu';
import { jean } from './characters-stats/jean';
import { kaeya } from './characters-stats/kaeya';
import { keqing } from './characters-stats/keqing';
import { klee } from './characters-stats/klee';
import { lisa } from './characters-stats/lisa';
import { mona } from './characters-stats/mona';
import { ningguang } from './characters-stats/ningguang';
import { noelle } from './characters-stats/noelle';
import { qiqi } from './characters-stats/qiqi';
import { sucrose } from './characters-stats/sucrose';
import { tartaglia } from './characters-stats/tartaglia';
import { traveler } from './characters-stats/traveler';
import { venti } from './characters-stats/venti';
import { xiangling } from './characters-stats/xiangling';
import { xingqiu } from './characters-stats/xingqiu';
import { xinyan } from './characters-stats/xinyan';
import { zhongli } from './characters-stats/zhongli';
import { Levels } from '../../../domain/builds-optimizer/models/levels';
import { xiao } from './characters-stats/xiao';
import { huTao } from './characters-stats/hu-tao';
import { rosaria } from './characters-stats/rosaria';
import { yanfei } from './characters-stats/yanfei';
import { CharactersRepository } from '../../../domain/builds-optimizer/characters-repository';
import { eula } from './characters-stats/eula';
import { kaedeharaKazuha } from './characters-stats/kaedehara-kazuha';
import { kamisatoAyaka } from './characters-stats/kamisato-ayaka';
import { sayu } from './characters-stats/sayu';
import { yoimiya } from './characters-stats/yoimiya';
import { raidenShogun } from './characters-stats/raiden-shogun';
import { kujouSara } from './characters-stats/kujou-sara';
import { aloy } from './characters-stats/aloy';

export class InMemoryCharactersRepository implements CharactersRepository {
  private readonly charactersStats: CharacterWithStats[];

  constructor() {
    this.charactersStats = [
      albedo,
      aloy,
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
      kujouSara,
      lisa,
      mona,
      ningguang,
      noelle,
      qiqi,
      raidenShogun,
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
  }

  public getAll(level: Levels): Character[] {
    return this.charactersStats.map((characterStat) => this.characterStatToCharacter(characterStat.name, level, characterStat));
  }

  public getCharacter(name: ExistingCharacters, level: Levels): Character {
    const characterStats = this.charactersStats.find((character) => character.name === name);
    if (!characterStats) {
      throw new Error(`could not find character with name ${name}`);
    }
    return this.characterStatToCharacter(name, level, characterStats);
  }

  private characterStatToCharacter(name: ExistingCharacters, level: Levels, characterStats: CharacterWithStats) {
    const { stats, bonusStat } = characterStats.levels[level];

    return new CharacterBuilder()
      .withName(name)
      .withLevel(level)
      .withWeaponType(characterStats.weaponType)
      .withStats(stats)
      .withBonusStat(bonusStat)
      .build();
  }
}
