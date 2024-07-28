type NodeType = "operator" | "operand";

export interface Node {
  type: NodeType;
  left?: Node;
  right?: Node;
  value?: string | number;
}