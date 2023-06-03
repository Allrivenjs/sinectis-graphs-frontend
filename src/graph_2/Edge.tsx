import { Line, QuadraticBezierLine, Text } from '@react-three/drei';
import { FC } from 'react';

import { Vector3 } from 'three';

type Edge = {
  fromPosition: Vector3;
  toPosition: Vector3;
  label?: string;
};

export const Edge: FC<Edge> = ({ fromPosition, toPosition, label = '' }) => {
  // TODO: hacer un promedio del vector de posición inicial y final para que la posición general
  // del mesh este entre las dos
  return (
    <mesh position={[0, 0, -0.1]}>
      <mesh>
        <Line
          points={[fromPosition, toPosition]}
          lineWidth={2}
          color='hotpink'
        />
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
