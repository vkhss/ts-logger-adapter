import * as apm from 'elastic-apm-node';

import { ICaptureTrace, ICaptureError } from '../imp.interfaces';
import { ErrorLog, Status, TraceLog } from '../imp.types';

const stringify = require('json-stringify-safe');

export class StackDriverService implements ICaptureTrace, ICaptureError {
  private maxDeep = 8;

  public captureTrace(data: TraceLog & Status) {
    const { transactionStatus, transactionData, transactionName } = data;

    console.log(
      JSON.stringify({
        transactionIds: apm?.currentTransaction?.ids,
        severity: transactionStatus,
        name: transactionName,
        data: stringify(transactionData, null, this.maxDeep),
      })
    );
  }

  public captureError(data: ErrorLog & Status) {
    const { transactionStatus, transactionError, transactionName } = data;
    console.error(
      JSON.stringify({
        transactionIds: apm?.currentTransaction?.ids,
        severity: transactionStatus,
        name: transactionName,
        error: stringify(
          transactionError ? transactionError.message : transactionName,
          null,
          this.maxDeep
        ),
      })
    );
  }
}
