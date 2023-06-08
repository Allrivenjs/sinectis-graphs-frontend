import { FC } from 'react';

import { Canvas } from '@react-three/fiber';

import { Circle, OrbitControls, OrthographicCamera } from '@react-three/drei';

import { IGraph } from '@/types';
import { Node, Edge } from './';

type Graph = {
  graph: IGraph;
};

export const Graph: FC<Graph> = ({ graph }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrthographicCamera position={[0, 0, 100]} zoom={10} makeDefault />

      <OrbitControls enableRotate={false} />

      {graph.nodes.map((node) => (
        <Node key={node.id} position={node.position} label='lol' />
      ))}

      {graph.edges.map((edge, i) => (
        <Edge
          key={i}
          fromPosition={edge.fromPosition}
          toPosition={edge.toPosition}
          label='lol'
        />
      ))}
    </Canvas>
  );
};

// <Circle key={node.id} position={node.position} />
