import { SeverityLevel } from './severity.level.enum';

export type ObjectTags = Record<string, string>;

export type Status = {
  transactionStatus: SeverityLevel;
};

export type TraceLog = {
  transactionName: string;
  transactionData?: object;
  transactionTags?: ObjectTags;
};

export type ErrorLog = {
  transactionName: string;
  transactionError?: Error;
  transactionData?: object;
  transactionTags?: ObjectTags;
};
