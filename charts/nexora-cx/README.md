# MicroShield BPO Helm Chart

Deploys the MicroShield BPO static website on Kubernetes.

## Install

```bash
helm upgrade --install nexora-cx ./charts/nexora-cx \
  --namespace nexora-cx \
  --create-namespace \
  --set image.repository=<dockerhub-username>/nexora-cx \
  --set image.tag=<tag>
```

## Key values

| Value | Default | Description |
| --- | --- | --- |
| `replicaCount` | `2` | Pod replicas when autoscaling is disabled |
| `image.repository` | `rahultipledocker/nexora-cx` | Container image repository |
| `image.tag` | `latest` | Container image tag |
| `service.type` | `NodePort` | Kubernetes Service type |
| `service.nodePort` | `30080` | NodePort used to expose the app locally |
| `autoscaling.enabled` | `true` | Create an HPA |
| `resources` | Small nginx defaults | CPU and memory requests/limits |

## Render locally

```bash
helm lint ./charts/nexora-cx
helm template nexora-cx ./charts/nexora-cx --namespace nexora-cx
```
