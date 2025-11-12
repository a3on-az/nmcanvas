/**
 * CanvasContract — operational bridge between canonical schema and runtime logic.
 * Implements load, save, and diff operations on the canonical graph model.
 */
import type { CanonicalGraph } from "./schema";
export interface Operation {
    type: "addNode" | "removeNode" | "updateNode" | "addEdge" | "removeEdge" | "updateEdge";
    payload: any;
}
export interface DiffResult {
    type: "node-added" | "node-removed" | "node-updated" | "edge-added" | "edge-removed" | "edge-updated";
    id: string;
    details?: any;
}
export declare class CanvasContract {
    private schemaPath;
    private modelPath;
    private ajv;
    constructor();
    /**
     * Load and validate canonical model
     */
    loadModel(): CanonicalGraph;
    /**
     * Apply structured operations and save model
     */
    saveModel(ops: Operation[]): void;
    /**
     * Compare two canonical graphs and return semantic diff
     */
    getDiff(base: CanonicalGraph, head: CanonicalGraph): DiffResult[];
}
export declare const Canvas: CanvasContract;
//# sourceMappingURL=canvasContract.d.ts.map