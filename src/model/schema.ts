// Canonical Graph Schema — source of truth for nmcanvas
// Defines structural types for nodes, edges, and graphs.

export type NodeId = string & { readonly brand: unique symbol };
export type EdgeId = string & { readonly brand: unique symbol };

export enum NodeKind {
  Route = "route",
  Service = "service",
  Backend = "backend",
  Policy = "policy",
  Transform = "transform",
}

export enum EdgeKind {
  RouteToService = "route_to_service",
  ServiceToBackend = "service_to_backend",
  DependsOn = "depends_on",
  Condition = "condition",
}

export interface Node {
  id: NodeId;
  kind: NodeKind;
  label: string;
  metadata?: Record<string, any>;
  doc?: string; // link to markdown sidecar
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

