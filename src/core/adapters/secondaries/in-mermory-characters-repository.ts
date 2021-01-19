import { CharactersRepository } from '../../domain/characters-repository';
import { CharacterBuilder } from '../../domain/models/character-builder';
import { ExistingCharacters, PossibleLevels, Character } from '../../domain/models/character';
import { amber } from './characters-stats/amber';
import { CharacterStats } from './characters-stats/character-stats-type';
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

export class InMemoryCharactersRepository implements CharactersRepository {
  private readonly charactersStats: CharacterStats[];

  constructor() {
    this.charactersStats = [
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
  }
  getCharacter(name: ExistingCharacters, level: PossibleLevels): Character {
    const characterStats = this.charactersStats.find((character) => character.name === name).levels[level];
    return new CharacterBuilder()
      .withName(name)
      .withLevel(level)
      .withStats(characterStats.stats)
      .withBonusStat(characterStats.bonusStat)
      .build();
  }
}
