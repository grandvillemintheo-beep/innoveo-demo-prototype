import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

import configuration from '../config/configuration';

type NodeSdkLike = {
  start: () => Promise<void>;
  shutdown: () => Promise<void>;
};

let sdk: NodeSdkLike | undefined;

export async function startTracing(): Promise<NodeSdkLike | undefined> {
  const config = configuration();
  if (!config.telemetry?.collectorUrl) {
    return undefined;
  }

  if (sdk) {
    return sdk;
  }

  try {
    const [{ NodeSDK }, { OTLPTraceExporter }, { Resource }, { SemanticResourceAttributes }] = await Promise.all([
      import('@opentelemetry/sdk-node' as const),
      import('@opentelemetry/exporter-trace-otlp-http' as const),
      import('@opentelemetry/resources' as const),
      import('@opentelemetry/semantic-conventions' as const)
    ]);

    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

    sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: config.telemetry.collectorUrl
      }),
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: config.telemetry.serviceName ?? 'innoveo-api'
      })
    });

    await sdk.start();
    return sdk;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('OpenTelemetry SDK not available, tracing disabled', error);
    return undefined;
  }
}

export async function stopTracing() {
  if (!sdk) {
    return;
  }

  await sdk.shutdown();
  sdk = undefined;
}
