# CI/CD Pipelines

This directory documents the automation backing the Innoveo demo platform.

- `.github/workflows/ci.yml` builds and tests both frontend and backend applications,
  produces Docker images, and deploys the development overlay to the Kubernetes cluster
  referenced by `DEV_KUBE_CONFIG`.
- Future workflows can extend this foundation for security scanning, database migrations,
  and production promotion.

Secrets required:

| Secret | Description |
| ------ | ----------- |
| `DEV_KUBE_CONFIG` | Base64-encoded kubeconfig for the development cluster namespace. |

Images are pushed to `ghcr.io/<org>/<repo>/demo-{frontend,backend}`.
