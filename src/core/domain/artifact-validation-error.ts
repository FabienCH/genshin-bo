export class ArtifactValidationError extends Error {
  private messages: string[];
  constructor(messages?: string[]) {
    super();
    this.messages = messages || [];
  }

  public addMessage(message: string): void {
    this.messages.push(message);
  }

  public getMessages(): string[] {
    return this.messages;
  }
}
