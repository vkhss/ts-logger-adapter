import * as apm from 'elastic-apm-node';

import { ICaptureError, IStartMonitoring } from '../imp.interfaces';
import { ErrorLog, Status } from '../imp.types';

import * as dotenv from 'dotenv';
dotenv.config();

const {
  ELASTIC_APM_SECRET_TOKEN,
  ELASTIC_APM_SERVER_URL,
  ELASTIC_APM_ENVIRONMENT,
} = process.env;

export class ElasticAPMService implements IStartMonitoring, ICaptureError {
  public init() {
    const useElastic =
      ELASTIC_APM_SECRET_TOKEN && ELASTIC_APM_SERVER_URL && ELASTIC_APM_ENVIRONMENT;
    if (useElastic) {
      apm.start({
        captureSpanStackTraces: false,
        usePathAsTransactionName: true,
      });
    }
  }

  public captureError(data: ErrorLog & Status): void {
    const { transactionError, transactionName } = data;
    const error = transactionError || transactionName;
    apm.captureError(error);
  }
}
