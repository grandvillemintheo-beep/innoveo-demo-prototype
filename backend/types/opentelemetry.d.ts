declare module '@opentelemetry/sdk-node' {
  class NodeSDK {
    constructor(options?: Record<string, unknown>);
    start(): Promise<void>;
    shutdown(): Promise<void>;
  }

  export { NodeSDK };
}

declare module '@opentelemetry/exporter-trace-otlp-http' {
  class OTLPTraceExporter {
    constructor(options?: Record<string, unknown>);
  }

  export { OTLPTraceExporter };
}

declare module '@opentelemetry/resources' {
  class Resource {
    constructor(attributes?: Record<string, unknown>);
  }

  export { Resource };
}

declare module '@opentelemetry/semantic-conventions' {
  export const SemanticResourceAttributes: Record<string, string>;
}
