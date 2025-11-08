# 🧭 NeuraMem Canvas Architecture

## 1. Canonical Model
- Source of truth lives in `/model/`.
- Components:
  - `/model/graph.json` → global topology (nodes + edges)
  - `/model/nodes/<id>.json` → per-node metadata/config
  - `/docs/<id>.md` → optional markdown commentary

## 2. Modes

| Mode | Description |
|------|--------------|
| **Editor** | Full read/write on canonical graph via structured operations (`addNode`, `connect`, `updateNodeMeta`). |
| **Viewer** | Read-only; supports filters, overlays, dependency paths. |
| **Versioner** | Git + schema validation ensure deterministic serialization. Visual diffs derived from Git changes. |
| **Committer** | Canvas UI → stage → semantic commit → optional PR. |

## 3. Canvas Contract

```ts
interface CanvasContract {
  loadModel(): CanonicalGraph;
  saveModel(ops: Operation[]): void;
  getDiff(base: CanonicalGraph, head: CanonicalGraph): DiffResult[];
}
