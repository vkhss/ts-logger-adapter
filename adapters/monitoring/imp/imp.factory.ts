import { ElasticAPMService } from './elastic/elastic.adapter';
import { IStartMonitoring, ICaptureTrace, ICaptureError } from './imp.interfaces';
import { SentryService } from './sentry/sentry.adapter';
import { StackDriverService } from './stack-driver/stack-driver.adapter';

export class ImpFactory {
  private static instances: IStartMonitoring[] | ICaptureTrace[] | ICaptureError[];

  public static getInstance(): IStartMonitoring[] | ICaptureTrace[] | ICaptureError[] {
    if (!this.instances) {
      this.instances = [
        new SentryService(),
        new ElasticAPMService(),
        new StackDriverService(),
      ];
    }
    return this.instances;
  }
}
