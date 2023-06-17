import { Vector3 as Vector3Fiber } from '@react-three/fiber';

import { v4 as uuidv4 } from 'uuid';

export interface IGraph {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export interface Node {
  id: string;
  label: string;
  position: Vector3Fiber | [number, number];
}

export interface Edge {
  from: string;
  to: string;
  label: string | null;
}
