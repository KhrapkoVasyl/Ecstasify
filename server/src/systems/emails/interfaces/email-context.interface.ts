export interface IEmailContext {
  [key: string]: string;
}

export interface ITestEmailContext extends IEmailContext {
  testMessage: string;
}
