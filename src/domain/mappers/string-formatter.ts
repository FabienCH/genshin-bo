export abstract class StringFormatter {
  public static formatStringWithUpperCase(string: string): string {
    const strWithMultipleWords = this.upperCaseFirstChar(string).match(/[A-Z][a-z]+/g);

    return strWithMultipleWords ? strWithMultipleWords.join(' ') : string;
  }

  public static upperCaseFirstChar(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
