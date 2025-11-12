/**
 * CanvasContract — operational bridge between canonical schema and runtime logic.
 * Implements load, save, and diff operations on the canonical graph model.
 */
import * as fs from "fs";
import * as path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
// ✅ Load schema dynamically from file (avoids TS import-assert syntax issues)
const schema = JSON.parse(fs.readFileSync(path.resolve("schema/canonical-graph.schema.json"), "utf-8"));
export class CanvasContract {
    schemaPath = path.resolve("schema/canonical-graph.schema.json");
    modelPath = path.resolve("model/graph.json");
    ajv;
    constructor() {
        this.ajv = new Ajv({ allErrors: true, strict: false });
        addFormats(this.ajv);
    }
    /**
     * Load and validate canonical model
     */
    loadModel() {
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
    saveModel(ops) {
        const model = JSON.parse(fs.readFileSync(this.modelPath, "utf-8"));
        for (const op of ops) {
            switch (op.type) {
                case "addNode":
                    model.nodes.push(op.payload);
                    break;
                case "removeNode":
                    model.nodes = model.nodes.filter((n) => n.id !== op.payload.id);
                    break;
                case "updateNode":
                    model.nodes = model.nodes.map((n) => n.id === op.payload.id ? { ...n, ...op.payload } : n);
                    break;
                case "addEdge":
                    model.edges.push(op.payload);
                    break;
                case "removeEdge":
                    model.edges = model.edges.filter((e) => e.id !== op.payload.id);
                    break;
                case "updateEdge":
                    model.edges = model.edges.map((e) => e.id === op.payload.id ? { ...e, ...op.payload } : e);
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
    getDiff(base, head) {
        const diffs = [];
        // Nodes
        const baseNodes = new Map(base.nodes.map((n) => [n.id, n]));
        const headNodes = new Map(head.nodes.map((n) => [n.id, n]));
        for (const [id, node] of headNodes) {
            if (!baseNodes.has(id))
                diffs.push({ type: "node-added", id });
            else if (JSON.stringify(baseNodes.get(id)) !== JSON.stringify(node))
                diffs.push({ type: "node-updated", id });
        }
        for (const [id] of baseNodes) {
            if (!headNodes.has(id))
                diffs.push({ type: "node-removed", id });
        }
        // Edges
        const baseEdges = new Map(base.edges.map((e) => [e.id, e]));
        const headEdges = new Map(head.edges.map((e) => [e.id, e]));
        for (const [id, edge] of headEdges) {
            if (!baseEdges.has(id))
                diffs.push({ type: "edge-added", id });
            else if (JSON.stringify(baseEdges.get(id)) !== JSON.stringify(edge))
                diffs.push({ type: "edge-updated", id });
        }
        for (const [id] of baseEdges) {
            if (!headEdges.has(id))
                diffs.push({ type: "edge-removed", id });
        }
        return diffs;
    }
}
// Convenience exported instance expected by scripts/tests
export const Canvas = new CanvasContract();
