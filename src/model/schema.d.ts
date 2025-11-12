export type NodeId = string & {
    readonly brand: unique symbol;
};
export type EdgeId = string & {
    readonly brand: unique symbol;
};
export declare enum NodeKind {
    Route = "route",
    Service = "service",
    Backend = "backend",
    Policy = "policy",
    Transform = "transform"
}
export declare enum EdgeKind {
    RouteToService = "route_to_service",
    ServiceToBackend = "service_to_backend",
    DependsOn = "depends_on",
    Condition = "condition"
}
export interface Node {
    id: NodeId;
    kind: NodeKind;
    label: string;
    metadata?: Record<string, any>;
    doc?: string;
}
export interface Edge {
    id: EdgeId;
    from: NodeId;
    to: NodeId;
    kind: EdgeKind;
    constraints?: Record<string, any>;
}
export interface GraphMetadata {
    version: string;
    environment?: string;
    layout?: Record<string, any>;
    [key: string]: any;
}
export interface CanonicalGraph {
    version: string;
    nodes: Node[];
    edges: Edge[];
    metadata?: GraphMetadata;
}
export default CanonicalGraph;
//# sourceMappingURL=schema.d.ts.map