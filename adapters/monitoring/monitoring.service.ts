import impConfig from './imp/imp.configuration';
import { ImpFactory } from './imp/imp.factory';
import {
  ILogger,
  IStartMonitoring,
  ICaptureTrace,
  ICaptureError,
} from './imp/imp.interfaces';
import { ErrorLog, TraceLog } from './imp/imp.types';
import { SeverityLevel } from './imp/severity.level.enum';

class MonitoringService implements ILogger {
  private adapters:
    | IStartMonitoring[]
    | ICaptureTrace[]
    | ICaptureError[] = ImpFactory.getInstance();

  private static instance: MonitoringService;

  public static getInstance(): MonitoringService {
    if (!this.instance) {
      this.instance = new MonitoringService();
    }
    return this.instance;
  }

  public startMonitoring(): void {
    this.adapters.forEach((service: any) => {
      if (service.init) service.init(impConfig);
    });
  }

  public error(data: ErrorLog) {
    this.adapters.forEach((service: any) => {
      if (service.captureError)
        service.captureError({
          transactionName: data.transactionName,
          transactionError: data.transactionError,
          transactionStatus: SeverityLevel.ERROR,
          transactionData: data.transactionData,
          transactionTags: data.transactionTags,
        });
    });
  }

  public fatal(data: ErrorLog) {
    this.adapters.forEach((service: any) => {
      if (service.captureError)
        service.captureError({
          transactionName: data.transactionName,
          transactionError: data.transactionError,
          transactionStatus: SeverityLevel.FATAL,
          transactionData: data.transactionData,
          transactionTags: data.transactionTags,
        });
    });
  }

  public async warn(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      impConfig.FIELD_MASK,
      data.transactionData
    );
    this.adapters.forEach((service: any) => {
      if (service.captureTrace)
        service.captureTrace({
          transactionName: data.transactionName,
          transactionStatus: SeverityLevel.WARN,
          transactionData: maskedData,
          transactionTags: data.transactionTags,
        });
    });
  }

  public async info(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      impConfig.FIELD_MASK,
      data.transactionData
    );
    this.adapters.forEach((service: any) => {
      if (service.captureTrace)
        service.captureTrace({
          transactionName: data.transactionName,
          transactionStatus: SeverityLevel.INFO,
          transactionData: maskedData,
          transactionTags: data.transactionTags,
        });
    });
  }

  public async debug(data: TraceLog) {
    const maskedData = await this.sanatizeObject(
      impConfig.FIELD_MASK,
      data.transactionData
    );
    this.adapters.forEach((service: any) => {
      if (service.captureTrace)
        service.captureTrace({
          transactionName: data.transactionName,
          transactionStatus: SeverityLevel.DEBUG,
          transactionData: maskedData,
          transactionTags: data.transactionTags,
        });
    });
  }

  private async sanatizeObject(fiedsToRemove: string[], data?: object): Promise<object> {
    const encryptFields = async (fields: string[], obj?: any): Promise<object> => {
      if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj);

        await Promise.all(
          keys.map(async field => {
            if (typeof obj[field] === 'object') await encryptFields(fields, obj[field]);
            if (fields.includes(field)) {
              obj[field] = '[redacted]';
            }
          })
        );
      }
      return obj ?? {};
    };
    return encryptFields(fiedsToRemove, data);
  }
}

const monitoringService = new MonitoringService();

monitoringService.startMonitoring();

export { monitoringService, MonitoringService };
