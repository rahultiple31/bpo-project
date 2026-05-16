# nexora-cx Helm Chart

Deploys the Nexora CX static BPO website on Kubernetes.

## Install

```bash
helm upgrade --install nexora-cx ./charts/nexora-cx \
  --namespace nexora-cx \
  --create-namespace \
  --set image.repository=ghcr.io/rahultiple31/nexora-cx \
  --set image.tag=<tag>
```

## Key values

| Value | Default | Description |
| --- | --- | --- |
| `replicaCount` | `2` | Pod replicas when autoscaling is disabled |
| `image.repository` | `ghcr.io/rahultiple31/nexora-cx` | Container image repository |
| `image.tag` | `latest` | Container image tag |
| `service.type` | `ClusterIP` | Kubernetes Service type |
| `ingress.enabled` | `true` | Create an Ingress |
| `ingress.hosts[0].host` | `nexora.example.com` | Public host |
| `autoscaling.enabled` | `true` | Create an HPA |
| `resources` | Small nginx defaults | CPU and memory requests/limits |

## Render locally

```bash
helm lint ./charts/nexora-cx
helm template nexora-cx ./charts/nexora-cx --namespace nexora-cx
```
