import * as Sentry from '@sentry/node';
import * as apm from 'elastic-apm-node';

import { IStartMonitoring, ICaptureTrace, ICaptureError } from '../imp.interfaces';
import { TraceLog, ErrorLog, Status } from '../imp.types';
import { SeverityLevel } from '../severity.level.enum';

import * as dotenv from 'dotenv';
dotenv.config();

const { SENTRY_DSN, SENTRY_ENV } = process.env;

export class SentryService implements IStartMonitoring, ICaptureTrace, ICaptureError {
  private static severities: Record<string, Sentry.SeverityLevel> = {
    [SeverityLevel.WARN]: 'warning',
    [SeverityLevel.ERROR]: 'error',
    [SeverityLevel.FATAL]: 'fatal',
  };

  public init() {
    Sentry.init({
      dsn: SENTRY_DSN,
      debug: SENTRY_ENV !== 'production',
      environment: SENTRY_ENV,
    });
  }

  public captureTrace(data: TraceLog & Status) {
    const { transactionStatus, transactionData, transactionName, transactionTags } = data;

    if (transactionStatus === 'info' || transactionStatus === 'debug') return;

    Sentry.withScope(scope => {
      scope.setLevel(SentryService.getSeverity(transactionStatus));

      Sentry.setTags(transactionTags ?? {});

      Sentry.captureMessage(transactionName, {
        level: SentryService.getSeverity(transactionStatus),
        extra: {
          info: transactionData,
          apmTransactionIds: apm?.currentTransaction?.ids,
        },
      });
    });
  }

  public captureError(data: ErrorLog & Status) {
    const {
      transactionStatus,
      transactionData,
      transactionName,
      transactionTags,
      transactionError,
    } = data;
    Sentry.withScope(scope => {
      scope.setLevel(SentryService.getSeverity(transactionStatus));

      Sentry.setTags(transactionTags ?? {});

      Sentry.captureMessage(transactionName, {
        extra: {
          error: transactionError ?? transactionName,
          data: transactionData,
          apmTransactionIds: apm?.currentTransaction?.ids,
        },
      });
    });
  }

  private static getSeverity(severity: SeverityLevel): Sentry.SeverityLevel {
    return SentryService.severities[severity] || 'error';
  }
}
