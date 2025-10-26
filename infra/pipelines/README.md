# CI/CD Pipelines

This directory documents the automation backing the Innoveo demo platform.

- `.github/workflows/ci.yml` builds and tests both frontend and backend applications,
  captures unit test coverage as artifacts, produces Docker images, and deploys the
  development overlay to the Kubernetes cluster referenced by `DEV_KUBE_CONFIG`.
- Future workflows can extend this foundation for security scanning, database migrations,
  and production promotion.

Secrets required:

| Secret | Description |
| ------ | ----------- |
| `DEV_KUBE_CONFIG` | Base64-encoded kubeconfig for the development cluster namespace. |
| `DEV_POSTGRES_URL` | Connection string (including credentials) for the managed PostgreSQL instance. |
| `DEV_POSTGRES_CA` | Base64-encoded CA certificate if the managed instance enforces TLS verification. |

Images are pushed to `ghcr.io/<org>/<repo>/demo-{frontend,backend}`.
