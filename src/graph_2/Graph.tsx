import { FC, useRef, useState } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { Circle, OrbitControls, OrthographicCamera } from '@react-three/drei';

import { IGraph } from '@/types';
import { Node, Edge } from './';
import { useDrag } from '@use-gesture/react';

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
        <Node key={node.id} id={node.id} position={node.position} label='lol' />
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

function DraggableDodecahedron() {
  const colors = ['hotpink', 'red', 'blue', 'green', 'yellow'];
  const ref = useRef();
  const [colorIdx, setColorIdx] = useState(0);
  const [position, setPosition] = useState([0, 0, 0]);
  useFrame(() => {
    ref.current.rotation.z += 0.01;
    ref.current.rotation.x += 0.01;
  });
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      const [, , z] = position;
      setPosition([x / aspect, -y / aspect, z]);
    },
    { pointerEvents: true }
  );

  return (
    <mesh
      position={position}
      {...bind()}
      ref={ref}
      onClick={(e) => {
        if (colorIdx === 4) {
          setColorIdx(0);
        } else {
          setColorIdx(colorIdx + 1);
        }
      }}
      onPointerOver={(e) => console.log('hover')}
      onPointerOut={(e) => console.log('unhover')}
    >
      <dodecahedronBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color={colors[colorIdx]} />
    </mesh>
  );
}

// <Circle key={node.id} position={node.position} />
