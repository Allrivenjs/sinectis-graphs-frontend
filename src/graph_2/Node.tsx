import { Text } from '@react-three/drei';
import { FC } from 'react';

import { Vector3 } from 'three';

type Node = {
  position: Vector3;
  label: string;
};

export const Node: FC<Node> = ({ position, label }) => {
  return (
    <mesh position={position}>
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color='blue' />
      </mesh>
      <Text
        scale={[0.5, 0.5, 0.5]}
        fontSize={1}
        color='white'
        anchorX='center'
        anchorY='middle'
        position={[0, 0, 0.1]}
      >
        {label}
      </Text>
    </mesh>
  );
};
