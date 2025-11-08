/**
 * CanvasContract — operational bridge between canonical schema and runtime logic.
 * Implements load, save, and diff operations on the canonical graph model.
 */

import fs from "fs";
import path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { CanonicalGraph, Node, Edge } from "./schema.js";

export interface Operation {
  type: "addNode" | "removeNode" | "updateNode" | "addEdge" | "removeEdge" | "updateEdge";
  payload: any;
}

export interface DiffResult {
  type: "node-added" | "node-removed" | "node-updated" | "edge-added" | "edge-removed" | "edge-updated";
  id: string;
  details?: any;
}

export class CanvasContract {
  private schemaPath = path.resolve("schema/canonical-graph.schema.json");
  private modelPath = path.resolve("model/graph.json");
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(this.ajv);
  }

  /**
   * Load and validate canonical model
   */
  loadModel(): CanonicalGraph {
    const schema = JSON.parse(fs.readFileSync(this.schemaPath, "utf-8"));
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
    const model = this.loadModel();

    for (const op of ops) {
      switch (op.type) {
        case "addNode":
          model.nodes.push(op.payload as Node);
          break;
        case "removeNode":
          model.nodes = model.nodes.filter(n => n.id !== op.payload.id);
          break;
        case "updateNode":
          model.nodes = model.nodes.map(n => (n.id === op.payload.id ? { ...n, ...op.payload } : n));
          break;
        case "addEdge":
          model.edges.push(op.payload as Edge);
          break;
        case "removeEdge":
          model.edges = model.edges.filter(e => e.id !== op.payload.id);
          break;
        case "updateEdge":
          model.edges = model.edges.map(e => (e.id === op.payload.id ? { ...e, ...op.payload } : e));
          break;
        default:
          console.warn("Unknown operation type:", op.type);
      }
    }

    fs.writeFileSync(this.modelPath, JSON.stringify(model, null, 2));
    console.log("💾 Canonical model updated and saved.");
  }

  /**
   * Compare two canonical graphs and return semantic diff
   */
  getDiff(base: CanonicalGraph, head: CanonicalGraph): DiffResult[] {
    const diffs: DiffResult[] = [];

    // Nodes
    const baseNodes = new Map(base.nodes.map(n => [n.id, n]));
    const headNodes = new Map(head.nodes.map(n => [n.id, n]));

    for (const [id, node] of headNodes) {
      if (!baseNodes.has(id)) diffs.push({ type: "node-added", id });
      else if (JSON.stringify(baseNodes.get(id)) !== JSON.stringify(node))
        diffs.push({ type: "node-updated", id });
    }
    for (const [id] of baseNodes) {
      if (!headNodes.has(id)) diffs.push({ type: "node-removed", id });
    }

    // Edges
    const baseEdges = new Map(base.edges.map(e => [e.id, e]));
    const headEdges = new Map(head.edges.map(e => [e.id, e]));

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

// Optional singleton export for quick imports
export const Canvas = new CanvasContract();
