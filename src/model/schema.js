// Canonical Graph Schema — source of truth for nmcanvas
// Defines structural types for nodes, edges, and graphs.
export var NodeKind;
(function (NodeKind) {
    NodeKind["Route"] = "route";
    NodeKind["Service"] = "service";
    NodeKind["Backend"] = "backend";
    NodeKind["Policy"] = "policy";
    NodeKind["Transform"] = "transform";
})(NodeKind || (NodeKind = {}));
export var EdgeKind;
(function (EdgeKind) {
    EdgeKind["RouteToService"] = "route_to_service";
    EdgeKind["ServiceToBackend"] = "service_to_backend";
    EdgeKind["DependsOn"] = "depends_on";
    EdgeKind["Condition"] = "condition";
})(EdgeKind || (EdgeKind = {}));
