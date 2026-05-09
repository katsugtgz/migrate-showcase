/* eslint-disable react/no-unknown-property */
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RapierRigidBody } from "@react-three/rapier";

interface IDCardLanyardProps {
  anchorRef: React.RefObject<RapierRigidBody | null>;
  chainRefs: React.RefObject<RapierRigidBody | null>[];
  cardRef: React.RefObject<RapierRigidBody | null>;
}

export default function IDCardLanyard({
  anchorRef,
  chainRefs,
  cardRef,
}: IDCardLanyardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1E293B",
        roughness: 0.8,
        metalness: 0,
      }),
    [],
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const points: THREE.Vector3[] = [];
    const allRefs = [anchorRef, ...chainRefs, cardRef];

    for (const ref of allRefs) {
      const body = ref.current;
      if (!body) return;
      const pos = body.translation();
      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }

    if (points.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(points);
    const newGeometry = new THREE.TubeGeometry(curve, 64, 0.03, 8, false);

    const oldGeometry = meshRef.current.geometry;
    meshRef.current.geometry = newGeometry;
    oldGeometry.dispose();
  });

  return (
    <mesh ref={meshRef} material={material}>
      <bufferGeometry />
    </mesh>
  );
}
