#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="innoveo-demo"
CONTEXT="${1:-dev}"

if ! command -v kubectl >/dev/null 2>&1; then
  echo "kubectl is required to bootstrap the development environment" >&2
  exit 1
fi

echo "Switching to context ${CONTEXT}"
kubectl config use-context "$CONTEXT" >/dev/null

echo "Applying base manifests"
kubectl apply -k infra/k8s/overlays/dev

echo "Waiting for core workloads to become ready"
kubectl -n "$NAMESPACE" rollout status deployment/backend --timeout=120s
kubectl -n "$NAMESPACE" rollout status deployment/frontend --timeout=120s
kubectl -n "$NAMESPACE" rollout status deployment/otel-collector --timeout=120s

echo "Cluster objects in namespace ${NAMESPACE}:"
kubectl -n "$NAMESPACE" get all
