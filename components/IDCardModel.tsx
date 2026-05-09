/* eslint-disable react/no-unknown-property */
"use client";

import { useMemo, type RefObject } from "react";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { generateCardTexture } from "@/lib/cardTexture";
import type { ThreeEvent } from "@react-three/fiber";

export interface IDCardModelProps {
  cardRef: RefObject<RapierRigidBody | null>;
  isDragging: boolean;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: (e: ThreeEvent<PointerEvent>) => void;
  isDark?: boolean;
}

export function IDCardModel({
  cardRef,
  onPointerDown,
  onPointerUp,
  isDark = false,
}: IDCardModelProps) {
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(generateCardTexture(isDark));
    tex.needsUpdate = true;
    return tex;
  }, [isDark]);

  return (
    <RigidBody
      ref={cardRef}
      type="dynamic"
      mass={1}
      position={[0, -1, 0]}
      linearDamping={0.5}
      angularDamping={0.9}
    >
      <RoundedBox
        args={[1.4, 2, 0.05]}
        radius={0.05}
        smoothness={4}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>
    </RigidBody>
  );
}
