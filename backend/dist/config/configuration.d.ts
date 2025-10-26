declare const _default: () => {
    nodeEnv: string;
    http: {
        port: number;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
    };
    auth: {
        jwtSecret: string;
        jwtExpiresIn: string;
        samlEntryPoint: string;
        samlIssuer: string;
        samlCallbackUrl: string;
        samlCertificate: string;
    };
    telemetry: {
        serviceName: string;
        collectorUrl: string;
    };
};
export default _default;
//# sourceMappingURL=configuration.d.ts.map