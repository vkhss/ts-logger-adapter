import { TraceLog, ErrorLog, Status } from './imp.types';

export interface IStartMonitoring {
  init(): void;
}

export interface ICaptureTrace {
  captureTrace(data: TraceLog & Status): void;
}

export interface ICaptureError {
  captureError(data: ErrorLog & Status): void;
}

export interface ILogger {
  startMonitoring(config: IMonitoringConfig): void;
  error(data: ErrorLog): void;
  fatal(data: ErrorLog): void;
  warn(data: TraceLog): void;
  info(data: TraceLog): void;
  debug(data: TraceLog): void;
}

export interface IMonitoringConfig {
  INIT_ELASTIC?: boolean;
  INIT_SENTRY?: boolean;
  FIELD_MASK?: string[];
  BLOCK_STATUS?: number[];
}
