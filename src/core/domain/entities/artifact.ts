export class Artifact {
  public hp: number;
  public atk: number;
  public def: number;

  constructor(stats: { hp?: number; atk?: number; def?: number }) {
    this.hp = stats.hp ? stats.hp : 0;
    this.atk = stats.atk ? stats.atk : 0;
    this.def = stats.def ? stats.def : 0;
  }
}
