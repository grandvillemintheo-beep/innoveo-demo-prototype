#!/usr/bin/env bash
set -euo pipefail

NAMESPACE="innoveo-demo"
CONTEXT="${1:-dev}"

kubectl config use-context "$CONTEXT"

kubectl apply -k infra/k8s/overlays/dev

kubectl -n "$NAMESPACE" get all
