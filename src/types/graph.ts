import { Vector3 } from '@react-three/fiber';

export interface IGraph {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export interface Node {
  id: number;
  label: string;
  title: string;
  position: Vector3;
}

export interface Edge {
  from: number;
  to: number;
  toPosition: Vector3;
  fromPosition: Vector3;
}
