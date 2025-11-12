/**
 * CanvasContract — operational bridge between canonical schema and runtime logic.
 * Implements load, save, and diff operations on the canonical graph model.
 */

import * as fs from "fs";
import * as path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
// Minimal local type definitions (kept local to avoid module-resolution issues in the quick test script)
export interface Node {
  id: string;
  [key: string]: any;
}

export interface Edge {
  id: string;
  from?: string;
  to?: string;
  [key: string]: any;
}

export interface CanonicalGraph {
  nodes: Node[];
  edges: Edge[];
  [key: string]: any;
}

// ✅ Load schema dynamically from file (avoids TS import-assert syntax issues)
const schema = JSON.parse(
  fs.readFileSync(path.resolve("schema/canonical-graph.schema.json"), "utf-8")
);

export interface Operation {
  type:
    | "addNode"
    | "removeNode"
    | "updateNode"
    | "addEdge"
    | "removeEdge"
    | "updateEdge";
  payload: any;
}

export interface DiffResult {
  type:
    | "node-added"
    | "node-removed"
    | "node-updated"
    | "edge-added"
    | "edge-removed"
    | "edge-updated";
  id: string;
  details?: any;
}

export class CanvasContract {
  private schemaPath = path.resolve("schema/canonical-graph.schema.json");
  private modelPath = path.resolve("model/graph.json");
  private ajv: any;

  constructor() {
    this.ajv = new (Ajv as any)({ allErrors: true, strict: false });
    (addFormats as any)(this.ajv);
  }

  /**
   * Load and validate canonical model
   */
  loadModel(): CanonicalGraph {
    const model = JSON.parse(fs.readFileSync(this.modelPath, "utf-8"));
    const validate = this.ajv.compile(schema);
    const valid = validate(model);

    if (!valid) {
      console.error("❌ Canonical model failed validation:", validate.errors);
      throw new Error("Canonical graph validation failed");
    }

    console.log("✅ Canonical model loaded and validated.");
    return model;
  }

  /**
   * Apply structured operations and save model
   */
  saveModel(ops: Operation[]): void {
    const model = JSON.parse(fs.readFileSync(this.modelPath, "utf-8"));

    for (const op of ops) {
      switch (op.type) {
        case "addNode":
          model.nodes.push(op.payload as Node);
          break;

        case "removeNode":
          model.nodes = model.nodes.filter((n: Node) => n.id !== op.payload.id);
          break;

        case "updateNode":
          model.nodes = model.nodes.map((n: Node) =>
            n.id === op.payload.id ? { ...n, ...op.payload } : n
          );
          break;

        case "addEdge":
          model.edges.push(op.payload as Edge);
          break;

        case "removeEdge":
          model.edges = model.edges.filter((e: Edge) => e.id !== op.payload.id);
          break;

        case "updateEdge":
          model.edges = model.edges.map((e: Edge) =>
            e.id === op.payload.id ? { ...e, ...op.payload } : e
          );
          break;

        default:
          console.warn("Unknown operation type:", op.type);
          break;
      }
    }

    fs.writeFileSync(this.modelPath, JSON.stringify(model, null, 2));
    console.log("✅ Canonical model saved successfully.");
  }

  /**
   * Compare two canonical graphs and return semantic diff
   */
  getDiff(base: CanonicalGraph, head: CanonicalGraph): DiffResult[] {
    const diffs: DiffResult[] = [];

    // Nodes
  const baseNodes = new Map<string, Node>(base.nodes.map((n: Node) => [n.id, n]));
  const headNodes = new Map<string, Node>(head.nodes.map((n: Node) => [n.id, n]));

    for (const [id, node] of headNodes) {
      if (!baseNodes.has(id)) diffs.push({ type: "node-added", id });
      else if (JSON.stringify(baseNodes.get(id)) !== JSON.stringify(node))
        diffs.push({ type: "node-updated", id });
    }

    for (const [id] of baseNodes) {
      if (!headNodes.has(id)) diffs.push({ type: "node-removed", id });
    }

    // Edges
  const baseEdges = new Map<string, Edge>(base.edges.map((e: Edge) => [e.id, e]));
  const headEdges = new Map<string, Edge>(head.edges.map((e: Edge) => [e.id, e]));

    for (const [id, edge] of headEdges) {
      if (!baseEdges.has(id)) diffs.push({ type: "edge-added", id });
      else if (JSON.stringify(baseEdges.get(id)) !== JSON.stringify(edge))
        diffs.push({ type: "edge-updated", id });
    }

    for (const [id] of baseEdges) {
      if (!headEdges.has(id)) diffs.push({ type: "edge-removed", id });
    }

    return diffs;
  }

}

// Convenience exported instance expected by scripts/tests
export const Canvas = new CanvasContract();

// If this compiled module is executed directly (node dist/model/canvasContract.js)
// call loadModel() to provide a simple CLI entry used by package scripts.
try {
  const scriptPath = process.argv && process.argv[1] ? process.argv[1] : "";
  if (
    scriptPath.endsWith("dist/model/canvasContract.js") ||
    scriptPath.endsWith("src/model/canvasContract.js") ||
    scriptPath.endsWith("canvasContract.js")
  ) {
    // Best-effort: run the loader and exit
    Canvas.loadModel();
  }
} catch (e) {
  // swallow—this is only best-effort for CLI convenience
}
