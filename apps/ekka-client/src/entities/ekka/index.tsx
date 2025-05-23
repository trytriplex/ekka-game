import { useWorld } from "koota/react";
import { useEffect, useRef } from "react";
import { type Vector3Tuple, type Object3D } from "three";
import { Mesh, Position } from "../shared/traits";
import { EkkaEyeEntity } from "./eye";
import {
  DamageModifier,
  IsEkka,
  State,
  TimeSinceLastStateChange,
} from "./traits";

export function EkkaEntity({
  position = [0, 0, 0],
}: {
  position?: Vector3Tuple;
}) {
  const world = useWorld();
  const ref = useRef<Object3D>(null);
  const [x, y, z] = position;

  useEffect(() => {
    const entity = world.spawn(
      DamageModifier,
      IsEkka,
      Mesh(ref.current!),
      Position({ x, y, z }),
      State,
      TimeSinceLastStateChange,
    );

    return () => {
      entity.destroy();
    };
  }, [world, x, y, z]);

  return (
    <group ref={ref}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.8, 3, 0.8]} />
        <meshStandardMaterial />
      </mesh>
      <EkkaEyeEntity position={[0, 2.72, 0]} />
    </group>
  );
}
