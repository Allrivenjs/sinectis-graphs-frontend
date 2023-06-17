import { Text } from '@react-three/drei';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useDrag, useWheel } from '@use-gesture/react';
import { FC, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useGraphActions } from '@/store/graph';

type Node = {
  id: number;
  position: Vector3;
  label: string;
};

export const Node: FC<Node> = ({ id, position, label }) => {
  const { changeNodePosition } = useGraphActions();
  const [p, setP] = useState<Boolean>(false);
  const ref = useRef<THREE.Mesh>();
  const [firstMove, setFirstMove] = useState(false);
  const { size, viewport, camera } = useThree();
  const aspect = size.width / viewport.width;

  // const bind = useDrag<ThreeEvent<PointerEvent>>(({ offset: [x, y] }) => {
  //   if (p == false) {
  //     const vec = new Vector3(
  //       position.x / aspect,
  //       -position.y / aspect,
  //       position.z
  //     );
  //     //vec.unproject(camera);
  //
  //     changeNodePosition(id, vec);
  //     setP(true);
  //   } else {
  //     const vec = new Vector3(x / aspect, -y / aspect, position.z);
  //     //vec.unproject(camera);
  //
  //     changeNodePosition(id, vec);
  //   }
  // });
  //
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      // Obtenemos las dimensiones del canvas
      const { width, height } = viewport;

      // Normalizamos las coordenadas del cursor dentro del canvas
      const normalizedX = (x / width) * 2 - 1;
      const normalizedY = (y / height) * -2 + 1;

      // Si es el primer movimiento, actualizamos la posición sin volver al origen
      if (!firstMove) {
        ref.current.position.x = normalizedX;
        ref.current.position.y = normalizedY;
        setFirstMove(true); // Activamos la bandera de primer movimiento
      } else {
        const vec = new Vector3(normalizedX, normalizedY, position.z);
        // vec.unproject(camera);
        changeNodePosition(id, vec);
      }
    },
    {
      // Aseguramos que la rueda del ratón no interfiera con el movimiento
      filterTaps: true,
    }
  );
  // Manejamos el evento de scroll wheel y ajustamos el movimiento
  const bindWheel = useWheel(({ event }) => {
    // Obtenemos el cambio de la rueda del ratón
    const delta = event.deltaY;

    // Definimos un factor de ajuste para el desplazamiento
    const scrollFactor = 0.01;

    // Definimos un factor de escala para aumentar el movimiento
    const scaleFactor = 2;

    // Calculamos el factor de escala inverso
    const inverseScaleFactor = 1 / scaleFactor;

    // Ajustamos las coordenadas de movimiento según el desplazamiento de la rueda y el factor de escala inverso
    const movementX = delta * scrollFactor * inverseScaleFactor;
    const movementY = -delta * scrollFactor * inverseScaleFactor;

    // Actualizamos la posición del objeto sumando el movimiento calculado
    ref.current.position.x += movementX;
    ref.current.position.y += movementY;

    // Prevenimos el comportamiento predeterminado del evento de scroll
    event.preventDefault();
  });

  console.log({ ...position, aspect });

  // const bind = useDrag(() => {
  //   // Actualiza la posición del objeto al arrastrarlo
  //   const { width, height } = viewport;
  //
  //   // Normalizamos las coordenadas del cursor dentro del canvas
  //   const normalizedX = (position.x / width) * 2 - 1;
  //   const normalizedY = (position.y / height) * -2 + 1;
  //
  //   // console.log({ normalizedY, normalizedX });
  //   // Actualizamos la posición del objeto al arrastrarlo
  //   // ref.current.position.x = normalizedX;
  //   // ref.current.position.y = normalizedY;
  //
  //   changeNodePosition(id, new Vector3(normalizedX, normalizedY, 1));
  // });

  // console.log({ ...position });

  return (
    <>
      {/* @ts-ignore */}
      <mesh position={position} ref={ref} {...bind()} {...bindWheel()}>
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
    </>
  );
};
